#   Kochbuch Backend (Node.js + Express)
```bash
Dies ist das Backend einer Kochbuch-Webanwendung, geschrieben in Node.js mit dem Express-Framework. Es bietet eine RESTful API zur Benutzerregistrierung, Authentifizierung und Verwaltung von Rezepten.

## Technologien & Pakete

| Zweck                       | Paket / Technologie         |
|----------------------------|-----------------------------|
| Webserver & Routing        | `express`                   |
| Datenbank (SQL)            | `mariadb`                   |
| Authentifizierung          | `bcryptjs`, `jsonwebtoken`  |
| Cookies lesen (optional)   | `cookie-parser`             |
| Umgebungsvariablen         | `dotenv`                    |
| CORS (Zugriffskontrolle)   | `cors`                      |
| Datei-Upload               | `multer`                    |
| Entwicklertools            | `nodemon`, `jsdoc`, `jest`, `supertest` |


## Abhängigkeiten installieren

cd kochbuch/backend

npm install


##  .env-Datei anlegen

Erstelle im Verzeichnis backend/ eine .env-Datei mit folgendem Inhalt:

PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=dein_passwort
DB_DATABASE=fi37_burchard_fpadw
JWT_SECRET=dein_geheimer_token


##  Datenbank einrichten

Importiere das SQL-Dump:

mysql -u root/oder Benutzer -p < sql/fi37_burchard_fpadw_dump.sql

Die SQL-Datei legt die Datenbank fi37_burchard_fpadw, die Tabellen user und recipe an und enthält einige Beispieldaten.


##  Backend starten
Entwicklungsmodus (mit automatischem Reload):

npm run dev

Produktionsmodus:

npm start

Server läuft dann unter:
http://fi.mshome.net:3001


## Authentifizierung

    Login via POST /api/login

    Erfolgreiches Login liefert einen JWT zurück

    Dieser Token wird bei geschützten Routen im Header mitgeschickt:

Authorization: Bearer <token>

Middleware auth.js schützt alle privaten Routen (/api/eigenerezepte, /api/rezept, etc.)


## Wichtige Routen (API-Endpunkte)

Methode	    Pfad	                Beschreibung

POST	    /api/register	        Benutzer registrieren
POST	    /api/login	            Login & Token erhalten
POST	    /api/rezept	            Rezept speichern (auth + optional Bild)
GET	        /api/rezeptliste	    Alle veröffentlichten Rezepte anzeigen
GET	        /api/rezeptdetail/:id	Details zu einem Rezept abrufen


## Dev Tools & Libraries

Scripts in package.json:

    "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
    }

Express – Webframework

MariaDB – Datenbank-Anbindung

bcryptjs – Passwort-Hashing

jsonwebtoken – Token-basierte Authentifizierung

multer – Datei-Upload (Bilder)

dotenv – Umgebungsvariablen

nodemon – Dev-Server mit Auto-Reload

jest + supertest – (optional) für Tests



