import {  Button } from 'react-bootstrap';
import { useEffect, useState } from "react"
import { data, useParams } from 'react-router-dom';
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




function RezeptBearbeiten( {} ) { 

const { id } = useParams(); // bekommt Rezept-ID aus der URL
const [rezept, setRezept] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [image, setImage] = useState(null);
// behandelt formfelder des rezepts
const [formData, setFormData] = useState({
    titel: '',
    zutatenliste: '',
    zubereitung: '',
});

useEffect( () => {
    const token = localStorage.getItem('token');
    const fetchRezept = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptdetail/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    
                }
            });

            const data = await response.json();
            console.log('RezeptBearbeiten.jsx - data: ', data);

            if( response.ok ) {
                setRezept(data); // gesamt-Rezept speichern (optional, z.B. für Bild)
                setFormData({
                    titel: data.title || '',
                    zutatenliste: data.ingredients || '',
                    zubereitung: data.instructions || ''
                    // published: data.published || ''
                });
                console.log("Form data after set:", {
                    titel: data.title || '',
                    zutatenliste: data.ingredients || '',
                    zubereitung: data.instructions || ''
                    });
                console.log('setRezept', rezept);

                setImage(data.image || null);
                if (!response.ok) {
                    setError(data.message || 'Fehler beim Laden');
                }
            }
        } catch(err) {
            console.error("Fehler beim Laden des Rezepts: ", err);
        } finally {
            setLoading(false);
        }
    };

    fetchRezept();
}, [id]);


    // Jede veränderung in den Form-Feldern wird erfasst und mit dazu gepackt, also Buchstabe für Buchstabe wird ein String gebaut.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData( (prev) => ({
            ...prev,
            [name]: value,
        }));
        // console.log('handleChange - name:, value ',name, value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // token hinzufügen im token ist userID - die api kann hieraus die id auslesen -> das passiert in der middleware
        const token = localStorage.getItem("token");

        // FormData-Objekt erstellen, damit das Bild zum Server geschickt werden kann
        const formDataObj = new FormData();
        formDataObj.append('titel', formData.titel);
        formDataObj.append('zutatenliste', formData.zutatenliste);
        formDataObj.append('zubereitung', formData.zubereitung);
        if (image) {
            formDataObj.append('image', image);
        }
        console.log('RezeptBearbeiten.jsx - formDataObj', formDataObj );
        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptbearbeiten/${id}`, {
                method: "PUT",
                headers: { 
                    "Authorization": `Bearer ${token}`
                },
                body: formDataObj,
            });

            const jsonData = await res.json();

        if(res.ok) {
            alert("Rezept wurde erstellt");
            console.log("RezeptBearbeiten.jsx - jsonData: ", jsonData);
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
            titel: rezept?.title || '',
            zutatenliste: rezept?.ingredients || '',
            zubereitung: rezept?.instructions || ''
        });
        document.getElementById('imageUpload').value = '';
        setImage(rezept?.image || null);
        }
    };

    if (loading) return <p>🔄 Rezept wird geladen...</p>;
    if (error) return <p>❌ Fehler: {error}</p>;
    if (!rezept) return <p>⚠️ Kein Rezept gefunden.</p>;

    return(
        <>
        <MDBContainer fluid>
            <form onSubmit={handleUpdate}>

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
                                        />
                            </div>
                        <div className="d-flex flex-column w-100">
                            <MDBFile 
                            id="imageUpload"
                            name="image"
                            accept="image/*"
                            className="w-100"
                            onChange={e => setImage(e.target.files[0])}
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
                                    />
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
                                        />
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
                                    }}>Speichern
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

export default RezeptBearbeiten;