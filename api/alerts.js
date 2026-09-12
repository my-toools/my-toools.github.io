export default async function handler(req, res) {
    // 1. הגדרת כותרות CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // 2. פנייה לשרתי פיקוד העורף עם User-Agent ישראלי למניעת חסימות
        const response = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://www.oref.org.il/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            // אם השרת החזיר תשובה שאינה 200, נחזיר מערך ריק במקום לקרוס
            return res.status(200).json([]);
        }

        const text = await response.text();
        
        // אם אין התרעות, פיקוד העורף מחזיר מחרוזת ריקה
        if (!text || text.trim() === '') {
            return res.status(200).json([]);
        }

        // המרת התשובה ל-JSON
        const data = JSON.parse(text);
        return res.status(200).json(Array.isArray(data) ? data : [data]);

    } catch (error) {
        // מניעת קריסת השרת (500) והחזרת תשובה תקינה גם במידה ויש שגיאה
        console.error("Alerts API Error:", error);
        return res.status(200).json([]);
    }
}
