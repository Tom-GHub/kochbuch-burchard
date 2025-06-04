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

// isLoggedIn übergeben um bearbeiten und löschen button anzeigen zu lassen
function Rezeptliste() { 

    const [rezepte, setRezepte] = useState([]);

    useEffect(() => {
        // Rezepte vom Backend laden
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
                    setRezepte(data);
                } else {
                    console.warn("Backend lieferte kein Array:", data);
                    setRezepte([]); // leeres Array, um Fehler zu vermeiden
                }
            } catch (error) {
                console.error("Fehler beim Laden der Rezepte:", error);
            }
        };

        fetchRezepte();
    }, []);



    return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol lg='12' className='d-flex flex-column align-items-center'>
                            <p className="text-center h2 fw-bold mb-5">Leckere Rezepte!</p>

                            <MDBRow className="w-100 g-4 justify-content-evenly">
                                {/* .map() wandelt ein Array von Daten in ein Array von UI-Komponenten um. */}
                                {rezepte.map((rezept) => (
                                    <MDBCol md="6" lg="4" key={rezept.id}>
                                        <MDBCard className="h-100">
                                            {rezept.image && (
                                                <MDBCardImage
                                                    src={`${import.meta.env.VITE_API_SERVER_URL}/uploads/${rezept.image}`}
                                                    position='top'
                                                    alt={rezept.title}
                                                    className="card-img-top fixed-image-size"
                                                />
                                            )}
                                            <MDBCardBody>
                                                <h5 className="fw-bold">{rezept.title}</h5>
                                                <p className="text-muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                
                                                </p>
                                                <div className="d-flex flex-column align-items-center gap-2 mt-5">
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