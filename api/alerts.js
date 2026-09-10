export default async function handler(req, res) {
    // הגדרת כותרות שמאפשרות גישה חלקה מכל מקום באתר שלך וללא שמירת זיכרון מטמון (Cache)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    try {
        // פנייה ישירה ומאובטחת לשרת הרשמי של פיקוד העורף מאחורי הקלעים של השרת שלך
        const response = await fetch('https://www.oref.org.il/WarningMessages/History/Alerts.json', {
            headers: {
                'Referer': 'https://www.oref.org.il/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching from Oref: ${response.statusText}`);
        }

        const data = await response.json();
        
        // החזרת הנתונים הנקיים והעדכניים ביותר ישירות לאתר שלך
        return res.status(200).json(data);

    } catch (error) {
        console.error('Failed to fetch alerts:', error);
        // במקרה של תקלה זמנית מול פיקוד העורף, השרת מחזיר מערך ריק ששומר על האתר שלא יקרוס
        return res.status(200).json([]);
    }
}
