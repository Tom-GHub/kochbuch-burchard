import { MDBContainer, MDBCard, MDBCardBody } from "mdb-react-ui-kit";

// Startseite (Home) der Anwendung
// Props: isLoggedIn → ob der Benutzer eingeloggt ist, userName → Name des Benutzers
function Home({ isLoggedIn, userName }) {

    return (
        <>
            {/* Hintergrundbild über die gesamte Seite */}
            <div
                style={{
                    backgroundImage: `url('/picture/cooking.jpg')`, // Pfad zum Hintergrundbild
                    backgroundSize: 'cover',        // Bild deckt gesamten Bereich ab
                    backgroundPosition: 'center',   // Bild wird zentriert
                    backgroundRepeat: 'no-repeat',  // Bild wird nicht wiederholt
                    height: '100vh',                // Volle Bildschirmhöhe
                    width: '100vw',                 // Volle Bildschirmbreite
                    position: 'fixed',              // Fixierte Position (scrollt nicht)
                    top: 0,                         // Oben am Bildschirmrand
                    left: 0,                        // Links am Bildschirmrand
                }}
            >
            {/* Container für die Inhalte über dem Hintergrund */}
            <div style={{ 
                position: 'relative',   // Relative Positionierung für z-index
                zIndex: 1               // Sicherstellt, dass Inhalt über Hintergrund liegt
            }}>
                {/* Hauptcontainer für die Karte - zentriert den Inhalt vertikal und horizontal */}
                <MDBContainer 
                    fluid 
                    className="pt-5 d-flex justify-content-center align-items-center" 
                    style={{ minHeight: '100vh' }}>

                    {/* Karte mit Willkommensnachricht */}
                    <MDBCard 
                        className="text-black shadow" 
                        style={{
                            borderRadius: "25px",      // Abgerundete Ecken
                            maxWidth: "600px",         // Maximale Breite
                            width: "100%",             // Volle Breite (bis maxWidth)
                            backgroundColor: "rgba(255, 255, 255, 0.9)", // Weiß mit 90% Deckkraft
                        }}>
                        <MDBCardBody className="p-4 text-center">
                            {/* Dynamische Begrüßungsüberschrift */}
                            <h2 className="fw-bold mb-4">
                                {isLoggedIn
                                    ? `Willkommen, ${userName}!`    // Für eingeloggte Benutzer
                                    : "Hallo! Schön dass du hier bist." // Für Gäste
                                }    
                            </h2>
                            {/* Fester Untertitel unter der Begrüßung */}
                            <p className="lead">
                                Du findest viele leckere Rezepte in unsrem Kochbuch.
                            </p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
            </div>
        </>
    );
}

export default Home;