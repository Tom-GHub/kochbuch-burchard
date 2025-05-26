import { useState, useEffect } from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';



import './App.css'

function App() {

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
    <div>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
          <Navbar.Brand href="/">Kochbuch</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/register">Registrierung</Nav.Link>

          { isLoggedIn ?
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            :
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          }

          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
    </div>
    </>
  )
}

export default App
