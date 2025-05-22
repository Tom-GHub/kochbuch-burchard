import { useState, useEffect } from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';



import './App.css'

function App() {


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

          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/register' element={<Register/>}  />
      </Routes>
    </div>
    </>
  )
}

export default App
