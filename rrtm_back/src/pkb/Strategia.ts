import * as mysql from "mysql";
import connection from "../index.ts";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class Strategia {
    private Id: number;
    private nome: string;

    private pattern: number[];
    private articoli: number[];
    private principiPbD: number[];

    constructor(
        Id: number,
        nome?: string,
        pattern?: number[],
        articoli?: number[],
        principiPbD?: number[]
    ) {
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
        if (articoli !== undefined) {
            this.articoli = articoli;
        } else {
            this.articoli = [];
        }
        if (principiPbD !== undefined) {
            this.principiPbD = principiPbD;
        } else {
            this.principiPbD = [];
        }
    }

    // get Strategia by Filtro
    getStrategiabyFiltro(filtro: FiltroApplicato) {
        const retStrategia = new Strategia(
            filtro.filtroStrategia.getId(),
            filtro.filtroStrategia.getNome()
        );
        return retStrategia;
    }
    // getters
    getId() {
        return this.Id;
    }
    getNome() {
        return this.nome;
    }
    getPatterns() {
        return this.pattern;
    }
    getArticoli() {
        return this.articoli;
    }
    getPbD() {
        return this.principiPbD;
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
        const query =
            "SELECT patternId FROM StrategiaPattern WHERE strategiaId = ?";
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
    setArticoli() {
        const query =
            "SELECT articoloId FROM ArticoloStrategia WHERE strategiaId = ?";
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
    setPbD() {
        const query = "SELECT PbDId FROM PbdStrategia WHERE strategiaId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.principiPbD = results.map((row: any) => row.PbDId);
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
        let Id = filtro.filtroStrategia.getId();
        const query = "SELECT * FROM strategia WHERE id = ?";

        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [Id],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const strategiaData = results[0];
                        filtro.filtroStrategia.setId(strategiaData.Id);
                        filtro.filtroStrategia.setNome(strategiaData.nome);
                        if (tipo === "pattern-strategia") {
                            await filtro.filtroStrategia.setPattern();
                        }
                        if (tipo === "articolo-strategia") {
                            await filtro.filtroStrategia.setArticoli();
                        }
                        if (tipo === "PbD-strategia") {
                            await filtro.filtroStrategia.setPbD();
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
    public static async getStrategiaDB(id: number): Promise<Strategia> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM strategia WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const strategiaRicercata = new Strategia(
                            results[0].Id,
                            results[0].nome
                        );
                        resolve(strategiaRicercata);
                    } else {
                        reject(new Error(`Strategia not found for id: ${id}`));
                    }
                }
            );
        });
    }

    public async updateStrategiaDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "UPDATE strategia SET ";
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

    public async insertStrategiaDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO strategia (";
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

    public async deleteStrategiaDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM strategia WHERE id = ?";
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
            const query = "SELECT MAX(Id) as idMax FROM strategia";
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
    ): Promise<Strategia[] | boolean> {
        let query: string;
        let queryParams: any[];

        if (tipo === "nomeStrategia") {
            query = "SELECT * FROM strategia WHERE nome LIKE ?";
            queryParams = [`%${filtro.filtroStrategia.getNome()}%`];
        } else {
            /* implementazione per gli altri filtri */
            return [];
        }

        return new Promise<Strategia[] | boolean>((resolve, reject) => {
            connection.query(
                query,
                queryParams,
                async (err: mysql.MysqlError | null, results: any) => {
                    // NOSONAR
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const strategie = results.map((strategiaData: any) => {
                            const strategie = new Strategia(
                                strategiaData.Id,
                                strategiaData.nome
                            );
                            return strategie;
                        });
                        resolve(strategie);
                    } else {
                        console.error("Strategia non trovata");
                        resolve(false);
                    }
                }
            );
        });
    }
}
export default Strategia;
