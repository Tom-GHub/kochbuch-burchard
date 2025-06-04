import { useEffect, useState } from "react"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"



function EigeneRezepte( {isLoggedIn, userName} ) { 


    return(
        <>
        <div>
            {/* Begrüßungs-Überschrift mit dem Benutzernamen */}
            { isLoggedIn && (
                <h2>Hallo {userName} hier kannst du deine Rezepte ansehen und verwalten.</h2> 
            ) 
            }

            {/* Fester Begrüßungstext */}
            <p> Eigene Komponente für EigeneRezepte, dort wird eine Liste aller erstellten
                Rezepte des Nutzers angezeigt und per Klick auf Detailansicht gewechselt werden kann.
                In Detailansicht Rezept verwalten / löschen können.
                Route ist nur für den Nutzer sichtbar wenn eingeloggt.
            </p>
            <p> Was ich sonst noch brauche:
                isLoggedIn für Route: Rezept.jsx, EigeneRezepte.jsx (anzeige, bearbeiten, löschen)
                <br></br>
                JSON Web-Token für Home, Rezept, EigeneRezepte, (Detailansicht?)
                <br></br>
                Optische Anpassung von Home, EigeneRezepte
            </p>
        </div>
        </>
    )
}

export default EigeneRezepte;