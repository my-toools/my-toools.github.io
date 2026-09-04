document.addEventListener("DOMContentLoaded", function () {
    // 1. הזרקת אייקונים
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        document.head.appendChild(fontLink);
    }

    // 2. שמירה על העיצוב המקורי של הסרגל והפוטר
    const style = document.createElement("style");
    style.textContent = `
        header.main-header {
            background: #0f172a;
            color: #ffffff;
            padding: 16px 20px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        .logo-area {
            font-size: 22px;
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
            font-weight: 500;
            font-size: 15px;
            transition: color 0.2s;
        }
        .main-nav a:hover {
            color: #38bdf8;
        }
        footer.main-footer {
            background: #0f172a;
            color: #94a3b8;
            text-align: center;
            padding: 25px 20px;
            margin-top: 40px;
            border-top: 1px solid #1e293b;
            font-size: 14px;
        }
        footer.main-footer a {
            color: #38bdf8;
            text-decoration: none;
            margin: 0 6px;
        }
    `;
    document.head.appendChild(style);

    // 3. הזרקת הסרגל העליון (רק אם לא קיים)
    if (!document.querySelector("header.main-header")) {
        const headerHtml = `
            <header class="main-header">
                <div class="header-container">
                    <a href="index.html" class="logo-area">
                        <i class="fa-solid fa-screwdriver-wrench"></i> NETOOLS
                    </a>
                    <nav>
                        <ul class="main-nav">
                            <li><a href="index.html">דף הבית</a></li>
                            <li><a href="rights.html">זכויות עובדים</a></li>
                            <li><a href="legal.html">כלים משפטיים</a></li>
                            <li><a href="finance.html">פיננסים ומט"ח</a></li>
                            <li><a href="utility.html">כלים שימושיים</a></li>
                            <li><a href="news.html">חדשות</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
        document.body.insertAdjacentHTML("afterbegin", headerHtml);
    }

    // 4. הזרקת הפוטר התחתון (רק אם לא קיים)
    if (!document.querySelector("footer.main-footer")) {
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
    }
});
