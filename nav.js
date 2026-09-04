document.addEventListener("DOMContentLoaded", function() {
    // 1. הזרקת ה-HTML של הסרגל
    const navHTML = `
    <div class="nav-top-row">
        <div class="nav-links">
            <a href="index.html">💼 זכויות עובדים</a>
            <a href="legal.html">⚖️ כלים משפטיים</a>
            <a href="finance.html">💰 מט"ח ופיננסים</a>
            
            <a href="index.html" class="nav-logo-link">
                <img src="favicon.png" alt="לוגו" class="nav-logo">
            </a>
            
            <a href="utility.html">🛠️ כלים שימושיים</a>
            <a href="guides.html">📚 מדריכים</a>
            <a href="about.html">ℹ️ אודות</a>
        </div>
    </div>

    <div class="nav-widgets">
        <div class="widget-item">📅 <span id="navGregDate">טוען...</span></div>
        <span class="widget-divider">|</span>
        <div class="widget-item">📜 <span id="navHebrewDate">טוען...</span></div>
        <span class="widget-divider">|</span>
        <div class="widget-item">⏰ <span id="navLiveTime">00:00:00</span></div>
        <span class="widget-divider">|</span>
        <div class="widget-item">🌅 <span id="navSunrise">--:--</span></div>
        <span class="widget-divider">|</span>
        <div class="widget-item">🌇 <span id="navSunset">--:--</span></div>
        <span class="widget-divider">|</span>
        <div class="widget-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <span id="navUsd">--</span>
        </div>
        <span class="widget-divider">|</span>
        <div class="widget-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12"></path><path d="M4 14h9"></path><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12a7.9 7.9 0 0 0 7.8 8 7.7 7.7 0 0 0 5.2-2"></path></svg>
            <span id="navEur">--</span>
        </div>
        <span class="widget-divider">|</span>
        <div class="widget-item">🌤️ <span id="navWeather">--</span></div>
    </div>
    `;

    const navContainer = document.querySelector('.nav');
    if (navContainer) {
        navContainer.innerHTML = navHTML;
    }

    // 2. פונקציות טעינת נתונים ושעון
    function updateClockAndDate() {
        let now = new Date();
        const gregEl = document.getElementById('navGregDate');
        const timeEl = document.getElementById('navLiveTime');
        if (gregEl) gregEl.innerText = now.toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (timeEl) timeEl.innerText = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    async function loadNavData() {
        try {
            let now = new Date();
            let res = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${now.getFullYear()}&gm=${now.getMonth()+1}&gd=${now.getDate()}&g2h=1`);
            let data = await res.json();
            const hebEl = document.getElementById('navHebrewDate');
            if (hebEl) hebEl.innerText = data.hebrew;
        } catch (e) {}

        try {
            let res = await fetch('https://open.er-api.com/v6/latest/USD');
            let data = await res.json();
            const usdEl = document.getElementById('navUsd');
            const eurEl = document.getElementById('navEur');
            if (usdEl) usdEl.innerText = `₪ ${data.rates.ILS.toFixed(2)}`;
            if (eurEl) eurEl.innerText = `₪ ${(data.rates.ILS / data.rates.EUR).toFixed(2)}`;
        } catch (e) {}

        try {
            let wRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=32.0853&longitude=34.7818&current_weather=true&daily=sunrise,sunset&timezone=auto');
            let wData = await wRes.json();
            const weatherEl = document.getElementById('navWeather');
            const sunriseEl = document.getElementById('navSunrise');
            const sunsetEl = document.getElementById('navSunset');
            if (weatherEl) weatherEl.innerText = `${Math.round(wData.current_weather.temperature)}°C`;
            if (sunriseEl) sunriseEl.innerText = wData.daily.sunrise[0].split('T')[1];
            if (sunsetEl) sunsetEl.innerText = wData.daily.sunset[0].split('T')[1];
        } catch (e) {}
    }

    updateClockAndDate();
    setInterval(updateClockAndDate, 1000);
    loadNavData();
});
