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

    // 2. עיצוב מובנה לסרגל, לפוטר ולחלונית המחשבון המקצועי
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
        .nav-logo-btn {
            background: none !important;
            border: none !important;
            padding: 0 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 6px !important;
            transition: transform 0.2s !important;
        }
        .nav-logo-btn:hover {
            transform: scale(1.08) !important;
        }
        .nav-logo-btn img {
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

        /* עיצוב חלונית המחשבון המקצועי */
        .calc-modal {
            display: none;
            position: fixed;
            z-index: 99999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(4px);
            align-items: center;
            justify-content: center;
        }
        .calc-modal-content {
            background-color: #1e293b;
            color: #ffffff;
            padding: 20px;
            border-radius: 16px;
            width: 320px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            border: 1px solid #334155;
            position: relative;
            direction: ltr;
        }
        .calc-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            direction: rtl;
        }
        .calc-header h3 {
            margin: 0;
            font-size: 16px;
            color: #38bdf8;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .calc-close-btn {
            background: none;
            border: none;
            color: #94a3b8;
            font-size: 20px;
            cursor: pointer;
        }
        .calc-close-btn:hover { color: #ffffff; }
        .calc-display {
            width: 100%;
            height: 50px;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #38bdf8;
            font-size: 24px;
            font-family: monospace;
            text-align: right;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 15px;
        }
        .calc-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }
        .calc-btn {
            background: #334155;
            color: #ffffff;
            border: none;
            padding: 12px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.15s;
        }
        .calc-btn:hover { background: #475569; }
        .calc-btn.op { background: #0284c7; color: #ffffff; }
        .calc-btn.op:hover { background: #0369a1; }
        .calc-btn.equal { background: #22c55e; color: #ffffff; grid-column: span 2; }
        .calc-btn.equal:hover { background: #16a34a; }
        .calc-btn.clear { background: #ef4444; color: #ffffff; }
        .calc-btn.clear:hover { background: #dc2626; }
    `;
    document.head.appendChild(navStyle);

    // 3. יצירת או זיהוי אלמנט הניווט
    var navContainer = document.querySelector('.nav');
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.className = 'nav';
        document.body.insertBefore(navContainer, document.body.firstChild);
    }

    // הזרקת HTML של הסרגל
    navContainer.innerHTML = `
        <div class="nav-top-row">
            <div style="display: flex; align-items: center; gap: 10px;">
                <a href="index.html"><i class="fa-solid fa-briefcase" style="color: #38bdf8;"></i> זכויות עובדים</a>
                <a href="legal.html"><i class="fa-solid fa-scale-balanced" style="color: #a855f7;"></i> כלים משפטיים</a>
                <a href="finance.html"><i class="fa-solid fa-chart-line" style="color: #22c55e;"></i> פיננסים ומט"ח</a>
                <a href="zmanim.html"><i class="fa-solid fa-synagogue" style="color: #facc15;"></i> זמני שבת והלכה</a>
            </div>

            <!-- לוגו האתר הפותח את המחשבון המקצועי בלחיצה -->
            <button class="nav-logo-btn" onclick="openCalcModal()" title="לחצי לפתיחת מחשבון מקצועי">
                <img src="logo.png" alt="לוגו - מחשבון מקצועי" onerror="this.src='favicon.png';">
            </button>

            <div style="display: flex; align-items: center; gap: 10px;">
                <a href="news.html"><i class="fa-solid fa-newspaper" style="color: #ef4444;"></i> חדשות אונליין</a>
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

    // 4. הזרקת חלונית המחשבון המקצועי ל-DOM
    var calcModal = document.createElement('div');
    calcModal.id = 'calcModal';
    calcModal.className = 'calc-modal';
    calcModal.innerHTML = `
        <div class="calc-modal-content">
            <div class="calc-header">
                <h3><i class="fa-solid fa-calculator"></i> מחשבון מקצועי</h3>
                <button class="calc-close-btn" onclick="closeCalcModal()">X</button>
            </div>
            <input type="text" id="calcDisplay" class="calc-display" readonly value="0">
            <div class="calc-grid">
                <button class="calc-btn clear" onclick="calcClear()">C</button>
                <button class="calc-btn op" onclick="calcAppend('/')">/</button>
                <button class="calc-btn op" onclick="calcAppend('*')">*</button>
                <button class="calc-btn op" onclick="calcBack()">DEL</button>
                
                <button class="calc-btn" onclick="calcAppend('7')">7</button>
                <button class="calc-btn" onclick="calcAppend('8')">8</button>
                <button class="calc-btn" onclick="calcAppend('9')">9</button>
                <button class="calc-btn op" onclick="calcAppend('-')">-</button>
                
                <button class="calc-btn" onclick="calcAppend('4')">4</button>
                <button class="calc-btn" onclick="calcAppend('5')">5</button>
                <button class="calc-btn" onclick="calcAppend('6')">6</button>
                <button class="calc-btn op" onclick="calcAppend('+')">+</button>
                
                <button class="calc-btn" onclick="calcAppend('1')">1</button>
                <button class="calc-btn" onclick="calcAppend('2')">2</button>
                <button class="calc-btn" onclick="calcAppend('3')">3</button>
                <button class="calc-btn op" onclick="calcSqrt()">SQRT</button>

                <button class="calc-btn" onclick="calcAppend('0')">0</button>
                <button class="calc-btn" onclick="calcAppend('.')">.</button>
                <button class="calc-btn equal" onclick="calcCalculate()">=</button>
            </div>
        </div>
    `;
    document.body.appendChild(calcModal);

    // 5. פונקציות המחשבון
    window.openCalcModal = function() {
        document.getElementById('calcModal').style.display = 'flex';
    };
    window.closeCalcModal = function() {
        document.getElementById('calcModal').style.display = 'none';
    };
    window.calcAppend = function(val) {
        var display = document.getElementById('calcDisplay');
        if (display.value === '0' || display.value === 'שגיאה') display.value = val;
        else display.value += val;
    };
    window.calcClear = function() {
        document.getElementById('calcDisplay').value = '0';
    };
    window.calcBack = function() {
        var display = document.getElementById('calcDisplay');
        display.value = display.value.slice(0, -1);
        if (display.value === '') display.value = '0';
    };
    window.calcSqrt = function() {
        var display = document.getElementById('calcDisplay');
        try {
            var res = Math.sqrt(eval(display.value));
            display.value = isNaN(res) ? 'שגיאה' : res;
        } catch(e) { display.value = 'שגיאה'; }
    };
    window.calcCalculate = function() {
        var display = document.getElementById('calcDisplay');
        try {
            display.value = eval(display.value);
        } catch(e) { display.value = 'שגיאה'; }
    };

    window.onclick = function(event) {
        var modal = document.getElementById('calcModal');
        if (event.target === modal) { modal.style.display = 'none'; }
    };

    // 6. הזרקת פוטר
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

    // 7. שעון וטעינת נתונים
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
