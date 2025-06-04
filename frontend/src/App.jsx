import { useState, useEffect } from 'react'
import { Nav, } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Rezept from './components/Rezept';
import EigeneRezepte from './components/EigeneRezepte';
import Rezeptliste from './components/Rezeptliste';
import Detailansicht from './components/Detailansicht';
import RezeptBearbeiten from './components/RezeptBearbeiten';
import './App.css'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBIcon,
    MDBCollapse
} from 'mdb-react-ui-kit';


// Hauptkomponente der Anwendung - Router und globale Zustände
function App() {

    // Zustand für das mobile Menü (geöffnet/geschlossen)
    const [openNavSecond, setOpenNavSecond] = useState(false);

    // Authentifizierungszustände
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);

    // Hook für Navigation zwischen Seiten
    const navigate = useNavigate();

    // Überprüft beim Start der App, ob ein Benutzer eingeloggt ist
    useEffect( () => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userID');
        const storedUserName = localStorage.getItem('username');
        
        if( storedToken && storedUserId ) {
        setIsLoggedIn(true);
        setUserId(storedUserId);
        if( storedUserName ) 
            setUserName(storedUserName);
        }
    }, []   // Wird nur einmal beim Laden der Komponente ausgeführt
    );

    // Benutzer ausloggen – alle Daten aus dem Speicher löschen
    const handleLogout = () => {
        // Entfernt alle gespeicherten Benutzerdaten
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('username');

        // Setzt alle Zustände zurück
        setIsLoggedIn(false);
        setUserName('');

        // Navigiert zur Startseite
        navigate('/');
    };

    return (
        
        <>
        {/* Navigationsleiste */}
        <MDBNavbar className='fixed-top shadow-3' expand='lg' light bgColor='primary'>
        <MDBContainer fluid>
            {/* Logo/Branding */}
            <MDBNavbarBrand 
                className='kochbuch-title text-white fw-bold ' 
                style={{ 
                    fontFamily: 'DancingScript, cursive',
                    fontSize: '2rem',
                }}
            >
                Kochbuch
            </MDBNavbarBrand>

            {/* Mobile Menü-Toggle */}
            <MDBNavbarToggler 
                className='text-white'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setOpenNavSecond(!openNavSecond)}
                style={{
                    fontSize: '1.5rem',      // größerer Icon
                    padding: '1rem',       // größerer Klickbereich
                    backgroundColor: 'rgba(255,255,255,0.2)', // leicht sichtbarer Hintergrund
                    borderRadius: '8px',      // runde Ecken
                    border: '2px solid white',  // dauerhafte weiße Umrandung
                    color: 'white'
                }}
            >
            <MDBIcon icon='bars' fas  />
            </MDBNavbarToggler>

            {/* Navigationslinks */}
            <MDBCollapse navbar open={openNavSecond}>
            <MDBNavbarNav className='link-style'>
            
                {/* Allgemeine Links */}
                <Nav.Link className="text-white" as={Link} to="/" onClick={() => setOpenNavSecond(false)}>Home</Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/rezeptliste" onClick={() => setOpenNavSecond(false)}>Übersicht</Nav.Link>

                {/* Nur für nicht eingeloggte Benutzer: */}
                {!isLoggedIn && (
                    <Nav.Link className="text-white" as={Link} to="/register" onClick={() => setOpenNavSecond(false)}>Registrierung</Nav.Link>
                )}

                {isLoggedIn && (
                    <Nav.Link className="text-white" as={Link} to="/eigenerezepte" onClick={() => setOpenNavSecond(false)}>Eigene Rezepte</Nav.Link>
                )}

                {isLoggedIn && (
                    <Nav.Link className="text-white" as={Link} to="/rezept" onClick={() => setOpenNavSecond(false)}>Rezept schreiben</Nav.Link>
                )}

                {/* Login/Logout Button (wechselnd) */}
                {isLoggedIn 
                    ? <Nav.Link className="text-white" onClick={() => { handleLogout(); setOpenNavSecond(false); }}>Logout</Nav.Link>
                    : <Nav.Link className="text-white" as={Link} to="/login" onClick={() => setOpenNavSecond(false)}>Login</Nav.Link>
                }
            </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
        </MDBNavbar>

        {/* Routen der Anwendung */}
        <Routes>
        <Route 
            path='/' 
            element={<Home
                isLoggedIn = {isLoggedIn}
                userName={userName} 
            />}  
        />
        
        <Route 
            path='/register' 
            element={<Register/>}  
        />

        <Route 
            path='/rezeptliste' 
            element={<Rezeptliste
            />}  
        />

        <Route 
            path='/detailansicht' 
            element={<Detailansicht
            />}  
        />

        <Route 
            path='/rezept' 
            element={<Rezept
                userId={userId}
            />}  
        />

        <Route 
            path='/eigenerezepte' 
            element={<EigeneRezepte
                isLoggedIn={isLoggedIn}
                userName={userName}     
            />} 
        />

        <Route 
            path='/login' 
            element={<Login
                isLoggedIn = {isLoggedIn}
                setIsLoggedIn = {setIsLoggedIn}
                setUserName = {setUserName}
                userName = {userName} 
            />}  
        />

        <Route 
            path='/rezeptdetail/:id' 
            element={<Detailansicht
            />}  
        />

        <Route 
            path='/bearbeiten/:id' 
            element={<RezeptBearbeiten
            />}  
        />

        </Routes>
        </>
    );
}
export default App;