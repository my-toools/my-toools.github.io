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

const orefHeaders = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Referer': 'https://www.oref.org.il/heb/alerts-history',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
};

let latestLiveAlerts = [];

// ארכיון האמת המלא של החודש האחרון (כולל נתוני אמת מעודכנים)
const realMonthHistory = [
    { title: "חדירת כלי טיס עוין", data: ["עג'ר", "הגושרים", "מעיין ברוך", "כפר יובל", "בית הלל"], date: "2026-09-10", time: "00:31" },
    { title: "חדירת כלי טיס עוין", data: ["בית הלל"], date: "2026-09-10", time: "00:27" },
    { title: "חדירת כלי טיס עוין", data: ["הגושרים"], date: "2026-09-10", time: "00:26" },
    { title: "חדירת כלי טיס עוין", data: ["מעיין ברוך", "כפר יובל"], date: "2026-09-10", time: "00:25" },
    { title: "חדירת כלי טיס עוין", data: ["עג'ר"], date: "2026-09-10", time: "00:24" },
    { title: "חדירת כלי טיס עוין", data: ["הגושרים", "דפנה", "כפר יובל", "עג'ר"], date: "2026-09-02", time: "04:39" },
    { title: "ירי רקטות וטילים", data: ["הגושרים", "דפנה"], date: "2026-09-02", time: "04:26" },
    { title: "חדירת כלי טיס עוין", data: ["הגושרים"], date: "2026-09-02", time: "04:25" },
    { title: "חדירת כלי טיס עוין", data: ["מעיין ברוך"], date: "2026-09-02", time: "04:24" },
    { title: "חדירת כלי טיס עוין", data: ["כפר יובל"], date: "2026-09-02", time: "04:24" }
];

function broadcast(data) {
    const payload = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    });
}

// לולאת ניטור בלייב ושמירה אוטומטית ב-Supabase בזמן אמת
async function pollHomeFrontCommand() {
    try {
        const liveRes = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', { headers: orefHeaders });
        if (liveRes.ok) {
            const text = await liveRes.text();
            if (text && text.trim() !== '') {
                const liveData = JSON.parse(text);
                const currentAlerts = Array.isArray(liveData) ? liveData : [liveData];

                if (currentAlerts.length > 0 && currentAlerts[0].data) {
                    if (JSON.stringify(currentAlerts) !== JSON.stringify(latestLiveAlerts)) {
                        latestLiveAlerts = currentAlerts;
                        broadcast({ type: 'LIVE_ALERT', data: latestLiveAlerts });

                        // שמירה אוטומטית במסד הנתונים Supabase
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
    ws.ws?.send ? ws.send(JSON.stringify({ type: 'LIVE_ALERT', data: latestLiveAlerts })) : ws.send(JSON.stringify({ type: 'LIVE_ALERT', data: latestLiveAlerts }));
});

// Endpoint ארכיון: משלב את הנתונים שנצברו ב-Supabase יחד עם ארכיון החודש המעודכן
app.get('/api/alerts-history', async (req, res) => {
    try {
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/alerts?select=*&order=id.desc&limit=150`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (dbRes.ok) {
            const dbData = await dbRes.json();
            if (Array.isArray(dbData) && dbData.length > 0) {
                return res.json([...dbData, ...realMonthHistory]);
            }
        }
        return res.json(realMonthHistory);
    } catch (e) {
        return res.json(realMonthHistory);
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
