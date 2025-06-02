import express from 'express';
import getDatabaseConnection from '../db.js';

const router = express.Router(); //erstellt route objekt


router.get('/api/rezeptliste', async (req, res) => {
    

    const conn = await getDatabaseConnection();
    
        try {
            
            // mariaDB liefert bereits ein Array zurück, deshalb nur const rezeptResult und nicht [rezeptResult]
            // conn.query(...) liefert nicht [rows, fields] wie bei mysql2, sondern direkt ein Array oder ein einzelnes Objekt

            // SQL abfrage anpassen, dass nur Rezepte mit published 1 (true) angezeigt werden / where published = 1
            const rezeptResult = await conn.query(
            `SELECT id, title, image, ingredients
                FROM recipe`
            );
            // Wenn kein Profil gefunden wurde
            if (rezeptResult.length === 0) {
                return res.status(404).json({ error: 'Keine Rezepte gefunden' });
            }

            // Log für rezeptResult-Antwort
            // console.log('rezeptliste.js - rezeptResult: ', rezeptResult);
            // Antwort mit den Rezepten aller Nutzer
            res.json(rezeptResult); 
    
        } catch (error) {
            console.error('Fehler beim Abrufen der Rezepte:', error);
            res.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
        } finally {
            conn.release();
        }
});



export default router;