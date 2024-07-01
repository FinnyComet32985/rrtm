import express, { Request, Response } from "express";
import InterfacciaRicerca from "../pkb/SistemaDiRicerca/InterfacciaRicerca";

const router = express.Router();

// Define the API route to get patterns
router.get("/showMVC", async (req: Request, res: Response) => {
    try {
        const MVC = await InterfacciaRicerca.showMVC();
        res.json(MVC);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findMVC/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const MVC = await InterfacciaRicerca.findMVC(id);
        res.json(MVC);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findMVCFromName/:name", async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const mvcs = await InterfacciaRicerca.findMVCFromName(name);
        res.json(mvcs);
    } catch (error) {
        console.error("Error fetching MVC:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findPattMVC/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const patterns = await InterfacciaRicerca.findPattMVC(id);
        res.json(patterns);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/findISOMVC/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const iso = await InterfacciaRicerca.findISOMVC(id);
        res.json(iso);
    } catch (error) {
        console.error("Error fetching iso:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router; // Export the router
