document.addEventListener("DOMContentLoaded", function() {
    const navHTML = `
    <div class="nav-top-row">
        <div class="nav-brand">
            <img src="favicon.png" alt="לוגו" class="nav-logo">
        </div>

        <div class="nav-links">
            <a href="index.html">💼 זכויות עובדים</a>
            <a href="legal.html">⚖️ כלים משפטיים</a>
            <a href="finance.html">💰 מט"ח ופיננסים</a>
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
});
