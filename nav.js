(function() {
    // 1. הזרקת ספריית Font Awesome אוטומטית לכל דף
    if (!document.querySelector('link[href*="font-awesome"]')) {
        var faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // 2. הזרקת סרגל ניווט עליון קבוע עם לוגו במרכז
    var navContainer = document.querySelector('.nav');
    if (navContainer) {
        var navHTML = `
            <div class="nav-top-row" style="display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1100px; margin: 0 auto; padding: 0 10px;">
                <div class="nav-links-right" style="display: flex; align-items: center; gap: 14px;">
                    <a href="index.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-briefcase" style="color: #38bdf8;"></i> זכויות עובדים
                    </a>
                    <a href="legal.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-scale-balanced" style="color: #a855f7;"></i> כלים משפטיים
                    </a>
                    <a href="finance.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-chart-line" style="color: #22c55e;"></i> פיננסים ומט"ח
                    </a>
                </div>

                <a href="index.html" class="nav-logo-link" style="display: flex; align-items: center; justify-content: center; margin: 0 15px; text-decoration: none;">
                    <img src="logo.png" onerror="this.onerror=null; this.src='favicon.png';" alt="לוגו האתר" class="nav-logo" style="width: 48px; height: 48px; object-fit: contain; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); background: #ffffff; padding: 2px;">
                </a>

                <div class="nav-links-left" style="display: flex; align-items: center; gap: 14px;">
                    <a href="utility.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-toolbox" style="color: #f97316;"></i> כלים שימושיים
                    </a>
                    <a href="tech.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-laptop-code" style="color: #06b6d4;"></i> טכנולוגיה ומדיה
                    </a>
                    <a href="about.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-circle-info" style="color: #60a5fa;"></i> אודות ונגישות
                    </a>
                </div>
            </div>

            <div class="nav-widgets" id="navWidgets" style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; width: 100%; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 6px; margin-top: 6px;">
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-sun" style="color: #f59e0b;"></i> זריחה: <span id="navSun" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-moon" style="color: #a855f7;"></i> שקיעה: <span id="navSunset" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-cloud-sun" style="color: #facc15;"></i> מזג אוויר: <span id="navWeather" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-percent" style="color: #38bdf8;"></i> פריים: <span style="color: #ffffff; font-weight: 700;">6.00%</span>
                </div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-shekel-sign" style="color: #4ade80;"></i> שכר מינימום: <span style="color: #ffffff; font-weight: 700;">₪5,880</span>
                </div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-dollar-sign" style="color: #22c55e; font-size: 14px;"></i> דולר: <span id="navUsd" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-euro-sign" style="color: #60a5fa; font-size: 14px;"></i> אירו: <span id="navEur" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-calendar-days" style="color: #e879f9;"></i> <span id="navHebrewDate" style="color: #ffffff; font-weight: 700;">טוען תאריך עברי...</span>
                </div>
            </div>
        `;
        navContainer.innerHTML = navHTML;
    }

    // 3. הזרקת סרגל תחתון (פוטר) אוטומטית לכל דף
    var footerElem = document.querySelector('footer');
    var footerHTML = `
        <p><strong>הכלים שלי</strong> - פלטפורמה חינמית לחישוב זכויות עובדים, כלים משפטיים ופיננסיים.</p>
        <p style="font-size: 12px; margin: 8px 0; color: #cbd5e1;">
            <strong>הבהרה משפטית:</strong> הנתונים, החישובים והמידע המופיעים באתר מוצגים כהערכה כללית ואינדיקציה בלבד, ואינם מהווים ייעוץ משפטי, פיננסי, מיסויי או ייעוץ השקעות.
        </p>
        <p>
            ליצירת קשר: <a href="mailto:mytooolsweb@gmail.com" style="color: #38bdf8; text-decoration: none;">mytooolsweb@gmail.com</a> | 
            <a href="privacy.html" style="color: #38bdf8; text-decoration: none;">מדיניות פרטיות ותנאי שימוש</a> | 
            <a href="about.html" style="color: #38bdf8; text-decoration: none;">אודות והצהרת נגישות</a>
        </p>
    `;
    
    if (footerElem) {
        footerElem.innerHTML = footerHTML;
    } else {
        var newFooter = document.createElement('footer');
        newFooter.innerHTML = footerHTML;
        document.body.appendChild(newFooter);
    }

    // 4. טעינת נתונים בזמן אמת לסרגל
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
            var hebRes = await fetch("https://www.hebcal.com/etc/hdate-he.json");
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
                    var sunriseTime = wData.daily.sunrise[0].split('T')[1];
                    var sunElem = document.getElementById('navSun');
                    if (sunElem) sunElem.innerText = sunriseTime;
                }
                if (wData.daily.sunset) {
                    var sunsetTime = wData.daily.sunset[0].split('T')[1];
                    var sunsetElem = document.getElementById('navSunset');
                    if (sunsetElem) sunsetElem.innerText = sunsetTime;
                }
            }
        } catch (e) {
            var wElem = document.getElementById('navWeather');
            if (wElem) wElem.innerText = "22°C";
            var sunElem = document.getElementById('navSun');
            if (sunElem) sunElem.innerText = "06:15";
            var sunsetElem = document.getElementById('navSunset');
            if (sunsetElem) sunsetElem.innerText = "19:05";
        }
    }

    updateNavData();
})();
