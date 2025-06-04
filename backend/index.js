import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import homeRouter from './routes/home.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import rezeptRouter from './routes/rezept.js';
import eigenerezepteRouter from './routes/eigenerezepte.js';
import rezeptlisteRouter from './routes/rezeptliste.js';
import detailRouter from './routes/rezeptdetail.js'

import path from 'node:path';

// Erstellt eine Express-App (den Webserver)
export const app = express();

// Statische Dateien (z. B. Bilder) aus dem Ordner 'public' verfügbar machen
app.use(express.static(
    path.join(import.meta.dirname, 'public')));

// Middleware: Wandelt eingehende JSON-Daten in JavaScript-Objekte um
// (wichtig für POST/PUT/PATCH-Requests mit JSON-Daten)
app.use(express.json()); 


// Aktiviert CORS (Cross-Origin Resource Sharing), damit das Frontend (z. B. React) Anfragen senden darf
app.use(cors({
    origin:[
        'http://fi.mshome.net:3000',
    ], // React-URL
    credentials: true // Erlaubt das Senden von Cookies, falls benötigt
}));

// Verknüpft alle definierten Router mit der App
app.use('/', homeRouter);
app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', rezeptRouter);
app.use('/', eigenerezepteRouter);
app.use('/', rezeptlisteRouter);
app.use('/', detailRouter);


// Liest den Port aus den Umgebungsvariablen (in .env definiert)
const PORT = process.env.PORT;

// Startet den Server und gibt eine Info aus, ob erfolgreich oder nicht
const server = app.listen(PORT, () => {
    console.log(`Server läuft auf http://fi.mshome.net:${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} ist bereits belegt.`);
    } else {
        console.error("❌ Serverfehler:", err);
    }
    process.exit(1);    // Beendet den Prozess bei Fehlern
});