import express from 'express';
import getDatabaseConnection from '../db.js';
import 'dotenv/config';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';

// const upload = multer({ dest: 'public/uploads/' });        in router.post()-> upload.single('image'),     const imageFilename = req.file?.filename ?? null;   
const router = express.Router(); //erstellt route objekt

// middleware wird in zeile 8 mit eingefügt -> damit zugriff auf req.user (user ist im token in der login.js)
router.post('/api/rezept', authMiddleware, async (req, res) => {
    console.log("rezept.js - req.body: ", req.body);
    
    const user_id = req.user.id;
    const { titel, zutatenliste, zubereitung, imageUpload } = req.body;
    
    const conn = await getDatabaseConnection();

    try {
        await conn.query(
            `INSERT INTO recipe (user_id, title, ingredients, instructions, image)
            VALUES (?, ?, ?, ?, ?)`,
            [user_id, titel, zutatenliste, zubereitung, imageUpload]
        );
        res.json({ message: 'Rezept gespeichert' });
    } catch (err) {
        console.error('Fehler beim Aktualisieren des Rezeptes:', err);
        res.status(500).json({ err: 'Fehler beim Aktualisieren des Rezeptes' });
    } finally {
        conn.release();
    }

    res.status(200);
});

export default router;