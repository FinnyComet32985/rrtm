import * as mysql from "mysql";
import connection from "../index.ts";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class PrincipioPbD {
    private Id: number;
    private nome: string;

    private pattern: number[];
    private strategie: number[];
    private ISO: number[];

    public constructor(
        Id: number,
        nome?: string,
        pattern?: number[],
        strategie?: number[],
        ISO?: number[]
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
        if (strategie !== undefined) {
            this.strategie = strategie;
        } else {
            this.strategie = [];
        }
        if (ISO !== undefined) {
            this.ISO = ISO;
        } else {
            this.ISO = [];
        }
    }
    // get Principio by filtro
    getPbDbyFiltro(filtro: FiltroApplicato) {
        const retPrincipio = new PrincipioPbD(
            filtro.filtroPbD.getId(),
            filtro.filtroPbD.getNome()
        );
        return retPrincipio;
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
    getStrategie() {
        return this.strategie;
    }
    getISO() {
        return this.ISO;
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
        const query = "SELECT patternId FROM PbDPattern WHERE PbDId = ?";
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
        const query = "SELECT strategiaId FROM PbDStrategia WHERE PbDId = ?";
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
    setISO() {
        const query = "SELECT IsoId FROM PbdIso WHERE PbdId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.ISO = results.map((row: any) => row.IsoId);
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
        let Id = filtro.filtroPbD.getId();
        const query = "SELECT * FROM principioPbD WHERE id = ?";

        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [Id],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const PbDData = results[0];
                        filtro.filtroPbD.setId(PbDData.Id);
                        filtro.filtroPbD.setNome(PbDData.nome);
                        if (tipo === "pattern-PbD") {
                            await filtro.filtroPbD.setPattern();
                        }
                        if (tipo === "strategia-PbD") {
                            await filtro.filtroPbD.setStrategie();
                        }
                        if (tipo === "ISO-PbD") {
                            await filtro.filtroPbD.setISO();
                        }
                        resolve();
                    } else {
                        reject(new Error("PbD not found"));
                    }
                }
            );
        });
    }
    // get dal database
    public static async getPbDDB(id: number): Promise<PrincipioPbD> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM principioPbD WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const PbDRicercato = new PrincipioPbD(
                            results[0].Id,
                            results[0].nome
                        );
                        resolve(PbDRicercato);
                    } else {
                        reject(new Error(`Strategia not found for id: ${id}`));
                    }
                }
            );
        });
    }

    public async updatePbDDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "UPDATE principioPbD SET ";
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

    public async insertPbDDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO principioPbD (";
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

    public async deletePbDDB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM principioPbD WHERE id = ?";
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
            const query = "SELECT MAX(Id) as idMax FROM principioPbD";
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
    ): Promise<PrincipioPbD[] | boolean> {
        let query: string;
        let queryParams: any[];

        if (tipo === "nomePbD") {
            query = "SELECT * FROM PrincipioPbD WHERE nome LIKE ?";
            queryParams = [`%${filtro.filtroPbD.getNome()}%`];
        } else {
            /* implementazione per gli altri filtri */
            return [];
        }
        return new Promise<PrincipioPbD[] | boolean>((resolve, reject) => {
            connection.query(
                query,
                queryParams,
                async (err: mysql.MysqlError | null, results: any) => {
                    // NOSONAR
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const pbds = results.map((pbdData: any) => {
                            const pbds = new PrincipioPbD(
                                pbdData.Id,
                                pbdData.nome
                            );
                            return pbds;
                        });
                        resolve(pbds);
                    } else {
                        console.error("PbD non trovata");
                        resolve(false);
                    }
                }
            );
        });
    }
}

export default PrincipioPbD;
