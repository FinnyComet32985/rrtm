import express, { Request, Response } from "express";
import InterfacciaRicerca from "../pkb/SistemaDiRicerca/InterfacciaRicerca";

const router = express.Router();

// Define the API route to get patterns
router.get("/showOWASP", async (req: Request, res: Response) => {
    try {
        const OWASP = await InterfacciaRicerca.showOWASP();
        res.json(OWASP);
    } catch (error) {
        console.error("Error fetching ISO:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findOWASP/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const OWASP = await InterfacciaRicerca.findOWASP(id);
        res.json(OWASP);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findPattOWASP/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const patterns = await InterfacciaRicerca.findPattOWASP(id);
        res.json(patterns);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router; // Export the router
