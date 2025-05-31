import {  Button } from 'react-bootstrap';
import {
    MDBContainer,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBFile 
}
from 'mdb-react-ui-kit';
import { useState } from 'react';



function Rezept( {} ) { 

    // behandelt formfelder des rezepts
    const [formData, setFormData] = useState({
        titel: '',
        zutatenliste: '',
        zubereitung: '',
    });

    const [picture, setPicture] = useState(null);

    // Jede veränderung in den Form-Feldern wird erfasst und mit dazu gepackt, also Buchstabe für Buchstabe wird ein String gebaut.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData( (prev) => ({
            ...prev,
            [name]: value,
        }));
        // console.log('handleChange - name:, value ',name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // token hinzufügen im token ist userID - die api kann hieraus die id auslesen -> das passiert in der middleware
        const token = localStorage.getItem("token");

        // FormData-Objekt erstellen, damit das Bild zum Server geschickt werden kann
        const formDataObj = new FormData();
        formDataObj.append('titel', formData.titel);
        formDataObj.append('zutatenliste', formData.zutatenliste);
        formDataObj.append('zubereitung', formData.zubereitung);
        if (picture) {
            formDataObj.append('picture', picture);
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezept`, {
                method: "POST",
                headers: { 
                    
                    "Authorization": `Bearer ${token}`
                },
                body: formDataObj,
            });

            const jsonData = await res.json();

        if(res.ok) {
            alert("Rezept wurde erstellt");
            console.log("jsonData: ", jsonData);
        } else {
        
            console.log("Fehler bei dem erstellen", jsonData.message);
        }
        } catch(err) {
            console.error("Fehler: ", err);
        }
    };

    const handleReset = () => {
    if (window.confirm("Willst du wirklich abbrechen? Alle Eingaben gehen verloren.")) {
        setFormData({
            titel: '',
            zutatenliste: '',
            zubereitung: ''
        });
        document.getElementById('imageUpload').value = '';
    }
};

    return(
        <>
        <MDBContainer fluid>
            <form onSubmit={handleSubmit}>

                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBCol md='10' lg='12' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                        <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Schreibe hier dein Rezept</p>

                        <div className='d-flex flex-row gap-3 w-100'>
                            <div className="mb-4 w-100">
                                    <MDBInput 
                                        label='Titel' 
                                        id='form1' 
                                        type='text' 
                                        className='w-100'
                                        name="titel"
                                        value={formData.titel}
                                        onChange={handleChange}
                                        placeholder="Wie soll das Rezept heißen?"
                                        required/>
                            </div>
                        <div className="d-flex flex-column w-100">
                            <MDBFile 
                            id="imageUpload"
                            name="picture"
                            accept="image/*"
                            className="w-100"
                            onChange={e => setPicture(e.target.files[0])}
                            />
                            <label htmlFor="imageUpload" className="form-label ms-1">Bild hochladen</label>
                        </div>
                        </div>

                        <div className='d-flex flex-row gap-3 w-100'>
                            <div className="mb-4 w-100">
                                <MDBTextArea 
                                    label='Zutatenliste' 
                                    id='form2' 
                                    type='textarea'
                                    className='w-100'
                                    name="zutatenliste"
                                    rows={6}   
                                    value={formData.zutatenliste}
                                    onChange={handleChange}
                                    placeholder="Schreibe hier deine Zutaten auf"
                                    required/>
                            </div>

                            <div className="mb-4 w-100">
                                    <MDBTextArea 
                                        label='Zubereitung' 
                                        id='form3' 
                                        type='textarea' 
                                        className='w-100'
                                        name="zubereitung"
                                        rows={6}   
                                        value={formData.zubereitung}
                                        onChange={handleChange}
                                        placeholder="Wie wird das Gericht zubereitet?"
                                        required/>
                            </div>
                        </div>
                        
                        <div className="w-100 mb-3">
                            <Button type="button" 
                                    onClick={handleReset}
                                    className="w-100 d-flex align-items-center justify-content-center btn btn-light border border-dark" 
                                    style={{
                                        userSelect: 'none',
                                        whiteSpace: 'nowrap',
                                        height: '40px',
                                        transition: 'none',      // kein Übergang beim Klick
                                        boxShadow: 'none',       // kein Schatten beim Klicken
                                        outline: 'none',          // kein Outline beim Klicken
                                        transform: 'none',
                                    }}>Abbrechen
                            </Button>
                        
                        </div>

                        <div className="w-100 mb-3" >
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
                                    }}>Speichern (nur für dich Sichtbar)
                            </Button>
                            
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
                                    }}>Speichern & Veröffentlichen
                            </Button>
                            
                        </div>
                        </MDBCol>
                    </MDBCardBody>
                </MDBCard>
            </form>
        </MDBContainer>
    </>
    );
}

export default Rezept;