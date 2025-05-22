import { app } from './index.js';

const PORT = process.env.PORT || 3000;


// Start server
const server = app.listen(PORT, () => {
    console.log(`Server läuft auf http://fi.mshome.net:${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} ist bereits belegt.`);
    } else {
        console.error("❌ Serverfehler:", err);
    }
    process.exit(1);
});