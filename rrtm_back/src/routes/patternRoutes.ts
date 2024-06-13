import express, { Request, Response } from "express";
import InterfacciaRicerca from "../pkb/SistemaDiRicerca/InterfacciaRicerca";

const router = express.Router();

// Define the API route to get patterns
router.get("/showPatterns", async (req: Request, res: Response) => {
    try {
        const patterns = await InterfacciaRicerca.showPatterns();
        res.json(patterns);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findPattern/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const patterns = await InterfacciaRicerca.findPattern(id);
        res.json(patterns);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findStratPatt/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const strategie = await InterfacciaRicerca.findStratPatt(id);
        res.json(strategie);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findVulnPatt/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const vulnerabilita = await InterfacciaRicerca.findVulnPatt(id);
        res.json(vulnerabilita);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findArtPatt/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const articoli = await InterfacciaRicerca.findArtPatt(id);
        res.json(articoli);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router; // Export the router
