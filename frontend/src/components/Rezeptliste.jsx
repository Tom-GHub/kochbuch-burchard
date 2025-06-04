import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
}
from 'mdb-react-ui-kit';

// Rezeptliste-Komponente – zeigt alle verfügbaren Rezepte an
function Rezeptliste() { 

    const [rezepte, setRezepte] = useState([]); // Zustand für alle geladenen Rezepte

    // Lädt die Rezepte beim ersten Rendern der Komponente
    useEffect(() => {
        // Holt Rezepte vom Backend
        const fetchRezepte = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptliste`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                // Was im Frontend von der API ankommt
                console.log("Rezeptliste.jsx - data: ", data);

                // Überprüfen ob ein Array als Antwort vom Backend kommt
                if (Array.isArray(data) ) {
                    setRezepte(data);   // Rezepte in den Zustand speichern
                } else {
                    console.warn("Backend lieferte kein Array:", data);
                    setRezepte([]); // Leeres Array setzen falls Fehler
                }
            } catch (error) {
                console.error("Fehler beim Laden der Rezepte:", error);
            }
        };

        fetchRezepte();
    }, []); // leeres Dependency-Array = nur einmal beim Laden der Komponente ausführen



    return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol lg='12' className='d-flex flex-column align-items-center'>
                            {/* Überschrift */}
                            <p className="text-center h2 fw-bold mb-5">Leckere Rezepte!</p>

                            {/* Rezeptkarten-Grid */}
                            <MDBRow className="w-100 g-4 justify-content-evenly">
                                {/* .map() wandelt ein Array von Daten in ein Array von UI-Komponenten um. */}
                                {rezepte.map((rezept) => (
                                    <MDBCol md="6" lg="4" key={rezept.id}>
                                        <MDBCard className="h-100">
                                            {/* Rezeptbild falls vorhanden */}
                                            {rezept.image && (
                                                <MDBCardImage
                                                    src={`${import.meta.env.VITE_API_SERVER_URL}/uploads/${rezept.image}`}
                                                    position='top'
                                                    alt={rezept.title}
                                                    className="card-img-top fixed-image-size"
                                                />
                                            )}
                                            <MDBCardBody>
                                                {/* Rezepttitel */}
                                                <h5 className="fw-bold">{rezept.title}</h5>

                                                <div className="d-flex flex-column align-items-center gap-2 mt-5">
                                                
                                                {/* Link zur Detailseite */}
                                                <Link to={`/rezeptdetail/${rezept.id}`} className="btn btn-update btn-sm w-100">
                                                    Rezept anzeigen
                                                </Link>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                ))}
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Rezeptliste;