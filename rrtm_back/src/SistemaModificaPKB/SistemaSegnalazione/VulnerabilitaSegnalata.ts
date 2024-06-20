import Vulnerabilita from "../../pkb/Vulnerabilita";
import connection from "../../index";
import * as mysql from "mysql";
class VulnerabilitaSegnalata extends Vulnerabilita {
    private usernameUt: string;

    constructor(
        Id: number,
        titolo?: string,
        cwe?: number,
        usernameUt?: string
    ) {
        super(Id, titolo, "pending", cwe);
        if (usernameUt !== undefined) {
            this.usernameUt = usernameUt;
        } else {
            this.usernameUt = "";
        }
    }
    public static async getVulnerabilitaDB(id: number): Promise<Vulnerabilita> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM vulnerabilita WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const vulnerabilita = new Vulnerabilita(
                            results[0].Id,
                            results[0].titolo,
                            results[0].stato,
                            results[0].cwe
                        );
                        resolve(vulnerabilita);
                    } else {
                        reject(
                            new Error(`Vulnerabilita not found for id: ${id}`)
                        );
                    }
                }
            );
        });
    }
    public async insertVulnerabilitaDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO vulnerabilita (";
            const fields: string[] = ["id", "stato", "tipo"];
            const values: any[] = [this.Id, "pending", "segnalata"];
            const placeholders: string[] = ["?", "?", "?"];

            if (this.titolo !== "") {
                fields.push("titolo");
                values.push(this.titolo);
                placeholders.push("?");
            }
            if (this.cwe !== 0) {
                fields.push("cwe");
                values.push(this.cwe);
                placeholders.push("?");
            }
            if (this.usernameUt !== "") {
                fields.push("usernameUt");
                values.push(this.usernameUt);
                placeholders.push("?");
            }

            if (fields.length === 2) {
                return reject(new Error("No fields to insert")); // No fields to insert
            }

            query +=
                fields.join(", ") +
                ") VALUES (" +
                placeholders.join(", ") +
                ")";

            connection.query(
                query,
                values,
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results.affectedRows > 0); // Returns true if the row was inserted successfully
                }
            );
        });
    }
}
export default VulnerabilitaSegnalata;
