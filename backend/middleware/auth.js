import jwt from 'jsonwebtoken';

// Middleware zum Prüfen des JWT-Tokens
const authMiddleware = async (req, res, next) => {

    // Token aus dem Authorization-Header extrahieren: "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];

    // Wenn kein Token vorhanden ist, Zugriff verweigern
    if (!token) {
        return res.status(401).json({ error: 'Nicht autorisiert' });
    }

    try {
        // Token entschlüsseln und prüfen
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        // console.log('auth - : ', req.user);
        next();
    } catch (error) {
        console.log(error);
        // Fehlerhafte oder abgelaufene Tokens blockieren
        res.status(403).json({ error: 'Token ungültig' });
    }
};

export default authMiddleware;