// יצירת אלמנט הסרגל העליון המעודכן והמוגדל
document.addEventListener("DOMContentLoaded", function () {
    const headerHTML = `
    <header style="background-color: #0b0f19; color: #ffffff; direction: rtl; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-bottom: 1px solid rgba(255, 255, 255, 0.1); width: 100%;">
        
        <!-- שורה עליונה: לוגו ותפריט ניווט מיושרים למרכז -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 40px; padding: 18px 20px; max-width: 1400px; margin: 0 auto; flex-wrap: wrap;">
            
            <!-- לוגו NETOOLS בולט -->
            <div style="font-size: 32px; font-weight: 900; letter-spacing: 1.5px; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">NETOOLS</div>
            
            <!-- תפריט כפתורים מעוצב בדיוק לפי המקור -->
            <nav style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                <a href="index.html" style="color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 10px; border: 1.5px solid #2563eb; font-size: 16px; font-weight: 800; background: rgba(37, 99, 235, 0.1); transition: all 0.2s;">דף הבית</a>
                <a href="rights.html" style="color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 10px; border: 1.5px solid #10b981; font-size: 16px; font-weight: 800; background: rgba(16, 185, 129, 0.1); transition: all 0.2s;">זכויות עובדים</a>
                <a href="legal.html" style="color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 10px; border: 1.5px solid #8b5cf6; font-size: 16px; font-weight: 800; background: rgba(139, 92, 246, 0.1); transition: all 0.2s;">כלים משפטיים</a>
                <a href="zmanim.html" style="color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 10px; border: 1.5px solid #a855f7; font-size: 16px; font-weight: 800; background: rgba(168, 85, 247, 0.1); display: flex; align-items: center; gap: 8px; transition: all 0.2s;">
                    זמנים 
                    <span style="background: #ffffff; border-radius: 4px; padding: 2px 4px; display: inline-flex; align-items: center; justify-content: center;">
                        <span style="display: grid; grid-template-columns: repeat(3, 3px); gap: 2px;">
                            <span style="width: 3px; height: 3px; background: #ef4444; border-radius: 50%;"></span>
                            <span style="width: 3px; height: 3px; background: #f59e0b; border-radius: 50%;"></span>
                            <span style="width: 3px; height: 3px; background: #10b981; border-radius: 50%;"></span>
                            <span style="width: 3px; height: 3px; background: #3b82f6; border-radius: 50%;"></span>
                            <span style="width: 3px; height: 3px; background: #8b5cf6; border-radius: 50%;"></span>
                            <span style="width: 3px; height: 3px; background: #ec4899; border-radius: 50%;"></span>
                        </span>
                    </span>
                </a>
                <a href="finance.html" style="color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 10px; border: 1.5px solid #06b6d4; font-size: 16px; font-weight: 800; background: rgba(6, 182, 212, 0.1); transition: all 0.2s;">פיננסים ומט"ח</a>
                <a href="tools.html" style="color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 10px; border: 1.5px solid #f97316; font-size: 16px; font-weight: 800; background: rgba(249, 115, 22, 0.1); transition: all 0.2s;">כלים שימושיים</a>
                <a href="news.html" style="color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 10px; border: 1.5px solid #eab308; font-size: 16px; font-weight: 800; background: rgba(234, 179, 8, 0.1); transition: all 0.2s;">חדשות</a>
            </nav>
        </div>

        <!-- שורה תחתונה: סרגל מידע חי, מוגדל ומיושר למרכז -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 16px; background-color: #111827; padding: 10px 20px; font-size: 14px; font-weight: 700; overflow-x: auto; white-space: nowrap; border-top: 1px solid rgba(255, 255, 255, 0.05);">
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #38bdf8; font-size: 16px;">⛅</span> 20°C</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #38bdf8; font-size: 16px;">🕒</span> <span id="ticker-time">6:04:53</span></div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #38bdf8; font-size: 16px;">📅</span> 9.9.2026</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #f59e0b; font-size: 16px;">📅</span> יום שבת, כ"ג אלול תשפ"ו</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="background: #a855f7; color: #ffffff; padding: 2px 6px; border-radius: 50%; font-size: 12px;">☪</span> פרשת <strong>נצבים-וילך</strong></div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #f59e0b; font-size: 16px;">☀️</span> זריחה: 06:22 | שקיעה: 19:05</div>
            <div style="color: rgba(255,255,255,0.2);">|</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #10b981; font-weight: 900;">$</span> דולר: <strong style="color: #ffffff;">3.02 ₪</strong></div>
            <div style="color: rgba(255,255,255,0.2);">|</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #06b6d4; font-weight: 900;">€</span> אירו: <strong style="color: #ffffff;">3.51 ₪</strong></div>
            <div style="color: rgba(255,255,255,0.2);">|</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #eab308; font-weight: 900;">₿</span> ביטקוין: <strong style="color: #ffffff;">$78,684</strong></div>
            <div style="color: rgba(255,255,255,0.2);">|</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #f97316; font-weight: 900;">%</span> ריבית: <strong style="color: #ffffff;">4.5%</strong> | פריים: <strong style="color: #ffffff;">6.0%</strong></div>
            <div style="color: rgba(255,255,255,0.2);">|</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="background: #8b5cf6; color: #fff; padding: 2px 4px; border-radius: 4px; font-size: 12px;">📈</span> מדד: <strong style="color: #ffffff;">+0.3%</strong></div>
            <div style="color: rgba(255,255,255,0.2);">|</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="color: #ec4899; font-weight: 900;">₪</span> שכר מינימום: <strong style="color: #ffffff;">5,880 ₪</strong></div>
        </div>
    </header>
    `;

    // הזרקת ה-Header לתוך האלמנט הייעודי בדף
    const headerContainer = document.getElementById("main-header");
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }

    // הפעלת שעון דינמי בלייב
    setInterval(() => {
        const timeEl = document.getElementById("ticker-time");
        if (timeEl) {
            const now = new Date();
            timeEl.innerText = now.toLocaleTimeString('he-IL');
        }
    }, 1000);
});
