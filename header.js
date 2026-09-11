// טעינת ספריית האייקונים באופן אוטומטי
if (!document.getElementById("fa-cdn")) {
    var faLink = document.createElement("link");
    faLink.id = "fa-cdn";
    faLink.rel = "stylesheet";
    faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    document.head.appendChild(faLink);
}

// 1. פאביקון לטאב בדפדפן
let favicon = document.querySelector("link[rel*='icon']");
if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "shortcut icon";
    document.head.appendChild(favicon);
}
favicon.href = "favicon.png";

// 2. עיצוב CSS מקצועי, אחיד ורספונסיבי
const styleId = "netools-nav-style";
if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
        html, body {
            height: 100%;
            margin: 0 !important;
            padding-top: 0 !important;
            background-color: var(--bg-main, #f8fafc);
        }

        body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        body > *:not(header):not(footer):not(.calc-modal-overlay):not(#acc-floating-btn) {
            width: 100%;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            box-sizing: border-box;
            flex: 1;
        }

        header.main-header {
            background: #0f172a;
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            position: sticky;
            top: 0;
            z-index: 10000;
            width: 100%;
            padding: 6px 0;
        }
        
        .header-container {
            max-width: 1480px;
            margin: 0 auto;
            padding: 18px 24px;
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            gap: 15px;
        }
        
        .brand-name {
            font-size: 26px !important;
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
            font-size: 15px !important;
            padding: 9px 16px !important;
            border-radius: 6px;
            transition: all 0.2s ease-in-out;
            display: inline-block;
            background: rgba(255, 255, 255, 0.02);
            white-space: nowrap;
        }
        
        .nav-item-home { border: 1px solid rgba(56, 189, 248, 0.6); }
        .nav-item-rights { border: 1px solid rgba(34, 197, 94, 0.6); }
        .nav-item-legal { border: 1px solid rgba(168, 85, 247, 0.6); }
        .nav-item-zmanim { border: 1px solid rgba(236, 72, 153, 0.6); }
        .nav-item-finance { border: 1px solid rgba(6, 182, 212, 0.6); }
        .nav-item-utility { border: 1px solid rgba(249, 115, 22, 0.6); }
        .nav-item-news { border: 1px solid rgba(245, 158, 11, 0.6); }
        .nav-item-world { border: 1px solid rgba(14, 165, 233, 0.6); }

        .main-nav a:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.08);
        }

        .header-alert-btn {
            color: #ef4444 !important;
            font-size: 22px;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 12px;
            border-radius: 8px;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.4);
            transition: all 0.2s ease;
        }

        /* עיצוב כפתור המבורגר מרובע ומעוצב במובייל */
        .mobile-toggle-btn {
            display: none;
            background: rgba(56, 189, 248, 0.1) !important;
            color: #38bdf8 !important;
            border: 1px solid rgba(56, 189, 248, 0.5) !important;
            font-size: 20px !important;
            width: 44px !important;
            height: 42px !important;
            border-radius: 10px !important;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease-in-out !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
        }

        .mobile-toggle-btn:hover, .mobile-toggle-btn:active {
            background: rgba(56, 189, 248, 0.25) !important;
            border-color: #38bdf8 !important;
            transform: scale(1.05);
        }

        .secondary-bar {
            background: #1e293b; color: #cbd5e1; font-size: 14.5px !important; padding: 12px 18px !important; border-top: 1px solid #334155; width: 100%; box-sizing: border-box;
            display: flex; align-items: center; justify-content: center;
        }
        .secondary-container {
            max-width: 1650px; margin: 0 auto; display: flex; justify-content: center; align-items: center; flex-wrap: nowrap; gap: 20px !important; overflow-x: auto; white-space: nowrap;
        }
        .secondary-container::-webkit-scrollbar { display: none; }
        .widget-item { display: inline-flex; align-items: center; gap: 6px; font-weight: 500; }
        .widget-item strong { color: #ffffff; }

        .icon-clock { color: #38bdf8; } .icon-date { color: #38bdf8; } .icon-hebrew { color: #f59e0b; }
        .icon-parasha { color: #a855f7; } .icon-sun { color: #fbbf24; } .icon-usd { color: #22c55e; }
        .icon-eur { color: #06b6d4; } .icon-btc { color: #f59e0b; } .icon-prime { color: #f97316; } .icon-cpi { color: #a855f7; } .icon-wage { color: #ec4899; }
        .icon-weather { color: #38bdf8; }

        .calc-modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(8px); display: none; justify-content: center; align-items: center; z-index: 99999;
        }
        .calc-modal {
            background: #0f172a; border: 1px solid #334155; border-radius: 20px; padding: 22px; width: 380px;
            color: #ffffff; box-shadow: 0 20px 40px rgba(0,0,0,0.6); direction: ltr;
        }

        footer.main-footer {
            background: #0f172a !important; color: #ffffff !important; text-align: center; padding: 28px 20px;
            margin-top: auto !important; border-top: 1px solid #1e293b; font-size: 14px; width: 100%; box-sizing: border-box;
        }
        footer.main-footer p { color: #ffffff !important; margin: 6px 0; }
        footer.main-footer a { color: #38bdf8 !important; text-decoration: none; margin: 0 8px; font-weight: 500; }

        /* --- התאמת מובייל בלבד --- */
        @media (max-width: 768px) {
            .header-container {
                display: flex !important;
                flex-direction: row !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding: 10px 15px !important;
                position: relative !important;
            }

            .mobile-toggle-btn {
                display: flex !important;
                order: 1 !important; /* המבורגר מעוצב מימין */
                margin: 0 !important;
            }

            .brand-name {
                font-size: 22px !important;
                order: 2 !important; /* לוגו במרכז */
                margin: 0 auto !important;
            }

            .header-alert-wrapper {
                order: 3 !important; /* פעמון משמאל */
                margin: 0 !important;
            }

            .main-nav-wrapper {
                display: none;
                width: 100%;
                position: absolute;
                top: 100%;
                right: 0;
                left: 0;
                background: #0f172a;
                padding: 15px;
                border-bottom: 2px solid #0284c7;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                z-index: 99999;
            }

            .main-nav-wrapper.open {
                display: flex !important;
            }

            .main-nav {
                flex-direction: column !important;
                width: 100% !important;
                gap: 10px !important;
            }

            .main-nav li, .main-nav a {
                width: 100% !important;
                text-align: center !important;
            }

            .secondary-container { font-size: 12px; padding: 6px; }
            footer.main-footer { font-size: 13px; padding: 20px 10px; }
        }
    `;
    document.head.appendChild(style);
}

// 3. הזרקת ה-Header ב-HTML המקורי
const headerHtml = `
    <header class="main-header">
        <div class="header-container">
            <a href="index.html" class="brand-name">NETOOLS</a>

            <button class="mobile-toggle-btn" id="menuToggleBtn" aria-label="פתח תפריט">
                <i class="fa-solid fa-bars"></i>
            </button>

            <div class="main-nav-wrapper">
                <ul class="main-nav">
                    <li><a href="index.html" class="nav-item-home">דף הבית</a></li>
                    <li><a href="rights.html" class="nav-item-rights">זכויות עובדים</a></li>
                    <li><a href="legal.html" class="nav-item-legal">כלים משפטיים</a></li>
                    <li><a href="zmanim.html" class="nav-item-zmanim">זמנים</a></li>
                    <li><a href="world.html" class="nav-item-world">עולם ומפות</a></li> 
                    <li><a href="finance.html" class="nav-item-finance">פיננסים ומט"ח</a></li>
                    <li><a href="tools.html" class="nav-item-utility">כלים שימושיים</a></li>
                    <li><a href="news.html" class="nav-item-news">חדשות</a></li>
                </ul>
            </div>

            <div class="header-alert-wrapper">
                <a href="alerts.html" class="header-alert-btn" title="מרכז ההתרעות והחירום">
                    <i class="fa-solid fa-bell"></i>
                </a>
            </div>
        </div>

        <div class="secondary-bar">
            <div class="secondary-container">
                <span class="widget-item" id="nav-weather"><i class="fa-solid fa-cloud-sun icon-weather"></i> 24°C</span>
                <span class="widget-item" id="nav-clock"><i class="fa-regular fa-clock icon-clock"></i> --:--:--</span>
                <span class="widget-item" id="nav-greg-date"><i class="fa-regular fa-calendar icon-date"></i> --/--/----</span>
                <span class="widget-item" id="nav-hebrew"><i class="fa-solid fa-calendar-days icon-hebrew"></i> יום שבת, כ"ג אלול תשפ"ו</span>
                <span class="widget-item" id="nav-parasha"><i class="fa-solid fa-book-quran icon-parasha"></i> פרשת <strong>נצבים-וילך</strong></span>
                <span class="widget-item" id="nav-sun"><i class="fa-solid fa-sun icon-sun"></i> זריחה: 06:22 | שקיעה: 19:05</span>
                <span class="widget-item" id="nav-forex"><i class="fa-solid fa-dollar-sign icon-usd"></i>:<strong>3.01 ₪</strong> | <i class="fa-solid fa-euro-sign icon-eur"></i>:<strong>3.50 ₪</strong>|<i class="fa-brands fa-bitcoin icon-btc"></i>:<strong>$62,500</strong></span>
                <span class="widget-item"><i class="fa-solid fa-percent icon-prime"></i> ריבית: <strong>4.5%</strong> | פריים: <strong>6.0%</strong></span>
                <span class="widget-item"><i class="fa-solid fa-chart-line icon-cpi"></i> מדד: <strong>+0.3%</strong></span>
                <span class="widget-item"><i class="fa-solid fa-shekel-sign icon-wage"></i> שכר מינימום: <strong>5,880 ₪</strong></span>
            </div>
        </div>
    </header>
`;

document.body.insertAdjacentHTML("afterbegin", headerHtml);

// 4. הזרקת פוטר
if (!document.querySelector("footer.main-footer")) {
    const footerHtml = `
        <footer class="main-footer">
            <p>&copy; ${new Date().getFullYear()} NETOOLS - כל הזכויות שמורות</p>
            <p>
                <a href="privacy.html">מדיניות פרטיות</a> | 
                <a href="about.html">אודות והצהרת נגישות</a> | 
                <a href="mailto:netools.co.il@gmail.com">netools.co.il@gmail.com</a>
            </p>
        </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHtml);
}

// 5. סקריפט שעון, מזג אוויר ופתיחת המבורגר במובייל
document.addEventListener("DOMContentLoaded", function () {
    function updateClockAndDate() {
        const now = new Date();
        const clockEl = document.getElementById("nav-clock");
        const dateEl = document.getElementById("nav-greg-date");
        if (clockEl) clockEl.innerHTML = `<i class="fa-regular fa-clock icon-clock"></i> ${now.toLocaleTimeString('he-IL')}`;
        if (dateEl) dateEl.innerHTML = `<i class="fa-regular fa-calendar icon-date"></i> ${now.toLocaleDateString('he-IL')}`;
    }
    setInterval(updateClockAndDate, 1000);
    updateClockAndDate();

    // פתיחה וסגירה של ההמבורגר במובייל
    const btn = document.getElementById("menuToggleBtn");
    const navWrapper = document.querySelector(".main-nav-wrapper");

    if (btn && navWrapper) {
        btn.addEventListener("click", function () {
            navWrapper.classList.toggle("open");
            const icon = btn.querySelector("i");
            if (icon) {
                icon.className = navWrapper.classList.contains("open") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
            }
        });
    }
});
