export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://www.oref.org.il/heb/alerts-history',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7'
    };

    try {
        // 1. ניסיון קריאה ראשון: התרעות בזמן אמת
        const liveRes = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers });
        if (liveRes.ok) {
            const liveText = await liveRes.text();
            if (liveText && liveText.trim() !== '') {
                const liveData = JSON.parse(liveText);
                if (Array.isArray(liveData) && liveData.length > 0) {
                    return res.status(200).json(liveData);
                }
            }
        }

        // 2. ניסיון קריאה שני: ארכיון פיקוד העורף (AlertsHistory.json)
        const historyRes = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', { headers });
        if (historyRes.ok) {
            const historyText = await historyRes.text();
            if (historyText && historyText.trim() !== '') {
                const historyData = JSON.parse(historyText);
                if (Array.isArray(historyData) && historyData.length > 0) {
                    return res.status(200).json(historyData);
                }
            }
        }

        // 3. ניסיון קריאה שלישי (נתיב חלופי במידה והראשון נחסם בשרת ענן)
        const altHistoryRes = await fetch('https://www.oref.org.il/WarningMessages/alert/history.json', { headers });
        if (altHistoryRes.ok) {
            const altText = await altHistoryRes.text();
            if (altText && altText.trim() !== '') {
                const altData = JSON.parse(altText);
                if (Array.isArray(altData) && altData.length > 0) {
                    return res.status(200).json(altData);
                }
            }
        }

        return res.status(200).json([]);

    } catch (error) {
        return res.status(200).json([]);
    }
}
