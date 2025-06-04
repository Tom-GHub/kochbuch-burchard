import {  Button } from 'react-bootstrap';
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import {
    MDBContainer,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBFile 
}
from 'mdb-react-ui-kit';

// RezeptBearbeiten-Komponente - Ermöglicht das Bearbeiten bestehender Rezepte
function RezeptBearbeiten( {} ) { 

const { id } = useParams(); // Holt die Rezept-ID aus der URL

// Zustände für:
const [rezept, setRezept] = useState(null);     // Das originale Rezept vom Server
const [loading, setLoading] = useState(true);   // Ladezustand
const [error, setError] = useState(null);       // Fehlermeldung
const [image, setImage] = useState(null);       // Das hochgeladene Bild

// Formulardaten für das bearbeitete Rezept (Titel, Zutaten, Zubereitung)
const [formData, setFormData] = useState({
    titel: '',
    zutatenliste: '',
    zubereitung: '',
});

// Lädt das Rezept beim ersten Rendern und wenn sich die ID ändert
useEffect( () => {
    // Auth-Token aus dem Browser-Storage (localStorage)
    const token = localStorage.getItem('token');
    const fetchRezept = async () => {
        try {
            // Holt Rezeptdaten vom Server
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptdetail/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            const data = await response.json();
            console.log('RezeptBearbeiten.jsx - data: ', data);

            if( response.ok ) {
                // Daten aus der API in die Zustände übertragen
                setRezept(data); // Komplettes Rezept-Objekt (z.B. für Bild)
                setFormData({
                    titel: data.title || '',                // Fallback auf leeren String falls undefined   
                    zutatenliste: data.ingredients || '',
                    zubereitung: data.instructions || ''
                });
                console.log("RezeptBearbeiten.jsx - Form data after set:", {
                    titel: data.title || '',
                    zutatenliste: data.ingredients || '',
                    zubereitung: data.instructions || ''
                    });
                console.log('setRezept', rezept);

                setImage(data.image || null);   // Bild setzen oder null falls keins vorhanden
            } else {
                setError(data.message || 'Fehler beim Laden des Rezepts');
            }
        } catch(err) {
            console.error("Fehler beim Laden des Rezepts: ", err);
        } finally {
            setLoading(false);  // Ladevorgang abgeschlossen
        }
    };

    fetchRezept();
}, [id]);   // Wenn sich die Rezept-ID ändert, wird neu geladen


    // Wird bei jeder Änderung in einem Eingabefeld aufgerufen und aktualisiert den State
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData( (prev) => ({
            ...prev,        // vorherige Werte beibehalten
            [name]: value,  // neues Feld überschreiben
        }));
        // console.log('handleChange - name:, value ',name, value);
    };

    // Aktualisiert das Rezept auf dem Server
    const handleUpdate = async (e) => {
        e.preventDefault(); // Verhindert Neuladen der Seite beim Absenden

        // token hinzufügen im token ist userID - die api kann hieraus die id auslesen -> das passiert in der middleware
        const token = localStorage.getItem("token");

        // FormData wird genutzt, um auch Bilder mitzusenden
        const formDataObj = new FormData();
        formDataObj.append('titel', formData.titel);
        formDataObj.append('zutatenliste', formData.zutatenliste);
        formDataObj.append('zubereitung', formData.zubereitung);
        if (image) {
            formDataObj.append('image', image); // neues Bild hinzufügen, falls vorhanden
        }
        console.log('RezeptBearbeiten.jsx - formDataObj', formDataObj );
        try {
            // Sendet aktualisierte Daten an den Server
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptbearbeiten/${id}`, {
                method: "PUT",
                headers: { 
                    "Authorization": `Bearer ${token}`
                    // Content-Type wird bei FormData automatisch gesetzt
                },
                body: formDataObj,
            });

            const jsonData = await res.json();

        if(res.ok) {
            alert("Rezept wurde erfolgreich aktualisiert");
            console.log("RezeptBearbeiten.jsx - jsonData: ", jsonData);
        } else {
            alert(jsonData.message || "Fehler beim Speichern der Änderungen");
            console.log("Fehler beim Aktualisieren", jsonData.message);
        }
        } catch(err) {
            console.error("Fehler: ", err);
            alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
        }
    };

    // Setzt das Formular auf die ursprünglichen Werte zurück
    const handleReset = () => {
        if (window.confirm("Willst du wirklich abbrechen? Alle Eingaben gehen verloren.")) {
        setFormData({
            titel: rezept?.title || '',
            zutatenliste: rezept?.ingredients || '',
            zubereitung: rezept?.instructions || ''
        });
        document.getElementById('imageUpload').value = '';  // Dateiauswahl zurücksetzen
        setImage(rezept?.image || null);                    // Originalbild wiederherstellen
        }
    };

    // Lade- und Fehlerzustände
    if (loading) return <p>🔄 Rezept wird geladen...</p>;
    if (error) return <p>❌ Fehler: {error}</p>;
    if (!rezept) return <p>⚠️ Kein Rezept gefunden.</p>;

    return(
        <>
        <MDBContainer fluid>
            <form onSubmit={handleUpdate}>

                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBCol md='10' lg='12' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                        <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Schreibe hier dein Rezept</p>

                        {/* Titel und Bild-Upload */}
                        <div className='d-flex flex-row gap-3 w-100'>
                            <div className="mb-4 w-100">
                                <MDBInput 
                                    label='Titel' 
                                    id='form1' 
                                    type='text' 
                                    className='w-100'
                                    name="titel"
                                    value={formData.titel}
                                    onChange={handleChange}
                                    placeholder="Wie soll das Rezept heißen?"
                                />
                            </div>
                            <div className="d-flex flex-column w-100">
                                <MDBFile 
                                    id="imageUpload"
                                    name="image"
                                    accept="image/*"
                                    className="w-100"
                                    onChange={e => setImage(e.target.files[0])} // Erstes ausgewähltes Bild speichern
                                />
                                <label htmlFor="imageUpload" className="form-label ms-1">Bild hochladen</label>
                            </div>
                        </div>

                        {/* Zutaten und Zubereitung */}
                        <div className='d-flex flex-row gap-3 w-100'>
                            <div className="mb-4 w-100">
                                <MDBTextArea 
                                    label='Zutatenliste' 
                                    id='form2' 
                                    type='textarea'
                                    className='w-100'
                                    name="zutatenliste"
                                    rows={6}   
                                    value={formData.zutatenliste}
                                    onChange={handleChange}
                                    placeholder="Schreibe hier deine Zutaten auf"
                                />
                            </div>

                            <div className="mb-4 w-100">
                                    <MDBTextArea 
                                        label='Zubereitung' 
                                        id='form3' 
                                        type='textarea' 
                                        className='w-100'
                                        name="zubereitung"
                                        rows={6}   
                                        value={formData.zubereitung}
                                        onChange={handleChange}
                                        placeholder="Wie wird das Gericht zubereitet?"
                                    />
                            </div>
                        </div>
                        
                        {/* Buttons */}
                        <div className="w-100 mb-3">
                            <Button type="button" 
                                    onClick={handleReset}
                                    className="w-100 d-flex align-items-center justify-content-center btn btn-light border border-dark" 
                                    style={{
                                        userSelect: 'none',
                                        whiteSpace: 'nowrap',
                                        height: '40px',
                                        transition: 'none',      // kein Übergang beim Klick
                                        boxShadow: 'none',       // kein Schatten beim Klicken
                                        outline: 'none',          // kein Outline beim Klicken
                                        transform: 'none',
                                    }}
                                >
                                    Änderungen verwerfen
                            </Button>
                        
                        </div>

                        <div className="w-100 mb-3" >
                            <Button type="submit" 
                                    className="w-100 fw-bold d-flex align-items-center justify-content-center" 
                                    style={{
                                        userSelect: 'none',
                                        whiteSpace: 'nowrap',
                                        height: '40px',
                                        transition: 'none',      // kein Übergang beim Klick
                                        boxShadow: 'none',       // kein Schatten beim Klicken
                                        outline: 'none',          // kein Outline beim Klicken
                                        transform: 'none'
                                    }}
                                >
                                    Änderungen speichern
                            </Button>
                            
                        </div>
                        </MDBCol>
                    </MDBCardBody>
                </MDBCard>
            </form>
        </MDBContainer>
    </>
    );
}

export default RezeptBearbeiten;