import express from 'express';
import authMiddleware from '../middleware/auth.js';
import getDatabaseConnection from '../db.js';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });
const router = express.Router(); //erstellt route objekt


// isPublished?
router.put('/api/rezeptveroeffentlichen/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    const { isPublished } = req.body;
    console.log('eigenerezepte.js - req.bod: ', req.body);

    const conn = await getDatabaseConnection();
    try {
        await conn.query(
            `UPDATE recipe 
            SET published = ?
            WHERE id = ?`,
            [isPublished, id]
        );
        
        res.json({ message: 'Rezept erfolgreich aktualisiert' });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Rezeptes:', error.message);
        res.status(500).json({ error: 'Fehler beim Aktualisieren des Rezeptes' });
    } finally {
        conn.release();
    }
});

// PUT-Route zum bearbeiten (sql alter where rezeptID = userID ?)
router.put('/api/rezeptbearbeiten/:id', authMiddleware, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    const { titel, zutatenliste, zubereitung } = req.body;
    // Bildname aus Multer übernehmen (falls vorhanden)
    const image = req.file ? req.file.filename : null;

    console.log('UPDATE Rezept mit:', {
    titel,
    zutatenliste,
    zubereitung,
    image: req.file ? req.file.filename : '(bleibt unverändert)',
    id,
    user_id
});
    const conn = await getDatabaseConnection();
    try {
        if (req.file) {
            // neues Bild hochgeladen → Bild auch aktualisieren
            await conn.query(
                `UPDATE recipe
                SET title = ?, ingredients = ?, instructions = ?, image = ?
                WHERE id = ? AND user_id = ?`,
                [titel, zutatenliste, zubereitung, req.file.filename, id, user_id]
            );
            } else {
            // kein neues Bild → Bild bleibt unverändert
            await conn.query(
                `UPDATE recipe
                SET title = ?, ingredients = ?, instructions = ?
                WHERE id = ? AND user_id = ?`,
                [titel, zutatenliste, zubereitung, id, user_id]
            );
        }
    
        res.json({ message: 'Rezept erfolgreich aktualisiert' });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Rezeptes:', error.message);
        res.status(500).json({ error: 'Fehler beim Aktualisieren des Rezeptes' });
    } finally {
        conn.release();
    }
});


// DELETE-Route (sql delete from recipe where rezptID = rezeptID ?)
router.delete('/api/eigenerezepte/:id', authMiddleware, async (req, res) => {
        const conn = await getDatabaseConnection();
        const rezeptID = req.params.id;
        
        try {
                const rezeptLöschen = await conn.query(
                    // 'DELETE FROM recipe WHERE id = ?', [rezeptID]
                'DELETE FROM recipe WHERE id = ?', [rezeptID]
                );
    
                // Log für rezeptResult-Antwort
                // console.log('eigenerezepte.js - userRezeptResult: ', userRezeptResult);
                // Antwort mit eigenen Rezepten
                res.status(200).json({ message: 'Rezept erfolgreich gelöscht' });
        
            } catch (error) {
                console.error('Fehler beim Löschen der Rezepte:', error);
                res.status(500).json({ error: 'Fehler beim Löschen der Rezepte' });
            } finally {
                conn.release();
            }
})

// eine GET-Route die alles aus der Datenbank abfragt was zu dem user mit der id der Rezepte gehört 
router.get('/api/eigenerezepte', authMiddleware, async (req, res) => {
        const conn = await getDatabaseConnection();
        const user_id = req.user.id;
        
            try {
                const userRezeptResult = await conn.query(
                `SELECT id, title, image, ingredients, published
                    FROM recipe
                    WHERE user_id = ?`, [user_id]
                );
                // Wenn kein Profil gefunden wurde
                if (userRezeptResult.length === 0) {
                    return res.status(404).json({ error: 'Keine Rezepte gefunden' });
                }
    
                // Log für rezeptResult-Antwort
                // console.log('eigenerezepte.js - userRezeptResult: ', userRezeptResult);
                // Antwort mit eigenen Rezepten
                res.json(userRezeptResult); 
        
            } catch (error) {
                console.error('Fehler beim Abrufen der Rezepte:', error);
                res.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
            } finally {
                conn.release();
            }
})



export default router;