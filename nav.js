(function() {
    var navContainer = document.querySelector('.nav');
    if (!navContainer) return;

    var navHTML = `
        <div class="nav-top-row">
            <div class="nav-links">
                <a href="index.html"><i class="fa-solid fa-briefcase"></i> זכויות עובדים</a>
                <a href="legal.html"><i class="fa-solid fa-scale-balanced"></i> כלים משפטיים</a>
                <a href="finance.html"><i class="fa-solid fa-chart-line"></i> פיננסים ומט"ח</a>
                <a href="utility.html"><i class="fa-solid fa-toolbox"></i> כלים שימושיים</a>
                <a href="tech.html"><i class="fa-solid fa-laptop-code"></i> טכנולוגיה ומדיה</a>
                <a href="about.html"><i class="fa-solid fa-circle-info"></i> אודות ונגישות</a>
            </div>
            <a href="index.html" class="nav-logo-link">
                <img src="logo.png" alt="לוגו האתר" class="nav-logo">
            </a>
        </div>
        <div class="nav-widgets" id="navWidgets">
            <div class="widget-item"><i class="fa-solid fa-percent" style="color:#38bdf8;"></i> ריבית פריים: <span>6.00%</span></div>
            <div class="widget-divider">|</div>
            <div class="widget-item"><i class="fa-solid fa-shekel-sign" style="color:#38bdf8;"></i> שכר מינימום: <span>₪5,880</span></div>
            <div class="widget-divider">|</div>
            <div class="widget-item"><i class="fa-solid fa-dollar-sign" style="color:#38bdf8;"></i> דולר: <span id="navUsd">טוען...</span></div>
            <div class="widget-divider">|</div>
            <div class="widget-item"><i class="fa-solid fa-euro-sign" style="color:#38bdf8;"></i> אירו: <span id="navEur">טוען...</span></div>
            <div class="widget-divider">|</div>
            <div class="widget-item"><i class="fa-solid fa-calendar-days" style="color:#38bdf8;"></i> <span id="navHebrewDate">טוען תאריך עברי...</span></div>
        </div>
    `;

    navContainer.innerHTML = navHTML;

    async function updateNavData() {
        try {
            var res = await fetch("https://open.er-api.com/v6/latest/USD");
            var data = await res.json();
            if (data && data.rates && data.rates.ILS) {
                var usdIls = data.rates.ILS;
                document.getElementById('navUsd').innerText = "₪" + usdIls.toFixed(2);
                if (data.rates.EUR) {
                    var eurIls = (1 / data.rates.EUR) * usdIls;
                    document.getElementById('navEur').innerText = "₪" + eurIls.toFixed(2);
                }
            }
        } catch (e) {}

        try {
            var hebRes = await fetch("https://www.hebcal.com/etc/hdate-he.json");
            var hebData = await hebRes.json();
            if (hebData && hebData.hebrew) {
                document.getElementById('navHebrewDate').innerText = hebData.hebrew;
            }
        } catch (e) {}
    }

    updateNavData();
})();
