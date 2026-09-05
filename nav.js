document.addEventListener("DOMContentLoaded", function () {
    // 1. הגדרת פאביקון לטאב בדפדפן
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "shortcut icon";
        document.head.appendChild(favicon);
    }
    favicon.href = "favicon.png";

    // 2. טעינת FontAwesome עבור האייקונים בסרגל המשני
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        document.head.appendChild(fontLink);
    }

    // 3. עיצוב CSS יוקרתי: טקסט לבן + מסגרת דקה וצבעונית לכל קטגוריה
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
                box-shadow: 0 4px 12px rgba(0,0,0,0.25);
                position: sticky;
                top: 0;
                z-index: 10000;
                width: 100%;
            }
            
            /* סרגל ניווט עליון ראשי - פריסה מותאמת */
            .header-container {
                max-width: 1300px;
                margin: 0 auto;
                padding: 12px 24px;
                display: flex;
                justify-content: space-between; /* הצמדת השם לימין והקטגוריות משמאל */
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            /* השם NETOOLS מוצמד לימין */
            .brand-name {
                font-size: 24px;
                font-weight: 800;
                color: #38bdf8;
                text-decoration: none;
                letter-spacing: 1px;
            }

            .main-nav {
                display: flex;
                gap: 10px;
                list-style: none;
                margin: 0;
                padding: 0;
                align-items: center;
                flex-wrap: wrap;
            }
            
            /* טקסט לבן עם מסגרת דקה, עדינה ויוקרתית */
            .main-nav a {
                color: #ffffff !important; /* טקסט לבן בלבד */
                text-decoration: none;
                font-weight: 500;
                font-size: 14px;
                padding: 6px 14px;
                border-radius: 6px;
                transition: all 0.2s ease-in-out;
                display: inline-block;
                background: rgba(255, 255, 255, 0.02);
            }
            
            /* מסגרות צבעוניות דקות ועדינות בלבד */
            .nav-item-home { border: 1px solid rgba(56, 189, 248, 0.6); }
            .nav-item-rights { border: 1px solid rgba(34, 197, 94, 0.6); }
            .nav-item-legal { border: 1px solid rgba(168, 85, 247, 0.6); }
            .nav-item-finance { border: 1px solid rgba(6, 182, 212, 0.6); }
            .nav-item-utility { border: 1px solid rgba(249, 115, 22, 0.6); }
            .nav-item-news { border: 1px solid rgba(245, 158, 11, 0.6); }

            .main-nav a:hover {
                transform: translateY(-2px);
                background: rgba(255, 255, 255, 0.08);
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }

            /* הלוגו במרכז הסרגל */
            .center-logo {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 4px;
            }
            .center-logo img {
                height: 34px;
                width: 34px;
                object-fit: contain;
                border-radius: 6px;
            }

            /* הסרגל המשני - ממורכז */
            .secondary-bar {
                background: #1e293b;
                color: #cbd5e1;
                font-size: 13.5px;
                padding: 9px 24px;
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

            /* צבעי סמלים לסרגל המשני */
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

    // 4. הזרקת ה-Header: שם מוצמד לימין + לוגו במרכז בין "כלים משפטיים" ל"פיננסים ומט"ח"
    const oldHeader = document.querySelector("header.main-header");
    if (oldHeader) oldHeader.remove();

    const headerHtml = `
        <header class="main-header">
            <div class="header-container">
                <!-- השם NETOOLS מוצמד מימין -->
                <a href="index.html" class="brand-name">NETOOLS</a>
                
                <nav>
                    <ul class="main-nav">
                        <li><a href="index.html" class="nav-item-home">דף הבית</a></li>
                        <li><a href="workers.html" class="nav-item-rights">זכויות עובדים</a></li>
                        <li><a href="legal.html" class="nav-item-legal">כלים משפטיים</a></li>
                        
                        <!-- הלוגו במרכז בדיוק בין כלים משפטיים לפיננסים ומט"ח -->
                        <li class="center-logo">
                            <a href="index.html">
                                <img src="favicon.png" alt="NETOOLS Logo" onerror="this.src='favicon.ico'">
                            </a>
                        </li>
                        
                        <li><a href="finance.html" class="nav-item-finance">פיננסים ומט"ח</a></li>
                        <li><a href="utility.html" class="nav-item-utility">כלים שימושיים</a></li>
                        <li><a href="news.html" class="nav-item-news">חדשות</a></li>
                    </ul>
                </nav>
            </div>

            <!-- סרגל משני: שעה, תאריכים ונתונים ממורכזים -->
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
