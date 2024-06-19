import connection from "../../index";
import * as mysql from "mysql";
import VulnerabilitaSegnalata from "./VulnerabilitaSegnalata";

class InterfacciaSegnalazione {
    public static async segnalaVulnerabilita(
        Id: number,
        titolo: string,
        usernameUt: string
    ) {
        const vulnSegn = new VulnerabilitaSegnalata(Id, titolo, 0, usernameUt);
        return vulnSegn.insertVulnerabilitaDB();
    }
    public static async findVulnSegnalateUS(
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
}
export default InterfacciaSegnalazione;
