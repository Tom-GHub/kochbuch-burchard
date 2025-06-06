Erste Schritte:
Backend: node.js/expresso
npm init "nodemon"
 
Nodemon als Dev-Dependency installieren
 
npm install --save-dev nodemon
 
Type Module, damit import export ES Module funktioniert
 
"type": "module",
 
Skripte in der package.json konfigurieren
 
"dev": "nodemon index.js",
"start": "node index.js"
 
Web-Framework für die Servererstellung und Routing
npm install express
 
Treiber für MariaDB/MySQL Datenbankverbindungen
npm install mariadb
Passwort-Hashing für sichere Authentifizierung
npm install bcryptjs
 
Jsonwebtoken
npm install jsonwebtoken
 
Cookieparser, damit der JSWebToken vom cookie gelesen werden kann:
npm install cookie-parser
//nutzung:
import cookieParser from 'cookie-parser';
 
.env Ein prozess, welches wichtige Informationen vom code trennt??
npm install dotenv
 
CORS Access-Controll wer darf an den Server ran?
npm install cors
 
JS DOC Dokumentation
npm install --save-dev jsdoc
npm install --save-dev jsdoc-route-plugin
Testen:
npm install --save-dev jest
npm install --save-dev supertest
 
 
um react benutzen zu können?
npm create vite@latest PROJECTNAME -- --template react
npm install react-router-dom
npm install bootstrap react-bootstrap


# Kochbuch – Fullstack Webanwendung

Ein vollständiges Kochbuch-Projekt mit **Node.js (Express)** im Backend und **React (Vite)** im Frontend.  
Benutzer können sich registrieren, anmelden, Rezepte erstellen, bearbeiten, veröffentlichen und löschen.

---

## Projektstruktur

kochbuch/
├── backend/ # Node.js + Express API
├── frontend/ # React + Vite Frontend
└── README.md # Diese zentrale Dokumentation


---

## Erste Schritte

### 1. Projekt klonen

```bash
git clone https://github.com/Tom-GHub/kochbuch-burchard.git
cd kochbuch

2. Backend einrichten

cd backend
npm install

Verwendete Pakete:
Zweck	                    Paketname
Server & Routing	        express
Datenbank (MariaDB)	        mariadb
Authentifizierung	        bcryptjs, jsonwebtoken
Cookies lesen	            cookie-parser
Umgebungsvariablen (.env)	dotenv
CORS (Frontend-Zugriff)	    cors
Dev-Tools	                nodemon, jsdoc, jest, supertest

Nützliche Scripts in package.json:

"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}

    nodemon automatisch installieren:
    npm install --save-dev nodemon

    JS-Dokumentation mit JSDoc:
    npm install --save-dev jsdoc jsdoc-route-plugin

3. Frontend einrichten

cd ../frontend
npm install


Erstellungsbefehl (bei Neuanlage)

npm create vite@latest frontend -- --template react

Weitere Pakete:
Zweck	        Paketname
Routing	        react-router-dom
UI-Komponenten	bootstrap, react-bootstrap
Design System	mdb-react-ui-kit
Starten des Frontends:

npm run dev

Frontend läuft auf: http://fi.mshome.net:3000


Authentifizierung

    Login mit JWT

    Token wird im localStorage gespeichert


Wichtige Dateien
Datei/Pfad	                    Zweck
backend/.env	                Verbindungsdaten zur DB, Secret Keys
frontend/.env	                API-URL des Backends (VITE_API_SERVER_URL)
backend/sql/*.sql	            Datenbankstruktur (Dump)
frontend/src/components/*.jsx	React-Komponenten
backend/routes/*.js	            Express-Routen
ToDos (mögliche Erweiterungen)

    Suchfunktion für Rezepte

    Bewertungs- & Kommentarsystem


Lizenz & Hinweise

Dieses Projekt steht unter der [MIT-Lizenz](./LICENSE).  
Die Nutzung ist frei zu Lern- und Ausbildungszwecken erlaubt.

Weitere READMEs

    Backend README

    Frontend README

Autor

    Tom Burchard
    06.06.2025 / Ausbildungsprojekt 