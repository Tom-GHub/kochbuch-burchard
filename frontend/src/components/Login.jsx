
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCard, MDBCardBody} from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import pizzaLogin from '../assets/pizzaLogin.png'
import { Form, Button } from "react-bootstrap";


function Login() {



return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>

    <MDBRow>
        <MDBCol col='10' md='6'>
        <img src={pizzaLogin} className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
        <p className="text-right h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Logg dich ein!</p>
        <MDBInput className='mt-10' wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>


        <div className='text-center text-md-start mt-4 pt-2 d-flex flex-column'>
            <Button type="submit" 
                        className="mdb-btn d-flex align-items-center justify-content-center" 
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
            <p className="small fw-bold mt-2 pt-1 mb-2">Noch kein Account? <a href="/register" className="link-danger">Register</a></p>
        </div>
        </MDBCol>

    </MDBRow>
    </MDBCardBody>
    </MDBCard>
    </MDBContainer>
);
}



export default Login