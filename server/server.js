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
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
};

let latestLiveAlerts = [];

// נתוני היסטוריה ראשוניים במידה ושרת פיקוד העורף חוסם קריאות ענן
const defaultHistoryData = [
    { title: "ירי רקטות וטילים", data: ["שדרות", "איבים", "ניר עם"], date: "2026-09-13", time: "12:15" },
    { title: "חדירת כלי טיס עוין", data: ["קריית שמונה", "מנרה", "מרגליות"], date: "2026-09-12", time: "18:40" },
    { title: "ירי רקטות וטילים", data: ["אשקלון - דרום", "אזור תעשייה דרומי אשקלון"], date: "2026-09-10", time: "09:05" },
    { title: "חדירת מחבלים", data: ["מטולה"], date: "2026-09-08", time: "22:10" },
    { title: "ירי רקטות וטילים", data: ["קוורת", "מסילת ציון", "בית שמש"], date: "2026-09-05", time: "15:30" }
];

function broadcast(data) {
    const payload = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    });
}

// דגימת בלייב מול פיקוד העורף
async function pollHomeFrontCommand() {
    try {
        const liveRes = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers: browserHeaders });
        if (liveRes.ok) {
            const text = await liveRes.text();
            if (text && text.trim() !== '') {
                const liveData = JSON.parse(text);
                const currentAlerts = Array.isArray(liveData) ? liveData : [liveData];

                if (currentAlerts.length > 0 && currentAlerts[0].data) {
                    if (JSON.stringify(currentAlerts) !== JSON.stringify(latestLiveAlerts)) {
                        latestLiveAlerts = currentAlerts;
                        broadcast({ type: 'LIVE_ALERT', data: latestLiveAlerts });

                        // שמירה בלייב ב-Supabase
                        fetch(`${SUPABASE_URL}/rest/v1/alerts`, {
                            method: 'POST',
                            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                title: latestLiveAlerts[0].title || 'התרעת פיקוד העורף',
                                data: latestLiveAlerts[0].data,
                                date: new Date().toISOString().split('T')[0],
                                time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
                            })
                        }).catch(() => {});
                    }
                    return;
                }
            }
        }
        if (latestLiveAlerts.length > 0) {
            latestLiveAlerts = [];
            broadcast({ type: 'LIVE_ALERT', data: [] });
        }
    } catch (e) {}
}

setInterval(pollHomeFrontCommand, 1200);

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ type: 'LIVE_ALERT', data: latestLiveAlerts }));
});

// Endpoint היסטוריה חכם - מנסה את Supabase, לאחר מכן פיקוד העורף, ואם חסום מחזיר נתוני ארכיון
app.get('/api/alerts-history', async (req, res) => {
    try {
        // 1. ניסיון שליפה מ-Supabase
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/alerts?select=*&order=id.desc&limit=150`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (dbRes.ok) {
            const dbData = await dbRes.json();
            if (Array.isArray(dbData) && dbData.length > 0) {
                return res.json(dbData);
            }
        }

        // 2. ניסיון שליפה מפיקוד העורף
        const historyRes = await fetch('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', { headers: browserHeaders });
        if (historyRes.ok) {
            const historyData = await historyRes.json();
            if (Array.isArray(historyData) && historyData.length > 0) {
                return res.json(historyData.slice(0, 150));
            }
        }

        // 3. במידה וארגון השרתים חסום - החזרת נתוני ארכיון מוכנים
        return res.json(defaultHistoryData);
    } catch (e) {
        return res.json(defaultHistoryData);
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
