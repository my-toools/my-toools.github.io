export default async function handler(req, res) {
    // 1. הגדרת כותרות CORS שמאפשרות ל-GitHub Pages לקרוא את הנתונים
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // 2. קריאה לפיקוד העורף עם User-Agent למניעת חסימות IP
        const response = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://www.oref.org.il/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            return res.status(200).json([]);
        }

        const text = await response.text();
        if (!text || text.trim() === '') {
            return res.status(200).json([]);
        }

        const data = JSON.parse(text);
        return res.status(200).json(Array.isArray(data) ? data : [data]);

    } catch (error) {
        // מניעת שגיאת 500
        return res.status(200).json([]);
    }
}
