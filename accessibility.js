// ==========================================
// NETOOLS - רכיב נגישות עצמאי ומודרני
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("accessibility-btn")) {
        const accHtml = `
            <!-- כפתור נגישות צף -->
            <div id="accessibility-btn" style="position: fixed; bottom: 20px; left: 20px; z-index: 99999;">
                <button onclick="toggleAccMenu()" style="background: #0284c7; color: #ffffff; border: 2px solid #ffffff; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.35); font-size: 22px; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;" title="התאמות נגישות" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fa-solid fa-universal-access"></i>
                </button>
            </div>

            <!-- תפריט נגישות נפתח -->
            <div id="accMenu" style="display: none; position: fixed; bottom: 80px; left: 20px; background: #0f172a; border: 1px solid #334155; border-radius: 16px; padding: 18px; width: 240px; color: #ffffff; z-index: 99999; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-family: system-ui, sans-serif; direction: rtl;">
                <h4 style="margin: 0 0 12px 0; font-size: 16px; border-bottom: 1px solid #334155; padding-bottom: 8px; text-align: center; color: #38bdf8; font-weight: 700;">
                    <i class="fa-solid fa-universal-access"></i> התאמות נגישות
                </h4>
                
                <button onclick="zoomText(1.1)" style="width: 100%; margin-bottom: 8px; padding: 8px; background: #1e293b; color: #ffffff; border: 1px solid #334155; border-radius: 8px; cursor: pointer; font-size: 13px; text-align: right;">
                    <i class="fa-solid fa-magnifying-glass-plus" style="color: #38bdf8;"></i> הגדלת רכיבי טקסט
                </button>
                
                <button onclick="zoomText(0.9)" style="width: 100%; margin-bottom: 8px; padding: 8px; background: #1e293b; color: #ffffff; border: 1px solid #334155; border-radius: 8px; cursor: pointer; font-size: 13px; text-align: right;">
                    <i class="fa-solid fa-magnifying-glass-minus" style="color: #38bdf8;"></i> הקטנת רכיבי טקסט
                </button>
                
                <button onclick="toggleGrayscale()" style="width: 100%; margin-bottom: 8px; padding: 8px; background: #1e293b; color: #ffffff; border: 1px solid #334155; border-radius: 8px; cursor: pointer; font-size: 13px; text-align: right;">
                    <i class="fa-solid fa-circle-half-stroke" style="color: #f59e0b;"></i> תצוגת מונוכרום (אפור)
                </button>

                <button onclick="highlightLinks()" style="width: 100%; margin-bottom: 12px; padding: 8px; background: #1e293b; color: #ffffff; border: 1px solid #334155; border-radius: 8px; cursor: pointer; font-size: 13px; text-align: right;">
                    <i class="fa-solid fa-link" style="color: #22c55e;"></i> הדגשת קישורים וסמנים
                </button>
                
                <button onclick="resetAcc()" style="width: 100%; padding: 8px; background: #ef4444; color: #ffffff; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: bold;">
                    איפוס להגדרות ברירת מחדל
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", accHtml);
    }
});

function toggleAccMenu() {
    const m = document.getElementById("accMenu");
    m.style.display = m.style.display === "none" ? "block" : "none";
}

let currentZoom = 100;
function zoomText(factor) {
    currentZoom = Math.round(currentZoom * factor);
    document.body.style.zoom = currentZoom + "%";
}

function toggleGrayscale() {
    document.body.style.filter = document.body.style.filter === "grayscale(100%)" ? "none" : "grayscale(100%)";
}

let linksHighlighted = false;
function highlightLinks() {
    const links = document.querySelectorAll("a");
    linksHighlighted = !linksHighlighted;
    links.forEach(a => {
        if (linksHighlighted) {
            a.style.outline = "2px solid #fbbf24";
            a.style.backgroundColor = "rgba(251, 191, 36, 0.2)";
        } else {
            a.style.outline = "none";
            a.style.backgroundColor = "transparent";
        }
    });
}

function resetAcc() {
    currentZoom = 100;
    document.body.style.zoom = "100%";
    document.body.style.filter = "none";
    if (linksHighlighted) highlightLinks();
}
