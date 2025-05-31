import express from 'express';



const router = express.Router(); //erstellt route objekt

/**
* Route for home.
*
* @function
* @name Home
* @route {GET} /
* @returns {string} JSON string with hello world.
*/
// GET / – einfache Testroute, gibt JSON zurück
router.get('/', (req, res) => {
    res.json( {hello: 'world'} );
});




export default router;