import express from "express";
import InterfacciaModifica from "../SistemaModificaPKB/InterfacciaModifica";

const router = express.Router();

// Pattern
router.post("/modificaPattern", async (req, res) => {
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

router.post("/inserisciPattern", async (req, res) => {
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

router.delete("/eliminaPattern/:Id", async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaPattern(parseInt(Id));
    res.json(result);
});

// Articolo
router.post("/modificaArticolo", async (req, res) => {
    const { Id, titolo } = req.body;
    const result = await InterfacciaModifica.modificaArticolo(Id, titolo);
    res.json(result);
});

router.post("/inserisciArticolo", async (req, res) => {
    const { Id, titolo } = req.body;
    const result = await InterfacciaModifica.inserisciArticolo(Id, titolo);
    res.json(result);
});

router.delete("/eliminaArticolo/:Id", async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaArticolo(parseInt(Id));
    res.json(result);
});
// Categoria OWASP
router.post("/modificaOWASP", async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.modificaOWASP(Id, nome);
    res.json(result);
});

router.post("/inserisciOWASP", async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.inserisciOWASP(Id, nome);
    res.json(result);
});

router.delete("/eliminaOWASP/:Id", async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaOWASP(parseInt(Id));
    res.json(result);
});
// FaseISO
router.post("/modificaISO", async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.modificaISO(Id, nome);
    res.json(result);
});

router.post("/inserisciISO", async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.inserisciISO(Id, nome);
    res.json(result);
});

router.delete("/eliminaISO/:Id", async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaISO(parseFloat(Id));
    res.json(result);
});
// principio PbD
router.post("/modificaPbD", async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.modificaPbD(Id, nome);
    res.json(result);
});

router.post("/inserisciPbD", async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.inserisciPbD(Id, nome);
    res.json(result);
});

router.delete("/eliminaPbD/:Id", async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaPbD(parseInt(Id));
    res.json(result);
});

// strategia
router.post("/modificaStrategia", async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.modificaStrategia(Id, nome);
    res.json(result);
});

router.post("/inserisciStrategia", async (req, res) => {
    const { Id, nome } = req.body;
    const result = await InterfacciaModifica.inserisciStrategia(Id, nome);
    res.json(result);
});

router.delete("/eliminaStrategia/:Id", async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaStrategia(parseInt(Id));
    res.json(result);
});

// vulnerabilita
router.post("/modificaVulnerabilita", async (req, res) => {
    const { Id, titolo, cwe, stato } = req.body;
    const result = await InterfacciaModifica.modificaVulnerabilita(
        Id,
        titolo,
        cwe,
        stato
    );
    res.json(result);
});

router.post("/inserisciVulnerabilita", async (req, res) => {
    const { Id, titolo, cwe, stato } = req.body;
    const result = await InterfacciaModifica.inserisciVulnerabilita(
        Id,
        titolo,
        cwe,
        stato
    );
    res.json(result);
});

router.delete("/eliminaVulnerabilita/:Id", async (req, res) => {
    const { Id } = req.params;
    const result = await InterfacciaModifica.eliminaVulnerabilita(parseInt(Id));
    res.json(result);
});
export default router;
