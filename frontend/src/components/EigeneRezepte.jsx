import { useEffect, useState } from "react"
import { Nav, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
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

// button zum bearbeiten erstellen
// wenn auf button klicken -> neu Komponente die geöffnet wird -> RezeptBearbeiten


function EigeneRezepte( {isLoggedIn, userName} ) { 

    const [userRezepte, setUserRezepte] = useState([]);
    // console.log('EigeneRezepte.jsx - userRezepte - ', userRezepte);

    // handleUpdate zum Bearbeiten -> PUT-Route im backend


    // handlePublished -> PUT - fetch auf rezept id ( in SQL Abfrage update von published von 0 zu 1 zum veröffentlichen )

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


    // woher bekomme ich die id von dem rezept zum löschen? brauche ich die überhaupt?
    // wenn der button gedrück wird soll handleDelete ausgeführt werden muss ich dann userRezept benutzen?
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
                        <MDBCol lg='12' className='d-flex flex-column align-items-center'>
                            {/* Begrüßungs-Überschrift mit dem Benutzernamen */}
                            { isLoggedIn && (
                                <h2 className="mb-5">Hallo {userName} hier kannst du deine Rezepte ansehen und verwalten.</h2> 
                            )}
                            <MDBRow className="w-100 g-4">
                                {/* .map() wandelt ein Array von Daten in ein Array von UI-Komponenten um. */}
                                {userRezepte.map((rezept) => (
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
                                                    Details ansehen
                                                </Link>

                                                <Link to={`/bearbeiten/${rezept.id}`} className="btn btn-primary btn-sm mt-2">
                                                    Rezept bearbeiten
                                                </Link>

                                                <Button 
                                                    className="btn btn-secondary btn-sm mt-2"
                                                    onClick={() => handleDelete(rezept.id)}>
                                                    Rezept löschen
                                                </Button>
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