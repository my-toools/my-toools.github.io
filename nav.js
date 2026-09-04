document.addEventListener("DOMContentLoaded", function () {
  // 1. הזרקת עיצוב ה-CSS המוגן והאחיד לסרגל ולמחשבון המדעי
  var style = document.createElement('style');
  style.innerHTML = `
    .nav {
      position: fixed !important;
      top: 0 !important; left: 0 !important; right: 0 !important;
      z-index: 1000 !important;
      background: #0f172a !important;
      border-bottom: 3px solid #1d4ed8 !important;
      padding: 10px 20px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      gap: 8px !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
    }
    .nav-top-row {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
    }
    .nav-links {
      display: flex !important;
      flex-direction: row !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 14px !important;
      flex-wrap: wrap !important;
      margin: 0 auto !important;
      direction: rtl !important;
    }
    .nav-links a {
      color: #f8fafc !important;
      text-decoration: none !important;
      font-weight: 700 !important;
      font-size: 15px !important;
      padding: 6px 10px !important;
      border-radius: 8px !important;
      transition: all 0.2s ease !important;
      white-space: nowrap !important;
    }
    .nav-links a:hover {
      color: #38bdf8 !important;
      background: rgba(255, 255, 255, 0.1) !important;
    }
    .nav-logo-link {
      display: flex !important;
      align-items: center !important;
      padding: 0 6px !important;
      cursor: pointer !important;
    }
    .nav-logo {
      width: 40px !important;
      height: 40px !important;
      max-width: 40px !important;
      max-height: 40px !important;
      border-radius: 8px !important;
      object-fit: contain !important;
      transition: transform 0.2s ease !important;
    }
    .nav-logo:hover {
      transform: scale(1.1) !important;
    }
    .nav-widgets {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 10px !important;
      font-size: 13px !important;
      color: #cbd5e1 !important;
      padding-top: 6px !important;
      border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
      flex-wrap: wrap !important;
      width: 100% !important;
      direction: rtl !important;
    }
    .widget-item {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      white-space: nowrap !important;
    }
    .widget-item span {
      color: #ffffff !important;
      font-weight: 600 !important;
    }
    .widget-divider {
      color: rgba(255, 255, 255, 0.2) !important;
      font-weight: 300 !important;
    }

    /* עיצוב המחשבון המדעי הקופץ */
    .calc-modal-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(6px);
      z-index: 9999;
      justify-content: center;
      align-items: center;
      padding: 15px;
    }
    .calc-modal-card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 22px;
      border-radius: 20px;
      width: 100%;
      max-width: 440px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      position: relative;
      direction: rtl;
      font-family: 'Heebo', sans-serif;
    }
    .calc-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 8px;
    }
    .calc-modal-header h3 {
      margin: 0; font-size: 17px; color: #f8fafc; font-weight: 800; display: flex; align-items: center; gap: 8px;
    }
    .calc-close-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      color: #cbd5e1;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .calc-close-btn:hover {
      background: #ef4444; color: #ffffff;
    }
    .calc-display-container {
      background: #1e293b;
      border: 1px solid #334155;
      padding: 12px 16px;
      border-radius: 12px;
      margin-bottom: 14px;
      text-align: left;
      direction: ltr;
    }
    .calc-history {
      font-size: 13px;
      color: #94a3b8;
      min-height: 18px;
      margin-bottom: 2px;
      word-break: break-all;
    }
    .calc-modal-screen {
      width: 100%;
      font-size: 28px;
      font-weight: 800;
      color: #38bdf8;
      background: transparent;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    .calc-modal-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      direction: rtl;
    }
    .calc-btn {
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 12px 0;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }
    .calc-btn:hover {
      background: #334155;
      transform: translateY(-1px);
    }
    .calc-btn.op {
      background: #1d4ed8;
      color: #ffffff;
    }
    .calc-btn.op:hover {
      background: #2563eb;
    }
    .calc-btn.sci {
      background: #0f172a;
      color: #38bdf8;
      border-color: #334155;
      font-size: 14px;
    }
    .calc-btn.sci:hover {
      background: #1e293b;
    }
    .calc-btn.func {
      background: #334155;
      color: #cbd5e1;
    }
    .calc-btn.func:hover {
      background: #475569;
    }
    .calc-btn.equals {
      background: #0284c7;
      color: #ffffff;
    }
    .calc-btn.equals:hover {
      background: #0369a1;
    }
    .calc-btn.clear {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
    }
    .calc-btn.clear:hover {
      background: #ef4444;
      color: #ffffff;
    }
  `;
  document.head.appendChild(style);

  // 2. הזרקת הסרגל המרכזי ומדדי המשק בלייב
  var navHTML =
    '<div class="nav-top-row">' +
    '<div class="nav-links">' +
    '<a href="index.html">💼 זכויות עובדים</a>' +
    '<a href="legal.html">⚖️ כלים משפטיים</a>' +
    '<a href="finance.html">💰 מט"ח ופיננסים</a>' +
    '<a href="javascript:void(0)" onclick="toggleNavCalculator()" class="nav-logo-link" title="לחצי לפתיחת מחשבון מדעי"><img src="favicon.png" alt="לוגו" class="nav-logo"></a>' +
    '<a href="utility.html">🛠️ כלים שימושיים</a>' +
    '<a href="guides.html">📚 מדריכים</a>' +
    '<a href="about.html">ℹ️ אודות</a>' +
    "</div>" +
    "</div>" +
    '<div class="nav-widgets">' +
    '<div class="widget-item">📅 <span id="navGregDate">טוען...</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item">📜 <span id="navHebrewDate">טוען...</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item">⏰ <span id="navLiveTime">00:00:00</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item">🏛️ ריבית פריים: <span>6.00%</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item">💼 שכר מינימום: <span>32.30 ₪/שעה</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> <span id="navUsd">--</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12"></path><path d="M4 14h9"></path><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12a7.9 7.9 0 0 0 7.8 8 7.7 7.7 0 0 0 5.2-2"></path></svg> <span id="navEur">--</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item">🌤️ <span id="navWeather">--</span></div>' +
    "</div>" +

    // חלון קופץ של המחשבון המדעי
    '<div id="calcModal" class="calc-modal-overlay" onclick="if(event.target === this) toggleNavCalculator()">' +
    '<div class="calc-modal-card">' +
    '<div class="calc-modal-header"><h3>🧮 מחשבון מדעי מקצועי</h3><button class="calc-close-btn" onclick="toggleNavCalculator()">×</button></div>' +
    '<div class="calc-display-container">' +
    '<div id="navCalcHistory" class="calc-history"></div>' +
    '<input type="text" id="navCalcDisplay" class="calc-modal-screen" value="0" readonly>' +
    '</div>' +
    '<div class="calc-modal-grid">' +
    '<button class="calc-btn op" onclick="navCalcPress(\'/\')">÷</button>' +
    '<button class="calc-btn clear" onclick="navCalcClear()">C</button>' +
    '<button class="calc-btn func" onclick="navCalcBackspace()">⌫</button>' +
    '<button class="calc-btn sci" onclick="navCalcSci(\'sin\')">sin</button>' +
    '<button class="calc-btn sci" onclick="navCalcSci(\'cos\')">cos</button>' +

    '<button class="calc-btn op" onclick="navCalcPress(\'*\')">×</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'9\')">9</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'8\')">8</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'7\')">7</button>' +
    '<button class="calc-btn sci" onclick="navCalcSci(\'tan\')">tan</button>' +

    '<button class="calc-btn op" onclick="navCalcPress(\'-\')">-</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'6\')">6</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'5\')">5</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'4\')">4</button>' +
    '<button class="calc-btn sci" onclick="navCalcSci(\'sqrt\')">√</button>' +

    '<button class="calc-btn op" onclick="navCalcPress(\'+\')">+</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'3\')">3</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'2\')">2</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'1\')">1</button>' +
    '<button class="calc-btn sci" onclick="navCalcSci(\'sqr\')">x²</button>' +

    '<button class="calc-btn equals" onclick="navCalcEval()">=</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'0\')">0</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'.\')">.</button>' +
    '<button class="calc-btn func" onclick="navCalcPercent()">%</button>' +
    '<button class="calc-btn sci" onclick="navCalcSci(\'pi\')">π</button>' +
    '</div>' +
    '</div>' +
    '</div>';

  var navContainer = document.querySelector(".nav");
  if (navContainer) {
    navContainer.innerHTML = navHTML;
  }

  // 3. שעון ונתוני ניווט
  function updateClockAndDate() {
    var now = new Date();
    var gregEl = document.getElementById("navGregDate");
    var timeEl = document.getElementById("navLiveTime");
    if (gregEl)
      gregEl.innerText = now.toLocaleDateString("he-IL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    if (timeEl)
      timeEl.innerText = now.toLocaleTimeString("he-IL", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
  }

  async function loadNavData() {
    try {
      var now = new Date();
      var res = await fetch(
        "https://www.hebcal.com/converter?cfg=json&gy=" +
          now.getFullYear() +
          "&gm=" +
          (now.getMonth() + 1) +
          "&gd=" +
          now.getDate() +
          "&g2h=1"
      );
      var data = await res.json();
      var hebEl = document.getElementById("navHebrewDate");
      if (hebEl) hebEl.innerText = data.hebrew;
    } catch (e) {}

    try {
      var res = await fetch("https://open.er-api.com/v6/latest/USD");
      var data = await res.json();
      var usdEl = document.getElementById("navUsd");
      var eurEl = document.getElementById("navEur");
      if (usdEl) usdEl.innerText = "₪ " + data.rates.ILS.toFixed(2);
      if (eurEl)
        eurEl.innerText = "₪ " + (data.rates.ILS / data.rates.EUR).toFixed(2);
    } catch (e) {}

    try {
      var wRes = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=32.0853&longitude=34.7818&current_weather=true&daily=sunrise,sunset&timezone=auto"
      );
      var wData = await wRes.json();
      var weatherEl = document.getElementById("navWeather");
      if (weatherEl)
        weatherEl.innerText = Math.round(wData.current_weather.temperature) + "°C";
    } catch (e) {}
  }

  updateClockAndDate();
  setInterval(updateClockAndDate, 1000);
  loadNavData();
});

// 4. פונקציות המחשבון המדעי
var navCalcExpr = "";
var navCalcNewEntry = false;

function toggleNavCalculator() {
  var modal = document.getElementById('calcModal');
  if (modal) {
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'flex';
    }
  }
}

function navCalcPress(val) {
  var display = document.getElementById('navCalcDisplay');
  if (navCalcNewEntry) {
    if (['+', '-', '*', '/'].includes(val)) {
      navCalcNewEntry = false;
    } else {
      navCalcExpr = "";
      navCalcNewEntry = false;
    }
  }
  if (navCalcExpr === "0" && val !== ".") navCalcExpr = "";
  navCalcExpr += val;
  display.value = navCalcExpr;
}

function navCalcClear() {
  navCalcExpr = "";
  navCalcNewEntry = false;
  document.getElementById('navCalcDisplay').value = "0";
  document.getElementById('navCalcHistory').innerText = "";
}

function navCalcBackspace() {
  if (navCalcNewEntry) return;
  navCalcExpr = navCalcExpr.slice(0, -1);
  document.getElementById('navCalcDisplay').value = navCalcExpr || "0";
}

function navCalcPercent() {
  if (!navCalcExpr) return;
  try {
    var val = eval(navCalcExpr) / 100;
    navCalcExpr = val.toString();
    document.getElementById('navCalcDisplay').value = navCalcExpr;
  } catch (e) {}
}

function navCalcSci(type) {
  try {
    var val = eval(navCalcExpr || "0");
    var res = 0;
    if (type === 'sin') res = Math.sin(val * Math.PI / 180);
    else if (type === 'cos') res = Math.cos(val * Math.PI / 180);
    else if (type === 'tan') res = Math.tan(val * Math.PI / 180);
    else if (type === 'sqrt') res = Math.sqrt(val);
    else if (type === 'sqr') res = Math.pow(val, 2);
    else if (type === 'pi') { res = Math.PI; }

    res = Math.round(res * 100000000) / 100000000;
    document.getElementById('navCalcDisplay').value = res;
    navCalcExpr = res.toString();
    navCalcNewEntry = true;
  } catch (e) {
    document.getElementById('navCalcDisplay').value = "שגיאה";
  }
}

function navCalcEval() {
  if (!navCalcExpr) return;
  try {
    var historyText = navCalcExpr.replace(/\*/g, '×').replace(/\//g, '÷');
    document.getElementById('navCalcHistory').innerText = historyText + ' =';
    
    var res = eval(navCalcExpr);
    if (typeof res === 'number') {
      res = Math.round(res * 100000000) / 100000000;
    }
    document.getElementById('navCalcDisplay').value = res;
    navCalcExpr = res.toString();
    navCalcNewEntry = true;
  } catch (e) {
    document.getElementById('navCalcDisplay').value = "שגיאה";
    navCalcExpr = "";
  }
}
