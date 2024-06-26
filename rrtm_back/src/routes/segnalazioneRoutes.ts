import express from "express";
import InterfacciaSegnalazione from "../SistemaModificaPKB/SistemaSegnalazione/InterfacciaSegnalazione";
import { verificaTokenUt } from "../Auth/Auth";
const router = express.Router();

router.post("/segnalaVulnerabilita", verificaTokenUt, async (req, res) => {
    const { titolo, usernameUt } = req.body;
    const result = await InterfacciaSegnalazione.segnalaVulnerabilita(
        titolo,
        usernameUt
    );
    res.json(result);
});

router.get("/findVulnSegnUt/:Ut", verificaTokenUt, async (req, res) => {
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
router.get("/findFeedbackUt/:Ut", verificaTokenUt, async (req, res) => {
    try {
        const result = await InterfacciaSegnalazione.findFeedbackUt(
            req.params.Ut
        );
        res.json(result);
    } catch (error) {
        console.error("Error fetching vulnerabilita:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/inserisciFeedback", verificaTokenUt, async (req, res) => {
    const { titolo, descrizione, usernameUt } = req.body;

    // Puoi accedere all'utente autenticato tramite (req as any).utente se necessario
    const result = await InterfacciaSegnalazione.inserisciFeedback(
        titolo,
        descrizione,
        usernameUt
    );

    res.json(result);
});

router.get("/showNotifiche/", verificaTokenUt, async (req, res) => {
    try {
        const result = await InterfacciaSegnalazione.showNotifiche();
        res.json(result);
    } catch (error) {
        console.error("Error fetching vulnerabilita:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
