export default async function handler(req, res) {
    // 1. הגדרת כותרות CORS שמאפשרות ל-GitHub Pages לקרוא את הנתונים
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://www.oref.org.il/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };

    try {
        // 2. ניסיון קריאה ראשון: התרעות בזמן אמת
        const liveResponse = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers });

        if (liveResponse.ok) {
            const text = await liveResponse.text();
            if (text && text.trim() !== '') {
                const liveData = JSON.parse(text);
                const activeAlerts = Array.isArray(liveData) ? liveData : [liveData];
                
                // אם יש התרעה פעילה כעת - נחזיר אותה מיד
                if (activeAlerts.length > 0) {
                    return res.status(200).json(activeAlerts);
                }
            }
        }

        // 3. אם אין התרעה פעילה בזמן אמת - נמשוך את ההיסטוריה והארכיון מפיקוד העורף
        const historyResponse = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', { headers });

        if (historyResponse.ok) {
            const historyData = await historyResponse.json();
            return res.status(200).json(Array.isArray(historyData) ? historyData : []);
        }

        return res.status(200).json([]);

    } catch (error) {
        // מניעת שגיאת 500
        return res.status(200).json([]);
    }
}
