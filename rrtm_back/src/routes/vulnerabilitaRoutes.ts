import express, { Request, Response } from "express";
import InterfacciaRicerca from "../pkb/SistemaDiRicerca/InterfacciaRicerca";

const router = express.Router();

// Define the API route to get patterns
router.get("/showVulnerabilita", async (req: Request, res: Response) => {
    try {
        const vulnerabilita = await InterfacciaRicerca.showVulnerabilita();
        res.json(vulnerabilita);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findVulnerabilita/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const vulnerabilita = await InterfacciaRicerca.findVulnerabilita(id);
        res.json(vulnerabilita);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findPattVuln/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const pattern = await InterfacciaRicerca.findPattVuln(id);
        res.json(pattern);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router; // Export the router
