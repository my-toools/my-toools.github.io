if (!document.getElementById("fa-cdn")) {
    var faLink = document.createElement("link");
    faLink.id = "fa-cdn";
    faLink.rel = "stylesheet";
    faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    document.head.appendChild(faLink);
}

let favicon = document.querySelector("link[rel*='icon']");
if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "shortcut icon";
    document.head.appendChild(favicon);
}
favicon.href = "favicon.png";

const styleId = "netools-nav-style";
if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
        html, body { height: 100%; margin: 0 !important; padding-top: 0 !important; background-color: var(--bg-main, #f8fafc); }
        body { display: flex; flex-direction: column; min-height: 100vh; }
        body > *:not(header):not(footer):not(.calc-modal-overlay):not(#acc-floating-btn) { width: 100%; max-width: 1200px; margin-left: auto; margin-right: auto; box-sizing: border-box; flex: 1; }
        header.main-header { background: #0f172a; color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.25); position: sticky; top: 0; z-index: 10000; width: 100%; }
        .header-container { max-width: 1400px; margin: 0 auto; padding: 12px 20px; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 15px; }
        .brand-name { font-size: 22px; font-weight: 800; color: #ffffff !important; text-decoration: none; letter-spacing: 1px; white-space: nowrap; }
        .main-nav-wrapper { display: flex; justify-content: center; width: 100%; }
        .main-nav { display: flex; gap: 8px; list-style: none; margin: 0; padding: 0; align-items: center; flex-wrap: wrap; justify-content: center; }
        .main-nav a { color: #ffffff !important; text-decoration: none; font-weight: 500; font-size: 14px; padding: 6px 13px; border-radius: 6px; transition: all 0.2s ease-in-out; display: inline-block; background: rgba(255, 255, 255, 0.02); white-space: nowrap; }
        .nav-item-home { border: 1px solid rgba(56, 189, 248, 0.6); }
        .nav-item-rights { border: 1px solid rgba(34, 197, 94, 0.6); }
        .nav-item-legal { border: 1px solid rgba(168, 85, 247, 0.6); }
        .nav-item-zmanim { border: 1px solid rgba(236, 72, 153, 0.6); }
        .nav-item-finance { border: 1px solid rgba(6, 182, 212, 0.6); }
        .nav-item-utility { border: 1px solid rgba(249, 115, 22, 0.6); }
        .nav-item-news { border: 1px solid rgba(245, 158, 11, 0.6); }
        .nav-item-world { border: 1px solid rgba(14, 165, 233, 0.6); }
        .main-nav a:hover { transform: translateY(-2px); background: rgba(255, 255, 255, 0.08); }
        .center-logo { display: flex; align-items: center; justify-content: center; margin: 0 4px; cursor: pointer; }
        .center-logo img { height: 34px; width: 34px; object-fit: contain; border-radius: 6px; transition: transform 0.2s; }
        .center-logo img:hover { transform: scale(1.1); }

        .header-alert-btn { color: #ef4444 !important; font-size: 20px; text-decoration: none; display: flex; align-items: center; justify-content: center; padding: 6px 10px; border-radius: 8px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.4); transition: all 0.2s ease; }
        .header-alert-btn.active { animation: fast-alarm-ring 0.25s ease-in-out infinite alternate !important; }
        @keyframes fast-alarm-ring { 0% { transform: rotate(-25deg) scale(1.1); } 100% { transform: rotate(25deg) scale(1.35); } }

        .secondary-bar { background: #1e293b; color: #cbd5e1; font-size: 12.5px; padding: 7px 12px; border-top: 1px solid #334155; width: 100%; box-sizing: border-box; }
        .secondary-container { max-width: 1550px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 10px; overflow-x: auto; white-space: nowrap; }
        .secondary-container::-webkit-scrollbar { display: none; }
        .widget-item { display: inline-flex; align-items: center; gap: 5px; font-weight: 500; }
        .widget-item strong { color: #ffffff; }
        footer.main-footer { background: #0f172a !important; color: #ffffff !important; text-align: center; padding: 28px 20px; margin-top: auto !important; border-top: 1px solid #1e293b; font-size: 14px; width: 100%; box-sizing: border-box; }
        footer.main-footer p { color: #ffffff !important; margin: 6px 0; }
        footer.main-footer a { color: #38bdf8 !important; text-decoration: none; margin: 0 8px; font-weight: 500; }
        footer.main-footer a:hover { text-decoration: underline; }
    `;
    document.head.appendChild(style);
}

const headerHtml = `
    <header class="main-header">
        <div class="header-container">
            <a href="index.html" class="brand-name">NETOOLS</a>
            <div class="main-nav-wrapper">
                <ul class="main-nav">
                    <li><a href="index.html" class="nav-item-home">דף הבית</a></li>
                    <li><a href="rights.html" class="nav-item-rights">זכויות עובדים</a></li>
                    <li><a href="legal.html" class="nav-item-legal">כלים משפטיים</a></li>
                    <li><a href="zmanim.html" class="nav-item-zmanim">זמנים</a></li>
                    <li><a href="world.html" class="nav-item-world">עולם ומפות</a></li>
                    <li class="center-logo" onclick="openNavCalculator()" title="לחצי לפתיחת מחשבון מדעי">
                        <img src="favicon.png" alt="NETOOLS Logo" onerror="this.src='favicon.ico'">
                    </li>
                    <li><a href="finance.html" class="nav-item-finance">פיננסים ומט"ח</a></li>
                    <li><a href="tools.html" class="nav-item-utility">כלים שימושיים</a></li>
                    <li><a href="news.html" class="nav-item-news">חדשות</a></li>
                </ul>
            </div>
            <div>
                <a href="alerts.html" class="header-alert-btn" id="nav-bell-icon" title="מרכז ההתרעות והחירום">
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
                <span class="widget-item" id="nav-forex"><i class="fa-solid fa-dollar-sign"></i>:<strong>3.01 ₪</strong> | <i class="fa-solid fa-euro-sign"></i>:<strong>3.50 ₪</strong></span>
            </div>
        </div>
    </header>
`;
document.body.insertAdjacentHTML("afterbegin", headerHtml);
