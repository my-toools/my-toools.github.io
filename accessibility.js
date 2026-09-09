<!-- כפתור הנגישות הצף -->
<button id="accessibility-toggle" aria-label="תפריט נגישות" onclick="toggleAccessibilityMenu()">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
    </svg>
</button>

<!-- חלונית תפריט הנגישות -->
<div id="accessibility-menu" aria-hidden="true">
    <div class="accessibility-header">
        <h3>הגדרות נגישות</h3>
        <button onclick="toggleAccessibilityMenu()" aria-label="סגור תפריט">×</button>
    </div>
    
    <div class="accessibility-body">
        <div class="accessibility-section">
            <p>גודל טקסט</p>
            <button onclick="changeFontSize(2)">הגדל טקסט (+)</button>
            <button onclick="changeFontSize(-2)">הקטן טקסט (-)</button>
            <button onclick="resetFontSize()">איפוס גודל</button>
        </div>

        <div class="accessibility-section">
            <p>ניגודיות וצבעים</p>
            <button onclick="toggleContrast('high-contrast')">ניגודיות גבוהה (שחור/צהוב)</button>
            <button onclick="toggleContrast('grayscale')">גווני אפור</button>
            <button onclick="toggleContrast('invert')">היפוך צבעים</button>
        </div>

        <div class="accessibility-section">
            <p>ניווט ומיקוד</p>
            <button onclick="toggleHighlightLinks()">הדגשת קישורים</button>
            <button onclick="toggleReadableFont()">גופן קריא</button>
        </div>

        <div class="accessibility-section">
            <button class="reset-all-btn" onclick="resetAllAccessibility()">איפוס כל ההגדרות</button>
        </div>
        
        <div class="accessibility-footer-statement">
            <a href="/accessibility-statement" target="_blank">הצהרת נגישות</a>
        </div>
    </div>
</div>

<style>
/* עיצוב כפתור הנגישות הצף */
#accessibility-toggle {
    position: fixed;
    bottom: 20px;
    left: 20px; /* ניתן לשנות לימין: right: 20px; */
    z-index: 99999;
    background-color: #0056b3;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
}
#accessibility-toggle:hover {
    transform: scale(1.1);
}

/* עיצוב חלונית התפריט */
#accessibility-menu {
    position: fixed;
    bottom: 85px;
    left: 20px;
    width: 320px;
    max-height: 80vh;
    background: #ffffff;
    color: #333333;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.2);
    z-index: 99999;
    display: none;
    flex-direction: column;
    direction: rtl;
    border: 1px solid #ddd;
    font-family: inherit;
}
#accessibility-menu.open {
    display: flex;
}

.accessibility-header {
    background: #0056b3;
    color: white;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
.accessibility-header h3 {
    margin: 0;
    font-size: 18px;
}
.accessibility-header button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.accessibility-body {
    padding: 15px;
    overflow-y: auto;
    max-height: calc(80vh - 60px);
}

.accessibility-section {
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}
.accessibility-section p {
    margin: 0 0 8px 0;
    font-weight: bold;
    font-size: 14px;
    color: #444;
}
.accessibility-section button {
    width: 100%;
    padding: 8px 10px;
    margin-bottom: 6px;
    background: #f4f4f4;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    text-align: right;
    font-size: 13px;
    transition: background 0.2s;
}
.accessibility-section button:hover {
    background: #e2e6ea;
}
.reset-all-btn {
    background: #dc3545 !important;
    color: white !important;
    border-color: #bd2130 !important;
    font-weight: bold;
}
.accessibility-footer-statement {
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
}
.accessibility-footer-statement a {
    color: #0056b3;
    text-decoration: underline;
}

/* מחלקות (Classes) המופעלות על ידי ה-JS */
body.high-contrast {
    background-color: #000 !important;
    color: #ff0 !important;
}
body.high-contrast * {
    background-color: #000 !important;
    color: #ff0 !important;
    border-color: #ff0 !important;
}
body.grayscale {
    filter: grayscale(100%) !important;
}
body.invert-colors {
    filter: invert(100%) !important;
}
body.highlight-links a {
    background-color: yellow !important;
    color: #000 !important;
    border: 2px solid red !important;
}
body.readable-font * {
    font-family: Arial, Helvetica, sans-serif !important;
}
</style>

<script>
// פתיחה וסגירת התפריט
function toggleAccessibilityMenu() {
    const menu = document.getElementById('accessibility-menu');
    const isOpen = menu.classList.toggle('open');
    menu.setAttribute('aria-hidden', !isOpen);
}

// שינוי גודל טקסט דינמי
let currentFontSize = 16;
function changeFontSize(step) {
    currentFontSize += step;
    if(currentFontSize < 12) currentFontSize = 12;
    if(currentFontSize > 24) currentFontSize = 24;
    document.documentElement.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('a11y_font_size', currentFontSize);
}
function resetFontSize() {
    currentFontSize = 16;
    document.documentElement.style.fontSize = '16px';
    localStorage.removeItem('a11y_font_size');
}

// ניגודיות ומצבי צבע
function toggleContrast(className) {
    document.body.classList.remove('high-contrast', 'grayscale', 'invert-colors');
    if(className) {
        document.body.classList.add(className);
        localStorage.setItem('a11y_contrast', className);
    } else {
        localStorage.removeItem('a11y_contrast');
    }
}

// הדגשת קישורים
function toggleHighlightLinks() {
    document.body.classList.toggle('highlight-links');
    localStorage.setItem('a11y_links', document.body.classList.contains('highlight-links'));
}

// פונט קריא
function toggleReadableFont() {
    document.body.classList.toggle('readable-font');
    localStorage.setItem('a11y_font', document.body.classList.contains('readable-font'));
}

// איפוס מלא
function resetAllAccessibility() {
    resetFontSize();
    toggleContrast(null);
    if(document.body.classList.contains('highlight-links')) toggleHighlightLinks();
    if(document.body.classList.contains('readable-font')) toggleReadableFont();
    localStorage.clear();
}

// טעינת שמירת הגשת המשתמש מרענון קודם
window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('a11y_font_size')) {
        currentFontSize = parseInt(localStorage.getItem('a11y_font_size'));
        document.documentElement.style.fontSize = currentFontSize + 'px';
    }
    if(localStorage.getItem('a11y_contrast')) {
        document.body.classList.add(localStorage.getItem('a11y_contrast'));
    }
    if(localStorage.getItem('a11y_links') === 'true') {
        document.body.classList.add('highlight-links');
    }
    if(localStorage.getItem('a11y_font') === 'true') {
        document.body.classList.add('readable-font');
    }
});
</script>
