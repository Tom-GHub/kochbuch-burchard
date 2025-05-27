import express from 'express';
import getDatabaseConnection from '../db.js';
import 'dotenv/config';

const router = express.Router(); //erstellt route objekt

router.post('/api/rezept', async (req, res) => {
    console.log("rezept.js - req.body: ", req.body);
    
    const { user_id, titel, zutatenliste, zubereitung, imageUpload } = req.body;

    const conn = await getDatabaseConnection();

    await conn.query(
        `INSERT INTO recipe (user_id, title, ingredients, instructions, image)
        VALUES (?, ?, ?, ?, ?)`,
        [user_id, titel, zutatenliste, zubereitung, imageUpload]
    );


    res.status(200);
});





export default router;