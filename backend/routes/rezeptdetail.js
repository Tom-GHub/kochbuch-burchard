
import express from 'express';
import getDatabaseConnection from '../db.js';

const router = express.Router(); //erstellt route objekt


router.get('/api/rezeptdetail/:id', async (req, res) => {
    
    const conn = await getDatabaseConnection();

        try {
            const rezeptResult = await conn.query(
            `SELECT * FROM recipe WHERE id = ?`, [req.params.id]
            );
            // console.log('rezeptdetail.js - test', rezeptResult );
            // console.log('rezeptdetail - params: ', req.params);
            // Prüfen ob was vorhanden ist
            // console.log('rezeptdetail.js - rezeptResult: ', rezeptResult);
            if (rezeptResult.length === 0) {
                return res.status(404).json({ error: 'Rezept nicht gefunden' });
            }
            // Speichern der ersten Stelle des Arrays
            const rezept = rezeptResult[0];
            
            // Log für rezeptResult-Antwort
            // console.log('rezeptdetail.js - rezeptResult: ', rezept);

            res.setHeader('Content-Type', 'application/json');
            
            // Antwort mit dem Rezept was auf Index 0 von rezeptResult ist
            res.status(200).json(rezept); 
    
        } catch (error) {
            console.error('Fehler beim Abrufen der Rezepte:', error);
            res.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
        } finally {
            conn.release();
        }
});



export default router;