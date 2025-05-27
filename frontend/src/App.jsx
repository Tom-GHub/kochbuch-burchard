import { useState, useEffect } from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Rezept from './components/Rezept';



import './App.css'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse
} from 'mdb-react-ui-kit';

function App() {

    const [openNavSecond, setOpenNavSecond] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

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
    }, [navigate]
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUserName('');
        navigate('/');
    };

    return (
        
        <>
        <MDBNavbar className='fixed-top shadow-3' expand='lg' light bgColor='primary'>
        <MDBContainer fluid>
            <MDBNavbarBrand 
                className='kochbuch text-white fw-bold ' 
                style={{ 
                    fontFamily: 'DancingScript, cursive',
                    fontSize: '2rem'
                }}
                >
                Kochbuch
            </MDBNavbarBrand>
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
                    border: '2px solid white',  // <- dauerhafte weiße Umrandung
                    borderRadius: '8px',
                    color: 'white'
                }}
            >
            <MDBIcon icon='bars' fas  />
            </MDBNavbarToggler>
            <MDBCollapse navbar open={openNavSecond}>
            <MDBNavbarNav className='link-style'>
            
                <Nav.Link className="text-white" as={Link} to="/" onClick={() => setOpenNavSecond(false)}>Home</Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/register" onClick={() => setOpenNavSecond(false)}>Registrierung</Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/rezept" onClick={() => setOpenNavSecond(false)}>Rezept</Nav.Link>
                { isLoggedIn 
                    ? <Nav.Link className="text-white"onClick={() => { handleLogout(); setOpenNavSecond(false); }}>Logout</Nav.Link>
                    : <Nav.Link className="text-white" as={Link} to="/login" onClick={() => setOpenNavSecond(false)}>Login</Nav.Link>
                }
            

            </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
        </MDBNavbar>

        <Routes>
        <Route path='/' element={<Home
                        isLoggedIn = {isLoggedIn}
                        userName={userName} />}  />
        
        <Route path='/register' element={<Register/>}  />
        <Route path='/rezept' element={<Rezept/>}  />

        <Route path='/login' element={<Login
            isLoggedIn = {isLoggedIn}
            setIsLoggedIn = {setIsLoggedIn}
            setUserName = {setUserName}
            userName = {userName} 
        />}  />

        </Routes>
        </>
    );
}


export default App;