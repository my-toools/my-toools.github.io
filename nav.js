// ==========================================
// NETOOLS - nav.js (סרגל אחיד, פונט מקורי ונגישות)
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. הזרקת פונט אחיד וסגנונות הסרגל המקורי
    const masterStyle = document.createElement('style');
    masterStyle.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700;800;900&display=swap');

        body {
            font-family: 'Rubik', system-ui, sans-serif !important;
            background-color: #0b1120 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* סרגל עליון מקורי */
        .main-header {
            background-color: #0f172a !important;
            padding: 12px 25px !important;
            border-bottom: 1px solid #1e293b !important;
        }

        .header-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            flex-wrap: wrap !important;
            gap: 15px !important;
        }

        .logo {
            font-size: 26px !important;
            font-weight: 900 !important;
            color: #38bdf8 !important;
            text-decoration: none !important;
            letter-spacing: 1px !important;
        }

        .navbar {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
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
        }

        .nav-link:hover, .nav-link.active {
            background-color: #0284c7 !important;
            border-color: #38bdf8 !important;
        }

        /* סרגל המבזקים */
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
        }

        /* פוטר בתחתית */
        .main-footer {
            background: #0f172a !important;
            color: #94a3b8 !important;
            text-align: center !important;
            padding: 20px !important;
            border-top: 1px solid #1e293b !important;
            margin-top: 40px !important;
            font-size: 13px !important;
        }
    `;
    document.head.appendChild(masterStyle);

    // 2. הזרקת ה-Header במידה ואינו קיים בעמוד
    if (!document.querySelector(".main-header")) {
        const headerHTML = `
            <header class="main-header">
                <div class="header-container">
                    <a href="index.html" class="logo">NETOOLS</a>
                    <nav class="navbar">
                        <a href="index.html" class="nav-link">דף הבית</a>
                        <a href="rights.html" class="nav-link">זכויות עובדים</a>
                        <a href="legal.html" class="nav-link">כלים משפטיים</a>
                        <a href="zmanim.html" class="nav-link">זמנים</a>
                        <a href="finance.html" class="nav-link">פיננסים ומט"ח</a>
                        <a href="utility.html" class="nav-link">כלים שימושיים</a>
                        <a href="news.html" class="nav-link">חדשות</a>
                    </nav>
                </div>
            </header>
            <div class="ticker-bar">
                <span>📅 יום ראשון, כ"ד אלול תשפ"ו</span>
                <span>💲 דולר: 3.01 ₪</span>
                <span>💶 אירו: 3.50 ₪</span>
                <span>📈 ריבית: 4.5%</span>
                <span>📉 פריים: 6.0%</span>
                <span>🪙 ביטקוין: $79,711</span>
                <span>💼 שכר מינימום: 5,880 ₪</span>
            </div>
        `;
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
    }

    // 3. הזרקת הפוטר במידה ואינו קיים בעמוד
    if (!document.querySelector(".main-footer")) {
        const footerHTML = `
            <footer class="main-footer">
                <div class="footer-container">
                    <p>© 2026 NETOOLS - כל הזכויות שמורות</p>
                    <p style="margin-top: 5px; color: #64748b;">המידע והמחשבונים באתר מספקים הערכה כללית בלבד ואינם מהווים ייעוץ משפטי או מקצועי.</p>
                </div>
            </footer>
        `;
        document.body.insertAdjacentHTML("beforeend", footerHTML);
    }

    // 4. כפתור נגישות צף (♿)
    if (!document.getElementById("acc-floating-btn")) {
        const accContainer = document.createElement("div");
        accContainer.id = "acc-floating-btn";
        accContainer.style.cssText = "position: fixed; bottom: 20px; left: 20px; z-index: 999999;";
        
        accContainer.innerHTML = `
            <button onclick="document.getElementById('acc-panel').style.display = document.getElementById('acc-panel').style.display === 'none' ? 'block' : 'none'" 
                    style="background: #0284c7; color: white; border: 2px solid white; border-radius: 50%; width: 44px; height: 44px; cursor: pointer; font-size: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);" 
                    title="נגישות">♿</button>
            
            <div id="acc-panel" style="display: none; position: absolute; bottom: 55px; left: 0; background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 12px; width: 200px; color: white; direction: rtl; font-family: sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #334155; padding-bottom: 4px; text-align: center; color: #38bdf8; font-size: 14px;">התאמות נגישות</div>
                <button onclick="document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) + 0.1)" style="width:100%; margin-bottom:5px; padding:5px; background:#1e293b; color:white; border:1px solid #334155; border-radius:6px; cursor:pointer; font-size:12px;">הגדלת טקסט +</button>
                <button onclick="document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) - 0.1)" style="width:100%; margin-bottom:5px; padding:5px; background:#1e293b; color:white; border:1px solid #334155; border-radius:6px; cursor:pointer; font-size:12px;">הקטנת טקסט -</button>
                <button onclick="document.body.style.filter = document.body.style.filter === 'grayscale(100%)' ? 'none' : 'grayscale(100%)'" style="width:100%; margin-bottom:5px; padding:5px; background:#1e293b; color:white; border:1px solid #334155; border-radius:6px; cursor:pointer; font-size:12px;">גווני אפור</button>
                <button onclick="document.body.style.zoom = '100%'; document.body.style.filter = 'none';" style="width:100%; padding:5px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold; font-size:12px;">איפוס</button>
            </div>
        `;
        document.body.appendChild(accContainer);
    }
});
