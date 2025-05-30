
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCard, MDBCardBody} from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import pizzaLogin from '../assets/pizzaLogin.png'
import { Form, Button } from "react-bootstrap";
import { data, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login( {isLoggedIn, setIsLoggedIn, userName, setUserName} ) {

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState( {
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData( (prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Login.jsx - handleSubmit formData: ", formData);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(formData),
            });

            const jsonData = await res.json();
            console.log("Login - jsonData 01: ", jsonData);
            console.log("Login.jsx - handleSubmit formData nach jasonData: ", formData);

        if(res.ok) {
            // alert("Sie haben sich erfolgreich Angemeldet.");
            console.log("Login - jsonData 02: ", jsonData);
            
            localStorage.setItem('token', jsonData.token);
            localStorage.setItem('userID', jsonData.userID);
            localStorage.setItem('username', jsonData.username);

            setIsLoggedIn(true);
            setUserName(jsonData.username); // bauche ich nicht?
            setMessage('Sie sind eingeloggt.'); //brauche ich nicht?

            setTimeout( () => {
                navigate('/');
            }, 1000);
        } else {
            setMessage(data.error || 'Login fehlgeschlagen');
            console.log("Login - Fehler bei der Anmeldung", jsonData.message);
        }
        } catch(err) {
            console.error("Fehler beim Login: ", err);
        }
    };


return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
        <form onSubmit={handleSubmit}>
        <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>

            <MDBRow>
                <MDBCol col='10' md='6'>
                <img src={pizzaLogin} className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>
                <p className="text-right h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Logg dich ein!</p>
                <MDBInput className='mt-10' wrapperClass='mb-4' label='E-Mail Address' id='formControlLg1' type='email' size="lg"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='example@provider.com'
                    required
                    />
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg2' type='password' size="lg"
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Dein Passwort'
                    required
                    />


                <div className='text-center text-md-start mt-4 pt-2 d-flex flex-column'>
                    <Button type="submit" 
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
                                }}>Login
                        </Button>
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