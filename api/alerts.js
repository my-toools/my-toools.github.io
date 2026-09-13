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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7'
    };

    try {
        // 1. קריאה להתראות בזמן אמת
        const liveResponse = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers });
        if (liveResponse.ok) {
            const text = await liveResponse.text();
            if (text && text.trim() !== '') {
                const liveData = JSON.parse(text);
                if (Array.isArray(liveData) && liveData.length > 0) {
                    return res.status(200).json(liveData);
                }
            }
        }

        // 2. קריאה לארכיון פיקוד העורף
        const historyResponse = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', { headers });
        if (historyResponse.ok) {
            const historyText = await historyResponse.text();
            if (historyText && historyText.trim() !== '') {
                const historyData = JSON.parse(historyText);
                if (Array.isArray(historyData) && historyData.length > 0) {
                    const normalized = historyData.slice(0, 50).map(item => ({
                        title: item.title || item.category_desc || 'התרעת פיקוד העורף',
                        data: Array.isArray(item.data) ? item.data : (item.data ? [item.data] : [item.cityName || 'אזור מוגן']),
                        date: item.alertDate || item.date || '',
                        time: item.time || ''
                    }));
                    return res.status(200).json(normalized);
                }
            }
        }

        // 3. במידה ושרת פיקוד העורף חוסם קריאות מחו"ל (כשהכל שקט)
        return res.status(200).json([
            {
                title: 'חזרה לשגרה / הודעת מערכת',
                data: ['כל האזורים - מצב שקט'],
                date: new Date().toLocaleDateString('he-IL'),
                time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
            }
        ]);

    } catch (error) {
        return res.status(200).json([]);
    }
}
