export default async function handler(req, res) {
    // בדיקת הדומיין המבקש - חסימה אם מגיע ממקום אחר שאינו האתר שלך
    const referer = req.headers.referer || '';
    const origin = req.headers.origin || '';
    
    // אפשור גישה לדומיין שלך או ריק (לבדיקות פנימיות)
    if (referer && !referer.includes('netools.co.il') && !origin.includes('netools.co.il')) {
        return res.status(403).json({ error: 'Access Denied' });
    }

    res.setHeader('Access-Control-Allow-Origin', 'https://www.netools.co.il');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        const response = await fetch('https://www.oref.org.il/WarningMessages/History/Alerts.json', {
            headers: {
                'Referer': 'https://www.oref.org.il/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching from Oref: ${response.statusText}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json([]);
    }
}
