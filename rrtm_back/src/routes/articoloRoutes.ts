import express, { Request, Response } from "express";
import InterfacciaRicerca from "../pkb/SistemaDiRicerca/InterfacciaRicerca";

const router = express.Router();

// Define the API route to get patterns
router.get("/showArticoli", async (req: Request, res: Response) => {
    try {
        const articoli = await InterfacciaRicerca.showArticoli();
        res.json(articoli);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findArticolo/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const articolo = await InterfacciaRicerca.findArticolo(id);
        res.json(articolo);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findPattArt/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const patterns = await InterfacciaRicerca.findPattArt(id);
        res.json(patterns);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findStratArt/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const strategie = await InterfacciaRicerca.findStratArt(id);
        res.json(strategie);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findVulnArt/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const vulnerabilita = await InterfacciaRicerca.findVulnArt(id);
        res.json(vulnerabilita);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router; // Export the router
