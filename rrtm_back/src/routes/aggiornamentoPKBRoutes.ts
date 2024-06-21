import express from "express";
import InterfacciaModifica from "../SistemaModificaPKB/InterfacciaModifica";
import { verificaTokenAmm } from "../Auth/Auth";
const router = express.Router();

// Pattern
router.post("/modificaPattern", verificaTokenAmm, async (req, res) => {
    const { Id, titolo, sommario, contesto, problema, soluzione, esempio } =
        req.body;
    const result = await InterfacciaModifica.modificaPattern(
        Id,
        titolo,
        sommario,
        contesto,
        problema,
        soluzione,
        esempio
    );
    res.json(result);
});

router.post("/inserisciPattern", verificaTokenAmm, async (req, res) => {
    const { Id, titolo, sommario, contesto, problema, soluzione, esempio } =
        req.body;
    const result = await InterfacciaModifica.inserisciPattern(
        Id,
        titolo,
        sommario,
        contesto,
        problema,
        soluzione,
        esempio
    );
    res.json(result);
});

router.delete("/eliminaPattern/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaPattern(parseInt(Id));
    res.json(result);
});

// Articolo
router.post("/modificaArticolo", verificaTokenAmm, async (req, res) => {
    const { Id, titolo } = req.body;
    const result = await InterfacciaModifica.modificaArticolo(Id, titolo);
    res.json(result);
});

router.post("/inserisciArticolo", verificaTokenAmm, async (req, res) => {
    const { Id, titolo } = req.body;
    const result = await InterfacciaModifica.inserisciArticolo(Id, titolo);
    res.json(result);
});

router.delete("/eliminaArticolo/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaArticolo(parseInt(Id));
    res.json(result);
});
// Categoria OWASP
router.post("/modificaOWASP", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.modificaOWASP(Id, nome);
    res.json(result);
});

router.post("/inserisciOWASP", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.inserisciOWASP(Id, nome);
    res.json(result);
});

router.delete("/eliminaOWASP/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaOWASP(parseInt(Id));
    res.json(result);
});
// FaseISO
router.post("/modificaISO", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.modificaISO(Id, nome);
    res.json(result);
});

router.post("/inserisciISO", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.inserisciISO(Id, nome);
    res.json(result);
});

router.delete("/eliminaISO/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaISO(parseFloat(Id));
    res.json(result);
});
// principio PbD
router.post("/modificaPbD", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.modificaPbD(Id, nome);
    res.json(result);
});

router.post("/inserisciPbD", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.inserisciPbD(Id, nome);
    res.json(result);
});

router.delete("/eliminaPbD/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaPbD(parseInt(Id));
    res.json(result);
});

// strategia
router.post("/modificaStrategia", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.modificaStrategia(Id, nome);
    res.json(result);
});

router.post("/inserisciStrategia", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.inserisciStrategia(Id, nome);
    res.json(result);
});

router.delete("/eliminaStrategia/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaStrategia(parseInt(Id));
    res.json(result);
});

// vulnerabilita
router.post("/modificaVulnerabilita", verificaTokenAmm, async (req, res) => {
    const { Id, titolo, cwe, stato } = req.body;
    const result = await InterfacciaModifica.modificaVulnerabilita(
        Id,
        titolo,
        cwe,
        stato
    );
    res.json(result);
});

router.post("/inserisciVulnerabilita", verificaTokenAmm, async (req, res) => {
    const { Id, titolo, cwe, stato } = req.body;
    const result = await InterfacciaModifica.inserisciVulnerabilita(
        Id,
        titolo,
        cwe,
        stato
    );
    res.json(result);
});

router.delete(
    "/eliminaVulnerabilita/:Id",
    verificaTokenAmm,
    async (req, res) => {
        const { Id } = req.params;
        const result = await InterfacciaModifica.eliminaVulnerabilita(
            parseInt(Id)
        );
        res.json(result);
    }
);

//Feedback
router.get("/showFeedback", verificaTokenAmm, async (req, res) => {
    try {
        const feedback = await InterfacciaModifica.showFeedback();
        res.json(feedback);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//VulnerabilitaSegnalate
router.get(
    "/showVulnerabilitaSegnalate",
    verificaTokenAmm,
    async (req, res) => {
        try {
            const vuln = await InterfacciaModifica.showVulnerabilitaSegnalate();
            res.json(vuln);
        } catch (error) {
            console.error("Error fetching vulnerabilita:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);
export default router;
