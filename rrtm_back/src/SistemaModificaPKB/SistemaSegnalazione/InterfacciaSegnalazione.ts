import connection from "../../index";
import * as mysql from "mysql";
import VulnerabilitaSegnalata from "./VulnerabilitaSegnalata";
import Feedback from "./Feedback";

class InterfacciaSegnalazione {
    public static async segnalaVulnerabilita(
        Id: number,
        titolo: string,
        usernameUt: string
    ) {
        const vulnSegn = new VulnerabilitaSegnalata(Id, titolo, 0, usernameUt);
        return vulnSegn.insertVulnerabilitaDB();
    }
    public static async findVulnSegnalateUt(
        usernameUt: string
    ): Promise<VulnerabilitaSegnalata[]> {
        return new Promise(async (resolve, reject) => {
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
                            reject(err);
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
        return new Promise(async (resolve, reject) => {
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
                            reject(err);
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
}
export default InterfacciaSegnalazione;
