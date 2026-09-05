document.addEventListener("DOMContentLoaded", function () {
    // 1. פאביקון לטאב בדפדפן
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "shortcut icon";
        document.head.appendChild(favicon);
    }
    favicon.href = "favicon.png";

    // 2. FontAwesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        document.head.appendChild(fontLink);
    }

    // 3. עיצוב CSS: יישור ממורכז מושלם (3 עמודות) + מסגרות עדינות
    const styleId = "netools-nav-style";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
            body { margin: 0 !important; padding-top: 0 !important; }
            header.main-header {
                background: #0f172a;
                color: #ffffff;
                box-shadow: 0 4px 12px rgba(0,0,0,0.25);
                position: sticky;
                top: 0;
                z-index: 10000;
                width: 100%;
            }
            
            /* גריד של 3 חלקים למרכוז מדויק לחלוטין */
            .header-container {
                max-width: 1300px;
                margin: 0 auto;
                padding: 12px 24px;
                display: grid;
                grid-template-columns: auto 1fr auto;
                align-items: center;
                gap: 15px;
            }
            
            .brand-name {
                font-size: 22px;
                font-weight: 800;
                color: #ffffff !important;
                text-decoration: none;
                letter-spacing: 1px;
                white-space: nowrap;
            }

            .main-nav-wrapper {
                display: flex;
                justify-content: center;
                width: 100%;
            }

            .main-nav {
                display: flex;
                gap: 8px;
                list-style: none;
                margin: 0;
                padding: 0;
                align-items: center;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .main-nav a {
                color: #ffffff !important;
                text-decoration: none;
                font-weight: 500;
                font-size: 14px;
                padding: 6px 13px;
                border-radius: 6px;
                transition: all 0.2s ease-in-out;
                display: inline-block;
                background: rgba(255, 255, 255, 0.02);
                white-space: nowrap;
            }
            
            .nav-item-home { border: 1px solid rgba(56, 189, 248, 0.6); }
            .nav-item-rights { border: 1px solid rgba(34, 197, 94, 0.6); }
            .nav-item-legal { border: 1px solid rgba(168, 85, 247, 0.6); }
            .nav-item-finance { border: 1px solid rgba(6, 182, 212, 0.6); }
            .nav-item-utility { border: 1px solid rgba(249, 115, 22, 0.6); }
            .nav-item-news { border: 1px solid rgba(245, 158, 11, 0.6); }

            .main-nav a:hover {
                transform: translateY(-2px);
                background: rgba(255, 255, 255, 0.08);
            }

            .center-logo { display: flex; align-items: center; justify-content: center; margin: 0 4px; cursor: pointer; }
            .center-logo img { height: 34px; width: 34px; object-fit: contain; border-radius: 6px; transition: transform 0.2s; }
            .center-logo img:hover { transform: scale(1.1); }

            .secondary-bar {
                background: #1e293b; color: #cbd5e1; font-size: 13.5px; padding: 9px 24px; border-top: 1px solid #334155;
            }
            .secondary-container {
                max-width: 1300px; margin: 0 auto; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 18px;
            }
            .widget-item { display: flex; align-items: center; gap: 6px; white-space: nowrap; font-weight: 500; }
            .widget-item strong { color: #ffffff; }

            .icon-clock { color: #38bdf8; } .icon-date { color: #38bdf8; } .icon-hebrew { color: #f59e0b; }
            .icon-parasha { color: #a855f7; } .icon-sun { color: #fbbf24; } .icon-usd { color: #22c55e; }
            .icon-eur { color: #06b6d4; } .icon-prime { color: #f97316; } .icon-wage { color: #ec4899; }

            /* מודל המחשבון המדעי */
            .calc-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.8);
                backdrop-filter: blur(5px); display: none; justify-content: center; align-items: center; z-index: 99999;
            }
            .calc-modal { background: #0f172a; border: 1px solid #334155; border-radius: 16px; padding: 20px; width: 350px; color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .calc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #1e293b; padding-bottom: 8px; }
            .calc-header h3 { margin: 0; font-size: 16px; color: #38bdf8; }
            .calc-close { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; }
            .calc-display { width: 100%; height: 50px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; color: #ffffff; font-size: 20px; text-align: left; padding: 0 12px; box-sizing: border-box; margin-bottom: 12px; }
            .calc-buttons { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
            .calc-btn { background: #1e293b; border: 1px solid #334155; color: #f1f5f9; padding: 10px 5px; border-radius: 6px; font-size: 13px; font-weight: bold; cursor: pointer; }
            .calc-btn:hover { background: #334155; }
            .calc-btn.op { background: #0284c7; color: #ffffff; }
            .calc-btn.sci { background: #334155; color: #38bdf8; }
            .calc-btn.eq { background: #22c55e; color: #ffffff; grid-column: span 2; }
            .calc-btn.clear { background: #ef4444; color: #ffffff; }

            footer.main-footer { background: #0f172a; color: #94a3b8; text-align: center; padding: 28px 20px; margin-top: 50px; border-top: 1px solid #1e293b; font-size: 14px; }
            footer.main-footer a { color: #38bdf8; text-decoration: none; margin: 0 8px; }
        `;
        document.head.appendChild(style);
    }

    // 4. הזרקת ה-Header
    const oldHeader = document.querySelector("header.main-header");
    if (oldHeader) oldHeader.remove();

    const headerHtml = `
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="brand-name">NETOOLS</a>
                
                <div class="main-nav-wrapper">
                    <ul class="main-nav">
                        <li><a href="index.html" class="nav-item-home">דף הבית</a></li>
                        <li><a href="rights.html" class="nav-item-rights">זכויות עובדים</a></li>
                        <li><a href="legal.html" class="nav-item-legal">כלים משפטיים</a></li>
                        
                        <li class="center-logo" onclick="openNavCalculator()" title="לחצי לפתיחת מחשבון מדעי">
                            <img src="favicon.png" alt="NETOOLS Logo" onerror="this.src='favicon.ico'">
                        </li>
                        
                        <li><a href="finance.html" class="nav-item-finance">פיננסים ומט"ח</a></li>
                        <li><a href="utility.html" class="nav-item-utility">כלים שימושיים</a></li>
                        <li><a href="news.html" class="nav-item-news">חדשות</a></li>
                    </ul>
                </div>

                <div style="width: 80px;"></div> <!-- איזון ויזואלי למרכוז -->
            </div>

            <div class="secondary-bar">
                <div class="secondary-container">
                    <span class="widget-item" id="nav-clock"><i class="fa-regular fa-clock icon-clock"></i> --:--:--</span>
                    <span class="widget-item" id="nav-greg-date"><i class="fa-regular fa-calendar icon-date"></i> --/--/----</span>
                    <span class="widget-item" id="nav-hebrew"><i class="fa-solid fa-calendar-days icon-hebrew"></i> יום שבת, כ"ג אלול תשפ"ו</span>
                    <span class="widget-item" id="nav-parasha"><i class="fa-solid fa-book-quran icon-parasha"></i> פרשת <strong>נצבים-וילך</strong></span>
                    <span class="widget-item" id="nav-sun"><i class="fa-solid fa-sun icon-sun"></i> זריחה: 06:22 | שקיעה: 19:05</span>
                    <span class="widget-item" id="nav-forex"><i class="fa-solid fa-dollar-sign icon-usd"></i> דולר: 3.01 ₪ | <i class="fa-solid fa-euro-sign icon-eur"></i> אירו: 3.50 ₪</span>
                    <span class="widget-item"><i class="fa-solid fa-percent icon-prime"></i> ריבית: <strong>4.5%</strong></span>
                    <span class="widget-item"><i class="fa-solid fa-shekel-sign icon-wage"></i> שכר מינימום: <strong>5,880 ₪</strong></span>
                </div>
            </div>
        </header>

        <!-- מודל המחשבון המדעי המקצועי -->
        <div class="calc-modal-overlay" id="navCalcModal">
            <div class="calc-modal">
                <div class="calc-header">
                    <h3><i class="fa-solid fa-flask"></i> מחשבון מדעי מקצועי</h3>
                    <button class="calc-close" onclick="closeNavCalculator()">&times;</button>
                </div>
                <input type="text" class="calc-display" id="calcDisplay" readonly value="0">
                <div class="calc-buttons">
                    <button class="calc-btn clear" onclick="calcInput('C')">C</button>
                    <button class="calc-btn sci" onclick="calcInput('sin')">sin</button>
                    <button class="calc-btn sci" onclick="calcInput('cos')">cos</button>
                    <button class="calc-btn sci" onclick="calcInput('tan')">tan</button>
                    <button class="calc-btn op" onclick="calcInput('/')">&divide;</button>

                    <button class="calc-btn sci" onclick="calcInput('sqrt')">&radic;</button>
                    <button class="calc-btn sci" onclick="calcInput('pow')">x&sup2;</button>
                    <button class="calc-btn sci" onclick="calcInput('(')">(</button>
                    <button class="calc-btn sci" onclick="calcInput(')')">)</button>
                    <button class="calc-btn op" onclick="calcInput('*')">&times;</button>

                    <button class="calc-btn" onclick="calcInput('7')">7</button>
                    <button class="calc-btn" onclick="calcInput('8')">8</button>
                    <button class="calc-btn" onclick="calcInput('9')">9</button>
                    <button class="calc-btn sci" onclick="calcInput('pi')">&pi;</button>
                    <button class="calc-btn op" onclick="calcInput('-')">-</button>

                    <button class="calc-btn" onclick="calcInput('4')">4</button>
                    <button class="calc-btn" onclick="calcInput('5')">5</button>
                    <button class="calc-btn" onclick="calcInput('6')">6</button>
                    <button class="calc-btn sci" onclick="calcInput('log')">log</button>
                    <button class="calc-btn op" onclick="calcInput('+')">+</button>

                    <button class="calc-btn" onclick="calcInput('1')">1</button>
                    <button class="calc-btn" onclick="calcInput('2')">2</button>
                    <button class="calc-btn" onclick="calcInput('3')">3</button>
                    <button class="calc-btn eq" onclick="calcInput('=')">=</button>

                    <button class="calc-btn" onclick="calcInput('0')" style="grid-column: span 2;">0</button>
                    <button class="calc-btn" onclick="calcInput('.')">.</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHtml);

    // 5. הזרקת הפוטר
    const oldFooter = document.querySelector("footer.main-footer");
    if (oldFooter) oldFooter.remove();

    const footerHtml = `
        <footer class="main-footer">
            <p>&copy; ${new Date().getFullYear()} NETOOLS - כל הזכויות שמורות</p>
            <p>
                <a href="privacy.html">מדיניות פרטיות</a> | 
                <a href="about.html">אודות והצהרת נגישות</a> | 
                יצירת קשר: <a href="mailto:netools.co.il@gmail.com">netools.co.il@gmail.com</a>
            </p>
        </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHtml);

    // 6. שעון ותאריך לועזי
    function updateClockAndDate() {
        const now = new Date();
        const clockEl = document.getElementById("nav-clock");
        const dateEl = document.getElementById("nav-greg-date");
        if (clockEl) clockEl.innerHTML = `<i class="fa-regular fa-clock icon-clock"></i> ${now.toLocaleTimeString('he-IL')}`;
        if (dateEl) dateEl.innerHTML = `<i class="fa-regular fa-calendar icon-date"></i> ${now.toLocaleDateString('he-IL')}`;
    }
    setInterval(updateClockAndDate, 1000);
    updateClockAndDate();

    // 7. תאריך עברי אונליין בלייב
    fetch("https://www.hebcal.com/etc/hdate-he.json")
        .then(res => res.json())
        .then(data => {
            const hebEl = document.getElementById("nav-hebrew");
            const days = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"];
            const todayName = days[new Date().getDay()];
            if (hebEl && data.hebrew) {
                hebEl.innerHTML = `<i class="fa-solid fa-calendar-days icon-hebrew"></i> ${todayName}, ${data.hebrew}`;
            }
        }).catch(() => {});

    // 8. פרשת שבוע
    fetch("https://www.hebcal.com/shabbat?cfg=json&geonameid=293397&m=0")
        .then(res => res.json())
        .then(data => {
            const parashaItem = data.items.find(i => i.category === "parashat");
            if (parashaItem && parashaItem.hebrew) {
                const parEl = document.getElementById("nav-parasha");
                let pName = parashaItem.hebrew.replace(/^פרשת\s+/, '');
                if (parEl) parEl.innerHTML = `<i class="fa-solid fa-book-quran icon-parasha"></i> פרשת <strong>${pName}</strong>`;
            }
        }).catch(() => {});

    // 9. מט"ח
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(res => res.json())
        .then(data => {
            const usd = data.rates.ILS ? data.rates.ILS.toFixed(2) : "--";
            fetch("https://api.exchangerate-api.com/v4/latest/EUR")
                .then(res => res.json())
                .then(eurData => {
                    const eur = eurData.rates.ILS ? eurData.rates.ILS.toFixed(2) : "--";
                    const forexEl = document.getElementById("nav-forex");
                    if (forexEl) forexEl.innerHTML = `<i class="fa-solid fa-dollar-sign icon-usd"></i> דולר: <strong>${usd} ₪</strong> | <i class="fa-solid fa-euro-sign icon-eur"></i> אירו: <strong>${eur} ₪</strong>`;
                });
        }).catch(() => {});
});

function openNavCalculator() { document.getElementById("navCalcModal").style.display = "flex"; }
function closeNavCalculator() { document.getElementById("navCalcModal").style.display = "none"; }

let calcExpr = "";
function calcInput(val) {
    const disp = document.getElementById("calcDisplay");
    if (val === 'C') { calcExpr = ""; disp.value = "0"; }
    else if (val === '=') {
        try {
            let parsed = calcExpr.replace(/sin/g, 'Math.sin')
                                 .replace(/cos/g, 'Math.cos')
                                 .replace(/tan/g, 'Math.tan')
                                 .replace(/sqrt/g, 'Math.sqrt')
                                 .replace(/log/g, 'Math.log10')
                                 .replace(/pi/g, 'Math.PI')
                                 .replace(/pow/g, '**2');
            disp.value = eval(parsed);
            calcExpr = disp.value;
        } catch { disp.value = "שגיאה"; calcExpr = ""; }
    } else { calcExpr += val; disp.value = calcExpr; }
}
