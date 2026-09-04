(function() {
    // 1. הזרקת Font Awesome אוטומטית לכל דף
    if (!document.querySelector('link[href*="font-awesome"]')) {
        var faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // 2. הזרקת CSS גלובלי ליישור מושלם ומניעת סרגל עקום בכל העמודים
    var styleElem = document.createElement('style');
    styleElem.innerHTML = `
        .nav {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            background: #1e293b !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            z-index: 99999 !important;
            padding: 10px 0 !important;
            box-sizing: border-box !important;
            direction: rtl !important;
        }
        body {
            padding-top: 130px !important;
        }
        .nav-top-row a {
            transition: color 0.2s ease !important;
        }
        .nav-top-row a:hover {
            color: #38bdf8 !important;
        }
    `;
    document.head.appendChild(styleElem);

    // 3. הזרקת הסרגל העליון הקבוע
    var navContainer = document.querySelector('.nav');
    if (navContainer) {
        var navHTML = `
            <div class="nav-top-row" style="display: flex !important; align-items: center !important; justify-content: center !important; gap: 20px !important; width: 100% !important; max-width: 1200px !important; margin: 0 auto !important; padding: 0 15px !important; box-sizing: border-box !important;">
                <div style="display: flex !important; align-items: center !important; gap: 15px !important;">
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

                <a href="index.html" style="display: flex !important; align-items: center !important; justify-content: center !important; margin: 0 10px !important;">
                    <img src="logo.png" onerror="this.onerror=null; this.src='favicon.png';" alt="לוגו" style="width: 44px; height: 44px; object-fit: contain; border-radius: 8px; background: #ffffff; padding: 2px;">
                </a>

                <div style="display: flex !important; align-items: center !important; gap: 15px !important;">
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

            <div class="nav-widgets" style="display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: center !important; gap: 10px !important; flex-wrap: wrap !important; width: 100% !important; border-top: 1px solid rgba(255,255,255,0.15) !important; padding-top: 6px !important; margin-top: 6px !important;">
                <div style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-sun" style="color: #f59e0b;"></i> זריחה: <span id="navSun" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div style="color: rgba(255,255,255,0.2);">|</div>
                <div style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-moon" style="color: #a855f7;"></i> שקיעה: <span id="navSunset" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div style="color: rgba(255,255,255,0.2);">|</div>
                <div style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-cloud-sun" style="color: #facc15;"></i> מזג אוויר: <span id="navWeather" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div style="color: rgba(255,255,255,0.2);">|</div>
                <div style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-percent" style="color: #38bdf8;"></i> פריים: <span style="color: #ffffff; font-weight: 700;">6.00%</span>
                </div>
                <div style="color: rgba(255,255,255,0.2);">|</div>
                <div style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-shekel-sign" style="color: #4ade80;"></i> שכר מינימום: <span style="color: #ffffff; font-weight: 700;">₪5,880</span>
                </div>
                <div style="color: rgba(255,255,255,0.2);">|</div>
                <div style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-dollar-sign" style="color: #22c55e; font-size: 14px;"></i> דולר: <span id="navUsd" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div style="color: rgba(255,255,255,0.2);">|</div>
                <div style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-euro-sign" style="color: #60a5fa; font-size: 14px;"></i> אירו: <span id="navEur" style="color: #ffffff; font-weight: 700;">טוען...</span>
                </div>
                <div style="color: rgba(255,255,255,0.2);">|</div>
                <div style="display: flex; align-items: center; gap: 4px; color: #cbd5e1; font-size: 12px;">
                    <i class="fa-solid fa-calendar-days" style="color: #e879f9;"></i> <span id="navHebrewDate" style="color: #ffffff; font-weight: 700;">טוען תאריך עברי...</span>
                </div>
            </div>
        `;
        navContainer.innerHTML = navHTML;
    }

    // 4. הזרקת סרגל תחתון (פוטר) אוטומטית לכל דף
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

    // 5. טעינת נתונים בזמן אמת לסרגל
    async function updateNavData() {
        // טעינת שערי מט"ח
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

        // טעינת תאריך עברי מדויק בלייב
        try {
            var now = new Date();
            var hebRes = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${now.getFullYear()}&gm=${now.getMonth() + 1}&gd=${now.getDate()}&g2h=1`);
            var hebData = await hebRes.json();
            if (hebData && hebData.hebrew) {
                var hebElem = document.getElementById('navHebrewDate');
                if (hebElem) hebElem.innerText = hebData.hebrew;
            }
        } catch (e) {}

        // טעינת מזג אוויר וזריחה/שקיעה
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
