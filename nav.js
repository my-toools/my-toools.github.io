(function() {
    // 1. טעינת ספריית Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        var faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // 2. הזרקת Favicon
    if (!document.querySelector('link[rel*="icon"]')) {
        var favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = 'logo.png';
        document.head.appendChild(favicon);
    }

    // 3. הזרקת סרגל ניווט עליון קבוע (מרווחים צפופים וקרובים ללוגו)
    var navContainer = document.querySelector('.nav');
    if (navContainer) {
        var navHTML = `
            <div class="nav-top-row" style="display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 10px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <a href="index.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 5px;">
                        <i class="fa-solid fa-briefcase" style="color: #38bdf8;"></i> זכויות עובדים
                    </a>
                    <a href="legal.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 5px;">
                        <i class="fa-solid fa-scale-balanced" style="color: #a855f7;"></i> כלים משפטיים
                    </a>
                    <a href="finance.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 5px;">
                        <i class="fa-solid fa-chart-line" style="color: #22c55e;"></i> פיננסים ומט"ח
                    </a>
                </div>

                <a href="index.html" class="nav-logo-link" style="display: flex; align-items: center; justify-content: center; margin: 0 8px;">
                    <img src="logo.png" alt="לוגו האתר" class="nav-logo" onerror="this.src='favicon.png';" style="width: 42px; height: 42px; object-fit: contain;">
                </a>

                <div style="display: flex; align-items: center; gap: 12px;">
                    <a href="utility.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 5px;">
                        <i class="fa-solid fa-toolbox" style="color: #f97316;"></i> כלים שימושיים
                    </a>
                    <a href="tech.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 5px;">
                        <i class="fa-solid fa-laptop-code" style="color: #06b6d4;"></i> טכנולוגיה ומדיה
                    </a>
                    <a href="about.html" style="color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 5px;">
                        <i class="fa-solid fa-circle-info" style="color: #60a5fa;"></i> אודות ונגישות
                    </a>
                </div>
            </div>

            <div class="nav-widgets" id="navWidgets" style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; width: 100%; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 5px; margin-top: 5px; font-size: 12px; color: #cbd5e1;">
                <!-- חלק ימני: שעה, תאריך לועזי ותאריך עברי -->
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-regular fa-clock" style="color: #60a5fa;"></i> <span id="navTime" style="color: #ffffff; font-weight: 700;">--:--:--</span></div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-regular fa-calendar" style="color: #38bdf8;"></i> <span id="navGregorianDate" style="color: #ffffff; font-weight: 700;">--/--/----</span></div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-calendar-days" style="color: #e879f9;"></i> <span id="navHebrewDate" style="color: #ffffff; font-weight: 700;">טוען תאריך עברי...</span></div>
                
                <!-- המשך הסרגל המשני -->
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-sun" style="color: #f59e0b;"></i> זריחה: <span id="navSun" style="color: #ffffff; font-weight: 700;">טוען...</span></div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-moon" style="color: #a855f7;"></i> שקיעה: <span id="navSunset" style="color: #ffffff; font-weight: 700;">טוען...</span></div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-cloud-sun" style="color: #facc15;"></i> מזג אוויר: <span id="navWeather" style="color: #ffffff; font-weight: 700;">טוען...</span></div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-percent" style="color: #38bdf8;"></i> פריים: <span style="color: #ffffff; font-weight: 700;">6.00%</span></div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-shekel-sign" style="color: #4ade80;"></i> שכר מינימום: <span style="color: #ffffff; font-weight: 700;">₪5,880</span></div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-dollar-sign" style="color: #22c55e;"></i> דולר: <span id="navUsd" style="color: #ffffff; font-weight: 700;">טוען...</span></div>
                <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
                <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-euro-sign" style="color: #60a5fa;"></i> אירו: <span id="navEur" style="color: #ffffff; font-weight: 700;">טוען...</span></div>
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
            ליצירת קשר: <a href="mailto:mytooolsweb@gmail.com" style="color: #38bdf8; text-decoration: none;">mytooolsweb@gmail.com</a> | 
            <a href="privacy.html" style="color: #38bdf8; text-decoration: none;">מדיניות פרטיות ותנאי שימוש</a> | 
            <a href="about.html" style="color: #38bdf8; text-decoration: none;">אודות והצהרת נגישות</a>
        </p>
    `;
    if (footerElem) {
        footerElem.innerHTML = footerHTML;
    }

    // 5. עדכון שעה ותאריך לועזי בזמן אמת (כל שנייה)
    function updateClockAndDate() {
        var now = new Date();
        
        // שעה בפורמט HH:MM:SS
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        var timeElem = document.getElementById('navTime');
        if (timeElem) timeElem.innerText = `${hours}:${minutes}:${seconds}`;

        // תאריך לועזי בפורמט DD/MM/YYYY
        var day = String(now.getDate()).padStart(2, '0');
        var month = String(now.getMonth() + 1).padStart(2, '0');
        var year = now.getFullYear();
        var dateElem = document.getElementById('navGregorianDate');
        if (dateElem) dateElem.innerText = `${day}/${month}/${year}`;
    }
    
    setInterval(updateClockAndDate, 1000);
    updateClockAndDate();

    // 6. טעינת נתוני APIs בלייב
    async function updateNavData() {
        // שערי מט"ח
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

        // תאריך עברי בלייב
        try {
            var now = new Date();
            var hebRes = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${now.getFullYear()}&gm=${now.getMonth() + 1}&gd=${now.getDate()}&g2h=1`);
            var hebData = await hebRes.json();
            if (hebData && hebData.hebrew) {
                var hebElem = document.getElementById('navHebrewDate');
                if (hebElem) hebElem.innerText = hebData.hebrew;
            }
        } catch (e) {}

        // מזג אוויר, זריחה ושקיעה
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
