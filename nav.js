document.addEventListener("DOMContentLoaded", function () {
  // 1. הזרקת עיצוב ה-CSS המודרני והיוקרתי של המחשבון
  var style = document.createElement('style');
  style.innerHTML = `
    .calc-modal-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      z-index: 9999;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .calc-modal-card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 28px;
      border-radius: 24px;
      width: 100%;
      max-width: 380px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      position: relative;
      direction: rtl;
      font-family: 'Heebo', sans-serif;
    }
    .calc-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 12px;
    }
    .calc-modal-header h3 {
      margin: 0; font-size: 20px; color: #f8fafc; font-weight: 800; display: flex; align-items: center; gap: 8px;
    }
    .calc-close-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      font-size: 22px;
      font-weight: bold;
      cursor: pointer;
      color: #cbd5e1;
      width: 36px;
      height: 36px;
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
      padding: 16px 20px;
      border-radius: 16px;
      margin-bottom: 20px;
      text-align: left;
      direction: ltr;
    }
    .calc-history {
      font-size: 14px;
      color: #94a3b8;
      min-height: 20px;
      margin-bottom: 4px;
      word-break: break-all;
    }
    .calc-modal-screen {
      width: 100%;
      font-size: 32px;
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
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    .calc-btn {
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 18px 0;
      border-radius: 14px;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }
    .calc-btn:hover {
      background: #334155;
      transform: translateY(-2px);
    }
    .calc-btn:active {
      transform: translateY(0);
    }
    .calc-btn.op {
      background: #1d4ed8;
      color: #ffffff;
    }
    .calc-btn.op:hover {
      background: #2563eb;
    }
    .calc-btn.func {
      background: #334155;
      color: #38bdf8;
    }
    .calc-btn.func:hover {
      background: #475569;
    }
    .calc-btn.equals {
      background: #0284c7;
      color: #ffffff;
      grid-column: span 2;
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

  // 2. הזרקת ה-HTML של הסרגל והמחשבון המעוצב
  var navHTML =
    '<div class="nav-top-row">' +
    '<div class="nav-links">' +
    '<a href="index.html">💼 זכויות עובדים</a>' +
    '<a href="legal.html">⚖️ כלים משפטיים</a>' +
    '<a href="finance.html">💰 מט"ח ופיננסים</a>' +
    '<a href="javascript:void(0)" onclick="toggleNavCalculator()" class="nav-logo-link" title="לחצי לפתיחת מחשבון"><img src="favicon.png" alt="לוגו" class="nav-logo"></a>' +
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
    '<div class="widget-item">🌅 <span id="navSunrise">--:--</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item">🌇 <span id="navSunset">--:--</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> <span id="navUsd">--</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12"></path><path d="M4 14h9"></path><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12a7.9 7.9 0 0 0 7.8 8 7.7 7.7 0 0 0 5.2-2"></path></svg> <span id="navEur">--</span></div>' +
    '<span class="widget-divider">|</span>' +
    '<div class="widget-item">🌤️ <span id="navWeather">--</span></div>' +
    "</div>" +

    // חלון קופץ של המחשבון היוקרתי
    '<div id="calcModal" class="calc-modal-overlay" onclick="if(event.target === this) toggleNavCalculator()">' +
    '<div class="calc-modal-card">' +
    '<div class="calc-modal-header"><h3>🧮 מחשבון מקצועי</h3><button class="calc-close-btn" onclick="toggleNavCalculator()">×</button></div>' +
    '<div class="calc-display-container">' +
    '<div id="navCalcHistory" class="calc-history"></div>' +
    '<input type="text" id="navCalcDisplay" class="calc-modal-screen" value="0" readonly>' +
    '</div>' +
    '<div class="calc-modal-grid">' +
    '<button class="calc-btn clear" onclick="navCalcClear()">C</button>' +
    '<button class="calc-btn func" onclick="navCalcBackspace()">⌫</button>' +
    '<button class="calc-btn func" onclick="navCalcPercent()">%</button>' +
    '<button class="calc-btn op" onclick="navCalcPress(\'/\')">÷</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'7\')">7</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'8\')">8</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'9\')">9</button>' +
    '<button class="calc-btn op" onclick="navCalcPress(\'*\')">×</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'4\')">4</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'5\')">5</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'6\')">6</button>' +
    '<button class="calc-btn op" onclick="navCalcPress(\'-\')">-</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'1\')">1</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'2\')">2</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'3\')">3</button>' +
    '<button class="calc-btn op" onclick="navCalcPress(\'+\')">+</button>' +
    '<button class="calc-btn func" onclick="navCalcPlusMinus()">±</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'0\')">0</button>' +
    '<button class="calc-btn" onclick="navCalcPress(\'.\')">.</button>' +
    '<button class="calc-btn equals" style="grid-column: span 1;" onclick="navCalcEval()">=</button>' +
    '</div>' +
    '</div>' +
    '</div>';

  var navContainer = document.querySelector(".nav");
  if (navContainer) {
    navContainer.innerHTML = navHTML;
  }

  // 3. שעון ונתוני הניווט
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
      var sunriseEl = document.getElementById("navSunrise");
      var sunsetEl = document.getElementById("navSunset");
      if (weatherEl)
        weatherEl.innerText =
          Math.round(wData.current_weather.temperature) + "°C";
      if (sunriseEl) sunriseEl.innerText = wData.daily.sunrise[0].split("T")[1];
      if (sunsetEl) sunsetEl.innerText = wData.daily.sunset[0].split("T")[1];
    } catch (e) {}
  }

  updateClockAndDate();
  setInterval(updateClockAndDate, 1000);
  loadNavData();
});

// 4. פונקציות המחשבון המקצועי
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

function navCalcPlusMinus() {
  if (!navCalcExpr) return;
  if (navCalcExpr.startsWith('-')) {
    navCalcExpr = navCalcExpr.slice(1);
  } else {
    navCalcExpr = '-' + navCalcExpr;
  }
  document.getElementById('navCalcDisplay').value = navCalcExpr;
}

function navCalcPercent() {
  if (!navCalcExpr) return;
  try {
    var val = eval(navCalcExpr) / 100;
    navCalcExpr = val.toString();
    document.getElementById('navCalcDisplay').value = navCalcExpr;
  } catch (e) {}
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
