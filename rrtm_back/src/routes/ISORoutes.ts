import express, { Request, Response } from "express";
import InterfacciaRicerca from "../pkb/SistemaDiRicerca/InterfacciaRicerca";

const router = express.Router();

// Define the API route to get patterns
router.get("/showISO", async (req: Request, res: Response) => {
    try {
        const ISO = await InterfacciaRicerca.showISO();
        res.json(ISO);
    } catch (error) {
        console.error("Error fetching ISO:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findISO/:id", async (req: Request, res: Response) => {
    const id = parseFloat(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const ISO = await InterfacciaRicerca.findISO(id);
        res.json(ISO);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findPattISO/:id", async (req: Request, res: Response) => {
    const id = parseFloat(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const patterns = await InterfacciaRicerca.findPattISO(id);
        res.json(patterns);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findMVCISO/:id", async (req: Request, res: Response) => {
    const id = parseFloat(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const mvc = await InterfacciaRicerca.findMVCISO(id);
        res.json(mvc);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findPbDISO/:id", async (req: Request, res: Response) => {
    const id = parseFloat(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const pbd = await InterfacciaRicerca.findPbDISO(id);
        res.json(pbd);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router; // Export the router
