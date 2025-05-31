import express from 'express';
import authMiddleware from '../middleware/auth.js';
import getDatabaseConnection from '../db.js';

const router = express.Router(); //erstellt route objekt


router.get('/api/rezeptliste', authMiddleware, async (req, res) => {
    

    const conn = await getDatabaseConnection();
    
        try {
            
            // mariaDB liefert bereits ein Array zurück, deshalb nur const rezeptResult und nicht [rezeptResult]
            // conn.query(...) liefert nicht [rows, fields] wie bei mysql2, sondern direkt ein Array oder ein einzelnes Objekt
            const rezeptResult = await conn.query(
            `SELECT id, title, image, ingredients
                FROM recipe`
            );
            // Wenn kein Profil gefunden wurde
            if (rezeptResult.length === 0) {
                return res.status(404).json({ error: 'Keine Rezepte gefunden' });
            }

            // Log für rezeptResult-Antwort
            console.log('API gibt zurück: ', rezeptResult);
            // Antwort mit Profildaten
            res.json(rezeptResult); 
    
        } catch (error) {
            console.error('Fehler beim Abrufen der Rezepte:', error);
            res.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
        } finally {
            conn.release();
        }
});



export default router;