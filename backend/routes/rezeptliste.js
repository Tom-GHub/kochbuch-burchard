import express from 'express';
import getDatabaseConnection from '../db.js';

const router = express.Router(); //erstellt route objekt

/**
 * GET /api/rezeptliste
 * Liefert alle veröffentlichten Rezepte (published = 1) aus der Datenbank zurück.
 * Nur Rezepte, die als veröffentlicht markiert sind, werden angezeigt.
 */
router.get('/api/rezeptliste', async (req, res) => {
    

    const conn = await getDatabaseConnection();
    
        try {
            
            // mariaDB liefert bereits ein Array zurück, deshalb nur const rezeptResult und nicht [rezeptResult]

            // Holt alle veröffentlichten Rezepte aus der Datenbank
            // (published = 1 bedeutet "veröffentlicht")
            const rezeptResult = await conn.query(
                `SELECT id, title, image, ingredients, published
                FROM recipe
                WHERE published = 1`
            );
            // Prüfen ob Rezepte gefunden wurden
            if (rezeptResult.length === 0) {
                return res.status(404).json({ error: 'Keine Rezepte gefunden' });
            }

            // Log für rezeptResult-Antwort
            // console.log('rezeptliste.js - rezeptResult: ', rezeptResult);
            // Antwort: Liste aller veröffentlichten Rezepte als JSON an den Client senden
            res.json(rezeptResult); 
    
        } catch (error) {
            console.error('Fehler beim Abrufen der Rezepte:', error);
            res.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
        } finally {
            conn.release();
        }
});



export default router;