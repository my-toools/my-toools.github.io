document.addEventListener("DOMContentLoaded", function () {
    const headerHTML = `
    <header style="background-color: #0b0f19; color: #ffffff; direction: rtl; font-family: system-ui, -apple-system, sans-serif; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
        <!-- שורה עליונה: לוגו ותפריט ניווט -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; max-width: 1400px; margin: 0 auto;">
            <div style="font-size: 24px; font-weight: 900; letter-spacing: 1px;">NETOOLS</div>
            <nav style="display: flex; gap: 8px;">
                <a href="index.html" style="color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); font-size: 14px; font-weight: 600;">דף הבית</a>
                <a href="rights.html" style="color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); font-size: 14px; font-weight: 600;">זכויות עובדים</a>
                <a href="legal.html" style="color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); font-size: 14px; font-weight: 600;">כלים משפטיים</a>
                <a href="zmanim.html" style="color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); font-size: 14px; font-weight: 600;">זמנים <span style="background: #22c55e; padding: 2px 4px; border-radius: 4px; font-size: 10px;">⣿</span></a>
                <a href="finance.html" style="color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); font-size: 14px; font-weight: 600;">פיננסים ומט"ח</a>
                <a href="tools.html" style="color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); font-size: 14px; font-weight: 600;">כלים שימושיים</a>
                <a href="news.html" style="color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); font-size: 14px; font-weight: 600;">חדשות</a>
            </nav>
        </div>

        <!-- שורה תחתונה: סרגל נתונים לייב -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; background-color: #111827; padding: 6px 15px; font-size: 12px; overflow-x: auto; white-space: nowrap;">
            <div>☀️ 20°C</div>
            <div>🕒 <span id="ticker-time">5:41:46</span></div>
            <div>📅 9.9.2026</div>
            <div>📅 יום שבת, כ"ג אלול תשפ"ו</div>
            <div>☪ פרשת <strong>נצבים-וילך</strong></div>
            <div>☀️ זריחה: 06:22 | שקיעה: 19:05</div>
            <div style="opacity: 0.3;">|</div>
            <div><span style="color: #10b981;">$</span> דולר: <strong>3.02 ₪</strong></div>
            <div style="opacity: 0.3;">|</div>
            <div><span style="color: #06b6d4;">€</span> אירו: <strong>3.51 ₪</strong></div>
            <div style="opacity: 0.3;">|</div>
            <div><span style="color: #eab308;">₿</span> ביטקוין: <strong>$78,757</strong></div>
            <div style="opacity: 0.3;">|</div>
            <div><span style="color: #f97316;">%</span> ריבית: <strong>4.5%</strong> | פריים: <strong>6.0%</strong></div>
            <div style="opacity: 0.3;">|</div>
            <div><span style="color: #a855f7;">📈</span> מדד: <strong>+0.3%</strong></div>
            <div style="opacity: 0.3;">|</div>
            <div><span style="color: #ec4899;">₪</span> שכר מינימום: <strong>5,880 ₪</strong></div>
        </div>
    </header>
    `;

    // הזרקת ה-Header לתוך ה-div הריק
    const headerContainer = document.getElementById("main-header");
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }

    // הפעלת השעון בזמן אמת
    setInterval(() => {
        const timeEl = document.getElementById("ticker-time");
        if (timeEl) {
            const now = new Date();
            timeEl.innerText = now.toLocaleTimeString('he-IL');
        }
    }, 1000);
});
