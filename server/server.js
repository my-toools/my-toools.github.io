const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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

let latestLiveAlerts = [];
let cachedHistory = [];

// הפצת התרעה לכל המשתמשים המחוברים ב-WebSocket בזמן אמת (Push)
function broadcast(data) {
    const payload = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    });
}

// לולאת שאיבה מהירה ורציפה מפיקוד העורף
async function pollHomeFrontCommand() {
    try {
        const liveRes = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers: browserHeaders });
        if (liveRes.ok) {
            const text = await liveRes.text();
            if (text && text.trim() !== '') {
                const liveData = JSON.parse(text);
                const currentAlerts = Array.isArray(liveData) ? liveData : [liveData];

                if (currentAlerts.length > 0 && currentAlerts[0].data) {
                    // בדיקה אם מדובר בהתרעה חדשה
                    if (JSON.stringify(currentAlerts) !== JSON.stringify(latestLiveAlerts)) {
                        latestLiveAlerts = currentAlerts;
                        
                        // "דחיפה" מיידית ב-WebSocket לכל הדפדפנים
                        broadcast({ type: 'LIVE_ALERT', data: latestLiveAlerts });

                        // שמירה ברקע ב-Supabase
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
                    return;
                }
            }
        }
        
        // אם אין התרעה פעילה
        if (latestLiveAlerts.length > 0) {
            latestLiveAlerts = [];
            broadcast({ type: 'LIVE_ALERT', data: [] });
        }
    } catch (e) {}
}

// שאיבת ארכיון היסטוריו
async function updateHistoryCache() {
    try {
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

// תזמון: שאיבת התרעות בלופ של 1 שנייה, עדכון היסטוריה כל 30 שניות
setInterval(pollHomeFrontCommand, 1000);
setInterval(updateHistoryCache, 30000);
updateHistoryCache();

// ניהול חיבורי WebSocket נכנסים
wss.on('connection', (ws) => {
    // שליחת מצב היסטוריה והתרעה נוכחית מיד להתחברות
    ws.send(JSON.stringify({ 
        type: 'INIT', 
        liveAlerts: latestLiveAlerts, 
        history: cachedHistory 
    }));
});

// Endpoint גיבוי ב-HTTP REST
app.get('/api/alerts', (req, res) => {
    if (latestLiveAlerts.length > 0) return res.json(latestLiveAlerts);
    return res.json(cachedHistory);
});

server.listen(PORT, () => console.log(`Tzeva Adom WebSocket server running on port ${PORT}`));
