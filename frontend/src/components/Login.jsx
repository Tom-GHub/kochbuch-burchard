
import {MDBContainer, MDBCol, MDBRow, MDBInput, MDBCard, MDBCardBody} from 'mdb-react-ui-kit';
import { useState } from "react";
import pizzaLogin from '../assets/pizzaLogin.png'
import {  Button } from "react-bootstrap";
import { data, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Login-Komponente - Verantwortlich für die Benutzeranmeldung
// Erhält zwei Callback-Funktionen als Props:
// - setIsLoggedIn: Funktion zum Setzen des Login-Status
// - setUserName: Funktion zum Setzen des Benutzernamens
function Login( { setIsLoggedIn, setUserName} ) {
    // Nachricht für Benutzerfeedback (z.B. Fehlermeldung)
    const [message, setMessage] = useState('');

    // Hook für die Navigation zwischen Seiten
    const navigate = useNavigate();

    // Zustand für das Formular (E-Mail und Passwort)
    const [formData, setFormData] = useState( {
        email: "",
        password: "",
    });

    // Wird bei jeder Eingabe in ein Formularfeld aufgerufen
    const handleChange = (e) => {
        const { name, value } = e.target;   // Holt Namen und Wert des geänderten Felds
        
        // vorherigen Zustand behalten und nur das geänderte Feld aktualisieren
        setFormData( (prev) => ({
            ...prev,        // Behält alle bisherigen Werte
            [name]: value,  // Aktualisiert nur das geänderte Feld
        }));
    };

    // Wird beim Absenden des Formulars ausgelöst
    const handleSubmit = async (e) => {
        e.preventDefault(); // Verhindert das Neuladen der Seite

        console.log("Login.jsx - handleSubmit formData: ", formData);

        try {
            // Anfrage an das Backend senden, um Login-Daten zu prüfen
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(formData), // E-Mail und Passwort werden als JSON gesendet
            });

            const jsonData = await res.json();  // Antwort des Servers als JSON auslesen
            // console.log("Login.jsx - handleSubmit formData nach jasonData: ", formData);

        if(res.ok) {
            // Wenn Login erfolgreich war, speichern wir Daten im Browser (localStorage)
            localStorage.setItem('token', jsonData.token);
            localStorage.setItem('userID', jsonData.userID);
            localStorage.setItem('username', jsonData.username);

            // Zustand im Frontend setzen:
            setIsLoggedIn(true);    // Benutzer ist eingeloggt
            setUserName(jsonData.username); // Benutzername wird gespeichert
            setMessage('Sie sind eingeloggt.');

            // Weiterleitung zur Startseite nach 1 Sekunde
            setTimeout( () => {
                navigate('/');
            }, 1000);
        } else {
            // Fehler vom Backend anzeigen
            setMessage(data.error || 'Login fehlgeschlagen');
            console.log("Login - Fehler bei der Anmeldung", jsonData.message);
        }
        } catch(err) {
            // Technischer Fehler (z. B. keine Verbindung zum Server)
            console.error("Fehler beim Login: ", err);
        }
    };


return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
        {/* Formular für den Login */}
        <form onSubmit={handleSubmit}>
            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                    <MDBRow>
                        {/* Linke Spalte mit Bild */}
                        <MDBCol col='10' md='6'>
                            <img src={pizzaLogin} className="img-fluid" alt="Sample image" />
                        </MDBCol>

                        {/* Rechte Spalte mit Login-Formular */}
                        <MDBCol col='4' md='6'>
                            <p className="text-right h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Logg dich ein!</p>
                            {/* E-Mail Eingabefeld */}
                            <MDBInput 
                                className='mt-10' 
                                wrapperClass='mb-4' 
                                label='E-Mail Address' 
                                id='formControlLg1' 
                                type='email' 
                                size="lg"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='example@provider.com'
                                required
                            />
                            {/* Passwort Eingabefeld */}
                            <MDBInput 
                                wrapperClass='mb-4' 
                                label='Password' 
                                id='formControlLg2' 
                                type='password' 
                                size="lg"
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Dein Passwort'
                                required
                            />

                            {/* Login-Button und Registrierungs-Link */}
                            <div className='text-center text-md-start mt-4 pt-2 d-flex flex-column'>
                                <Button 
                                    type="submit" 
                                    className="mdb-btn fw-bold d-flex align-items-center justify-content-center" 
                                    style={{
                                        userSelect: 'none',
                                        whiteSpace: 'nowrap',
                                        height: '40px',
                                        minWidth: '150px',      // feste Breite hilft
                                        padding: '0 1rem',       // gleichmäßiger Innenabstand
                                        transition: 'none',      // kein Übergang beim Klick
                                        boxShadow: 'none',       // kein Schatten beim Klicken
                                        outline: 'none',          // kein Outline beim Klicken
                                        transform: 'none'
                                    }}
                                >
                                    Login
                                </Button>

                                {/* Link zur Registrierungsseite */}
                                <p className="small fw-bold mt-2 pt-1 mb-2">Noch kein Account? <Link as={Link} to="/register">Register</Link> </p>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </form>
    </MDBContainer>
    );
}



export default Login