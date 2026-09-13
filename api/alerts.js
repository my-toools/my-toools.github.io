export default async function handler(req, res) {
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
        // 1. ניסיון קריאת התרעות בזמן אמת
        const liveResponse = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers });

        if (liveResponse.ok) {
            const text = await liveResponse.text();
            if (text && text.trim() !== '') {
                const liveData = JSON.parse(text);
                const activeAlerts = Array.isArray(liveData) ? liveData : [liveData];
                
                if (activeAlerts.length > 0) {
                    return res.status(200).json(activeAlerts);
                }
            }
        }

        // 2. משיכת הארכיון מפיקוד העורף
        const historyResponse = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', { headers });

        if (historyResponse.ok) {
            const historyData = await historyResponse.json();
            
            // נרמול הנתונים כדי להבטיח תצוגה נקייה באתר
            const normalizedHistory = (Array.isArray(historyData) ? historyData : []).map(item => ({
                title: item.title || item.category_desc || 'התרעת פיקוד העורף',
                data: Array.isArray(item.data) ? item.data : (item.data ? [item.data] : [item.cityName || 'יישוב לא צוין']),
                date: item.alertDate || item.date || '',
                time: item.time || ''
            }));

            return res.status(200).json(normalizedHistory);
        }

        return res.status(200).json([]);

    } catch (error) {
        return res.status(200).json([]);
    }
}
