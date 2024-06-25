import connection from "../../index";
import * as mysql from "mysql";
import VulnerabilitaSegnalata from "./VulnerabilitaSegnalata";
import Feedback from "./Feedback";
import Notifica from "../SistemaNotifica/Notifica";

class InterfacciaSegnalazione {
    public static async segnalaVulnerabilita(
        titolo: string,
        usernameUt: string
    ) {
        try {
            const idMax = await VulnerabilitaSegnalata.getIdMax();
            const vulnSegn = new VulnerabilitaSegnalata(
                idMax + 1,
                titolo,
                0,
                usernameUt
            );
            return vulnSegn.insertVulnerabilitaDB();
        } catch (error: any) {
            throw new Error(`Error inserting vulnerabilita: ${error.message}`);
        }
    }
    public static async findVulnSegnalateUt(
        usernameUt: string
    ): Promise<VulnerabilitaSegnalata[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM Vulnerabilita WHERE usernameUt = ?";
            connection.query(
                query,
                [usernameUt],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const vulnerabilitaIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = vulnerabilitaIds.map(
                                (id: number) =>
                                    VulnerabilitaSegnalata.getVulnerabilitaDB(
                                        id
                                    )
                            );
                            const vulnerabilita = await Promise.all(promises);
                            resolve(vulnerabilita);
                        } catch (err) {
                            reject(err);//NOSONAR
                        }
                    } else {
                        reject(new Error("no vulnerabilita found"));
                    }
                }
            );
        });
    }

    public static async findFeedbackUt(
        usernameUt: string
    ): Promise<Feedback[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM Feedback WHERE usernameUt = ?";
            connection.query(
                query,
                [usernameUt],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const feedbackIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = feedbackIds.map((id: number) =>
                                Feedback.getFeedbackDB(id)
                            );
                            const feedback = await Promise.all(promises);
                            resolve(feedback);
                        } catch (err) {
                            reject(err);//NOSONAR
                        }
                    } else {
                        reject(new Error("no feedback found"));
                    }
                }
            );
        });
    }

    public static async inserisciFeedback(
        titolo: string,
        descrizione: string,
        usernameUt: string
    ) {
        try {
            const idMax = await Feedback.getIdMax();
            const newId = idMax + 1;
            const fed = new Feedback(newId, titolo, descrizione, usernameUt);
            return fed.insertFeedbackDB();
        } catch (error: any) {
            throw new Error(`Error inserting feedback: ${error.message}`);
        }
    }

    public static async showNotifiche(): Promise<Notifica[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM notifica";
            connection.query(
                query,
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const notificaIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = notificaIds.map((id: number) =>
                                Notifica.getNotificaDB(id)
                            );
                            const notifiche = await Promise.all(promises);
                            resolve(notifiche);
                        } catch (err) {
                            reject(err);//NOSONAR
                        }
                    } else {
                        reject(new Error("No articoli found"));
                    }
                }
            );
        });
    }
}
export default InterfacciaSegnalazione;
