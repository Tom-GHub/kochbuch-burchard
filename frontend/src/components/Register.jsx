import { Button } from "react-bootstrap";
import { useState } from "react";
import pizzaImage from '../assets/pizza.png'
import { Link, useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput
}
from 'mdb-react-ui-kit';

// Register-Komponente - Verantwortlich für die Benutzerregistrierung
function Register() {
    const navigate = useNavigate();

    // Zustand für alle Formularfelder – wird mit setFormData aktualisiert
    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordCheck: "",
    });

    // Wird bei Änderungen in den Eingabefeldern aufgerufen
    const handleChange = (e) => {
        const { name, value } = e.target;   // Holt Namen und Wert des geänderten Felds

        // Aktualisiert die Formulardaten
        setFormData( (prev) => ({
            ...prev,        // Behält alle bisherigen Werte
            [name]: value,  // Aktualisiert nur das geänderte Feld
        }));
    };

    // Wird aufgerufen, wenn das Formular abgeschickt wird
    const handleSubmit = async (e) => {
        e.preventDefault(); // Verhindert das Neuladen der Seite

        console.log("Register.jsx - handleSubmit formData: ", formData);

        try {
            // Senden der Registrierungsdaten an den Server
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(formData), // Formulardaten als JSON senden
            });

            const jsonData = await res.json();  // Antwort des Servers als JSON auslesen

        if(res.ok) {
            // Erfolgreiche Registrierung
            alert("Sie haben sich erfolgreich registriert.");
            console.log("jsonData: ", jsonData);
            navigate('/login');
        } else {
            // Fehler bei der Registrierung
            console.log("Fehler bei der Registrierung", jsonData.message);
            alert(jsonData.message || "Registrierung fehlgeschlagen");  // Zeigt Fehler an
        }
        } catch(err) {
            console.error("Fehler: ", err);
            alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
        }
    };


    return(
        <>
        <MDBContainer fluid>
            {/* Registrierungsformular */}
            <form onSubmit={handleSubmit}>
                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            {/* Linke Spalte - Registrierungsformular */}
                            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registrier dich!</p>

                                {/* Benutzername und E-Mail (erste Zeile) */}
                                <div className="d-flex flex-row gap-3">
                                    <div className="d-flex flex-row align-items-center mb-4 ">

                                        <MDBInput 
                                            label='Benutzername' 
                                            id='form1' 
                                            type='text' 
                                            className='w-100'
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Benutzername eingeben"
                                            required
                                        />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4 ">
                                        
                                        <MDBInput 
                                            label='E-Mail' 
                                            id='form2' 
                                            type='email'
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="E-Mail eingeben"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Vorname und Nachname (zweite Zeile) */}
                                <div className="d-flex flex-row gap-3">
                                    <div className="d-flex flex-row align-items-center mb-4 ">
                                        
                                        <MDBInput 
                                            label='Vorname' 
                                            id='form3' 
                                            type='text' 
                                            className='w-100'
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            placeholder="Vorname (optional)"
                                        />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        
                                        <MDBInput 
                                            label='Nachname' 
                                            id='form4' 
                                            type='text' 
                                            className='w-100'
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                            placeholder="Nachname (optional)"
                                        />
                                    </div>
                                </div>

                                {/* Passwörter (dritte Zeile) */}
                                    <div className="d-flex flex-row gap-3" >
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <MDBInput
                                                label='Passwort' 
                                                id='form5' 
                                                type='password'
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Passwort eingeben"
                                                required/>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <MDBInput 
                                                label='Passwort wiederholen'
                                                id='form6'
                                                type='password'
                                                name="passwordCheck"
                                                value={formData.passwordCheck}
                                                onChange={handleChange}
                                                placeholder="Passwort erneut eingeben"
                                                required/>
                                        </div>
                                    </div>
                                
                                    {/* Registrierungsbutton und Login-Link */}
                                    <div className="w-100">
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
                                                Registrieren
                                        </Button>
                                        <p className="small fw-bold mt-2 pt-1 mb-2">Bereits einen Account? <Link as={Link} to="/login">Login</Link> </p>
                                    </div>
                                </MDBCol>
                                {/* Rechte Spalte - Bild */}
                                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage src={pizzaImage} fluid/>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </form>
        </MDBContainer>
    </>
    );
}

export default Register