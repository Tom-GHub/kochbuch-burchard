import { useState, useEffect } from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';



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
        
        if( storedToken && storedUserId ) {
        setIsLoggedIn(true);
        setUserId(storedUserId);
        }
    }, [navigate]
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        
        <>
        <MDBNavbar className='fixed-top shadow-3' expand='lg' light bgColor='primary'>
        <MDBContainer fluid>
            <MDBNavbarBrand className='kochbuch text-white fw-bold ' style={{ fontFamily: 'DancingScript, cursive' }}>Kochbuch</MDBNavbarBrand>
            <MDBNavbarToggler className='text-white'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavSecond(!openNavSecond)}
            >
            <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar open={openNavSecond}>
            <MDBNavbarNav>
            

                <Nav.Link className="text-white" as={Link} to="/">Home</Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/register">Registrierung</Nav.Link>
                { isLoggedIn ?
                    <Nav.Link className="text-white" onClick={handleLogout}>Logout</Nav.Link>
                    :
                    <Nav.Link className="text-white" as={Link} to="/login">Login</Nav.Link>
                }


            </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
        </MDBNavbar>

        <Routes>
        <Route path='/' element={<Home
                        userName={userName} />}  />
        
        <Route path='/register' element={<Register/>}  />

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