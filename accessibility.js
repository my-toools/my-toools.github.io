<!-- כפתור הנגישות הצף -->
<button id="accessibility-toggle" aria-label="פתיחת תפריט נגישות" onclick="toggleAccessibilityMenu()">
    <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28" fill="currentColor">
        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
    </svg>
</button>

<!-- חלונית תפריט הנגישות המקצועי -->
<div id="accessibility-menu" aria-hidden="true">
    <div class="accessibility-header">
        <h3>תפריט נגישות מתקדם</h3>
        <button onclick="toggleAccessibilityMenu()" aria-label="סגור תפריט">×</button>
    </div>
    
    <div class="accessibility-body">
        <!-- קבוצת תצוגה וגודל טקסט -->
        <div class="accessibility-section">
            <p>גודל טקסט ותצוגה</p>
            <button onclick="changeFontSize(2)">הגדל טקסט (+)</button>
            <button onclick="changeFontSize(-2)">הקטן טקסט (-)</button>
            <button onclick="resetFontSize()">איפוס גודל טקסט</button>
        </div>

        <!-- קבוצת צבעים וניגודיות -->
        <div class="accessibility-section">
            <p>ניגודיות וצבעים</p>
            <button onclick="toggleMode('high-contrast')">ניגודיות גבוהה (שחור/צהוב)</button>
            <button onclick="toggleMode('grayscale')">גווני אפור</button>
            <button onclick="toggleMode('invert')">היפוך צבעים</button>
        </div>

        <!-- קבוצת עזרים וקריאות -->
        <div class="accessibility-section">
            <p>עזרי קריאה וניווט</p>
            <button onclick="toggleMode('highlight-links')">הדגשת קישורים</button>
            <button onclick="toggleMode('readable-font')">גופן קריא (Arial)</button>
            <button onclick="toggleMode('stop-animations')">עצירת אנימציות והבהובים</button>
            <button onclick="toggleMode('big-cursor')">סמן עכבר מוגדל</button>
        </div>

        <!-- כפתור איפוס כללי -->
        <div class="accessibility-section">
            <button class="reset-all-btn" onclick="resetAllAccessibility()">איפוס כל ההגדרות</button>
        </div>
        
        <div class="accessibility-footer-statement">
            <a href="/accessibility-statement" target="_blank">הצהרת נגישות לאתר</a>
        </div>
    </div>
</div>

<style>
/* עיצוב כפתור הנגישות הצף */
#accessibility-toggle {
    position: fixed;
    bottom: 25px;
    left: 25px;
    z-index: 999999;
    background-color: #004080;
    color: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s, background-color 0.2s;
}
#accessibility-toggle:hover {
    transform: scale(1.08);
    background-color: #002b5c;
}

/* עיצוב חלונית התפריט */
#accessibility-menu {
    position: fixed;
    bottom: 95px;
    left: 25px;
    width: 330px;
    max-height: 82vh;
    background: #ffffff;
    color: #222222;
    border-radius: 14px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
    z-index: 999999;
    display: none;
    flex-direction: column;
    direction: rtl;
    border: 1px solid #dcdcdc;
    font-family: inherit;
}
#accessibility-menu.open {
    display: flex;
}

.accessibility-header {
    background: #004080;
    color: white;
    padding: 14px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
}
.accessibility-header h3 {
    margin: 0;
    font-size: 17px;
    font-weight: bold;
}
.accessibility-header button {
    background: none;
    border: none;
    color: white;
    font-size: 26px;
    cursor: pointer;
    line-height: 1;
}

.accessibility-body {
    padding: 15px;
    overflow-y: auto;
    max-height: calc(82vh - 65px);
}

.accessibility-section {
    margin-bottom: 14px;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px;
}
.accessibility-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}
.accessibility-section p {
    margin: 0 0 8px 0;
    font-weight: bold;
    font-size: 13px;
    color: #555555;
    text-transform: uppercase;
}
.accessibility-section button {
    width: 100%;
    padding: 9px 12px;
    margin-bottom: 6px;
    background: #f8f9fa;
    border: 1px solid #ced4da;
    border-radius: 8px;
    cursor: pointer;
    text-align: right;
    font-size: 13px;
    color: #333333;
    transition: background 0.2s, border-color 0.2s;
}
.accessibility-section button:hover {
    background: #e9ecef;
    border-color: #adb5bd;
}
.reset-all-btn {
    background: #d9534f !important;
    color: white !important;
    border-color: #d43f3a !important;
    font-weight: bold;
}
.reset-all-btn:hover {
    background: #c9302c !important;
}
.accessibility-footer-statement {
    text-align: center;
    margin-top: 12px;
    font-size: 12px;
}
.accessibility-footer-statement a {
    color: #004080;
    text-decoration: underline;
}

/* מחלקות ההתאמה שמופעלות על האתר */
body.high-contrast {
    background-color: #000000 !important;
    color: #ffff00 !important;
}
body.high-contrast * {
    background-color: #000000 !important;
    color: #ffff00 !important;
    border-color: #ffff00 !important;
}
body.grayscale {
    filter: grayscale(100%) !important;
}
body.invert-colors {
    filter: invert(100%) !important;
}
body.highlight-links a {
    background-color: #ffff00 !important;
    color: #000000 !important;
    border: 2px solid #ff0000 !important;
    text-decoration: underline !important;
}
body.readable-font, body.readable-font * {
    font-family: Arial, Helvetica, sans-serif !important;
}
body.stop-animations *, body.stop-animations *:before, body.stop-animations *:after {
    animation: none !important;
    transition: none !important;
}
body.big-cursor, body.big-cursor * {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="black" stroke="white" stroke-width="1"><polygon points="0,0 0,22 6,16 12,24 16,21 10,14 18,14"/></svg>'), auto !important;
}
</style>

<script>
// פתיחה וסגירה של חלונית הנגישות
function toggleAccessibilityMenu() {
    const menu = document.getElementById('accessibility-menu');
    const isOpen = menu.classList.toggle('open');
    menu.setAttribute('aria-hidden', !isOpen);
}

// הגדלה והקטנה פרופורציונלית של טקסט
let currentFontSize = 16;
function changeFontSize(step) {
    currentFontSize += step;
    if(currentFontSize < 12) currentFontSize = 12;
    if(currentFontSize > 26) currentFontSize = 26;
    document.documentElement.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('a11y_font_size', currentFontSize);
}
function resetFontSize() {
    currentFontSize = 16;
    document.documentElement.style.fontSize = '16px';
    localStorage.removeItem('a11y_font_size');
}

// הפעלה וכיבוי של מצבי הנגישות השונים
function toggleMode(className) {
    document.body.classList.toggle(className);
    const isActive = document.body.classList.contains(className);
    localStorage.setItem('a11y_' + className, isActive);
}

// איפוס מוחלט של כל ההגדרות
function resetAllAccessibility() {
    resetFontSize();
    const modes = ['high-contrast', 'grayscale', 'invert-colors', 'highlight-links', 'readable-font', 'stop-animations', 'big-cursor'];
    modes.forEach(mode => {
        document.body.classList.remove(mode);
        localStorage.removeItem('a11y__' + mode);
        localStorage.removeItem('a11y_' + mode);
    });
    localStorage.clear();
}

// טעינת ההגדרות השמורות של הגולש בעת טעינת העמוד
window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('a11y_font_size')) {
        currentFontSize = parseInt(localStorage.getItem('a11y_font_size'));
        document.documentElement.style.fontSize = currentFontSize + 'px';
    }
    const modes = ['high-contrast', 'grayscale', 'invert-colors', 'highlight-links', 'readable-font', 'stop-animations', 'big-cursor'];
    modes.forEach(mode => {
        if(localStorage.getItem('a11y_' + mode) === 'true') {
            document.body.classList.add(mode);
        }
    });
});
</script>
