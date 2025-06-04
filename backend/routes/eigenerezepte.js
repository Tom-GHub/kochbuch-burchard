import express from 'express';
import authMiddleware from '../middleware/auth.js';
import getDatabaseConnection from '../db.js';
import multer from 'multer';

// Multer konfigurieren - speichert Uploads im 'public/uploads/' Ordner
const upload = multer({ dest: 'public/uploads/' });
const router = express.Router(); // Erstellt ein Router-Objekt für diese Routen


/**
 * Veröffentlichen oder Zurückziehen eines Rezepts
 * Route: PUT /api/rezeptveroeffentlichen/:id
 * Zweck: Setzt das Feld "published" eines Rezepts auf true/false
 * Zugriff: Nur eingeloggte Nutzer
 */
router.put('/api/rezeptveroeffentlichen/:id', authMiddleware, async (req, res) => {

    const { id } = req.params;   // Rezept-ID aus der URL
    const { isPublished } = req.body;   // Neuer Veröffentlichungsstatus aus dem Request-Body

    console.log('eigenerezepte.js - req.bod: ', req.body);

    const conn = await getDatabaseConnection();
    try {
        // Aktualisiert den published-Status in der Datenbank
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
        conn.release(); // Datenbankverbindung immer freigeben
    }
});

/**
 * Rezept bearbeiten (inkl. optionalem Bild-Upload)
 * Route: PUT /api/rezeptbearbeiten/:id
 * Zweck: Ändert Titel, Zutaten, Zubereitung und ggf. das Bild
 * Zugriff: Nur eingeloggte Nutzer (authMiddleware)
 */
router.put('/api/rezeptbearbeiten/:id', authMiddleware, upload.single('image'), async (req, res) => {
    const { id } = req.params;      // Rezept-ID
    const user_id = req.user.id;    // User-ID aus der Authentifizierung
    const { titel, zutatenliste, zubereitung } = req.body;  // Neue Rezeptdaten
    const image = req.file ? req.file.filename : null;      // Neues Bild (falls hochgeladen)

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
            // Falls ein neues Bild hochgeladen wurde -> alle Felder inkl. Bild aktualisieren
            await conn.query(
                `UPDATE recipe
                SET title = ?, ingredients = ?, instructions = ?, image = ?
                WHERE id = ? AND user_id = ?`,
                [titel, zutatenliste, zubereitung, req.file.filename, id, user_id]
            );
            } else {
            // Kein neues Bild -> nur die anderen Felder aktualisieren
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


/**
 * Rezept löschen
 * Route: DELETE /api/eigenerezepte/:id
 * Zweck: Löscht ein Rezept anhand seiner ID
 * Zugriff: Nur eingeloggte Nutzer
 */
router.delete('/api/eigenerezepte/:id', authMiddleware, async (req, res) => {
        const conn = await getDatabaseConnection();
        const rezeptID = req.params.id;
        
        try {
            // Rezept aus der Datenbank löschen
            await conn.query(
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

/**
 * Eigene Rezepte abrufen
 * Route: GET /api/eigenerezepte
 * Zweck: Gibt alle Rezepte eines eingeloggten Nutzers zurück
 */
router.get('/api/eigenerezepte', authMiddleware, async (req, res) => {
        const conn = await getDatabaseConnection();
        const user_id = req.user.id;
        
            try {
                // Alle Rezepte des Users aus der Datenbank abfragen
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