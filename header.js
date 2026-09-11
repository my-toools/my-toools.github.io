// ==========================================
// NETOOLS - header.js (סרגל עליון רספונסיבי מותאם לכל המכשירים)
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. טעינת ספריית FontAwesome אקטיבית
    if (!document.getElementById("font-awesome-cdn")) {
        const faLink = document.createElement("link");
        faLink.id = "font-awesome-cdn";
        faLink.rel = "stylesheet";
        faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
        document.head.appendChild(faLink);
    }

    // 2. הזרקת עיצוב ה-CSS הרספונסיבי
    const headerStyle = document.createElement('style');
    headerStyle.innerHTML = `
        .main-header {
            background-color: #0f172a !important;
            padding: 12px 25px !important;
            border-bottom: 1px solid #1e293b !important;
            position: relative !important;
            z-index: 9999 !important;
        }

        .header-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            position: relative !important;
        }

        .logo-link {
            font-size: 26px !important;
            font-weight: 900 !important;
            color: #38bdf8 !important;
            text-decoration: none !important;
            letter-spacing: 1px !important;
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
        }

        .logo-img {
            height: 32px !important;
            width: auto !important;
            object-fit: contain !important;
        }

        .navbar {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
            align-items: center !important;
        }

        .nav-link {
            color: #f8fafc !important;
            text-decoration: none !important;
            font-weight: 700 !important;
            font-size: 14px !important;
            padding: 6px 12px !important;
            border-radius: 8px !important;
            border: 1px solid #334155 !important;
            background-color: #1e293b !important;
            transition: all 0.2s !important;
            white-space: nowrap !important;
        }

        .nav-link:hover, .nav-link.active {
            background-color: #0284c7 !important;
            border-color: #38bdf8 !important;
            color: #ffffff !important;
        }

        .ticker-bar {
            background: #060911 !important;
            color: #94a3b8 !important;
            padding: 8px 15px !important;
            font-size: 13px !important;
            border-bottom: 1px solid #1e293b !important;
            display: flex !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            gap: 20px !important;
            justify-content: center !important;
            align-items: center !important;
            scrollbar-width: none !important;
        }

        .ticker-bar::-webkit-scrollbar {
            display: none !important;
        }

        .ticker-item {
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
        }

        /* --- כפתור המבורגר והתאמות למסכים קטנים (תחת 768px) --- */
        .mobile-toggle {
            display: none !important;
            background: #1e293b !important;
            color: #38bdf8 !important;
            border: 1px solid #334155 !important;
            font-size: 20px !important;
            padding: 8px 12px !important;
            border-radius: 8px !important;
            cursor: pointer !important;
        }

        @media (max-width: 768px) {
            .mobile-toggle {
                display: block !important;
            }

            .navbar {
                display: none !important;
                flex-direction: column !important;
                width: 100% !important;
                position: absolute !important;
                top: 100% !important;
                right: 0 !important;
                left: 0 !important;
                background-color: #0f172a !important;
                padding: 15px !important;
                border-bottom: 2px solid #0284c7 !important;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
                gap: 10px !important;
                z-index: 10000 !important;
            }

            .navbar.open {
                display: flex !important;
            }

            .nav-link {
                width: 100% !important;
                text-align: center !important;
                padding: 10px !important;
                font-size: 15px !important;
            }

            .ticker-bar {
                justify-content: flex-start !important;
            }
        }
    `;
    document.head.appendChild(headerStyle);

    // 3. זיהוי העמוד הפעיל
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // 4. בניית ה-HTML של ה-Header וה-Ticker
    const headerHTML = `
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="logo-link">
                    <img src="images/logo.png" alt="NETOOLS" class="logo-img" onerror="this.style.display='none';">
                    <span>NETOOLS</span>
                </a>

                <button class="mobile-toggle" id="menuToggle" aria-label="פתח תפריט">
                    <i class="fa-solid fa-bars"></i>
                </button>

                <nav class="navbar" id="navMenu">
                    <a href="index.html" class="nav-link ${currentPath === 'index.html' ? 'active' : ''}">דף הבית</a>
                    <a href="rights.html" class="nav-link ${currentPath === 'rights.html' ? 'active' : ''}">זכויות עובדים</a>
                    <a href="legal.html" class="nav-link ${currentPath === 'legal.html' ? 'active' : ''}">כלים משפטיים</a>
                    <a href="zmanim.html" class="nav-link ${currentPath === 'zmanim.html' ? 'active' : ''}">זמנים</a>
                    <a href="finance.html" class="nav-link ${currentPath === 'finance.html' ? 'active' : ''}">פיננסים ומט"ח</a>
                    <a href="utility.html" class="nav-link ${currentPath === 'utility.html' ? 'active' : ''}">כלים שימושיים</a>
                    <a href="news.html" class="nav-link ${currentPath === 'news.html' ? 'active' : ''}">חדשות</a>
                </nav>
            </div>
        </header>

        <div class="ticker-bar">
            <span class="ticker-item"><i class="fa-regular fa-calendar-days" style="color:#38bdf8;"></i> יום שלישי, כ"ה אלול תשפ"ו</span>
            <span class="ticker-item"><i class="fa-solid fa-dollar-sign" style="color:#22c55e;"></i> דולר: 3.01 ₪</span>
            <span class="ticker-item"><i class="fa-solid fa-euro-sign" style="color:#3b82f6;"></i> אירו: 3.50 ₪</span>
            <span class="ticker-item"><i class="fa-solid fa-percent" style="color:#f59e0b;"></i> ריבית: 4.5%</span>
            <span class="ticker-item"><i class="fa-solid fa-chart-line" style="color:#ef4444;"></i> פריים: 6.0%</span>
            <span class="ticker-item"><i class="fa-solid fa-coins" style="color:#eab308;"></i> ביטקוין: $79,140</span>
            <span class="ticker-item"><i class="fa-solid fa-briefcase" style="color:#a855f7;"></i> שכר מינימום: 5,880 ₪</span>
            <span class="ticker-item"><i class="fa-solid fa-cloud-sun" style="color:#38bdf8;"></i> 23°C</span>
        </div>
    `;

    // 5. הזרקת ה-Header לראש הדף
    if (!document.querySelector(".main-header")) {
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
    }

    // 6. הפעלת מנגנון פתיחה/סגירה בלחיצה במובייל
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("open");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.className = navMenu.classList.contains("open") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
            }
        });
    }
});
