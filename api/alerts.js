export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const SUPABASE_URL = 'https://awwwjlzqawrzxxfnhzoh.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_WTL3veV0FNOYRZzN7Ii0UQ_-hsY9Bvg';

    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://www.oref.org.il/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };

    // --- מנגנון שאיבה חד-פעמי (Seed) לתוך Supabase ---
    if (req.query.seed === 'true') {
        try {
            const historyRes = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', { headers });
            if (historyRes.ok) {
                const historyData = await historyRes.json();
                if (Array.isArray(historyData) && historyData.length > 0) {
                    
                    // המרת 500 ההתרעות האחרונות למבנה הטבלה ב-Supabase
                    const recordsToInsert = historyData.slice(0, 500).map(item => {
                        const rawDate = item.alertDate || item.date || new Date().toLocaleDateString('he-IL');
                        const formattedDate = rawDate.includes('T') ? rawDate.split('T')[0] : rawDate;
                        return {
                            title: item.title || item.category_desc || 'התרעת פיקוד העורף',
                            data: Array.isArray(item.data) ? item.data : [item.data || item.cityName || 'כל הארץ'],
                            date: formattedDate,
                            time: item.time || ''
                        };
                    });

                    // שמירת הנתונים ב-Supabase
                    await fetch(`${SUPABASE_URL}/rest/v1/alerts`, {
                        method: 'POST',
                        headers: {
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`,
                            'Content-Type': 'application/json',
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify(recordsToInsert)
                    });

                    return res.status(200).json({ status: 'success', inserted: recordsToInsert.length });
                }
            }
            return res.status(400).json({ error: 'Could not fetch history from Home Front Command' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    // --- זרימה שוטפת (לייב + שליפה מ-Supabase) ---
    try {
        // 1. בדיקת אזעקות בלייב
        const liveRes = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers });
        let liveData = [];
        if (liveRes.ok) {
            const text = await liveRes.text();
            if (text && text.trim() !== '') liveData = JSON.parse(text);
        }

        // אם יש אזעקה פעילה - שמירה ב-Supabase והחזרה מידית
        if (Array.isArray(liveData) && liveData.length > 0 && liveData[0].data) {
            await fetch(`${SUPABASE_URL}/rest/v1/alerts`, {
                method: 'POST',
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: liveData[0].title || 'התרעת פיקוד העורף',
                    data: liveData[0].data,
                    date: new Date().toLocaleDateString('he-IL'),
                    time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
                })
            });
            return res.status(200).json(liveData);
        }

        // 2. בשגרת רגיעה: שליפת ההיסטורייה שנאגרה ב-Supabase
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/alerts?select=*&order=id.desc&limit=200`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (dbRes.ok) {
            const dbData = await dbRes.json();
            return res.status(200).json(dbData);
        }

        return res.status(200).json([]);
    } catch (e) {
        return res.status(200).json([]);
    }
}
