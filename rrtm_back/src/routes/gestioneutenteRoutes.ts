import express, { Request, Response } from "express";
import InterfacciaAutenticazione from "../GestioneUtenti/InterfacciaAutenticazione";
import { verificaToken, verificaTokenUt } from "../Auth/Auth";
import InterfacciaGestioneUtente from "../GestioneUtenti/InterfacciaGestioneUtente";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const result = await InterfacciaAutenticazione.login(
            username,
            password
        );
        if (result) {
            if (result.tipo === "utente") {
                return res.status(200).json({
                    message: "Login successful",
                    token: result.token,
                    tipo: result.tipo,
                    notifiche: result.notifiche,
                });
            } else {
                return res.status(200).json({
                    message: "Login successful",
                    token: result.token,
                    tipo: result.tipo,
                });
            }
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        } else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});

router.post("/creaUtente", async (req: Request, res: Response) => {
    const { username, password, email, nome, cognome, notPref } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const userCreated = await InterfacciaAutenticazione.createUser(
            username,
            password,
            email,
            nome,
            cognome,
            notPref
        );

        if (userCreated.success) {
            if ("token" in userCreated) {
                return res.status(201).json({
                    message: "User created and logged in successfully",
                    token: userCreated.token,
                    tipo: userCreated.tipo,
                });
            } else {
                return res.status(500).json({
                    message: "User created but login failed",
                });
            }
        } else {
            return res.status(500).json({
                message: "Failed to create and login user",
                error: "error",
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        } else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});

router.post("/creaAmministratore", async (req: Request, res: Response) => {
    const { username, password, email, nome, cognome } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const ammCreated = await InterfacciaAutenticazione.createAmministratore(
            username,
            password,
            email,
            nome,
            cognome
        );

        if (ammCreated.success) {
            if ("token" in ammCreated) {
                return res.status(201).json({
                    message: "User created and logged in successfully",
                    token: ammCreated.token,
                    tipo: ammCreated.tipo,
                });
            } else {
                return res.status(500).json({
                    message: "User created but login failed",
                });
            }
        } else {
            return res.status(500).json({
                message: "Failed to create and login user",
                error: "error",
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        } else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});

router.post("/logout", verificaToken, async (req: Request, res: Response) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const tipo = req.body.tipo;
    if (!token || !tipo) {
        return res.status(400).json({ message: "Missing token or tipo" });
    }

    try {
        const logoutResult = await InterfacciaAutenticazione.logout(
            token,
            tipo
        );
        if (logoutResult) {
            return res.status(200).json({ message: "Logout successful" });
        } else {
            return res.status(400).json({ message: "Invalid token or tipo" });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        } else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});

router.post(
    "/aggiungiConsenso",
    verificaTokenUt,
    async (req: Request, res: Response) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Missing token" });
        } else {
            const result = InterfacciaGestioneUtente.aggiungiConsenso(token);
            if (!result) {
                return res.status(500).json({ message: "unnkown error" });
            }
            return res
                .status(200)
                .json({ message: "consenso aggiunto con successo" });
        }
    }
);
router.post(
    "/rimuoviConsenso",
    verificaTokenUt,
    async (req: Request, res: Response) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Missing token" });
        } else {
            const result = InterfacciaGestioneUtente.rimuoviConsenso(token);
            if (!result) {
                return res.status(500).json({ message: "unnkown error" });
            }
            return res
                .status(200)
                .json({ message: "consenso rimosso con successo" });
        }
    }
);
export default router;
