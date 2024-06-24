import connection from "..";
import * as mysql from "mysql";
class Amministratore {
    private token: string;
    private username: string;
    private password: string;
    private email: string;
    private nome: string;
    private cognome: string;

    constructor(token: string, username: string, password: string) {
        this.token = token;
        this.username = username;
        this.password = password;
        this.email = "";
        this.nome = "";
        this.cognome = "";
    }
    public getToken() {
        return this.token;
    }
    public async loadAdditionalData() {
        const query = `
            SELECT email, nome, cognome
            FROM Amministratore
            WHERE username = ?
        `;
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.username],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (results.length > 0) {
                        // Assuming results contain only one row for the given username
                        this.email = results[0].email;
                        this.nome = results[0].nome;
                        this.cognome = results[0].cognome;
                        resolve();
                    } else {
                        reject(new Error("User not found"));
                    }
                }
            );
        });
    }
}
export default Amministratore;
