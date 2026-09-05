// הגדלת הכותרת, הסרגל והסרגל הצמוד אליו
const customHeaderStyle = document.createElement('style');
customHeaderStyle.innerHTML = `
    /* הגדלת הסרגל הראשי והסרגל הצמוד */
    header, nav, .main-header, .navbar, .sub-nav, .secondary-nav {
        padding: 20px 25px !important;
        min-height: 80px !important;
    }

    /* הגדלת הכותרת והלוגו */
    header h1, .logo, .navbar-brand, nav h1 {
        font-size: 28px !important;
        font-weight: 800 !important;
    }

    /* הגדלת הקישורים בכל הסרגלים */
    header a, nav a, .nav-link, .sub-nav a, .secondary-nav a {
        font-size: 18px !important;
        padding: 10px 15px !important;
    }
`;
document.head.appendChild(customHeaderStyle);
