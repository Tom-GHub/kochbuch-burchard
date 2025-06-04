import express from 'express';
import bcrypt from 'bcryptjs';
import getDatabaseConnection from '../db.js';
import 'dotenv/config';

const router = express.Router(); //erstellt route objekt

// Funktion zur Passwortprüfung: 
// Mindestens 8 Zeichen, 1 Großbuchstabe, 1 Zahl, 1 Sonderzeichen (!@$%?)
function isValidPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%?])[A-Za-z0-9!@$%?]{8,}$/;
    return regex.test(password);
}

/**
 * POST /api/register
 * Zweck: Neuen Nutzer registrieren
 */
router.post('/api/register', async (req, res) => {

    console.log("register.js - req.body: ", req.body);

    const { username, firstname, lastname, email, password, passwordCheck } = req.body;

    const conn = await getDatabaseConnection();
    
    try {
    // Prüfe ob alle Pflichtfelder ausgefüllt sind
    if (!username || !email || !password || !passwordCheck) {
        return res.status(400).json({ message: 'Bitte alle Pflichtfelder ausfüllen.' });
        }

        // Prüfe ob Passwort und Bestätigung übereinstimmen
        if (password !== passwordCheck) {
        return res.status(401).json({ message: 'Passwörter stimmen nicht überein.' });
        }

        // Prüfe die Passwortkomplexität
        if (!isValidPassword(password)) {
        return res.status(401).json({
            message: 'Passwort muss mindestens 8 Zeichen, einen Großbuchstaben, eine Zahl und ein Sonderzeichen (!@$%?) enthalten.',
        });
        }

        // Prüfe ob der Benutzername bereits existiert
        const checkName = await conn.query('SELECT * FROM user WHERE username = ?', [username]);
        if ( checkName.length > 0 ) {
            return res.status(401).json({
                message: 'Benutzername existiert bereites'
            });
        }

        // Prüfe ob E-Mail bereits existiert
        const checkEmail = await conn.query('SELECT * FROM user WHERE email = ?', [email]);
        if (checkEmail.length > 0) {
            return res.status(400).json({
                message: 'E-Mail-Adresse ist bereits vorhanden.'
            });
        }

        // Passwort sicher hashen (mit bcrypt, 10 Runden)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Neuen Benutzer in der Datenbank speichern
        await conn.query(
        `INSERT INTO user (username, firstname, lastname, email, password_hash)
        VALUES (?, ?, ?, ?, ?)`,
        [username, firstname, lastname, email, hashedPassword]
        );

        res.status(200).json({ message: 'Registrierung erfolgreich.' });
    } catch (err) {
        console.error('Fehler bei Registrierung:', err);
        res.status(500).json({ message: 'Serverfehler bei der Registrierung.' });
    } finally {
        conn.release();
    }
});

export default router;



