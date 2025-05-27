import { useEffect, useState } from "react"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"




// Home-Komponente, zeigt Begrüßung basierend auf dem übergebenen userName
function Home( {isLoggedIn, userName} ) { 

// console.log('Home.jsx - isLoggedIn', isLoggedIn);
// console.log('Home.jsx - userName', userName);

    return(
        <>
        <div>
            {/* Begrüßungs-Überschrift mit dem Benutzernamen */}
            { isLoggedIn 
                ? ( <h1>Willkommen {userName} </h1> ) 
                : ( <h1>Hallo!</h1>)  
            }

            {/* Fester Begrüßungstext */}
            <p>Hier steht ein Text zur Begrüßung.</p>
        </div>
        </>
    )
}

export default Home