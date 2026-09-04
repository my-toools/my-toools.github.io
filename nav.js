document.addEventListener("DOMContentLoaded", function () {
    // 1. הזרקת פונטים ואייקונים
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(fontLink);

    // 2. עיצוב CSS מורחב לסרגל ולמחשבונים
    const style = document.createElement("style");
    style.textContent = `
        /* סרגל עליון מורחב ונוכח */
        header.main-header {
            background: #0f172a;
            color: #ffffff;
            padding: 18px 25px; /* הגדלת הגובה והריווח */
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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
            font-size: 24px;
            font-weight: bold;
            color: #38bdf8;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
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
            font-weight: 500;
            font-size: 16px;
            transition: color 0.2s;
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
        }
        footer.main-footer a {
            color: #38bdf8;
            text-decoration: none;
            margin: 0 8px;
        }
    `;
    document.head.appendChild(style);

    // 3. הזרקת הסרגל העליון
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

    // 4. הזרקת הפוטר התחתון
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
});
