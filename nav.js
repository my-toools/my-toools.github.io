// ==========================================
// NETOOLS - nav.js (התאמה מלאה למובייל ולכל המסכים)
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    
    const styleFix = document.createElement('style');
    styleFix.innerHTML = `
        /* ===== הגדרות כלליות למחשב ולמסך רחב ===== */
        header, .main-header {
            background-color: #0f172a !important;
            padding: 15px 20px !important;
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
            font-size: 28px !important;
            font-weight: 900 !important;
            color: #38bdf8 !important;
            text-decoration: none !important;
            white-space: nowrap !important;
        }

        .navbar {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
            justify-content: center !important;
        }

        .nav-link, header a, nav a {
            font-size: 16px !important;
            padding: 8px 12px !important;
            font-weight: 700 !important;
            border-radius: 6px !important;
            text-decoration: none !important;
            white-space: nowrap !important;
        }

        /* ===== התאמה מיוחדת למובייל (מסכים מתחת ל-768 פיקסלים) ===== */
        @media screen and (max-width: 768px) {
            .header-container {
                flex-direction: column !important;
                align-items: center !important;
                padding: 5px !important;
            }

            .logo {
                font-size: 24px !important;
                margin-bottom: 5px !important;
            }

            /* סידור הכפתורים במובייל בשורות נקיות וקומפקטיות */
            .navbar {
                width: 100% !important;
                justify-content: center !important;
                gap: 6px !important;
            }

            .nav-link, header a, nav a {
                font-size: 13px !important;
                padding: 6px 10px !important;
            }

            /* סרגל המבזקים והנתונים במובייל - גלילה אופקית נקייה */
            .ticker, .ticker-bar, .sub-header, .top-bar, [class*="ticker"], [class*="bar"] {
                overflow-x: auto !important;
                white-space: nowrap !important;
                font-size: 12px !important;
                padding: 6px 10px !important;
                justify-content: flex-start !important;
            }

            /* מניעת חריגת הטקסט הראשי במובייל */
            h1, h2, .hero-title {
                font-size: 24px !important;
                word-wrap: break-word !important;
            }
        }
    `;
    document.head.appendChild(styleFix);

    // הזרקת רכיב הנגישות הצף (♿)
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
