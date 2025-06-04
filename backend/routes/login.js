
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDatabaseConnection from '../db.js';
import 'dotenv/config';

const router = express.Router(); //erstellt route objekt

/**
 * Nutzer-Login
 * Route: POST /api/login
 * Zweck: Authentifiziert einen Nutzer und gibt bei Erfolg ein Token zurück
 */
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;   // Email und Passwort aus dem Request-Body
    const conn = await getDatabaseConnection();

    // console.log("Request: ", req);
    // console.log("Response: ", res);

    let user;   // Variable für den gefundenen Benutzer

    try{
        // Pflichtfelder prüfen - Email und Passwort müssen vorhanden sein
        if ( !email || !password ) {
            return res.status(400).json({ message: 'Bitte E-Mail und Passwort eingeben.' });
        }

        // Benutzer in der Datenbank suchen (anhand der Email)
        [user] = await conn.query(
            'SELECT * FROM user WHERE email = ? ',
            [email]
        );
        console.log('login.js - user: ', user);

    } catch (err) {
        console.error('Fehler bei der Anmeldung:', err);
        res.status(500).json({ message: 'Serverfehler bei der Anmeldung.' });
    } finally {
        conn.release();
    }

    // Prüfen ob Benutzer existiert
    if( !user ) {
        return res.status(400).json(
            {error: 'E-Mail-Adresse nicht gefunden.'}
        );
    }
    // Passwort überprüfen (Vergleich mit dem verschlüsselten Passwort in der DB)
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    console.log('login.js - passwordMatch: ', passwordMatch);
    if( !passwordMatch )
        return res.status(400).json(
            { error: 'Falsches Passwort' }
        );

        // Token erstellen -> für spätere Authentifizierung (wird vom Frontend gespeichert)
    const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email }, 
        process.env.JWT_SECRET_KEY,
        {expiresIn: '4h' }
    );
    
    res.json( { token, userID: user.id, username: user.username }); // Daten die als Antwort zu dem Client mitgeschickt werden
});

export default router;