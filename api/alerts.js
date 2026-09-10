export default async function handler(req, res) {
  // הגדרת כותרות שמאפשרות גישה חלקה מכל מקום באתר שלך
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'no-store, max-age=0'); // לוודא שנקבל נתונים טריים בלייב

  try {
    // פנייה ישירה לשרת הרשמי של פיקוד העורף
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

    // פיצוח המידע והחזרתו בצורה נקייה לאתר
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Failed to fetch alerts:', error);
    // במקרה שאין התרעות או שהשרת עמוס, נחזיר מערך ריק כדי שהאתר לא ייפול
    return res.status(200).json([]);
  }
}
