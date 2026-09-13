const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SUPABASE_URL = 'https://awwwjlzqawrzxxfnhzoh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WTL3veV0FNOYRZzN7Ii0UQ_-hsY9Bvg';

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

// זיכרון פנימי בשרת
let latestLiveAlerts = [];
let cachedHistory = [];

// לולאת שאיבה רציפה מפיקוד העורף בדיוק כמו צופר (רץ בלופ 24/7)
async function pollHomeFrontCommand() {
    try {
        // 1. תשאול התרעות אמת
        const liveRes = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers: browserHeaders });
        if (liveRes.ok) {
            const text = await liveRes.text();
            if (text && text.trim() !== '') {
                const liveData = JSON.parse(text);
                latestLiveAlerts = Array.isArray(liveData) ? liveData : [liveData];

                // שמירה אוטומטית ב-Supabase במידה ויש התרעה
                if (latestLiveAlerts.length > 0 && latestLiveAlerts[0].data) {
                    fetch(`${SUPABASE_URL}/rest/v1/alerts`, {
                        method: 'POST',
                        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: latestLiveAlerts[0].title || 'התרעת פיקוד העורף',
                            data: latestLiveAlerts[0].data,
                            date: new Date().toLocaleDateString('he-IL'),
                            time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
                        })
                    }).catch(() => {});
                }
            } else {
                latestLiveAlerts = [];
            }
        }
    } catch (e) {
        latestLiveAlerts = [];
    }
}

// שאיבת היסטוריה
async function updateHistoryCache() {
    try {
        // ניסיון שליפה מ-Supabase
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/alerts?select=*&order=id.desc&limit=100`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (dbRes.ok) {
            const dbData = await dbRes.json();
            if (Array.isArray(dbData) && dbData.length > 0) {
                cachedHistory = dbData;
                return;
            }
        }

        // גיבוי מפיקוד העורף
        const historyRes = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', { headers: browserHeaders });
        if (historyRes.ok) {
            const historyData = await historyRes.json();
            if (Array.isArray(historyData)) {
                cachedHistory = historyData.slice(0, 100).map(item => ({
                    title: item.title || item.category_desc || 'התרעת פיקוד העורף',
                    data: Array.isArray(item.data) ? item.data : [item.data || item.cityName || 'כל הארץ'],
                    date: item.alertDate || item.date || '',
                    time: item.time || ''
                }));
            }
        }
    } catch (e) {}
}

// תזמון משיכה: לייב כל שנייה וחצי, היסטוריה כל 30 שניות
setInterval(pollHomeFrontCommand, 1500);
setInterval(updateHistoryCache, 30000);
updateHistoryCache();

// Endpoint יחיד שמחזיר מיד את המידע לדפדפן (אפס שיהוי)
app.get('/api/alerts', (req, res) => {
    if (latestLiveAlerts.length > 0) {
        return res.json(latestLiveAlerts);
    }
    return res.json(cachedHistory);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
