document.addEventListener("DOMContentLoaded", function () {
    // קוד התמונה המושתל (Base64) של הלוגו/פאביקון המדויק שלך
    const logoDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSU24AAA"; // נתיב פנימי מוטמע

    // 1. הפעלת הפאביקון המדויק לטאב בדפדפן (כולל גיבוי לקובץ favicon.png)
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "shortcut icon";
        document.head.appendChild(favicon);
    }
    favicon.href = "favicon.png";

    // 2. טעינת FontAwesome עבור האייקונים
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        document.head.appendChild(fontLink);
    }

    // 3. עיצוב CSS מלא: מסגרות דקות וצבעוניות מסביב לטקסט הקטגוריות
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
            
            /* סרגל ניווט עליון ראשי - ממורכז לאמצע */
            .header-container {
                max-width: 1300px;
                margin: 0 auto;
                padding: 14px 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 25px;
            }
            .logo-area {
                font-size: 24px;
                font-weight: bold;
                color: #38bdf8;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .logo-area img {
                height: 38px;
                width: 38px;
                object-fit: contain;
                border-radius: 6px;
            }
            .main-nav {
                display: flex;
                gap: 12px;
                list-style: none;
                margin: 0;
                padding: 0;
                align-items: center;
                flex-wrap: wrap;
            }
            
            /* עיצוב המסגרת הדקה והצבעונית מסביב לטקסט הקטגוריה */
            .main-nav a {
                color: #f1f5f9;
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                padding: 6px 14px;
                border-radius: 6px;
                transition: all 0.2s ease-in-out;
                display: inline-block;
                background: rgba(255, 255, 255, 0.02);
            }
            
            /* מסגרת דקה וצבע שונה לכל קטגוריה */
            .nav-item-home { border: 1px solid #38bdf8; color: #38bdf8 !important; }
            .nav-item-rights { border: 1px solid #22c55e; color: #22c55e !important; }
            .nav-item-legal { border: 1px solid #a855f7; color: #a855f7 !important; }
            .nav-item-finance { border: 1px solid #06b6d4; color: #06b6d4 !important; }
            .nav-item-utility { border: 1px solid #f97316; color: #f97316 !important; }
            .nav-item-news { border: 1px solid #f59e0b; color: #f59e0b !important; }

            .main-nav a:hover {
                transform: translateY(-2px);
                box-shadow: 0 3px 8px rgba(0,0,0,0.3);
                filter: brightness(1.15);
            }

            /* הסרגל המשני - ממורכז */
            .secondary-bar {
                background: #1e293b;
                color: #cbd5e1;
                font-size: 13.5px;
                padding: 10px 24px;
                border-top: 1px solid #334155;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
            }
            .secondary-container {
                max-width: 1300px;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
            }
            .widget-item {
                display: flex;
                align-items: center;
                gap: 6px;
                white-space: nowrap;
                font-weight: 500;
            }
            .widget-item strong {
                color: #ffffff;
            }

            /* צבעי סמלים לסרגל הנתונים */
            .icon-clock { color: #38bdf8; }
            .icon-date { color: #38bdf8; }
            .icon-hebrew { color: #f59e0b; }
            .icon-parasha { color: #a855f7; }
            .icon-sun { color: #fbbf24; }
            .icon-usd { color: #22c55e; }
            .icon-eur { color: #06b6d4; }
            .icon-prime { color: #f97316; }
            .icon-wage { color: #ec4899; }

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

    // 4. הזרקת ה-Header עם תמונת favicon.png המדויקת
    const oldHeader = document.querySelector("header.main-header");
    if (oldHeader) oldHeader.remove();

    const headerHtml = `
        <header class="main-header">
            <!-- סרגל 1: לוגו תמונה וקטגוריות עם מסגרת צבעונית -->
            <div class="header-container">
                <a href="index.html" class="logo-area">
                    <img src="favicon.png" alt="NETOOLS Logo" onerror="this.src='favicon.ico'">
                    NETOOLS
                </a>
                <nav>
                    <ul class="main-nav">
                        <li><a href="index.html" class="nav-item-home">דף הבית</a></li>
                        <li><a href="rights.html" class="nav-item-rights">זכויות עובדים</a></li>
                        <li><a href="legal.html" class="nav-item-legal">כלים משפטיים</a></li>
                        <li><a href="finance.html" class="nav-item-finance">פיננסים ומט"ח</a></li>
                        <li><a href="utility.html" class="nav-item-utility">כלים שימושיים</a></li>
                        <li><a href="news.html" class="nav-item-news">חדשות</a></li>
                    </ul>
                </nav>
            </div>

            <!-- סרגל 2: שעה, תאריך לועזי, תאריך עברי ונתונים בלייב -->
            <div class="secondary-bar">
                <div class="secondary-container">
                    <span class="widget-item" id="nav-clock"><i class="fa-regular fa-clock icon-clock"></i> --:--:--</span>
                    <span class="widget-item" id="nav-greg-date"><i class="fa-regular fa-calendar icon-date"></i> --/--/----</span>
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

    // 6. הפעלת שעון ותאריך לועזי
    function updateClockAndDate() {
        const now = new Date();
        const clockEl = document.getElementById("nav-clock");
        const dateEl = document.getElementById("nav-greg-date");
        
        if (clockEl) {
            clockEl.innerHTML = `<i class="fa-regular fa-clock icon-clock"></i> ${now.toLocaleTimeString('he-IL')}`;
        }
        if (dateEl) {
            dateEl.innerHTML = `<i class="fa-regular fa-calendar icon-date"></i> ${now.toLocaleDateString('he-IL')}`;
        }
    }
    setInterval(updateClockAndDate, 1000);
    updateClockAndDate();

    // 7. טעינת תאריך עברי
    fetch("https://www.hebcal.com/etc/hdate-he.json")
        .then(res => res.json())
        .then(data => {
            const hebEl = document.getElementById("nav-hebrew");
            if (hebEl && data.hebrew) {
                hebEl.innerHTML = `<i class="fa-solid fa-calendar-days icon-hebrew"></i> ${data.hebrew}`;
            }
        })
        .catch(() => {
            const hebEl = document.getElementById("nav-hebrew");
            if (hebEl) hebEl.innerHTML = `<i class="fa-solid fa-calendar-days icon-hebrew"></i> תאריך עברי זמין`;
        });

    // 8. טעינת פרשת שבוע
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

    // 9. טעינת שערי מט"ח בלייב
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
