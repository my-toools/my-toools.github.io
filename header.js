// ======================================================
// NeTools - Header + Live Data Bar + Footer
// עיצוב אחיד לכל האתר
// ======================================================


// ======================================================
// 1. Font Awesome
// ======================================================

if (!document.getElementById("fa-cdn")) {

    const faLink = document.createElement("link");

    faLink.id = "fa-cdn";
    faLink.rel = "stylesheet";
    faLink.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";

    document.head.appendChild(faLink);
}


// ======================================================
// 2. Favicon
// ======================================================

let favicon =
    document.querySelector("link[rel*='icon']");

if (!favicon) {

    favicon =
        document.createElement("link");

    favicon.rel = "icon";

    document.head.appendChild(favicon);
}

favicon.type = "image/png";
favicon.href = "/favicon.png?v=5";


// ======================================================
// 3. CSS
// ======================================================

const styleId =
    "netools-global-layout";

if (!document.getElementById(styleId)) {

    const style =
        document.createElement("style");

    style.id = styleId;

    style.textContent = `


/* =====================================================
   בסיס
===================================================== */

html,
body {

    margin: 0 !important;
    padding: 0 !important;

}


body {

    min-height: 100vh;

    display: flex;
    flex-direction: column;

}


/*
הרקע הקיים של האתר נשאר.
אין כאן הגדרה שמחליפה אותו.
*/


body > *:not(header):not(footer):not(.calc-modal-overlay):not(#acc-floating-btn) {

    width: 100%;

    max-width: 1200px;

    margin-left: auto;
    margin-right: auto;

    box-sizing: border-box;

    flex: 1;

}



/* =====================================================
   HEADER ראשי
===================================================== */

header.main-header {

    width: 100%;

    position: sticky;

    top: 0;

    z-index: 10000;

    background:
        rgba(255,255,255,.97);

    backdrop-filter:
        blur(16px);

    -webkit-backdrop-filter:
        blur(16px);

    border-bottom:
        1px solid #e8eef7;

    box-shadow:
        0 4px 18px rgba(23,57,110,.06);

}


.header-container {

    max-width: 1480px;

    min-height: 76px;

    margin: 0 auto;

    padding:
        9px 24px;

    box-sizing: border-box;

    display: grid;

    grid-template-columns:
        auto 1fr auto;

    align-items: center;

    gap: 24px;

}



/* =====================================================
   LOGO
===================================================== */

.brand-name {

    display: flex;

    align-items: center;

    text-decoration: none;

    white-space: nowrap;

}


.brand-logo {

    display: block;

    width: 165px;

    max-height: 54px;

    height: auto;

    object-fit: contain;

}



/* =====================================================
   MENU
===================================================== */

.main-nav-wrapper {

    display: flex;

    align-items: center;

    justify-content: center;

    min-width: 0;

}


.main-nav {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 7px;

    list-style: none;

    padding: 0;

    margin: 0;

    flex-wrap: wrap;

}


.main-nav li {

    margin: 0;

    padding: 0;

}


.main-nav a {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    min-height: 40px;

    padding:
        7px 15px;

    border-radius: 11px;

    font-size: 14.5px !important;

    font-weight: 600;

    text-decoration: none;

    color:
        #243b6b !important;

    border:
        1px solid transparent;

    background:
        transparent;

    transition:
        background .18s ease,
        border-color .18s ease,
        color .18s ease,
        transform .18s ease;

    white-space: nowrap;

}


.main-nav a:hover {

    background:
        #f4f8ff;

    border-color:
        #dfe9f7;

    color:
        #0878f9 !important;

    transform:
        translateY(-1px);

}



/*
הצבעים המקוריים של הקטגוריות נשארים
אבל בצורה עדינה ובהירה יותר
*/

.nav-item-home {

    border-color:
        rgba(14,165,233,.22) !important;

}


.nav-item-rights {

    border-color:
        rgba(34,197,94,.22) !important;

}


.nav-item-legal {

    border-color:
        rgba(168,85,247,.22) !important;

}


.nav-item-zmanim {

    border-color:
        rgba(236,72,153,.22) !important;

}


.nav-item-finance {

    border-color:
        rgba(6,182,212,.22) !important;

}


.nav-item-utility {

    border-color:
        rgba(249,115,22,.22) !important;

}


.nav-item-news {

    border-color:
        rgba(245,158,11,.22) !important;

}


.nav-item-world {

    border-color:
        rgba(14,165,233,.22) !important;

}



/* =====================================================
   ALERT BUTTON
===================================================== */

.header-alert-wrapper {

    display: flex;

    align-items: center;

    justify-content: center;

}


.header-alert-btn {

    position: relative;

    width: 43px;

    height: 43px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 13px;

    color:
        #e5484d !important;

    text-decoration: none;

    background:
        #fff5f5;

    border:
        1px solid #ffd8d8;

    font-size: 19px;

    transition:
        all .18s ease;

}


.header-alert-btn:hover {

    background:
        #ffecec;

    border-color:
        #ffc5c5;

    transform:
        translateY(-1px);

}



/* =====================================================
   MOBILE BUTTON
===================================================== */

.mobile-toggle-btn {

    display: none;

    width: 43px !important;

    height: 43px !important;

    align-items: center;

    justify-content: center;

    border-radius: 12px !important;

    border:
        1px solid #dce8f7 !important;

    background:
        #f7faff !important;

    color:
        #0a78fe !important;

    cursor: pointer;

    font-size: 19px !important;

    box-shadow: none !important;

}



/* =====================================================
   DATA BAR
===================================================== */

.secondary-bar {

    width: 100%;

    box-sizing: border-box;

    background:
        #ffffff;

    border-top:
        1px solid #edf2f8;

    border-bottom:
        1px solid #e5ebf4;

    padding:
        9px 18px !important;

    box-shadow:
        0 7px 18px rgba(20,50,100,.055);

}


.secondary-container {

    max-width: 1650px;

    margin: 0 auto;

    display: flex;

    flex-direction: row;

    align-items: center;

    justify-content: flex-start;

    gap:
        0 !important;

    white-space: nowrap;

    overflow-x: auto;

    direction: rtl;

    scrollbar-width: none;

}


.secondary-container::-webkit-scrollbar {

    display: none;

}


.widget-item {

    min-height: 35px;

    display: inline-flex;

    align-items: center;

    gap: 6px;

    flex-shrink: 0;

    padding:
        0 15px;

    color:
        #64748b;

    font-size:
        13.5px !important;

    font-weight: 500;

    border-left:
        1px solid #e8edf5;

}


.widget-item:last-child {

    border-left: 0;

}


.widget-item strong {

    color:
        #1e3767;

    font-weight: 700;

}


/* צבעי האייקונים */

.icon-weather {

    color:
        #2da7ff;

}


.icon-clock {

    color:
        #1687ff;

}


.icon-date {

    color:
        #2676e8;

}


.icon-hebrew {

    color:
        #7c3aed;

}


.icon-parasha {

    color:
        #8b5cf6;

}


.icon-sun {

    color:
        #f7a900;

}


.icon-usd {

    color:
        #17a65b;

}


.icon-eur {

    color:
        #008fd5;

}


.icon-btc {

    color:
        #f59e0b;

}


.icon-prime {

    color:
        #f97316;

}


.icon-cpi {

    color:
        #a855f7;

}


.icon-wage {

    color:
        #e5418b;

}



/* =====================================================
   FOOTER
===================================================== */

footer.main-footer {

    width: 100% !important;

    max-width: none !important;

    box-sizing: border-box;

    margin-top:
        auto !important;

    padding:
        32px 20px 28px;

    text-align: center;

    background:
        #ffffff !important;

    border-top:
        1px solid #e5ebf4;

    box-shadow:
        0 -8px 24px rgba(20,50,100,.035);

    color:
        #263b69 !important;

    font-size:
        14px;

}


footer.main-footer p {

    margin:
        7px auto;

    color:
        #425574 !important;

}


footer.main-footer p:first-child {

    color:
        #16346c !important;

    font-size:
        15px;

    font-weight:
        700;

}


footer.main-footer a {

    margin:
        0 8px;

    text-decoration:
        none;

    color:
        #0878f9 !important;

    font-weight:
        600;

    transition:
        color .18s ease;

}


footer.main-footer a:hover {

    color:
        #005ec7 !important;

    text-decoration:
        underline;

}



/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 1050px) {

    .header-container {

        gap: 12px;

    }


    .main-nav {

        gap: 5px;

    }


    .main-nav a {

        padding:
            7px 10px;

        font-size:
            13.5px !important;

    }

}



@media (max-width: 768px) {

    .header-container {

        min-height: 64px;

        display: flex !important;

        flex-direction: row !important;

        justify-content: space-between !important;

        align-items: center !important;

        padding:
            8px 14px !important;

        position: relative !important;

    }


    .mobile-toggle-btn {

        display: flex !important;

        order: 1 !important;

    }


    .brand-name {

        order:
            2 !important;

        margin:
            0 auto !important;

    }


    .brand-logo {

        width:
            130px;

        max-height:
            45px;

    }


    .header-alert-wrapper {

        order:
            3 !important;

    }


    .main-nav-wrapper {

        display:
            none;

        position:
            absolute;

        top:
            100%;

        right:
            10px;

        left:
            10px;

        width:
            auto;

        padding:
            13px;

        border-radius:
            0 0 18px 18px;

        background:
            #ffffff;

        border:
            1px solid #e1e8f2;

        box-shadow:
            0 18px 30px rgba(18,48,92,.13);

        z-index:
            99999;

    }


    .main-nav-wrapper.open {

        display:
            flex !important;

    }


    .main-nav {

        width:
            100%;

        flex-direction:
            column !important;

        gap:
            7px !important;

    }


    .main-nav li,
    .main-nav a {

        width:
            100% !important;

        box-sizing:
            border-box;

    }


    .main-nav a {

        padding:
            11px 14px !important;

        background:
            #f9fbff;

    }


    /*
    הנתונים מתחילים מצד ימין:
    מזג אוויר -> שעה -> תאריך...
    */

    .secondary-bar {

        padding:
            7px 0 !important;

    }


    .secondary-container {

        justify-content:
            flex-start;

        padding:
            0 8px;

    }


    .widget-item {

        padding:
            0 12px;

        font-size:
            12.5px !important;

    }


    footer.main-footer {

        padding:
            26px 15px 24px;

        font-size:
            13px;

    }


    footer.main-footer a {

        display:
            inline-block;

        margin:
            4px 7px;

    }

}



/* =====================================================
   CALC MODAL
   נשמר כדי לא לפגוע בכלים קיימים
===================================================== */

.calc-modal-overlay {

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background:
        rgba(15,23,42,.75);

    backdrop-filter:
        blur(8px);

    display:
        none;

    justify-content:
        center;

    align-items:
        center;

    z-index:
        99999;

}


.calc-modal {

    background:
        #ffffff;

    border:
        1px solid #e3e9f3;

    border-radius:
        20px;

    padding:
        22px;

    width:
        min(380px, calc(100% - 30px));

    color:
        #10245d;

    box-shadow:
        0 20px 40px rgba(18,48,92,.18);

    direction:
        ltr;

}

    `;

    document.head.appendChild(style);
}



// ======================================================
// 4. HEADER HTML
// ======================================================

const headerHtml = `

<header class="main-header">

    <div class="header-container">


        <a
            href="index.html"
            class="brand-name"
            aria-label="NeTools"
        >

            <img
                src="/logo.png"
                alt="NeTools"
                class="brand-logo"
            >

        </a>



        <button
            class="mobile-toggle-btn"
            id="menuToggleBtn"
            aria-label="פתח תפריט"
        >

            <i class="fa-solid fa-bars"></i>

        </button>



        <div class="main-nav-wrapper">

            <ul class="main-nav">


                <li>

                    <a
                        href="index.html"
                        class="nav-item-home"
                    >
                        דף הבית
                    </a>

                </li>


                <li>

                    <a
                        href="rights.html"
                        class="nav-item-rights"
                    >
                        זכויות עובדים
                    </a>

                </li>


                <li>

                    <a
                        href="legal.html"
                        class="nav-item-legal"
                    >
                        כלים משפטיים
                    </a>

                </li>


                <li>

                    <a
                        href="zmanim.html"
                        class="nav-item-zmanim"
                    >
                        זמנים
                    </a>

                </li>


                <li>

                    <a
                        href="world.html"
                        class="nav-item-world"
                    >
                        עולם ומפות
                    </a>

                </li>


                <li>

                    <a
                        href="finance.html"
                        class="nav-item-finance"
                    >
                        פיננסים ומט"ח
                    </a>

                </li>


                <li>

                    <a
                        href="tools.html"
                        class="nav-item-utility"
                    >
                        כלים שימושיים
                    </a>

                </li>


                <li>

                    <a
                        href="news.html"
                        class="nav-item-news"
                    >
                        חדשות
                    </a>

                </li>


            </ul>

        </div>



        <div class="header-alert-wrapper">

            <a
                href="alerts.html"
                class="header-alert-btn"
                title="מרכז ההתרעות והחירום"
                aria-label="מרכז ההתרעות והחירום"
            >

                <i class="fa-solid fa-bell"></i>

            </a>

        </div>


    </div>



    <!-- =================================================
         סרגל הנתונים
         הסדר מימין לשמאל נשמר
    ================================================== -->

    <div class="secondary-bar">

        <div class="secondary-container">


            <!-- מזג אוויר -->

            <span
                class="widget-item"
                id="nav-weather"
            >

                <i
                    class="fa-solid fa-cloud-sun icon-weather"
                ></i>

                24°C

            </span>



            <!-- שעה -->

            <span
                class="widget-item"
                id="nav-clock"
            >

                <i
                    class="fa-regular fa-clock icon-clock"
                ></i>

                --:--:--

            </span>



            <!-- תאריך לועזי -->

            <span
                class="widget-item"
                id="nav-greg-date"
            >

                <i
                    class="fa-regular fa-calendar icon-date"
                ></i>

                --/--/----

            </span>



            <!-- תאריך עברי -->

            <span
                class="widget-item"
                id="nav-hebrew"
            >

                <i
                    class="fa-solid fa-calendar-days icon-hebrew"
                ></i>

                יום שבת, כ"ג אלול תשפ"ו

            </span>



            <!-- פרשת השבוע -->

            <span
                class="widget-item"
                id="nav-parasha"
            >

                <i
                    class="fa-solid fa-book-open icon-parasha"
                ></i>

                פרשת

                <strong>
                    נצבים-וילך
                </strong>

            </span>



            <!-- זריחה ושקיעה -->

            <span
                class="widget-item"
                id="nav-sun"
            >

                <i
                    class="fa-solid fa-sun icon-sun"
                ></i>

                זריחה: 06:22

                |

                שקיעה: 19:05

            </span>



            <!-- דולר / אירו / ביטקוין -->

            <span
                class="widget-item"
                id="nav-forex"
            >

                <i
                    class="fa-solid fa-dollar-sign icon-usd"
                ></i>

                <strong>
                    3.01 ₪
                </strong>

                |

                <i
                    class="fa-solid fa-euro-sign icon-eur"
                ></i>

                <strong>
                    3.50 ₪
                </strong>

                |

                <i
                    class="fa-brands fa-bitcoin icon-btc"
                ></i>

                <strong>
                    $62,500
                </strong>

            </span>



            <!-- ריבית + פריים -->

            <span class="widget-item">

                <i
                    class="fa-solid fa-percent icon-prime"
                ></i>

                ריבית:

                <strong>
                    4.5%
                </strong>

                |

                פריים:

                <strong>
                    6.0%
                </strong>

            </span>



            <!-- מדד -->

            <span class="widget-item">

                <i
                    class="fa-solid fa-chart-line icon-cpi"
                ></i>

                מדד:

                <strong>
                    +0.3%
                </strong>

            </span>



            <!-- שכר מינימום -->

            <span class="widget-item">

                <i
                    class="fa-solid fa-shekel-sign icon-wage"
                ></i>

                שכר מינימום:

                <strong>
                    5,880 ₪
                </strong>

            </span>


        </div>

    </div>

</header>

`;



// ======================================================
// הכנסת HEADER
// ======================================================

document.body.insertAdjacentHTML(
    "afterbegin",
    headerHtml
);



// ======================================================
// 5. FOOTER
// הטקסט נשמר בדיוק
// ======================================================

if (!document.querySelector("footer.main-footer")) {

    const footerHtml = `

<footer class="main-footer">


    <p>
        &copy; ${new Date().getFullYear()}
        NeTools - כל הזכויות שמורות
    </p>


    <p>

        <a href="privacy.html">
            מדיניות פרטיות
        </a>

        |

        <a href="about.html">
            אודות והצהרת נגישות
        </a>

        |

        <a href="mailto:netools.co.il@gmail.com">
            netools.co.il@gmail.com
        </a>

    </p>


    <p
        style="
            font-size: 12.5px;
            max-width: 900px;
            margin: 14px auto 0 auto;
            line-height: 1.6;
        "
    >

        הנתונים והחישובים המוצגים באתר
        מהווים אומדן כללי בלבד ואינם מהווים
        תחליף לייעוץ מקצועי, משפטי או פיננסי

    </p>


</footer>

    `;

    document.body.insertAdjacentHTML(
        "beforeend",
        footerHtml
    );

}



// ======================================================
// 6. CLOCK + DATE + MOBILE MENU
// ======================================================

function initNeToolsHeader() {


    function updateClockAndDate() {

        const now =
            new Date();


        const clockEl =
            document.getElementById(
                "nav-clock"
            );


        const dateEl =
            document.getElementById(
                "nav-greg-date"
            );


        if (clockEl) {

            clockEl.innerHTML = `

                <i
                    class="fa-regular fa-clock icon-clock"
                ></i>

                ${now.toLocaleTimeString(
                    "he-IL"
                )}

            `;

        }


        if (dateEl) {

            dateEl.innerHTML = `

                <i
                    class="fa-regular fa-calendar icon-date"
                ></i>

                ${now.toLocaleDateString(
                    "he-IL"
                )}

            `;

        }

    }



    updateClockAndDate();


    setInterval(
        updateClockAndDate,
        1000
    );



    const btn =
        document.getElementById(
            "menuToggleBtn"
        );


    const navWrapper =
        document.querySelector(
            ".main-nav-wrapper"
        );


    if (
        btn &&
        navWrapper
    ) {

        btn.addEventListener(
            "click",
            function () {

                navWrapper.classList.toggle(
                    "open"
                );


                const icon =
                    btn.querySelector("i");


                if (icon) {

                    icon.className =
                        navWrapper.classList.contains(
                            "open"
                        )

                        ? "fa-solid fa-xmark"

                        : "fa-solid fa-bars";

                }

            }
        );

    }

}



// מכיוון שהסקריפט נמצא בדרך כלל בסוף body,
// תומך בשני המצבים.

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initNeToolsHeader
    );

} else {

    initNeToolsHeader();

}
