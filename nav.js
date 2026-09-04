document.addEventListener("DOMContentLoaded", function () {
  // 1. הזרקת עיצוב ה-CSS של חלון המחשבון הקופץ
  var style = document.createElement('style');
  style.innerHTML = `
    .calc-modal-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.7);
      z-index: 9999;
      justify-content: center;
      align-items: center;
    }
    .calc-modal-card {
      background: #ffffff;
      padding: 24px;
      border-radius: 16px;
      width: 300px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      position: relative;
      direction: rtl;
    }
    .calc-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 8px;
    }
    .calc-modal-header h3 { margin: 0; font-size: 18px; color: #1e3a8a; }
    .calc-close-btn {
      background: none; border: none; font-size: 20px; font-weight: bold; cursor: pointer; color: #64748b;
    }
    .calc-modal-screen {
      width: 100%; font-size: 22px; text-align: left; direction: ltr; font-weight: 700;
      background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 8px;
      box-sizing: border-box; margin-bottom: 12px;
    }
    .calc-modal-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .calc-modal-btn {
      background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; padding: 12px;
      border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer;
    }
    .calc-modal-btn.op { background: #1e3a8a; color: #ffffff; }
  `;
  document.head.appendChild(style);

  // 2. הזרקת הסרגל והמחשבון הקופץ ל-HTML
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
    
    // חלון קופץ של המחשבון
    '<div id="calcModal" class="calc-modal-overlay" onclick="if(event.target === this) toggleNavCalculator()">' +
    '<div class="calc-modal-card">' +
    '<div class="calc-modal-header"><h3>🧮 מחשבון מהיר</h3><button class="calc-close-btn" onclick="toggleNavCalculator()">×</button></div>' +
    '<input type="text" id="navCalcDisplay" class="calc-modal-screen" value="0" readonly>' +
    '<div class="calc-modal-grid">' +
    '<button class="calc-modal-btn" onclick="navCalcClear()">C</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'(\')">(</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\')\')">)</button>' +
    '<button class="calc-modal-btn op" onclick="navCalcPress(\'/\')">/</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'7\')">7</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'8\')">8</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'9\')">9</button>' +
    '<button class="calc-modal-btn op" onclick="navCalcPress(\'*\')">*</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'4\')">4</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'5\')">5</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'6\')">6</button>' +
    '<button class="calc-modal-btn op" onclick="navCalcPress(\'-\')">-</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'1\')">1</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'2\')">2</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'3\')">3</button>' +
    '<button class="calc-modal-btn op" onclick="navCalcPress(\'+\')">+</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'0\')">0</button>' +
    '<button class="calc-modal-btn" onclick="navCalcPress(\'.\')">.</button>' +
    '<button class="calc-modal-btn op" style="grid-column: span 2;" onclick="navCalcEval()">=</button>' +
    '</div>' +
    '</div>' +
    '</div>';

  var navContainer = document.querySelector(".nav");
  if (navContainer) {
    navContainer.innerHTML = navHTML;
  }

  // 3. לוגיקת השעון והמידע
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

// 4. פונקציות המחשבון הקופץ
var navCalcExpr = "";
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
  if (navCalcExpr === "0") navCalcExpr = "";
  navCalcExpr += val;
  document.getElementById('navCalcDisplay').value = navCalcExpr;
}
function navCalcClear() {
  navCalcExpr = "";
  document.getElementById('navCalcDisplay').value = "0";
}
function navCalcEval() {
  try {
    var res = eval(navCalcExpr);
    document.getElementById('navCalcDisplay').value = res;
    navCalcExpr = res.toString();
  } catch (e) {
    document.getElementById('navCalcDisplay').value = "שגיאה";
    navCalcExpr = "";
  }
}
