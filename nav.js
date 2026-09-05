document.addEventListener("DOMContentLoaded", function () {
    // 1. הוספת פאביקון לטאב בדפדפן
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

    // 3. עיצוב CSS מלא ומותאם לסרגל הראשי ולסרגל המשני
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
            
            /* סרגל ניווט עליון ראשי */
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
                gap: 18px;
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
                gap: 6px;
            }
            .main-nav a:hover {
                color: #38bdf8;
            }

            /* הסרגל המשני (מתחת לקטגוריות) */
            .secondary-bar {
                background: #1e293b;
                color: #cbd5e1;
                font-size: 13px;
                padding: 8px 24px;
                border-top: 1px solid #334155;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
            }
            .secondary-container {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 12px;
            }
            .widget-group {
                display: flex;
                align-items: center;
                gap: 16px;
                flex-wrap: wrap;
            }
            .widget-item {
                display: flex;
                align-items: center;
                gap: 5px;
                white-space: nowrap;
            }
            .widget-item i {
                color: #38bdf8;
            }
            .widget-item strong {
                color: #ffffff;
            }

            /* פוטר תחתון */
            footer.main-footer {
                background: #0f172a;
                color: #94a3b8;
                text-align: center;
                padding: 25px 20px;
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

    // 4. הזרקת הסרגל הראשי והסרגל המשני מתחתיו
    const oldHeader = document.querySelector("header.main-header");
    if (oldHeader) oldHeader.remove();

    const headerHtml = `
        <header class="main-header">
            <!-- סרגל 1: לוגו וקטיגוריות -->
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

            <!-- סרגל 2: נתונים בלייב מתחת לקטגוריות -->
            <div class="secondary-bar">
                <div class="secondary-container">
                    <div class="widget-group">
                        <span class="widget-item" id="nav-clock"><i class="fa-regular fa-clock"></i> --:--:--</span>
                        <span class="widget-item" id="nav-hebrew"><i class="fa-solid fa-calendar-days"></i> טוען תאריך עברי...</span>
                        <span class="widget-item" id="nav-parasha"><i class="fa-solid fa-book-quran"></i> טוען פרשה...</span>
                        <span class="widget-item" id="nav-sun"><i class="fa-solid fa-sun"></i> זריחה: 06:22 | שקיעה: 19:05</span>
                    </div>
                    <div class="widget-group">
                        <span class="widget-item" id="nav-forex"><i class="fa-solid fa-dollar-sign"></i> דולר: -- ₪ | אירו: -- ₪</span>
                        <span class="widget-item"><i class="fa-solid fa-percent"></i> ריבית: <strong>4.5%</strong></span>
                        <span class="widget-item"><i class="fa-solid fa-shekel-sign"></i> שכר מינימום: <strong>5,880 ₪</strong></span>
                    </div>
                </div>
            </div>
        </header>
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

    // 6. הפעלת שעון בלייב
    function updateClock() {
        const now = new Date();
        const clockEl = document.getElementById("nav-clock");
        if (clockEl) {
            clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleTimeString('he-IL')}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 7. טעינת תאריך עברי ופרשת שבוע מ-Hebcal
    fetch("https://www.hebcal.com/etc/hdate-he.json")
        .then(res => res.json())
        .then(data => {
            if (data.hebrew) {
                const hebEl = document.getElementById("nav-hebrew");
                if (hebEl) hebEl.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${data.hebrew}`;
            }
        }).catch(() => {});

    fetch("https://www.hebcal.com/shabbat?cfg=json&geonameid=293397&m=0")
        .then(res => res.json())
        .then(data => {
            const parashaItem = data.items.find(i => i.category === "parashat");
            if (parashaItem && parashaItem.hebrew) {
                const parEl = document.getElementById("nav-parasha");
                if (parEl) parEl.innerHTML = `<i class="fa-solid fa-book-quran"></i> פרשת <strong>${parashaItem.hebrew}</strong>`;
            }
        }).catch(() => {});

    // 8. טעינת שערי מט"ח בלייב
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(res => res.json())
        .then(data => {
            const usd = data.rates.ILS ? data.rates.ILS.toFixed(2) : "--";
            fetch("https://api.exchangerate-api.com/v4/latest/EUR")
                .then(res => res.json())
                .then(eurData => {
                    const eur = eurData.rates.ILS ? eurData.rates.ILS.toFixed(2) : "--";
                    const forexEl = document.getElementById("nav-forex");
                    if (forexEl) {
                        forexEl.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> דולר: <strong>${usd} ₪</strong> | אירו: <strong>${eur} ₪</strong>`;
                    }
                });
        }).catch(() => {});
});
