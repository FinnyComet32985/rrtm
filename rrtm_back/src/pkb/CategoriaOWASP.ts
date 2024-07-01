import * as mysql from "mysql";
import connection from "../index.ts";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class CategoriaOWASP {
    private Id: number;
    private nome: string;

    private pattern: number[];
    // Costruttore
    constructor(Id: number, nome?: string, pattern?: number[]) {
        this.Id = Id;
        if (nome !== undefined) {
            this.nome = nome;
        } else {
            this.nome = "";
        }
        if (pattern !== undefined) {
            this.pattern = pattern;
        } else {
            this.pattern = [];
        }
    }

    // get MVC by filtro
    getOWASPbyFiltro(filtro: FiltroApplicato) {
        const retOWASP = new CategoriaOWASP(
            filtro.filtroOWASP.getId(),
            filtro.filtroOWASP.getNome()
        );
        return retOWASP;
    }
    // getters
    getId() {
        return this.Id;
    }
    getNome() {
        return this.nome;
    }
    getPattern() {
        return this.pattern;
    }
    // setters
    setId(Id: number) {
        this.Id = Id;
    }
    setNome(nome: string) {
        this.nome = nome;
    }
    // set relazioni
    setPattern() {
        const query = "SELECT patternId FROM OwaspPattern WHERE OwaspId = ?";
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

    // update filtro
    static async updateFiltro(
        filtro: FiltroApplicato,
        tipo: string
    ): Promise<void> {
        let Id = filtro.filtroOWASP.getId();
        const query = "SELECT * FROM categoriaOWASP WHERE id = ?";

        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [Id],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const owaspData = results[0];
                        filtro.filtroOWASP.setId(owaspData.Id);
                        filtro.filtroOWASP.setNome(owaspData.nome);
                        if (tipo === "pattern-OWASP") {
                            await filtro.filtroOWASP.setPattern();
                        }
                        resolve();
                    } else {
                        reject(new Error("OWASP not found"));
                    }
                }
            );
        });
    }

    // get dal database
    public static async getOWASPDB(id: number): Promise<CategoriaOWASP> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM categoriaOWASP WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const owaspRicercata = new CategoriaOWASP(
                            results[0].Id,
                            results[0].nome
                        );
                        resolve(owaspRicercata);
                    } else {
                        reject(new Error(`iso not found for id: ${id}`));
                    }
                }
            );
        });
    }

    public async updateOWASPDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "UPDATE categoriaOWASP SET ";
            const fields: string[] = [];
            const values: any[] = [];

            if (this.nome !== "") {
                fields.push("nome = ?");
                values.push(this.nome);
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

    public async insertOWASPDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO categoriaOWASP (";
            const fields: string[] = ["id"];
            const values: any[] = [this.Id];
            const placeholders: string[] = ["?"];

            if (this.nome !== "") {
                fields.push("nome");
                values.push(this.nome);
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

    public async deleteOWASPDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM categoriaOWASP WHERE id = ?";
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
            const query = "SELECT MAX(Id) as idMax FROM categoriaOWASP";
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
    public static async getResult(
        filtro: FiltroApplicato,
        tipo: string
    ): Promise<CategoriaOWASP[] | boolean> {
        let query: string;
        let queryParams: any[];

        if (tipo === "nomeOWASP") {
            query = "SELECT * FROM CategoriaOWASP WHERE nome LIKE ?";
            queryParams = [`%${filtro.filtroOWASP.getNome()}%`];
        } else {
            /* implementazione per gli altri filtri */
            return [];
        }
        return new Promise<CategoriaOWASP[] | boolean>((resolve, reject) => {
            connection.query(
                query,
                queryParams,
                async (err: mysql.MysqlError | null, results: any) => {
                    // NOSONAR
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const owasps = results.map((owaspData: any) => {
                            const owasps = new CategoriaOWASP(
                                owaspData.Id,
                                owaspData.nome
                            );
                            return owasps;
                        });
                        resolve(owasps);
                    } else {
                        console.error("OWASP non trovata");
                        resolve(false);
                    }
                }
            );
        });
    }
}

export default CategoriaOWASP;
