(function() {
    // 1. טעינה אוטומטית של CSS ופונטים
    if (!document.querySelector('link[href*="font-awesome"]')) {
        var faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    if (!document.querySelector('link[rel*="icon"]')) {
        var favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = 'logo.png';
        document.head.appendChild(favicon);
    }

    // 2. עיצוב מובנה לסרגל ולפוטר
    var navStyle = document.createElement('style');
    navStyle.innerHTML = `
        html { overflow-y: scroll !important; }
        body { margin: 0; padding: 0; }
        .nav {
            box-sizing: border-box !important;
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
            padding: 8px 0 !important;
            margin: 0 !important;
            line-height: 1.2 !important;
            min-height: 80px !important;
            width: 100% !important;
            background-color: #0f172a !important;
        }
        .nav-top-row {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 12px !important;
            width: 100% !important;
            max-width: 1350px !important;
            margin: 0 auto !important;
            padding: 0 10px !important;
            box-sizing: border-box !important;
            height: 44px !important;
        }
        .nav-top-row a {
            box-sizing: border-box !important;
            font-size: 13px !important;
            line-height: 1 !important;
            padding: 0 !important;
            margin: 0 !important;
            color: #ffffff !important;
            text-decoration: none !important;
            font-weight: 700 !important;
            display: flex !important;
            align-items: center !important;
            gap: 4px !important;
        }
        .nav-logo-link img {
            width: 42px !important;
            height: 42px !important;
            max-height: 42px !important;
            object-fit: contain !important;
        }
        .nav-widgets {
            box-sizing: border-box !important;
            font-size: 12px !important;
            line-height: 1 !important;
            margin-top: 5px !important;
            padding-top: 5px !important;
        }
        footer {
            background-color: #0f172a !important;
            color: #ffffff !important;
            text-align: center !important;
            padding: 20px 10px !important;
            margin-top: 40px !important;
            font-family: system-ui, -apple-system, sans-serif !important;
            border-top: 1px solid rgba(255,255,255,0.1) !important;
        }
        footer a { color: #38bdf8 !important; text-decoration: none !important; }
    `;
    document.head.appendChild(navStyle);

    // 3. תיקון אוטומטי - אם לא קיים <div class="nav"></div>, הסקריפט יוצר אותו בראש הדף
    var navContainer = document.querySelector('.nav');
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.className = 'nav';
        document.body.insertBefore(navContainer, document.body.firstChild);
    }

    // הזרקת תוכן הסרגל
    navContainer.innerHTML = `
        <div class="nav-top-row">
            <div style="display: flex; align-items: center; gap: 10px;">
                <a href="index.html"><i class="fa-solid fa-briefcase" style="color: #38bdf8;"></i> זכויות עובדים</a>
                <a href="legal.html"><i class="fa-solid fa-scale-balanced" style="color: #a855f7;"></i> כלים משפטיים</a>
                <a href="finance.html"><i class="fa-solid fa-chart-line" style="color: #22c55e;"></i> פיננסים ומט"ח</a>
                <a href="zmanim.html"><i class="fa-solid fa-synagogue" style="color: #facc15;"></i> זמני שבת והלכה</a>
            </div>

            <a href="index.html" class="nav-logo-link" style="display: flex; align-items: center; justify-content: center; margin: 0 6px;">
                <img src="logo.png" alt="לוגו האתר" class="nav-logo" onerror="this.src='favicon.png';">
            </a>

            <div style="display: flex; align-items: center; gap: 10px;">
                <a href="world.html"><i class="fa-solid fa-globe" style="color: #38bdf8;"></i> מפות ושעוני עולם</a>
                <a href="alerts.html"><i class="fa-solid fa-bell" style="color: #ef4444;"></i> התראות וצבע אדום</a>
                <a href="utility.html"><i class="fa-solid fa-toolbox" style="color: #f97316;"></i> כלים שימושיים</a>
                <a href="tech.html"><i class="fa-solid fa-laptop-code" style="color: #06b6d4;"></i> טכנולוגיה ומדיה</a>
                <a href="about.html"><i class="fa-solid fa-circle-info" style="color: #60a5fa;"></i> אודות ונגישות</a>
            </div>
        </div>

        <div class="nav-widgets" id="navWidgets" style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; width: 100%; border-top: 1px solid rgba(255,255,255,0.15); color: #cbd5e1;">
            <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-regular fa-clock" style="color: #60a5fa;"></i> <span id="navTime" style="color: #ffffff; font-weight: 700;">--:--:--</span></div>
            <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
            <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-regular fa-calendar" style="color: #38bdf8;"></i> <span id="navGregorianDate" style="color: #ffffff; font-weight: 700;">--/--/----</span></div>
            <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
            <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-calendar-days" style="color: #e879f9;"></i> <span id="navHebrewDate" style="color: #ffffff; font-weight: 700;">טוען תאריך עברי...</span></div>
            <div class="widget-divider" style="color: rgba(255,255,255,0.2);">|</div>
            <div class="widget-item" style="display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-torah" style="color: #facc15;"></i> <span id="navParasha" style="color: #ffffff; font-weight: 700;">טוען פרשה...</span></div>
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

    // 4. תיקון אוטומטי - אם לא קיים <footer></footer>, הסקריפט יוצר אותו בתחתית הדף
    var footerElem = document.querySelector('footer');
    if (!footerElem) {
        footerElem = document.createElement('footer');
        document.body.appendChild(footerElem);
    }

    footerElem.innerHTML = `
        <p><strong>הכלים שלי</strong> - פלטפורמה חינמית לחישוב זכויות עובדים, כלים משפטיים ופיננסיים.</p>
        <p style="font-size: 12px; margin: 8px 0; color: #cbd5e1;">
            <strong>הבהרה משפטית:</strong> הנתונים, החישובים והמידע המופיעים באתר מוצגים כהערכה כללית בלבד ואינם מהווים ייעוץ משפטי או פיננסי.
        </p>

        <p>
            ליצירת קשר: <a href="mailto:mytooolsweb@gmail.com">mytooolsweb@gmail.com</a> | 
            <a href="privacy.html">מדיניות פרטיות ותנאי שימוש</a> | 
            <a href="about.html">אודות והצהרת נגישות</a>
        </p>
    `;

    // 5. שעון וטעינת נתונים
    function updateClockAndDate() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        var timeElem = document.getElementById('navTime');
        if (timeElem) timeElem.innerText = `${hours}:${minutes}:${seconds}`;

        var day = String(now.getDate()).padStart(2, '0');
        var month = String(now.getMonth() + 1).padStart(2, '0');
        var year = now.getFullYear();
        var dateElem = document.getElementById('navGregorianDate');
        if (dateElem) dateElem.innerText = `${day}/${month}/${year}`;
    }
    setInterval(updateClockAndDate, 1000);
    updateClockAndDate();

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

            var parashaRes = await fetch(`https://www.hebcal.com/shabbat?cfg=json&m=0`);
            var parashaData = await parashaRes.json();
            if (parashaData && parashaData.items) {
                var pItem = parashaData.items.find(i => i.category === 'parashat');
                if (pItem) {
                    var pElem = document.getElementById('navParasha');
                    if (pElem) pElem.innerText = pItem.hebrew;
                }
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
