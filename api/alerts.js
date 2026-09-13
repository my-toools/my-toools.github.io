export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const SUPABASE_URL = 'https://awwwjlzqawrzxxfnhzoh.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_WTL3veV0FNOYRZzN7Ii0UQ_-hsY9Bvg';

    // מנגנון ייבוא חד-פעמי של היסטוריית עבר
    if (req.query.seed === 'true') {
        try {
            const historyRes = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Referer': 'https://www.oref.org.il/',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            if (historyRes.ok) {
                const historyData = await historyRes.json();
                if (Array.isArray(historyData) && historyData.length > 0) {
                    
                    // המרת 100 ההתרעות האחרונות למבנה הטבלה ב-Supabase
                    const recordsToInsert = historyData.slice(0, 100).map(item => {
                        const rawDate = item.alertDate || item.date || new Date().toLocaleDateString('he-IL');
                        const formattedDate = rawDate.includes('T') ? rawDate.split('T')[0] : rawDate;
                        return {
                            title: item.title || item.category_desc || 'התרעת פיקוד העורף',
                            data: Array.isArray(item.data) ? item.data : [item.data || item.cityName || 'יישוב/אזור'],
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
            return res.status(400).json({ error: 'Could not fetch oref history' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    // --- הזרימה השוטפת הרגילה בזמן אמת ---
    try {
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

        // שליפת הארכיון מ-Supabase
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

        return res.status(200).json([]);
    } catch (error) {
        return res.status(200).json([]);
    }
}
