import express from "express";
import InterfacciaModifica from "../SistemaModificaPKB/InterfacciaModifica";
import { verificaTokenAmm } from "../Auth/Auth";
const router = express.Router();

// Pattern
router.post("/modificaPattern", verificaTokenAmm, async (req, res) => {
    const { Id, titolo, sommario, contesto, problema, soluzione, esempio } =
        req.body;
    if (!Id || isNaN(Id)) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.modificaPattern(
        parseInt(Id),
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
    const { titolo, sommario, contesto, problema, soluzione, esempio } =
        req.body;
    const result = await InterfacciaModifica.inserisciPattern(
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
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.eliminaPattern(parseInt(Id));
    res.json(result);
});

// Articolo
router.post("/modificaArticolo", verificaTokenAmm, async (req, res) => {
    const { Id, titolo } = req.body;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.modificaArticolo(
        parseInt(Id),
        titolo
    );
    res.json(result);
});

router.post("/inserisciArticolo", verificaTokenAmm, async (req, res) => {
    const { Id, titolo } = req.body;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.inserisciArticolo(
        parseInt(Id),
        titolo
    );
    res.json(result);
});

router.delete("/eliminaArticolo/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.eliminaArticolo(parseInt(Id));
    res.json(result);
});
// Categoria OWASP
router.post("/modificaOWASP", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.modificaOWASP(parseInt(Id), nome);
    res.json(result);
});

router.post("/inserisciOWASP", verificaTokenAmm, async (req, res) => {
    const { nome } = req.body;
    const result = await InterfacciaModifica.inserisciOWASP(nome);
    res.json(result);
});

router.delete("/eliminaOWASP/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.eliminaOWASP(parseInt(Id));
    res.json(result);
});
// FaseISO
router.post("/modificaISO", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    if (!Id || isNaN(parseFloat(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.modificaISO(parseFloat(Id), nome);
    res.json(result);
});

router.post("/inserisciISO", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    if (!Id || isNaN(parseFloat(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.inserisciISO(parseFloat(Id), nome);
    res.json(result);
});

router.delete("/eliminaISO/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    if (!Id || isNaN(parseFloat(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.eliminaISO(parseFloat(Id));
    res.json(result);
});
// principio PbD
router.post("/modificaPbD", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.modificaPbD(parseInt(Id), nome);
    res.json(result);
});

router.post("/inserisciPbD", verificaTokenAmm, async (req, res) => {
    const { nome } = req.body;
    const result = await InterfacciaModifica.inserisciPbD(nome);
    res.json(result);
});

router.delete("/eliminaPbD/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.eliminaPbD(parseInt(Id));
    res.json(result);
});

// strategia
router.post("/modificaStrategia", verificaTokenAmm, async (req, res) => {
    const { Id, nome } = req.body;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.modificaStrategia(
        parseInt(Id),
        nome
    );
    res.json(result);
});

router.post("/inserisciStrategia", verificaTokenAmm, async (req, res) => {
    const { nome } = req.body;
    const result = await InterfacciaModifica.inserisciStrategia(nome);
    res.json(result);
});

router.delete("/eliminaStrategia/:Id", verificaTokenAmm, async (req, res) => {
    const { Id } = req.params;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.eliminaStrategia(parseInt(Id));
    res.json(result);
});

// vulnerabilita
router.post("/modificaVulnerabilita", verificaTokenAmm, async (req, res) => {
    const { Id, titolo, cwe, stato } = req.body;
    if (!Id || isNaN(parseInt(Id))) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await InterfacciaModifica.modificaVulnerabilita(
        parseInt(Id),
        titolo,
        cwe,
        stato
    );
    res.json(result);
});

router.post("/inserisciVulnerabilita", verificaTokenAmm, async (req, res) => {
    const { titolo, cwe, stato } = req.body;
    const result = await InterfacciaModifica.inserisciVulnerabilita(
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
        if (!Id || isNaN(parseInt(Id))) {
            return res.status(400).json({ message: "Missing required fields" });
        }
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

router.post("/inserisciNotifica", verificaTokenAmm, async (req, res) => {
    try {
        const { titolo, oggetto, testo } = req.body;
        const not = await InterfacciaModifica.inserisciNotifica(
            titolo,
            oggetto,
            testo
        );
        res.json(not);
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
