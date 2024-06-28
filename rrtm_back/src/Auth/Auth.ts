import { Request, Response, NextFunction } from "express";
import InterfacciaAutenticazione from "../GestioneUtenti/InterfacciaAutenticazione";

export const verificaTokenUt = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1]; // Estrarre il token dall'header Authorization
    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
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

export const verificaTokenAmm = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1]; // Estrarre il token dall'header Authorization
    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
        const amministratore =
            InterfacciaAutenticazione.getAmministratoreAutenticatoByToken(
                token
            );

        if (!amministratore) {
            return res.status(401).json({ message: "Utente non autenticato" });
        }

        // Se necessario, puoi anche aggiungere altre verifiche sul tipo di utente o altri controlli qui

        // Aggiungi l'utente autenticato all'oggetto richiesta per utilizzarlo nelle successive gestioni
        (req as any).amministratore = amministratore;

        next(); // Passa al prossimo middleware o alla gestione della rotta
    } catch (error) {
        return res.status(401).json({ message: "Token non valido" });
    }
};

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
        const amministratore =
            InterfacciaAutenticazione.getAmministratoreAutenticatoByToken(
                token
            );
        const utente =
            InterfacciaAutenticazione.getUtenteAutenticatoByToken(token);
        if (!amministratore && !utente) {
            return res.status(401).json({ message: "Utente non trovato" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token non valido" });
    }
};
