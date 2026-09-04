document.addEventListener("DOMContentLoaded", function () {
    // 1. הוספת הלוגו (Favicon) לכרטיסייה בדפדפן
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "shortcut icon";
        favicon.type = "image/x-icon";
        document.head.appendChild(favicon);
    }
    // שימוש באייקון הכלים הרשמי כפאביקון
    favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️</text></svg>";

    // 2. הזרקת אייקונים של FontAwesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        document.head.appendChild(fontLink);
    }

    // 3. ניקוי כפילויות של Header או הזרקות ישנות
    const existingHeaders = document.querySelectorAll("header, .main-header");
    if (existingHeaders.length > 0) {
        existingHeaders.forEach((el, index) => {
            if (index > 0) el.remove(); // הסרת כפילויות
        });
    }

    // 4. עיצוב מותאם ונקי לכל האתר
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
                background: #1e293b;
                color: #ffffff;
                padding: 14px 24px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                position: sticky;
                top: 0;
                z-index: 10000;
                width: 100%;
                box-sizing: border-box;
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
                gap: 20px;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .main-nav a {
                color: #f8fafc;
                text-decoration: none;
                font-weight: 600;
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
                margin-top: 50px;
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
    }

    // 5. יצירת סרגל ניווט חדש ונקי במידה ולא קיים
    if (!document.querySelector("header.main-header")) {
        const headerHtml = `
            <header class="main-header">
                <div class="header-container">
                    <a href="index.html" class="logo-area">
                        NETOOLS <i class="fa-solid fa-screwdriver-wrench"></i>
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

    // 6. הזרקת הפוטר התחתון
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
