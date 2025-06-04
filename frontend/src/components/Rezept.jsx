import {  Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
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
import { useState } from 'react';


// Rezept-Komponente - Ermöglicht das Erstellen neuer Rezepte
function Rezept( {} ) { 
    const navigate = useNavigate();

    // Zustand für die Formulareingaben (Titel, Zutatenliste, Zubereitung)
    const [formData, setFormData] = useState({
        titel: '',
        zutatenliste: '',
        zubereitung: '',
    });

    // Zustand für das hochgeladene Bild
    const [picture, setPicture] = useState(null);

    // Diese Funktion wird bei jeder Eingabeänderung aufgerufen.
    // Sie aktualisiert das entsprechende Feld im formData-State.
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Aktualisiert den Formularzustand, behält andere Werte bei
        setFormData( (prev) => ({
            ...prev,
            [name]: value,
        }));
        // console.log('handleChange - name:, value ',name, value);
    };

    // Formular wird abgeschickt – Rezept wird an die API gesendet
    const handleSubmit = async (e) => {
        e.preventDefault(); // Verhindert Neuladen der Seite

        // Token aus dem LocalStorage holen, damit der Server weiß, welcher Nutzer das Rezept erstellt
        const token = localStorage.getItem("token");

        // FormData-Objekt notwendig, um neben Text auch Dateien (z.B. Bilder) zu versenden
        const formDataObj = new FormData();
        formDataObj.append('titel', formData.titel);
        formDataObj.append('zutatenliste', formData.zutatenliste);
        formDataObj.append('zubereitung', formData.zubereitung);
        // Bild nur anhängen, wenn eines hochgeladen wurde
        if (picture) {
            formDataObj.append('picture', picture);
        }

        try {
            // Sendet Rezeptdaten an den Server
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezept`, {
                method: "POST",
                headers: { 
                    "Authorization": `Bearer ${token}`  // Authentifizierung mit Token
                },
                body: formDataObj,  // Enthält Text + optional Bild
            });

            const jsonData = await res.json();

        if(res.ok) {
            alert("Rezept wurde erstellt");
            console.log("Rezept.jsx - jsonData: ", jsonData);
            navigate('/eigenerezepte')
        } else {
        
            console.log("Fehler bei dem erstellen", jsonData.message);
        }
        } catch(err) {
            console.error("Fehler: ", err);
        }
    };

    // Setzt das Formular zurück – inklusive Bild-Upload
    const handleReset = () => {
    if (window.confirm("Willst du wirklich abbrechen? Alle Eingaben gehen verloren.")) {
        setFormData({
            titel: '',
            zutatenliste: '',
            zubereitung: ''
        });
        setPicture(null); // Bild zurücksetzen
        document.getElementById('imageUpload').value = '';  // Dateiauswahl zurücksetzen
    }
};

    return(
        <>
        <MDBContainer fluid>
            <form onSubmit={handleSubmit}>

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
                                        required
                                    />
                                </div>
                                <div className="d-flex flex-column w-100">
                                    <MDBFile 
                                        id="imageUpload"
                                        name="picture"
                                        accept="image/*"
                                        className="w-100"
                                        onChange={e => setPicture(e.target.files[0])}   // Erstes ausgewähltes Bild speichern
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
                                        required
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
                                            required
                                        />
                                </div>
                            </div>
                            
                            {/* Buttons: Abbrechen & Speichern */}
                            <div className="w-100 mb-3">
                                <Button 
                                    type="button" 
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
                                    Abbrechen
                                </Button>
                            </div>

                            <div className="w-100 mb-3" >
                                <Button 
                                    type="submit" 
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
                                    Speichern
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

export default Rezept;