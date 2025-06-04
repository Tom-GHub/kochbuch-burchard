import { MDBContainer, MDBCard, MDBCardBody } from "mdb-react-ui-kit";






function Home({ isLoggedIn, userName }) {


    return (
        <>
        <div
            style={{
                backgroundImage: `url('/picture/cooking.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
            }}
        >
        <div style={{ position: 'relative', zIndex: 1 }}>
        <MDBContainer fluid className="pt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>

            <MDBCard 
                className="text-black shadow" 
                style={{
                    borderRadius: "25px",
                    maxWidth: "600px",
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}>
                <MDBCardBody className="p-4 text-center">
                    {/* Begrüßungsüberschrift */}
                    <h1 className="fw-bold mb-4">
                        {isLoggedIn
                            ? `Willkommen, ${userName}!`
                            : "Hallo! Hier findest du viele leckere Rezepte."}
                    </h1>

                    {/* Fester Begrüßungstext */}
                    <p className="lead">
                        Hier findest du leckere Rezepte
                    </p>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
        </div>
        </div>
        </>
    );
}

export default Home;