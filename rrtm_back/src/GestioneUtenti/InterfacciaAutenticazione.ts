import connection from "..";
import * as mysql from "mysql";
import Utente from "./Utente";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Amministratore from "./Amministratore";

const JWT_SECRET = "your_jwt_secret";

class InterfacciaAutenticazione {
    private static utentiAutenticati: Utente[] = [];
    private static amministratoriAutenticati: Amministratore[] = [];

    public static async login(
        username: string,
        password: string
    ): Promise<{ token: string } | null> {
        const query = `
            SELECT username, password, 'utente' as tipo FROM Utente WHERE username=?
            UNION
            SELECT username, password, 'amministratore' as tipo FROM Amministratore WHERE username=?
        `;
        return new Promise((resolve, reject) => {
            connection.query(
                query,
                [username, username],
                async (err: mysql.MysqlError | null, results: any[]) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length === 0) {
                        return resolve(null);
                    }
                    const user = results[0];
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (passwordMatch) {
                        const token = jwt.sign(
                            { username: user.username, tipo: user.tipo },
                            JWT_SECRET,
                            {
                                expiresIn: "2h",
                            }
                        );

                        if (user.tipo === "utente") {
                            const utenteInstance = new Utente(
                                token,
                                user.username,
                                password
                            );
                            this.utentiAutenticati.push(utenteInstance);
                            resolve({ token: utenteInstance.getToken() });
                        } else if (user.tipo === "amministratore") {
                            const ammInstance = new Amministratore(
                                token,
                                user.username,
                                password
                            );
                            this.amministratoriAutenticati.push(ammInstance);
                            resolve({ token: ammInstance.getToken() });
                        }
                    } else {
                        resolve(null);
                    }
                }
            );
        });
    }

    public static getUtenteAutenticatoByToken(
        tokenRicevuto: string
    ): Utente | undefined {
        const utente = InterfacciaAutenticazione.utentiAutenticati.find((u) => {
            const tokenMemorizzato = u.getToken();

            return tokenMemorizzato === tokenRicevuto;
        });

        return utente;
    }
    public static getAmministratoreAutenticatoByToken(
        tokenRicevuto: string
    ): Amministratore | undefined {
        const utente = InterfacciaAutenticazione.amministratoriAutenticati.find(
            (a) => {
                const tokenMemorizzato = a.getToken();

                return tokenMemorizzato === tokenRicevuto;
            }
        );

        return utente;
    }

    public static async createUser(
        username: string,
        password: string,
        email: string,
        nome: string,
        cognome: string
    ): Promise<
        | { success: boolean; token?: string }
        | { success: boolean; error?: string }
    > {
        const hashedPassword = await bcrypt.hash(password, 10); // Genera la password hashata

        const query = `
            INSERT INTO Utente (username, password, email, nome, cognome)
            VALUES (?, ?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            connection.query(
                query,
                [username, hashedPassword, email, nome, cognome],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject({ success: false, error: err.message });
                    }

                    try {
                        // Una volta terminata la registrazione, effettua il login
                        const loginResult =
                            await InterfacciaAutenticazione.login(
                                username,
                                password
                            );

                        if (loginResult) {
                            resolve({
                                success: true,
                                token: loginResult.token,
                            }); // Registrazione e login avvenuti con successo
                        } else {
                            resolve({ success: false, error: "Login failed" }); // Registrazione avvenuta, ma login fallito
                        }
                    } catch (loginError) {
                        if (loginError instanceof Error) {
                            reject({
                                success: false,
                                error: loginError.message,
                            }); // Gestione dell'errore di login
                        } else {
                            reject({
                                success: false,
                                error: "Unknown login error",
                            });
                        }
                    }
                }
            );
        });
    }

    public static async createAmministratore(
        username: string,
        password: string,
        email: string,
        nome: string,
        cognome: string
    ): Promise<
        | { success: boolean; token?: string }
        | { success: boolean; error?: string }
    > {
        const hashedPassword = await bcrypt.hash(password, 10); // Genera la password hashata

        const query = `
            INSERT INTO Amministratore (username, password, email, nome, cognome)
            VALUES (?, ?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            connection.query(
                query,
                [username, hashedPassword, email, nome, cognome],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject({ success: false, error: err.message });
                    }

                    try {
                        // Una volta terminata la registrazione, effettua il login
                        const loginResult =
                            await InterfacciaAutenticazione.login(
                                username,
                                password
                            );

                        if (loginResult) {
                            resolve({
                                success: true,
                                token: loginResult.token,
                            }); // Registrazione e login avvenuti con successo
                        } else {
                            resolve({ success: false, error: "Login failed" }); // Registrazione avvenuta, ma login fallito
                        }
                    } catch (loginError) {
                        if (loginError instanceof Error) {
                            reject({
                                success: false,
                                error: loginError.message,
                            }); // Gestione dell'errore di login
                        } else {
                            reject({
                                success: false,
                                error: "Unknown login error",
                            });
                        }
                    }
                }
            );
        });
    }
}
export default InterfacciaAutenticazione;
