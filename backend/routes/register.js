import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDatabaseConnection from '../db.js';
import 'dotenv/config';

const router = express.Router(); //erstellt route objekt

function isValidPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%?])[A-Za-z0-9!@$%?]{8,}$/;
    return regex.test(password);
}

router.post('/api/register', async (req, res) => {
    const { username, firstname, lastname, email, password, passwordCheck } = req.body;

    const conn = await getDatabaseConnection();

    try {
    // Pflichtfelder prüfen
    if (!username || !email || !password || !passwordCheck) {
        return res.status(400).json({ message: 'Bitte alle Pflichtfelder ausfüllen.' });
        }

        // Passwort bestätigen
        if (password !== passwordCheck) {
        return res.status(400).json({ message: 'Passwörter stimmen nicht überein.' });
        }

        // Passwort prüfen
        if (!isValidPassword(password)) {
        return res.status(400).json({
            message: 'Passwort muss mindestens 8 Zeichen, einen Großbuchstaben, eine Zahl und ein Sonderzeichen (!@$%?) enthalten.',
        });
        }

        // E-Mail prüfen
        const [emailCheck] = await conn.query('SELECT * FROM user WHERE email = ?', [email]);
        if (emailCheck.length > 0) {
        return res.status(409).json({ message: 'E-Mail ist bereits registriert.' });
        }

        // Username prüfen
        const [usernameCheck] = await conn.query('SELECT * FROM user WHERE username = ?', [username]);
        if (usernameCheck.length > 0) {
        return res.status(409).json({ message: 'Benutzername ist bereits vergeben.' });
        }

        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);

        // Nutzer speichern
        await conn.query(
        `INSERT INTO user (username, firstname, lastname, email, password_hash)
        VALUES (?, ?, ?, ?, ?)`,
        [username, firstname, lastname, email, hashedPassword]
        );

        res.status(201).json({ message: 'Registrierung erfolgreich.' });
    } catch (err) {
        console.error('Fehler bei Registrierung:', err);
        res.status(500).json({ message: 'Serverfehler bei der Registrierung.' });
    } finally {
        conn.release();
    }
});

export default router;



