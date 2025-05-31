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

function Rezeptliste() { 

    const [rezepte, setRezepte] = useState([]);

    useEffect(() => {
        // Rezepte vom Backend laden
        const fetchRezepte = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptliste`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                // Was im Frontend von der API ankommt
                // console.log("API Response:", data);

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

                            <MDBRow className="w-100 g-4">
                                {/* .map() wandelt ein Array von Daten in ein Array von UI-Komponenten um. */}
                                {rezepte.map((rezept) => (
                                    <MDBCol md="6" lg="4" key={rezept.id}>
                                        <MDBCard className="h-100">
                                            {rezept.image && (
                                                <MDBCardImage
                                                    src={`http://fi.mshome.net:3001/uploads/${rezept.image}`}
                                                    position='top'
                                                    alt={rezept.title}
                                                />
                                            )}
                                            <MDBCardBody>
                                                <h5 className="fw-bold">{rezept.title}</h5>
                                                <p className="text-muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {rezept.ingredients}
                                                </p>
                                                <Link to={`/rezeptdetail/${rezept.id}`} className="btn btn-primary btn-sm mt-2">
                                                    Ansehen
                                                </Link>
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