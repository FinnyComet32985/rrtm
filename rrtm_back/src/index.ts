import express from "express";
import mysql from "mysql";
import cors from "cors";
import patternRoutes from "./routes/patternRoutes";
import strategiaRoutes from "./routes/strategiaRoutes";
import vulnerabilitaRoutes from "./routes/vulnerabilitaRoutes";
import articoloRoutes from "./routes/articoloRoutes";
import PbDRoutes from "./routes/PbDRoutes";
import MVCRoutes from "./routes/MVCRoutes";
import ISORoutes from "./routes/ISORoutes";
import OWASPRoutes from "./routes/OWASPRoutes";
import aggiornamentoPKBRoutes from "./routes/aggiornamentoPKBRoutes";
import segnalazioneRoutes from "./routes/segnalazioneRoutes";
import gestioneutenteRoutes from "./routes/gestioneutenteRoutes";

const dbConfig = {
    host: "localhost",
    user: "rrtm",
    password: "rrtm", //NOSONAR
    database: "rrtm",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error("Errore di connessione al database:", err);
        process.exit(1);
    } else {
        console.log("Connesso al database!");
        avviaServer(connection);
    }
});

function avviaServer(connection: mysql.Connection) {
    const app = express(); //NOSONAR 
    const PORT = process.env.PORT || 1337; //NOSONAR

    app.use(express.json());

    // Configura CORS per consentire le richieste dal tuo dominio React
    app.use(
        cors({
            origin: "http://localhost:3000", // Sostituisci con il tuo dominio React
        })
    );

    app.use("/api", patternRoutes);
    app.use("/api", strategiaRoutes);
    app.use("/api", vulnerabilitaRoutes);
    app.use("/api", articoloRoutes);
    app.use("/api", PbDRoutes);
    app.use("/api", MVCRoutes);
    app.use("/api", ISORoutes);
    app.use("/api", OWASPRoutes);
    app.use("/api", aggiornamentoPKBRoutes);
    app.use("/api", segnalazioneRoutes);
    app.use("/api", gestioneutenteRoutes);
    app.listen(PORT, () => {
        console.log(`Server in ascolto sulla porta ${PORT}`);
    });
}

export default connection;
