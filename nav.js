document.addEventListener("DOMContentLoaded", function () {
    // 1. פאביקון (אייקון לכרטיסייה בדפדפן)
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "shortcut icon";
        favicon.type = "image/x-icon";
        document.head.appendChild(favicon);
    }
    favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️</text></svg>";

    // 2. טעינת FontAwesome עבור האייקונים
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        document.head.appendChild(fontLink);
    }

    // 3. עיצוב CSS מלא, עשיר ומקורי לסרגל ולפוטר
    const styleId = "netools-nav-style";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
            body {
                margin: 0 !important;
                padding-top: 0 !important;
            }
            header.main-header {
                background: #0f172a;
                color: #ffffff;
                box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                position: sticky;
                top: 0;
                z-index: 10000;
                width: 100%;
            }
            
            /* פס הנתונים העליון */
            .top-bar {
                background: #1e293b;
                color: #94a3b8;
                font-size: 13px;
                padding: 6px 24px;
                border-bottom: 1px solid #334155;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
            }
            .top-bar-widgets {
                display: flex;
                gap: 18px;
                align-items: center;
                flex-wrap: wrap;
            }
            .widget-item {
                display: flex;
                align-items: center;
                gap: 6px;
                color: #cbd5e1;
                font-weight: 500;
            }
            .widget-item i {
                color: #38bdf8;
            }

            /* סרגל הניווט הראשי */
            .header-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
            }
            .logo-area {
                font-size: 24px;
                font-weight: bold;
                color: #38bdf8;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .main-nav {
                display: flex;
                gap: 20px;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .main-nav a {
                color: #f1f5f9;
                text-decoration: none;
                font-weight: 600;
                font-size: 15px;
                transition: color 0.2s;
                display: flex;
                align-items: center;
                gap: 7px;
            }
            .main-nav a:hover {
                color: #38bdf8;
            }
            
            /* פוטר תחתון מעוצב */
            footer.main-footer {
                background: #0f172a;
                color: #94a3b8;
                text-align: center;
                padding: 30px 20px;
                margin-top: 50px;
                border-top: 1px solid #1e293b;
                font-size: 14px;
            }
            footer.main-footer a {
                color: #38bdf8;
                text-decoration: none;
                margin: 0 8px;
            }
        `;
        document.head.appendChild(style);
    }

    // 4. בניית והזרקת סרגל הניווט הראשי
    const oldHeader = document.querySelector("header.main-header");
    if (oldHeader) oldHeader.remove();

    const headerHtml = `
        <header class="main-header">
            <div class="top-bar">
                <div class="top-bar-widgets">
                    <span class="widget-item" id="nav-clock"><i class="fa-regular fa-clock"></i> --:--:--</span>
                    <span class="widget-item" id="nav-hebrew-date"><i class="fa-solid fa-calendar-days"></i> טוען תאריך עברי...</span>
                </div>
                <div class="top-bar-widgets">
                    <span class="widget-item" id="nav-forex"><i class="fa-solid fa-dollar-sign"></i> דולר: -- ₪ | אירו: -- ₪</span>
                </div>
            </div>
            <div class="header-container">
                <a href="index.html" class="logo-area">
                    NETOOLS <i class="fa-solid fa-screwdriver-wrench"></i>
                </a>
                <nav>
                    <ul class="main-nav">
                        <li><a href="index.html"><i class="fa-solid fa-house"></i> דף הבית</a></li>
                        <li><a href="rights.html"><i class="fa-solid fa-briefcase"></i> זכויות עובדים</a></li>
                        <li><a href="legal.html"><i class="fa-solid fa-scale-balanced"></i> כלים משפטיים</a></li>
                        <li><a href="finance.html"><i class="fa-solid fa-chart-line"></i> פיננסים ומט"ח</a></li>
                        <li><a href="utility.html"><i class="fa-solid fa-toolbox"></i> כלים שימושיים</a></li>
                        <li><a href="news.html"><i class="fa-solid fa-newspaper"></i> חדשות</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHtml);

    // 5. בניית והזרקת הפוטר התחתון
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

    // 6. הפעלת הווידג'טים בלייב (שעון, תאריך עברי, שערי מט"ח)
    function updateClock() {
        const now = new Date();
        const clockEl = document.getElementById("nav-clock");
        if (clockEl) {
            clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleTimeString('he-IL')}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    fetch("https://www.hebcal.com/etc/hdate-he.json")
        .then(res => res.json())
        .then(data => {
            const hebEl = document.getElementById("nav-hebrew-date");
            if (hebEl && data.hebrew) {
                hebEl.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${data.hebrew}`;
            }
        }).catch(() => {});

    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(res => res.json())
        .then(data => {
            const usdToIls = data.rates.ILS ? data.rates.ILS.toFixed(2) : "--";
            fetch("https://api.exchangerate-api.com/v4/latest/EUR")
                .then(res => res.json())
                .then(eurData => {
                    const eurToIls = eurData.rates.ILS ? eurData.rates.ILS.toFixed(2) : "--";
                    const forexEl = document.getElementById("nav-forex");
                    if (forexEl) {
                        forexEl.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> דולר: ${usdToIls} ₪ | אירו: ${eurToIls} ₪`;
                    }
                });
        }).catch(() => {});
});
