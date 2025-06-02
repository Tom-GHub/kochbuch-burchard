
// token wird gelese, geprüft - inhalt wird als req auf die variable gelegt


// aus req.user kann ich mit req.user.userID die id auslesen (passiert in der rezept.js mit dem auslesen)

import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // was genau macht diese zeiel? 

    if (!token) {
        return res.status(401).json({ error: 'Nicht autorisiert' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        // console.log('auth - : ', req.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ error: 'Token ungültig' });
    }
};

export default authMiddleware;