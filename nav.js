// ==========================================
// NETOOLS - nav.js (קובץ ניווט, נגישות ועיצוב נעול)
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. הזרקת עיצוב נעול (CSS) לסרגל העליון, הכותרת המוגדלת והנגישות
    const navStyle = document.createElement('style');
    navStyle.innerHTML = `
        /* עיצוב הסרגל והכותרת המוגדלת */
        header.main-header, .main-header {
            background-color: #0f172a !important;
            border-bottom: 1px solid #334155 !important;
            padding: 20px 30px !important;
            min-height: 80px !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
        }
        .header-container {
            max-width: 1300px !important;
            margin: 0 auto !important;
            width: 100% !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
        }
        .logo, header h1, nav h1 {
            font-size: 28px !important;
            font-weight: 800 !important;
            color: #38bdf8 !important;
            text-decoration: none !important;
            letter-spacing: -0.5px !important;
        }
        .navbar, nav {
            display: flex !important;
            gap: 15px !important;
            align-items: center !important;
        }
        .nav-link, nav a, header a {
            color: #f8fafc !important;
            text-decoration: none !important;
            font-size: 18px !important;
            font-weight: 700 !important;
            padding: 10px 16px !important;
            border-radius: 8px !important;
            transition: background-color 0.2s, color 0.2s !important;
        }
        .nav-link:hover, nav a:hover, header a:hover {
            background-color: #1e293b !important;
            color: #38bdf8 !important;
        }

        /* עיצוב הפוטר */
        .main-footer {
            background-color: #0f172a !important;
            border-top: 1px solid #334155 !important;
            padding: 25px 20px !important;
            text-align: center !important;
            color: #94a3b8 !important;
            font-size: 14px !important;
            margin-top: 60px !important;
        }
        .main-footer p {
            margin: 5px 0 !important;
        }
    `;
    document.head.appendChild(navStyle);

    // 2. יצירת סרגל הניווט העליון
    if (!document.querySelector(".main-header")) {
        const headerHTML = `
            <header class="main-header">
                <div class="header-container">
                    <a href="index.html" class="logo">NETOOLS</a>
                    <nav class="navbar">
                        <a href="index.html" class="nav-link">דף הבית</a>
                        <a href="calculators.html" class="nav-link">מחשבונים</a>
                        <a href="news.html" class="nav-link">חדשות ולייב</a>
                        <a href="about.html" class="nav-link">אודות</a>
                    </nav>
                </div>
            </header>
        `;
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
    }

    // 3. יצירת הפוטר בתחתית העמוד
    if (!document.querySelector(".main-footer")) {
        const footerHTML = `
            <footer class="main-footer">
                <div class="footer-container">
                    <p>© ${new Date().getFullYear()} NETOOLS - כל הזכויות שמורות</p>
                    <p style="font-size: 12px; opacity: 0.8;">המידע והמחשבונים באתר מספקים הערכה כללית בלבד ואינם מהווים ייעוץ מקצועי.</p>
                </div>
            </footer>
        `;
        document.body.insertAdjacentHTML("beforeend", footerHTML);
    }

    // 4. הזרקת רכיב הנגישות הנגיש והמובנה (♿)
    if (!document.getElementById("acc-floating-btn")) {
        const accContainer = document.createElement("div");
        accContainer.id = "acc-floating-btn";
        accContainer.style.cssText = "position: fixed; bottom: 20px; left: 20px; z-index: 999999;";
        
        accContainer.innerHTML = `
            <button onclick="document.getElementById('acc-panel').style.display = document.getElementById('acc-panel').style.display === 'none' ? 'block' : 'none'" 
                    style="background: #0284c7; color: white; border: 2px solid white; border-radius: 50%; width: 48px; height: 48px; cursor: pointer; font-size: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);" 
                    title="נגישות">♿</button>
            
            <div id="acc-panel" style="display: none; position: absolute; bottom: 60px; left: 0; background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 15px; width: 220px; color: white; direction: rtl; font-family: sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #334155; padding-bottom: 5px; text-align: center; color: #38bdf8;">התאמות נגישות</div>
                <button onclick="document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) + 0.1)" style="width:100%; margin-bottom:6px; padding:6px; background:#1e293b; color:white; border:1px solid #334155; border-radius:6px; cursor:pointer;">הגדלת טקסט +</button>
                <button onclick="document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) - 0.1)" style="width:100%; margin-bottom:6px; padding:6px; background:#1e293b; color:white; border:1px solid #334155; border-radius:6px; cursor:pointer;">הקטנת טקסט -</button>
                <button onclick="document.body.style.filter = document.body.style.filter === 'grayscale(100%)' ? 'none' : 'grayscale(100%)'" style="width:100%; margin-bottom:6px; padding:6px; background:#1e293b; color:white; border:1px solid #334155; border-radius:6px; cursor:pointer;">גווני אפור</button>
                <button onclick="document.body.style.zoom = '100%'; document.body.style.filter = 'none';" style="width:100%; padding:6px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">איפוס</button>
            </div>
        `;
        document.body.appendChild(accContainer);
    }
});
