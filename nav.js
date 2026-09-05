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

    // 3. עיצוב CSS מורחב, ממורכז וצבעוני
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
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                position: sticky;
                top: 0;
                z-index: 10000;
                width: 100%;
            }
            
            /* סרגל ניווט עליון ראשי - מוגדל וממורכז */
            .header-container {
                max-width: 1300px;
                margin: 0 auto;
                padding: 16px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
            }
            .logo-area {
                font-size: 26px;
                font-weight: bold;
                color: #38bdf8;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .main-nav {
                display: flex;
                gap: 22px;
                list-style: none;
                margin: 0;
                padding: 0;
                align-items: center;
            }
            .main-nav a {
                color: #f1f5f9;
                text-decoration: none;
                font-weight: 600;
                font-size: 16px;
                transition: color 0.2s, transform 0.2s;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .main-nav a:hover {
                color: #38bdf8;
                transform: translateY(-2px);
            }

            /* הסרגל המשני - מוגדל, צבעוני וממורכז לאמצע */
            .secondary-bar {
                background: #1e293b;
                color: #cbd5e1;
                font-size: 14px;
                padding: 12px 24px;
                border-top: 1px solid #334155;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
            }
            .secondary-container {
                max-width: 1300px;
                margin: 0 auto;
                display: flex;
                justify-content: center; /* ריכוז כל הרכיבים לאמצע */
                align-items: center;
                flex-wrap: wrap;
                gap: 22px;
            }
            .widget-item {
                display: flex;
                align-items: center;
                gap: 7px;
                white-space: nowrap;
                font-weight: 500;
            }
            .widget-item strong {
                color: #ffffff;
            }

            /* סמלים צבעוניים */
            .icon-clock { color: #38bdf8; }       /* כחול בהיר */
            .icon-hebrew { color: #f59e0b; }      /* זהב */
            .icon-parasha { color: #a855f7; }     /* סגול */
            .icon-sun { color: #fbbf24; }         /* צהוב שמש */
            .icon-usd { color: #22c55e; }         /* ירוק דולר */
            .icon-eur { color: #06b6d4; }         /* טורקיז אירו */
            .icon-prime { color: #f97316; }       /* כתום */
            .icon-wage { color: #ec4899; }        /* ורוד */

            /* פוטר תחתון */
            footer.main-footer {
                background: #0f172a;
                color: #94a3b8;
                text-align: center;
                padding: 28px 20px;
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

    // 4. הזרקת הסרגל הראשי והסרגל המשני הממורכז
    const oldHeader = document.querySelector("header.main-header");
    if (oldHeader) oldHeader.remove();

    const headerHtml = `
        <header class="main-header">
            <!-- סרגל 1: לוגו וקטגוריות -->
            <div class="header-container">
                <a href="index.html" class="logo-area">
                    NETOOLS <i class="fa-solid fa-screwdriver-wrench icon-clock"></i>
                </a>
                <nav>
                    <ul class="main-nav">
                        <li><a href="index.html"><i class="fa-solid fa-house icon-clock"></i> דף הבית</a></li>
                        <li><a href="rights.html"><i class="fa-solid fa-briefcase icon-usd"></i> זכויות עובדים</a></li>
                        <li><a href="legal.html"><i class="fa-solid fa-scale-balanced icon-parasha"></i> כלים משפטיים</a></li>
                        <li><a href="finance.html"><i class="fa-solid fa-chart-line icon-eur"></i> פיננסים ומט"ח</a></li>
                        <li><a href="utility.html"><i class="fa-solid fa-toolbox icon-prime"></i> כלים שימושיים</a></li>
                        <li><a href="news.html"><i class="fa-solid fa-newspaper icon-hebrew"></i> חדשות</a></li>
                    </ul>
                </nav>
            </div>

            <!-- סרגל 2: ווידג'טים בלייב ממורכזים באמצע -->
            <div class="secondary-bar">
                <div class="secondary-container">
                    <span class="widget-item" id="nav-clock"><i class="fa-regular fa-clock icon-clock"></i> --:--:--</span>
                    <span class="widget-item" id="nav-hebrew"><i class="fa-solid fa-calendar-days icon-hebrew"></i> טוען תאריך עברי...</span>
                    <span class="widget-item" id="nav-parasha"><i class="fa-solid fa-book-quran icon-parasha"></i> טוען פרשה...</span>
                    <span class="widget-item" id="nav-sun"><i class="fa-solid fa-sun icon-sun"></i> זריחה: 06:22 | שקיעה: 19:05</span>
                    <span class="widget-item" id="nav-forex"><i class="fa-solid fa-dollar-sign icon-usd"></i> דולר: -- ₪ | <i class="fa-solid fa-euro-sign icon-eur"></i> אירו: -- ₪</span>
                    <span class="widget-item"><i class="fa-solid fa-percent icon-prime"></i> ריבית: <strong>4.5%</strong></span>
                    <span class="widget-item"><i class="fa-solid fa-shekel-sign icon-wage"></i> שכר מינימום: <strong>5,880 ₪</strong></span>
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

    // 6. הפעלת שעון בזמן אמת
    function updateClock() {
        const now = new Date();
        const clockEl = document.getElementById("nav-clock");
        if (clockEl) {
            clockEl.innerHTML = `<i class="fa-regular fa-clock icon-clock"></i> ${now.toLocaleTimeString('he-IL')}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 7. טעינת תאריך עברי ופרשת שבוע מ-Hebcal API
    fetch("https://www.hebcal.com/etc/hdate-he.json")
        .then(res => res.json())
        .then(data => {
            const hebEl = document.getElementById("nav-hebrew");
            if (hebEl && data.hebrew) {
                hebEl.innerHTML = `<i class="fa-solid fa-calendar-days icon-hebrew"></i> ${data.hebrew}`;
            }
        }).catch(() => {
            const hebEl = document.getElementById("nav-hebrew");
            if (hebEl) hebEl.innerHTML = `<i class="fa-solid fa-calendar-days icon-hebrew"></i> תאריך עברי זמין`;
        });

    fetch("https://www.hebcal.com/shabbat?cfg=json&geonameid=293397&m=0")
        .then(res => res.json())
        .then(data => {
            const parashaItem = data.items.find(i => i.category === "parashat");
            if (parashaItem && parashaItem.hebrew) {
                const parEl = document.getElementById("nav-parasha");
                // הסרת המילה "פרשת" מתוך המחרוזת במידה והיא כבר קיימת כדי למנוע כפילות
                let pName = parashaItem.hebrew.replace(/^פרשת\s+/, '');
                if (parEl) parEl.innerHTML = `<i class="fa-solid fa-book-quran icon-parasha"></i> פרשת <strong>${pName}</strong>`;
            }
        }).catch(() => {});

    // 8. טעינת שערי מט"ח בלייב (דולר + אירו עם סמלים נפרדים)
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
                        forexEl.innerHTML = `<i class="fa-solid fa-dollar-sign icon-usd"></i> דולר: <strong>${usd} ₪</strong> | <i class="fa-solid fa-euro-sign icon-eur"></i> אירו: <strong>${eur} ₪</strong>`;
                    }
                });
        }).catch(() => {});
});
