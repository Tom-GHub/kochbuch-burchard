import { Button } from "react-bootstrap";
import { useState } from "react";
import pizzaImage from '../assets/pizza.png'
import { Link } from "react-router-dom";
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


function Register() {

    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordCheck: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // console.log(formData);  // debug

        setFormData( (prev) => ({
            ...prev,
            [name]: value,
        }));

        // console.log(formData);  // debug
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Register.jsx - handleSubmit formData: ", formData);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(formData),
            });

            const jsonData = await res.json();

        if(res.ok) {
            alert("Sie haben sich erfolgreich Registriert.");
            console.log("jsonData: ", jsonData);
        } else {
        
            console.log("Fehler bei der Anmeldung", jsonData.message);
        }
        } catch(err) {
            console.error("Fehler: ", err);
        }
    };


    return(
        <>
        <MDBContainer fluid>
            <form onSubmit={handleSubmit}>

                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                        <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registrier dich!</p>

                        <div className="d-flex flex-row gap-3">
                            <div className="d-flex flex-row align-items-center mb-4 ">

                                <MDBInput label='Benutzername' id='form1' type='text' className='w-100'
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Benutzename eingeben"
                                    required/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                
                                <MDBInput label='E-Mail' id='form2' type='email'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="E-Mail eingeben"
                                    required/>
                            </div>
                        </div>

                        <div className="d-flex flex-row gap-3">
                            <div className="d-flex flex-row align-items-center mb-4 ">
                                
                                <MDBInput label='Vorname' id='form3' type='text' className='w-100'
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder="Vorname eingeben"
                                    required/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                
                                <MDBInput label='Nachname' id='form4' type='text' className='w-100'
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="Nachname eingeben"
                                    required/>
                            </div>
                        </div>

                        <div className="d-flex flex-row gap-3" >
                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput label='Passwort' id='form5' type='password'
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Passwort eingeben"
                                    required/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput label='Passwort wiederholen' id='form6' type='password'
                                    name="passwordCheck"
                                    value={formData.passwordCheck}
                                    onChange={handleChange}
                                    placeholder="Passwort erneut eingeben"
                                    required/>
                            </div>
                        </div>
                        
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
                                    }}>Registrieren
                            </Button>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Bereits einen Account? <Link as={Link} to="/login">Login</Link> </p>
                        </div>
                        </MDBCol>


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