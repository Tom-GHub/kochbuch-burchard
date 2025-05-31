import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import {

    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBListGroup,
    MDBListGroupItem
}
from 'mdb-react-ui-kit';

function Detailansicht( {} ) {

const { id } = useParams(); // bekommt Rezept-ID aus der URL
const [rezept, setRezept] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [picture, setPicture] = useState(null);

useEffect( () => {
    const fetchRezept = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/rezeptdetail/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                    throw new Error(`Fehler: ${response.status}`);
                }

            const data = await response.json();

            if( response.ok ) {
                setRezept(data);

                if( data.image ) {
                    setPicture(data.image)
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

if (loading) return <p>🔄 Rezept wird geladen...</p>;
if (error) return <p>❌ Fehler: {error}</p>;
if (!rezept) return <p>⚠️ Kein Rezept gefunden.</p>;

    return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <h2 className="text-center fw-bold mb-4">{rezept.title}</h2>
                    {rezept.image && (
                        <MDBCardImage
                            src={`http://fi.mshome.net:3001/uploads/${rezept.image}`}
                            position='top'
                            alt={rezept.title}
                            style={{ maxWidth: '400px' }}
                        />
                    )}
                    <h4 className="mt-4">Zutaten</h4>
                    <MDBListGroup light>
                        {rezept.ingredients.split('\r\n').map((item, index) => (
                            <MDBListGroupItem key={index}>{item}</MDBListGroupItem>
                        ))}
                    </MDBListGroup>

                    <h4 className="mt-4">Zubereitung</h4>
                    <MDBCard className="mt-2" style={{ backgroundColor: '#f8f9fa' }}>
                        <MDBCardBody>
                            <p style={{ whiteSpace: 'pre-line' }}>{rezept.instructions}</p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Detailansicht;