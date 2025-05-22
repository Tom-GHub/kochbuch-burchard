import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import homeRouter from './routes/home.js';
import registerRouter from './routes/register.js';

import path from 'node:path';

// Erstellt eine Express-App (den Server)
export const app = express();

// Add directory for uploaded static files. für Profilbild (statischen ordner anlegen?)
app.use(express.static(
    path.join(import.meta.dirname, 'public')));

// Middleware, um JSON-Daten aus dem Request-Body zu lesen
app.use(express.json()); 


// Aktiviert CORS, damit Anfragen vom Frontend (React) akzeptiert werden
app.use(cors({
    origin:[
        'http://fi.mshome.net:3000',
    ], // React-URL
    credentials: true // Erlaubt das Senden von Cookies, falls benötigt
}));

// Route zu Home (muss nach app.use/cors... stehen)
app.use('/', homeRouter);
app.use('/', registerRouter);





