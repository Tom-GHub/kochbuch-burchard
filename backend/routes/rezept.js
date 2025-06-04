import express from 'express';
import getDatabaseConnection from '../db.js';
import 'dotenv/config';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';

// Legt den Speicherort für hochgeladene Bilder fest
const upload = multer({ dest: 'public/uploads/' });
const router = express.Router(); //erstellt route objekt

/**
 * POST /api/rezept
 * Speichert ein neues Rezept des eingeloggten Nutzers
 * Erwartet im Body: titel, zutatenliste, zubereitung
 * Optional: ein Bild (picture)
 */
router.post('/api/rezept', authMiddleware, upload.single('picture'), async (req, res) => {
    
    const user_id = req.user.id;    // Benutzer-ID aus dem Authentifizierungstoken
    const { titel, zutatenliste, zubereitung } = req.body;  // Rezeptdaten aus dem Request-Body
    const picture = req.file ? req.file.filename : null;    // Bild-Dateiname (falls hochgeladen)
    
    const conn = await getDatabaseConnection();

    try {
        // Rezept in der Datenbank speichern
        await conn.query(
            `INSERT INTO recipe (user_id, title, ingredients, instructions, image)
            VALUES (?, ?, ?, ?, ?)`,
            [user_id, titel, zutatenliste, zubereitung, picture]
        );
        // Erfolgsmeldung zurückgeben
        res.json({ message: 'Rezept gespeichert' });
    } catch (err) {
        console.error('Fehler beim Speichern des Rezeptes:', err);
        // Fehlermeldung zurückgeben
        res.status(500).json({ err: 'Fehler beim Speichern des Rezeptes' });
    } finally {
        conn.release();
    }

});



export default router;