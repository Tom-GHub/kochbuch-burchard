
import express from 'express';
import getDatabaseConnection from '../db.js';

const router = express.Router(); //erstellt route objekt

/**
 * GET /api/rezeptdetail/:id
 * Holt alle Informationen zu einem einzelnen Rezept anhand der übergebenen Rezept-ID.
 * Beispiel: /api/rezeptdetail/5 liefert das Rezept mit der ID 5.
 */
router.get('/api/rezeptdetail/:id', async (req, res) => {
    
    const conn = await getDatabaseConnection();

        try {
            // Holt das Rezept mit der übergebenen ID aus der Datenbank
            const rezeptResult = await conn.query(
                `SELECT * FROM recipe WHERE id = ?`, 
                [req.params.id] // ID kommt aus der URL
            );

            // Prüfen ob ein Rezept gefunden wurde
            if (rezeptResult.length === 0) {
                return res.status(404).json({ error: 'Rezept nicht gefunden' });
            }
            // Holt das erste (und einzige) Rezept aus dem Ergebnis
            const rezept = rezeptResult[0];
            
            // Log für rezeptResult-Antwort
            // console.log('rezeptdetail.js - rezeptResult: ', rezept);

            res.setHeader('Content-Type', 'application/json');
            
            // Gibt das Rezept als JSON-Antwort zurück
            res.status(200).json(rezept); 
    
        } catch (error) {
            console.error('Fehler beim Abrufen der Rezepte:', error);
            res.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
        } finally {
            conn.release();
        }
});



export default router;