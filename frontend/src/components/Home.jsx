import { useEffect } from "react"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"


// Home-Komponente, zeigt Begrüßung basierend auf dem übergebenen userName
function Home( {} ) { 

    // useEffect wird beim ersten Laden der Komponente einmal ausgeführt (leeres Abhängigkeitsarray [])
    useEffect(() => {
        // Asynchrone Funktion ruft die Startseite des Servers auf
        async function callServer() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}`); // Backend-Root-Route aufrufen
                const data = await response.json(); // JSON-Antwort lesen
                console.log(data);  // Serverantwort in der Konsole ausgeben
            } catch (error) {
                console.error("Fehler beim Login:", error);
            }
        }
        callServer();   // Serverabruf starten

    }, []);


    return(
        <>
        <div>
            {/* Begrüßungs-Überschrift mit dem Benutzernamen */}
            <h1>Willkommen {} </h1>  {/* mit geschweiften klammern javasript benutzen */}


            {/* Fester Begrüßungstext */}
            <p>Hier steht ein Text zur Begrüßung.</p>
        </div>
        </>
    )
}

export default Home