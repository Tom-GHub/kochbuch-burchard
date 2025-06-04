import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import {

    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBListGroup,
    MDBListGroupItem
}
from 'mdb-react-ui-kit';

// Detailansicht-Komponente für ein einzelnes Rezept
function Detailansicht( {} ) {

const { id } = useParams(); // Holt die Rezept-ID aus der URL
const [rezept, setRezept] = useState(null);     // Zustand für das geladene Rezept
const [loading, setLoading] = useState(true);   // Zustand ob Daten geladen werden
const [error, setError] = useState(null);       // Zustand für Fehlermeldung
const [picture, setPicture] = useState(null);   // Zustand für das Rezeptbild

// useEffect wird ausgeführt, wenn die Komponente geladen wird oder sich die ID ändert
useEffect( () => {
    const fetchRezept = async () => {
        try {
            // Anfrage an die API, um das Rezept mit der ID zu holen
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptdetail/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Überprüft, ob die Anfrage erfolgreich war
            if (!response.ok) {
                    throw new Error(`Fehler: ${response.status}`);
                }

            // Antwort in JSON umwandeln
            const data = await response.json();

            // Wenn erfolgreich, Rezept-Daten speichern
            if( response.ok ) {
                setRezept(data);

                // Falls ein Bild vorhanden ist, wird es gespeichert
                if( data.image ) {
                    setPicture(data.image)
                }
            }
        } catch(err) {
            console.error("Fehler beim Laden des Rezepts: ", err);
        } finally {
            // Ladezustand beenden, unabhängig vom Ergebnis
            setLoading(false);
        }
    };
    // Funktion aufrufen
    fetchRezept();
}, [id]);   // Neu ausführen, wenn sich die ID ändert

if (loading) return <p>🔄 Rezept wird geladen...</p>;
if (error) return <p>❌ Fehler: {error}</p>;
if (!rezept) return <p>⚠️ Kein Rezept gefunden.</p>;

    // Anzeige des Rezepts
    return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    {/* Rezepttitel */}
                    <h2 className="text-center fw-bold mb-4">{rezept.title}</h2>
                    {/* Rezeptbild (falls vorhanden) */}
                    {rezept.image && (
                        <MDBCardImage
                            src={`${import.meta.env.VITE_API_SERVER_URL}/uploads/${rezept.image}`}
                            position='top'
                            alt={rezept.title}
                            style={{ maxWidth: '400px' }}
                        />
                    )}
                    {/* Zutatenliste */}
                    <h4 className="mt-4">Zutaten</h4>
                    <MDBListGroup light>
                        {/* Teilt die Zutaten auf (eine pro Zeile) */}
                        {rezept.ingredients.split('\r\n').map((item, index) => (
                            <MDBListGroupItem key={index}>{item}</MDBListGroupItem>
                        ))}
                    </MDBListGroup>

                    {/* Zubereitung */}
                    <h4 className="mt-4">Zubereitung</h4>
                    <MDBCard className="mt-2" style={{ backgroundColor: '#f8f9fa' }}>
                        <MDBCardBody>
                            {/* Zeigt den Zubereitungstext mit Zeilenumbrüchen an */}
                            <p style={{ whiteSpace: 'pre-line' }}>{rezept.instructions}</p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Detailansicht;