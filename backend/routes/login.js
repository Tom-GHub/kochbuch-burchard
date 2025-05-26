
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDatabaseConnection from '../db.js';
import 'dotenv/config';

const router = express.Router(); //erstellt route objekt



router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const conn = await getDatabaseConnection();

    // console.log("Request: ", req);
    // console.log("Response: ", res);

    let user;

    try{
        // Pflichtfelder prüfen
    if ( !email || !password ) {
        return res.status(400).json({ message: 'Bitte E-Mail und Passwort eingeben.' });
        }

        // fehlt noch eine variable als speicherort?
    [user] = await conn.query(
        'SELECT * FROM user WHERE email = ? ',
        [email]
    );
    console.log('login.js - userMail: ', user);

    } catch (err) {
        console.error('Fehler bei der Anmeldung:', err);
        res.status(500).json({ message: 'Serverfehler bei der Anmeldung.' });
    } finally {
        conn.release();
    }

    if( !user ) 
        return res.status(400).json(
            {error: 'E-Mail-Adresse nicht gefunden.'}
        );

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    console.log('login.js - passwordMatch: ', passwordMatch);
    if( !passwordMatch )
        return res.status(400).json(
            { error: 'Falsches Passwort' }
        );

    const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET_KEY,
        {expiresIn: '4h' }
    );
    
    res.json( { token, userID: user.id });
});
    // vergleich password, password hash?
    // wie komme ich an pw hash?
    // token erstellen? user, email







export default router;