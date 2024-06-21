import connection from "../..";
import * as mysql from "mysql";
class Feedback {
    private Id: number;
    private titolo: string;
    private descrizione: string;

    private usenameUt: string;

    constructor(
        Id: number,
        titolo: string,
        descrizione: string,
        usernameUt: string
    ) {
        this.Id = Id;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.usenameUt = usernameUt;
    }
    public async insertFeedbackDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO feedback (";
            const fields: string[] = [
                "id",
                "titolo",
                "descrizione",
                "usernameUt",
            ];
            const values: any[] = [
                this.Id,
                this.titolo,
                this.descrizione,
                this.usenameUt,
            ];
            const placeholders: string[] = ["?", "?", "?", "?"];

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
    public static async getFeedbackDB(id: number): Promise<Feedback> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM feedback WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const feed = new Feedback(
                            results[0].Id,
                            results[0].titolo,
                            results[0].descrizione,
                            results[0].usenameUt
                        );
                        resolve(feed);
                    } else {
                        reject(new Error(`Feedback not found for id: ${id}`));
                    }
                }
            );
        });
    }
    public static async getIdMax(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const query = "SELECT MAX(Id) as idMax FROM feedback";
            connection.query(
                query,
                [],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const idMax = results[0].idMax || 0; // Handle case where there are no entries yet
                        resolve(idMax);
                    } else {
                        reject(new Error("Error"));
                    }
                }
            );
        });
    }
}
export default Feedback;
