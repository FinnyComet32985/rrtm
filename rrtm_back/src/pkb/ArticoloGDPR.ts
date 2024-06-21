import * as mysql from "mysql";
import connection from "../index.ts";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class ArticoloGDPR {
    private Id: number;
    private titolo: string;

    private pattern: number[];
    private strategie: number[];
    private vulnerabilita: number[];

    constructor(
        Id: number,
        titolo?: string,
        pattern?: number[],
        strategie?: number[],
        vulnerabilita?: number[]
    ) {
        this.Id = Id;
        if (titolo !== undefined) {
            this.titolo = titolo;
        } else {
            this.titolo = "";
        }
        if (pattern !== undefined) {
            this.pattern = pattern;
        } else {
            this.pattern = [];
        }
        if (strategie !== undefined) {
            this.strategie = strategie;
        } else {
            this.strategie = [];
        }
        if (vulnerabilita !== undefined) {
            this.vulnerabilita = vulnerabilita;
        } else {
            this.vulnerabilita = [];
        }
    }

    // get Strategia by Filtro
    getArticolobyFiltro(filtro: FiltroApplicato) {
        const retArticolo = new ArticoloGDPR(
            filtro.filtroArticolo.getId(),
            filtro.filtroArticolo.getTitolo()
        );
        return retArticolo;
    }
    // getters
    getId() {
        return this.Id;
    }
    getTitolo() {
        return this.titolo;
    }
    getPatterns() {
        return this.pattern;
    }
    getStrategie() {
        return this.strategie;
    }
    getVulnerabilita() {
        return this.vulnerabilita;
    }
    // setters
    setId(Id: number) {
        this.Id = Id;
    }
    setTitolo(titolo: string) {
        this.titolo = titolo;
    }
    // set relazioni
    setPattern() {
        const query =
            "SELECT patternId FROM ArticoloPattern WHERE articoloId = ?";
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
    setStrategie() {
        const query =
            "SELECT strategiaId FROM ArticoloStrategia WHERE articoloId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.strategie = results.map(
                            (row: any) => row.strategiaId
                        );
                        resolve();
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
    setVulnerabilita() {
        const query =
            "SELECT vulnerabilitaId FROM ArticoloVulnerabilita WHERE articoloId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.vulnerabilita = results.map(
                            (row: any) => row.vulnerabilitaId
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
        let Id = filtro.filtroArticolo.getId();
        const query = "SELECT * FROM articoloGDPR WHERE id = ?";

        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [Id],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const articoloData = results[0];
                        filtro.filtroArticolo.setId(articoloData.Id);
                        filtro.filtroArticolo.setTitolo(articoloData.titolo);
                        if (tipo === "pattern-articolo") {
                            await filtro.filtroArticolo.setPattern();
                        }
                        if (tipo === "strategia-articolo") {
                            await filtro.filtroArticolo.setStrategie();
                        }
                        if (tipo === "vulnerabilita-articolo") {
                            await filtro.filtroArticolo.setVulnerabilita();
                        }
                        resolve();
                    } else {
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }

    // get dal database
    public static async getArticoloDB(id: number): Promise<ArticoloGDPR> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM articoloGDPR WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const articoloRicercato = new ArticoloGDPR(
                            results[0].Id,
                            results[0].titolo
                        );
                        resolve(articoloRicercato);
                    } else {
                        reject(new Error(`Articolo not found for id: ${id}`));
                    }
                }
            );
        });
    }

    public async updateArticoloDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "UPDATE articoloGDPR SET ";
            const fields: string[] = [];
            const values: any[] = [];

            if (this.titolo !== "") {
                fields.push("titolo = ?");
                values.push(this.titolo);
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

    public async insertArticoloDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO articoloGDPR (";
            const fields: string[] = ["id"];
            const values: any[] = [this.Id];
            const placeholders: string[] = ["?"];

            if (this.titolo !== "") {
                fields.push("titolo");
                values.push(this.titolo);
                placeholders.push("?");
            }
            if (fields.length === 1) {
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

    public async deleteArticoloDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM articoloGDPR WHERE id = ?";
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
}
export default ArticoloGDPR;
