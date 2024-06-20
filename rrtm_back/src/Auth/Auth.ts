import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import InterfacciaAutenticazione from "../GestioneUtenti/InterfacciaAutenticazione";

export const verificaToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1]; // Estrarre il token dall'header Authorization
    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
        const decoded = jwt.verify(token, "your_jwt_secret") as {
            username: string;
            tipo: string;
        };
        const utente =
            InterfacciaAutenticazione.getUtenteAutenticatoByToken(token);

        if (!utente) {
            return res.status(401).json({ message: "Utente non autenticato" });
        }

        // Se necessario, puoi anche aggiungere altre verifiche sul tipo di utente o altri controlli qui

        // Aggiungi l'utente autenticato all'oggetto richiesta per utilizzarlo nelle successive gestioni
        (req as any).utente = utente;

        next(); // Passa al prossimo middleware o alla gestione della rotta
    } catch (error) {
        return res.status(401).json({ message: "Token non valido" });
    }
};
