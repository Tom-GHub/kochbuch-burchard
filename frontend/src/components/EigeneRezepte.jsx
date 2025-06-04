import { useEffect, useState } from "react"
import { Nav, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { data, useParams } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
}
from 'mdb-react-ui-kit';


function EigeneRezepte( {isLoggedIn, userName} ) { 


    const [userRezepte, setUserRezepte] = useState([]);
    console.log('EigeneRezepte.jsx - userRezepte - ', userRezepte);


    // handlePublished -> PUT - fetch auf rezept id ( in SQL Abfrage update von published von 0 zu 1 zum veröffentlichen )
    const handlePublished = async (rezeptId, aktuellerZusatnd) => {

        const token = localStorage.getItem("token");

        // Variable für den Zustandswechsel -> wenn published true ist, wird der neue Zustand auf 0 gesetzt, ansonsten 1
        let neuerZustand;
        if( aktuellerZusatnd === 1 ) {
            neuerZustand = 0;
        } else {
            neuerZustand = 1;
        }

    try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptveroeffentlichen/${rezeptId}`, {
                method: "PUT",
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({isPublished: neuerZustand}), // isPublished wird an backend übergeben
            });

            const jsonData = await res.json();

        if(res.ok) {
            // Update im Frontend (Status in userRezepte ändern)
            setUserRezepte(prevRezepte =>
                prevRezepte.map(rezept =>
                    rezept.id === rezeptId ? { ...rezept, published: neuerZustand } : rezept
                )
            );
            console.log("RezeptBearbeiten.jsx - handlePublished jsonData: ", jsonData);

        } else {
        
            console.log("Fehler bei dem Veröffentlichen", jsonData.message);
        }
        } catch(err) {
            console.error("Fehler: ", err);
        }
    };


    useEffect(() => {
        // Rezepte vom Backend laden
        const fetchRezepte = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/eigenerezepte`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                // Was im Frontend von der API ankommt
                // console.log("EigeneRezepte.jsx - data:", data);

                // Überprüfen ob ein Array als Antwort vom Backend kommt
                if (Array.isArray(data) ) {
                    setUserRezepte(data);
                } else {
                    console.warn("Backend eigenerezepte.js lieferte kein Array:", data);
                    setUserRezepte([]); // leeres Array, um Fehler zu vermeiden
                }
            } catch (error) {
                console.error("Fehler beim Laden der Rezepte:", error);
            }
        };

        fetchRezepte();
    }, []);


    const handleDelete = async (rezeptId) => {
        
        // Fenster zum Bestätigen des Löschens
        const bestätigt = window.confirm("Möchtest du dieses Rezept wirklich löschen?");
        if (!bestätigt) return; // abbrechen, wenn der Benutzer "Abbrechen" klickt

        const token = localStorage.getItem("token");

        try{ 
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/eigenerezepte/${rezeptId}`, {
                    method: "DELETE",
                    headers: { 
                        "Authorization": `Bearer ${token}`
                    },
                });

                if( res.ok ) {
                    const result = await res.json();
                    console.log('Erfolgreich gelöscht:', result);

                    // Callback zum Akutalisieren der Rezeptliste nach dem löschen
                    setUserRezepte(prevRezepte => // Funktion prevRezepte wird angegeben, diese Funktion bekommt den aktuellsten Zusatand von userRezepte übergeben
                    // Array-Funktion, die alle Rezepte außer dem zu löschenden Rezept zurückgibt:
                    prevRezepte.filter(rezept => rezept.id !== rezeptId) // rezept.id !== rezeptId bedeutet: „Behalte nur Rezepte, deren ID nicht mit der gelöschten ID übereinstimmt.“
);
                }
            } catch(err) {
                console.error('Fehler beim Löschen', err);
            }

    }


return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol lg='12' 
                                className='d-flex flex-column align-items-center justify-content-center'>

                            {/* Begrüßungs-Überschrift mit dem Benutzernamen */}
                            { isLoggedIn && (
                                <h3 className="mb-5">Hallo {userName} hier kannst du deine Rezepte ansehen und verwalten.</h3> 
                            )}
                            <MDBRow className="w-100 g-4 justify-content-center">
                                {/* .map() wandelt ein Array von Daten in ein Array von UI-Komponenten um. */}
                                {userRezepte.map((rezept) => (
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
                                                    {rezept.ingredients}
                                                </p>

                                                <div className="d-flex flex-column align-items-center gap-2 mt-5"
                                                        style={{maxWidth: '200px', margin: '0 auto'}}>
                                                    <Link to={`/rezeptdetail/${rezept.id}`} className="btn btn-update btn-sm w-100">
                                                        Anzeigen
                                                    </Link>

                                                    <Link to={`/bearbeiten/${rezept.id}`} className="btn btn-update btn-sm w-100">
                                                        Bearbeiten
                                                    </Link>

                                                    <Button 
                                                    // onClick braucht die isPublished funktion die onToggle übergeben bekommt?
                                                        onClick={() => handlePublished(rezept.id, rezept.published)}
                                                        
                                                        className={`btn-sm w-100 ${rezept.published === 1 ? 'btn-unpublish' : 'btn-publish'}`}>
                                                        {/* rezept.published ist der aktuelle Zustand */}
                                                        {rezept.published == 1 ? 'Zurückziehen' : 'Veröffentlichen'}
                                                    </Button>

                                                    <Button 
                                                        className="btn btn-light border border-dark btn-sm w-100"
                                                        onClick={() => handleDelete(rezept.id)}>
                                                        Löschen
                                                    </Button>
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

export default EigeneRezepte;