import express, { Request, Response } from "express";
import InterfacciaRicerca from "../pkb/SistemaDiRicerca/InterfacciaRicerca";

const router = express.Router();

// Define the API route to get patterns
router.get(
    "/showVulnerabilitaInserite",
    async (req: Request, res: Response) => {
        try {
            const vulnerabilita =
                await InterfacciaRicerca.showVulnerabilitaInserite();
            res.json(vulnerabilita);
        } catch (error) {
            console.error("Error fetching patterns:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

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

router.get(
    "/findVulnerabilitaFromName/:name",
    async (req: Request, res: Response) => {
        const name = req.params.name;
        try {
            const vulnerabilita =
                await InterfacciaRicerca.findVulnerabilitaFromName(name);
            res.json(vulnerabilita);
        } catch (error) {
            console.error("Error fetching vulnerabilita:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

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
router.get("/findArtVuln/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Converti l'ID in un numero
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const articoli = await InterfacciaRicerca.findArtVuln(id);
        res.json(articoli);
    } catch (error) {
        console.error("Error fetching patterns:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router; // Export the router
