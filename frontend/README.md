# Kochbuch Frontend
```bash
Dies ist das Frontend einer Kochbuch-Webanwendung, die es Nutzern ermöglicht, sich zu registrieren, eigene Rezepte anzulegen, zu bearbeiten, zu veröffentlichen und sich alle veröffentlichten Rezepte anzusehen.  
Das Projekt basiert auf React (mit Vite), MDB React UI Kit, React Router v7 und React Bootstrap.


## Technologien

- React 19
- Vite                  als Build-Tool  
- MDB React UI Kit      für UI-Komponenten  
- React Router v7       für das Routing  
- React Bootstrap       für zusätzliche UI-Elemente  
- Bootstrap 5           als CSS-Framework



### Abhängigkeiten installieren

cd kochbuch/frontend

npm install


## Umgebungsvariablen konfigurieren
Erstelle eine .env Datei im Projektroot mit der Backend-URL:

Beispiel: VITE_API_SERVER_URL=http://fi.mshome.net:3000


## Authentifizierung

    Token-basierte Authentifizierung mit JWT

    Authentifizierte Routen:

        Eigene Rezepte ansehen/bearbeiten/löschen

        Rezept erstellen

    Der Token wird im localStorage gespeichert und automatisch mitgesendet



## Features
    Funktion	        Beschreibung
    Registrierung	    Neue Benutzer:innen können sich registrieren
    Login	            Login mit E-Mail & Passwort
    Rezeptliste	        Alle veröffentlichten Rezepte ansehen
    Eigene              Rezepte	Eigene Rezepte verwalten
    Rezept              erstellen	Titel, Zutaten, Zubereitung, Bild
    Rezept              bearbeiten	Bestehende Rezepte bearbeiten
    Rezept              löschen	Rezept entfernen mit Bestätigung
    Responsive Design	Optimiert für Desktop und Mobilgeräte


