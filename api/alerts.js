export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const SUPABASE_URL = 'https://awwwjlzqawrzxxfnhzoh.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_WTL3veV0FNOYRZzN7Ii0UQ_-hsY9Bvg';

    try {
        // 1. קריאת התרעות בזמן אמת מפיקוד העורף
        const liveRes = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://www.oref.org.il/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        let currentAlerts = [];
        if (liveRes.ok) {
            const text = await liveRes.text();
            if (text && text.trim() !== '') {
                const liveData = JSON.parse(text);
                currentAlerts = Array.isArray(liveData) ? liveData : [liveData];
            }
        }

        // 2. אם יש התרעת אמת — שמירה ל-Supabase
        if (currentAlerts.length > 0 && currentAlerts[0].data) {
            const today = new Date().toLocaleDateString('he-IL');
            const now = new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

            await fetch(`${SUPABASE_URL}/rest/v1/alerts`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    title: currentAlerts[0].title || 'התרעת פיקוד העורף',
                    data: currentAlerts[0].data,
                    date: today,
                    time: now
                })
            });

            return res.status(200).json(currentAlerts);
        }

        // 3. בזמן שגרה — שליפת הארכיון העצמאי מ-Supabase
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/alerts?select=*&order=id.desc&limit=50`, {
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

        // 4. הודעת פתיחה ראשונית במקרה של מסד נתונים ריק
        return res.status(200).json([{
            title: 'מערכת התרעות פעילה',
            data: ['חיבור ל-Supabase הוגדר בהצלחה. ממתין להתרעות'],
            date: new Date().toLocaleDateString('he-IL'),
            time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
        }]);

    } catch (error) {
        return res.status(200).json([]);
    }
}
