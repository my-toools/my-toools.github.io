export default async function handler(req, res) {
    // הגדרת CORS מלאה לכל הבקשות
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const SUPABASE_URL = 'https://awwwjlzqawrzxxfnhzoh.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_WTL3veV0FNOYRZzN7Ii0UQ_-hsY9Bvg';

    // Headers מלאים המדמים דפדפן Chrome אנושי לעקיפת החסימה של פיקוד העורף
    const browserHeaders = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.oref.org.il/heb/alerts-history',
        'Sec-Ch-Ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    };

    try {
        // 1. בדיקת אזעקות בזמן אמת
        const liveRes = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers: browserHeaders });
        if (liveRes.ok) {
            const text = await liveRes.text();
            if (text && text.trim() !== '') {
                const liveData = JSON.parse(text);
                const alertsArray = Array.isArray(liveData) ? liveData : [liveData];

                if (alertsArray.length > 0 && alertsArray[0].data) {
                    // שמירת התרעת האמת ב-Supabase ברקע
                    fetch(`${SUPABASE_URL}/rest/v1/alerts`, {
                        method: 'POST',
                        headers: {
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: alertsArray[0].title || 'התרעת פיקוד העורף',
                            data: alertsArray[0].data,
                            date: new Date().toLocaleDateString('he-IL'),
                            time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
                        })
                    }).catch(() => {});

                    return res.status(200).json(alertsArray);
                }
            }
        }

        // 2. ניסיון שליפת ההיסטוריה מ-Supabase (הארכיון הפרטי שלך)
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/alerts?select=*&order=id.desc&limit=100`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        if (dbRes.ok) {
            const dbData = await dbRes.json();
            if (Array.isArray(dbData) && dbData.length > 0) {
                return res.status(200).json(dbData);
            }
        }

        // 3. גיבוי: שליפת הארכיון הישיר מפיקוד העורף ומיפוי נכון של השדות
        const historyRes = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', { headers: browserHeaders });
        if (historyRes.ok) {
            const historyData = await historyRes.json();
            if (Array.isArray(historyData) && historyData.length > 0) {
                const formattedHistory = historyData.slice(0, 100).map(item => {
                    // טיפול במיפוי שדות שונים של פיקוד העורף
                    let citiesList = [];
                    if (Array.isArray(item.data)) {
                        citiesList = item.data;
                    } else if (item.data) {
                        citiesList = [item.data];
                    } else if (item.cityName) {
                        citiesList = [item.cityName];
                    } else {
                        citiesList = ['כל הארץ'];
                    }

                    return {
                        title: item.title || item.category_desc || 'התרעת פיקוד העורף',
                        data: citiesList,
                        date: item.alertDate || item.date || '',
                        time: item.time || ''
                    };
                });

                return res.status(200).json(formattedHistory);
            }
        }

        return res.status(200).json([]);
    } catch (error) {
        console.error("API Error:", error);
        return res.status(200).json([]);
    }
}
