(function() {
    // 1. טעינת ספריית Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        var faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // 2. הזרקת הסמליל (Favicon) לכרטיסיית הדפדפן אם חסר
    if (!document.querySelector('link[rel*="icon"]')) {
        var favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = 'logo.png';
        document.head.appendChild(favicon);
    }

    // 3. הזרקת סרגל הניווט העליון
    var navContainer = document.querySelector('.nav');
    if (navContainer) {
        var navHTML = `
            <div class="nav-top-row">
                <div class="nav-links">
                    <a href="index.html"><i class="fa-solid fa-briefcase" style="color: #38bdf8;"></i> זכויות עובדים</a>
                    <a href="legal.html"><i class="fa-solid fa-scale-balanced" style="color: #a855f7;"></i> כלים משפטיים</a>
                    <a href="finance.html"><i class="fa-solid fa-chart-line" style="color: #22c55e;"></i> פיננסים ומט"ח</a>
                </div>
                <a href="index.html" class="nav-logo-link">
                    <img src="logo.png" alt="לוגו האתר" class="nav-logo" onerror="this.src='favicon.png';">
                </a>
                <div class="nav-links">
                    <a href="utility.html"><i class="fa-solid fa-toolbox" style="color: #f97316;"></i> כלים שימושיים</a>
                    <a href="tech.html"><i class="fa-solid fa-laptop-code" style="color: #06b6d4;"></i> טכנולוגיה ומדיה</a>
                    <a href="about.html"><i class="fa-solid fa-circle-info" style="color: #60a5fa;"></i> אודות ונגישות</a>
                </div>
            </div>
            <div class="nav-widgets" id="navWidgets">
                <div class="widget-item"><i class="fa-solid fa-sun" style="color: #f59e0b;"></i> זריחה: <span id="navSun">טוען...</span></div>
                <div class="widget-divider">|</div>
                <div class="widget-item"><i class="fa-solid fa-moon" style="color: #a855f7;"></i> שקיעה: <span id="navSunset">טוען...</span></div>
                <div class="widget-divider">|</div>
                <div class="widget-item"><i class="fa-solid fa-cloud-sun" style="color: #facc15;"></i> מזג אוויר: <span id="navWeather">טוען...</span></div>
                <div class="widget-divider">|</div>
                <div class="widget-item"><i class="fa-solid fa-percent" style="color: #38bdf8;"></i> פריים: <span>6.00%</span></div>
                <div class="widget-divider">|</div>
                <div class="widget-item"><i class="fa-solid fa-shekel-sign" style="color: #4ade80;"></i> שכר מינימום: <span>₪5,880</span></div>
                <div class="widget-divider">|</div>
                <div class="widget-item"><i class="fa-solid fa-dollar-sign" style="color: #22c55e;"></i> דולר: <span id="navUsd">טוען...</span></div>
                <div class="widget-divider">|</div>
                <div class="widget-item"><i class="fa-solid fa-euro-sign" style="color: #60a5fa;"></i> אירו: <span id="navEur">טוען...</span></div>
                <div class="widget-divider">|</div>
                <div class="widget-item"><i class="fa-solid fa-calendar-days" style="color: #e879f9;"></i> <span id="navHebrewDate">טוען תאריך עברי...</span></div>
            </div>
        `;
        navContainer.innerHTML = navHTML;
    }

    // 4. הזרקת הסרגל התחתון (פוטר)
    var footerElem = document.querySelector('footer');
    var footerHTML = `
        <p><strong>הכלים שלי</strong> - פלטפורמה חינמית לחישוב זכויות עובדים, כלים משפטיים ופיננסיים.</p>
        <p style="font-size: 12px; margin: 8px 0; color: #cbd5e1;">
            <strong>הבהרה משפטית:</strong> הנתונים, החישובים והמידע המופיעים באתר מוצגים כהערכה כללית ואינדיקציה בלבד, ואינם מהווים ייעוץ משפטי, פיננסי, מיסויי או ייעוץ השקעות.
        </p>
        <p>
            ליצירת קשר: <a href="mailto:mytooolsweb@gmail.com" style="color: #38bdf8;">mytooolsweb@gmail.com</a> | 
            <a href="privacy.html" style="color: #38bdf8;">מדיניות פרטיות ותנאי שימוש</a> | 
            <a href="about.html" style="color: #38bdf8;">אודות והצהרת נגישות</a>
        </p>
    `;
    if (footerElem) {
        footerElem.innerHTML = footerHTML;
    }

    // 5. טעינת הנתונים בלייב
    async function updateNavData() {
        try {
            var res = await fetch("https://open.er-api.com/v6/latest/USD");
            var data = await res.json();
            if (data && data.rates && data.rates.ILS) {
                var usdIls = data.rates.ILS;
                var usdElem = document.getElementById('navUsd');
                if (usdElem) usdElem.innerText = "₪" + usdIls.toFixed(2);
                if (data.rates.EUR) {
                    var eurIls = (1 / data.rates.EUR) * usdIls;
                    var eurElem = document.getElementById('navEur');
                    if (eurElem) eurElem.innerText = "₪" + eurIls.toFixed(2);
                }
            }
        } catch (e) {}

        try {
            var now = new Date();
            var hebRes = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${now.getFullYear()}&gm=${now.getMonth() + 1}&gd=${now.getDate()}&g2h=1`);
            var hebData = await hebRes.json();
            if (hebData && hebData.hebrew) {
                var hebElem = document.getElementById('navHebrewDate');
                if (hebElem) hebElem.innerText = hebData.hebrew;
            }
        } catch (e) {}

        try {
            var wRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=31.7683&longitude=35.2137&current_weather=true&daily=sunrise,sunset&timezone=auto");
            var wData = await wRes.json();
            if (wData && wData.current_weather) {
                var temp = Math.round(wData.current_weather.temperature);
                var wElem = document.getElementById('navWeather');
                if (wElem) wElem.innerText = temp + "°C";
            }
            if (wData && wData.daily) {
                if (wData.daily.sunrise) {
                    var sunElem = document.getElementById('navSun');
                    if (sunElem) sunElem.innerText = wData.daily.sunrise[0].split('T')[1];
                }
                if (wData.daily.sunset) {
                    var sunsetElem = document.getElementById('navSunset');
                    if (sunsetElem) sunsetElem.innerText = wData.daily.sunset[0].split('T')[1];
                }
            }
        } catch (e) {}
    }

    updateNavData();
})();
