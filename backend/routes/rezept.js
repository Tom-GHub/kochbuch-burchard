import express from 'express';
import getDatabaseConnection from '../db.js';
import 'dotenv/config';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });
const router = express.Router(); //erstellt route objekt

// middleware wird in zeile 8 mit eingefügt -> damit zugriff auf req.user (user ist im token in der login.js)
router.post('/api/rezept', authMiddleware, upload.single('picture'), async (req, res) => {
    
    console.log("rezept.js - req.body: ", req.body);
    
    const user_id = req.user.id;
    const { titel, zutatenliste, zubereitung } = req.body;
    const picture = req.file ? req.file.filename : null;
    
    const conn = await getDatabaseConnection();

    try {
        await conn.query(
            `INSERT INTO recipe (user_id, title, ingredients, instructions, image)
            VALUES (?, ?, ?, ?, ?)`,
            [user_id, titel, zutatenliste, zubereitung, picture]
        );
        res.json({ message: 'Rezept gespeichert' });
    } catch (err) {
        console.error('Fehler beim Speichern des Rezeptes:', err);
        res.status(500).json({ err: 'Fehler beim Speichern des Rezeptes' });
    } finally {
        conn.release();
    }

});



export default router;