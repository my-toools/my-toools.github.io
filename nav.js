(function() {
    var navContainer = document.querySelector('.nav');
    if (!navContainer) return;

    var navHTML = `
        <div class="nav-top-row">
            <div class="nav-links">
                <a href="index.html">זכויות עובדים</a>
                <a href="legal.html">כלים משפטיים</a>
                <a href="finance.html">פיננסים ומט"ח</a>
                <a href="utility.html">כלים שימושיים</a>
                <a href="tech.html">טכנולוגיה ומדיה</a>
                <a href="about.html">אודות ונגישות</a>
            </div>
            <a href="index.html" class="nav-logo-link">
                <img src="logo.png" alt="לוגו האתר" class="nav-logo">
            </a>
        </div>
        <div class="nav-widgets" id="navWidgets">
            <div class="widget-item">ריבית פריים: <span>6.00%</span></div>
            <div class="widget-divider">|</div>
            <div class="widget-item">שכר מינימום: <span>₪5,880</span></div>
            <div class="widget-divider">|</div>
            <div class="widget-item">דולר: <span id="navUsd">טוען...</span></div>
            <div class="widget-divider">|</div>
            <div class="widget-item">אירו: <span id="navEur">טוען...</span></div>
            <div class="widget-divider">|</div>
            <div class="widget-item"><span id="navHebrewDate">טוען תאריך עברי...</span></div>
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
