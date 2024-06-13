import express from "express";
import mysql from "mysql";
import cors from "cors";
import patternRoutes from "./routes/patternRoutes";
import strategiaRoutes from "./routes/strategiaRoutes";
import vulnerabilitaRoutes from "./routes/vulnerabilitaRoutes";
import articoloRoutes from "./routes/articoloRoutes";

const dbConfig = {
    host: "localhost",
    user: "rrtm",
    password: "rrtm",
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
    const app = express();
    const PORT = process.env.PORT || 1337;

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
    app.listen(PORT, () => {
        console.log(`Server in ascolto sulla porta ${PORT}`);
    });
}

export default connection;
