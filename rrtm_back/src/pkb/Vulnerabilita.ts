import connection from "../index";
import * as mysql from "mysql";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class Vulnerabilita {
    protected Id: number;
    protected cwe: number;
    protected titolo: string;
    protected stato: string;

    protected pattern: number[];
    protected articoli: number[];

    // costruttore
    public constructor(
        Id: number,
        titolo?: string,
        stato?: string,
        cwe?: number,
        pattern?: number[],
        articoli?: number[]
    ) {
        this.Id = Id;
        if (titolo !== undefined) {
            this.titolo = titolo;
        } else {
            this.titolo = "";
        }
        if (stato !== undefined) {
            this.stato = stato;
        } else {
            this.stato = "";
        }
        if (cwe !== undefined) {
            this.cwe = cwe;
        } else {
            this.cwe = 0;
        }
        if (pattern !== undefined) {
            this.pattern = pattern;
        } else {
            this.pattern = [];
        }
        if (articoli !== undefined) {
            this.articoli = articoli;
        } else {
            this.articoli = [];
        }
    }
    // get Vulnerabilita by ID
    getVulnerabilitabyFiltro(filtro: FiltroApplicato) {
        const retPattern = new Vulnerabilita(
            filtro.filtroVulnerabilita.getId(),
            filtro.filtroVulnerabilita.getTitolo(),
            filtro.filtroVulnerabilita.getStato(),
            filtro.filtroVulnerabilita.getCwe()
        );
        return retPattern;
    }

    // getters
    getId() {
        return this.Id;
    }
    getCwe() {
        return this.cwe;
    }
    getTitolo() {
        return this.titolo;
    }
    getStato() {
        return this.stato;
    }
    getPatterns() {
        return this.pattern;
    }
    getArticoli() {
        return this.articoli;
    }

    // seters
    setId(Id: number) {
        this.Id = Id;
    }
    setCwe(cwe: number) {
        this.cwe = cwe;
    }
    setTitolo(titolo: string) {
        this.titolo = titolo;
    }
    setStato(stato: string) {
        this.stato = stato;
    }
    // set Patterns
    public setPatterns() {
        const query =
            "SELECT patternId FROM VulnerabilitaPattern WHERE vulnerabilitaId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.pattern = results.map((row: any) => row.patternId);
                        resolve();
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
    public setArticoli() {
        const query =
            "SELECT articoloId FROM ArticoloVulnerabilita WHERE vulnerabilitaId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.articoli = results.map(
                            (row: any) => row.articoloId
                        );
                        resolve();
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    // update filtro
    static async updateFiltro(
        filtro: FiltroApplicato,
        tipo: string
    ): Promise<void> {
        let Id = filtro.filtroVulnerabilita.getId();
        const query = "SELECT * FROM vulnerabilita WHERE id = ?";

        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [Id],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const vulnerabilitaData = results[0];
                        filtro.filtroVulnerabilita.setId(vulnerabilitaData.Id);
                        filtro.filtroVulnerabilita.setCwe(
                            vulnerabilitaData.cwe
                        );
                        filtro.filtroVulnerabilita.setTitolo(
                            vulnerabilitaData.titolo
                        );
                        filtro.filtroVulnerabilita.setStato(
                            vulnerabilitaData.stato
                        );
                        if (tipo === "pattern-vulnerabilita") {
                            await filtro.filtroVulnerabilita.setPatterns();
                        }
                        if (tipo === "articolo-vulnerabilita") {
                            await filtro.filtroVulnerabilita.setArticoli();
                        }
                        resolve();
                    } else {
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
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
                        reject(new Error(`Pattern not found for id: ${id}`));
                    }
                }
            );
        });
    }

    public async updateVulnerabilitaDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "UPDATE vulnerabilita SET ";
            const fields: string[] = [];
            const values: any[] = [];

            if (this.titolo !== "") {
                fields.push("titolo = ?");
                values.push(this.titolo);
            }
            if (this.cwe !== 0) {
                fields.push("cwe = ?");
                values.push(this.cwe);
            }
            if (this.stato !== "") {
                fields.push("stato = ?");
                values.push(this.stato);
            }
            if (fields.length === 0) {
                return resolve(false); // No fields to update
            }

            query += fields.join(", ") + " WHERE id = ?";
            values.push(this.Id);

            connection.query(
                query,
                values,
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results.affectedRows > 0);
                }
            );
        });
    }

    public async insertVulnerabilitaDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO vulnerabilita (";
            const fields: string[] = ["id", "tipo"];
            const values: any[] = [this.Id];
            const placeholders: string[] = ["?", "?"];

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
            if (this.stato !== "") {
                fields.push("stato");
                values.push(this.stato);
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

    public async deleteVulnerabilitaDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM vulnerabilita WHERE id = ?";
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results.affectedRows > 0);
                }
            );
        });
    }
    public static async getIdMax(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const query = "SELECT MAX(Id) as idMax FROM vulnerabilita";
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
export default Vulnerabilita;
