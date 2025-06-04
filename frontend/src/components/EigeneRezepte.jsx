import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
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

// Komponente für die Anzeige der eigenen Rezepte eines Benutzers
function EigeneRezepte( {isLoggedIn, userName} ) { 

    // Zustand, um die Rezepte des aktuellen Benutzers zu speichern
    const [userRezepte, setUserRezepte] = useState([]);
    console.log('EigeneRezepte.jsx - userRezepte - ', userRezepte);


    // // Funktion zum Veröffentlichen oder Zurückziehen eines Rezepts
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
        // Anfrage an den Server zum Ändern des Veröffentlichungsstatus
        const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptveroeffentlichen/${rezeptId}`, {
            method: "PUT",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isPublished: neuerZustand}), // // wird an das Backend geschickt
        });

        const jsonData = await res.json();

        if(res.ok) {
            // Lokale Liste aktualisieren, damit der neue Zustand im UI sofort sichtbar ist
            setUserRezepte(prevRezepte =>
                prevRezepte.map(rezept =>
                    rezept.id === rezeptId 
                        ? { ...rezept, published: neuerZustand } 
                        : rezept
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

    // Lädt alle eigenen Rezepte beim ersten Laden der Seite
    useEffect(() => {
        const fetchRezepte = async () => {
            const token = localStorage.getItem('token');
            try {
                // Holt alle Rezepte des eingeloggten Benutzers vom Server
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

                // Überprüft ob die Antwort vom Backend ein Array ist (für den Fall, dass der Benutzer keine Rezepte hat)
                if (Array.isArray(data) ) {
                    setUserRezepte(data);
                } else {
                    console.warn("Backend eigenerezepte.js lieferte kein Array:", data);
                    setUserRezepte([]); // Setzt leere Liste falls kein Array zurückkommt
                }
            } catch (error) {
                console.error("Fehler beim Laden der Rezepte:", error);
            }
        };
        // Funktion aufrufen
        fetchRezepte();
    }, []); // Leeres Abhängigkeitsarray bedeutet: nur einmal beim Laden ausführen

    // Funktion zum Löschen eines Rezepts
    const handleDelete = async (rezeptId) => {
        
        // Sicherheitsabfrage bevor gelöscht wird
        const bestätigt = window.confirm("Möchtest du dieses Rezept wirklich löschen?");
        if (!bestätigt) return; // Abbrechen, wenn der Benutzer "Nein" klickt

        const token = localStorage.getItem("token");

        try{ 
            // Sendet Löschrequest an den Server
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/eigenerezepte/${rezeptId}`, {
                    method: "DELETE",
                    headers: { 
                        "Authorization": `Bearer ${token}`
                    },
                });

                if( res.ok ) {
                    const result = await res.json();
                    console.log('Erfolgreich gelöscht:', result);

                    // Rezeptliste im Frontend aktualisieren (gelöschtes Rezept entfernen)
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

                            {/* Begrüßung nur wenn eingeloggt */}
                            { isLoggedIn && (
                                <h3 className="mb-5">Hallo {userName} hier kannst du deine Rezepte ansehen und verwalten.</h3> 
                            )}
                            {/* Rezeptkarten-Grid */}
                            <MDBRow className="w-100 g-4 justify-content-center">
                                {/* .map() wandelt ein Array von Daten in ein Array von UI-Komponenten um. */}
                                {/* Erstellt für jedes Rezept eine Karte */}
                                {userRezepte.map((rezept) => (
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
                                                {/* Zutaten (abgeschnitten mit ... wenn zu lang) */}
                                                <p className="text-muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {rezept.ingredients}
                                                </p>

                                                {/* Aktionsbuttons für jedes Rezept */}
                                                <div className="d-flex flex-column align-items-center gap-2 mt-5"
                                                        style={{maxWidth: '200px', margin: '0 auto'}}>

                                                    {/* Link zur Detailansicht */}
                                                    <Link to={`/rezeptdetail/${rezept.id}`} className="btn btn-update btn-sm w-100">
                                                        Anzeigen
                                                    </Link>

                                                    {/* Link zum Bearbeiten */}
                                                    <Link to={`/bearbeiten/${rezept.id}`} className="btn btn-update btn-sm w-100">
                                                        Bearbeiten
                                                    </Link>

                                                    {/* Button zum Veröffentlichen/Zurückziehen */}
                                                    <Button 
                                                        onClick={() => handlePublished(rezept.id, rezept.published)}
                                                        className={`btn-sm w-100 ${
                                                            rezept.published === 1 
                                                                ? 'btn-unpublish' 
                                                                : 'btn-publish'
                                                            }`}>
                                                        {/* rezept.published ist der aktuelle Zustand */}
                                                        {rezept.published == 1 
                                                            ? 'Zurückziehen' 
                                                            : 'Veröffentlichen'}
                                                    </Button>

                                                    {/* Löschen-Button */}
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