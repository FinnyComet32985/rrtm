import express from "express";
import InterfacciaSegnalazione from "../SistemaModificaPKB/SistemaSegnalazione/InterfacciaSegnalazione";

const router = express.Router();

router.post("/segnalaVulnerabilita", async (req, res) => {
    const { Id, titolo, usernameUt } = req.body;
    const result = await InterfacciaSegnalazione.segnalaVulnerabilita(
        Id,
        titolo,
        usernameUt
    );
    res.json(result);
});

router.get("/findVulnSegnUt/:Ut", async (req, res) => {
    try {
        const result = await InterfacciaSegnalazione.findVulnSegnalateUt(
            req.params.Ut
        );
        res.json(result);
    } catch (error) {
        console.error("Error fetching vulnerabilita:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/inserisciFeedback", async (req, res) => {
    const { Id, titolo, descrizione, usernameUt } = req.body;
    const result = await InterfacciaSegnalazione.inserisciFeedback(
        Id,
        titolo,
        descrizione,
        usernameUt
    );
    res.json(result);
});
export default router;