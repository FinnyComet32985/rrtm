import InterfacciaAutenticazione from "./InterfacciaAutenticazione";
import connection from "..";
import * as mysql from "mysql";

class InterfacciaGestioneUtente {
    public static async aggiungiConsenso(token: string) {
        const utente =
            InterfacciaAutenticazione.getUtenteAutenticatoByToken(token);
        if (!utente) {
            return false;
        }
        const query = "update utente SET notPref=true where username = ?";
        return new Promise<boolean>((resolve, reject) => {
            connection.query(
                query,
                [utente.getUsername()],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            );
        });
    }
    public static async rimuoviConsenso(token: string) {
        const utente =
            InterfacciaAutenticazione.getUtenteAutenticatoByToken(token);
        if (!utente) {
            return false;
        }
        const query = "update utente SET notPref=false where username = ?";
        return new Promise<boolean>((resolve, reject) => {
            connection.query(
                query,
                [utente.getUsername()],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            );
        });
    }
}
export default InterfacciaGestioneUtente;
