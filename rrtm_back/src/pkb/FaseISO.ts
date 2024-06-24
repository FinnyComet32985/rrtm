import * as mysql from "mysql";
import connection from "../index.ts";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class FaseISO {
    private Id: number;
    private nome: string;

    private pattern: number[];
    private MVC: number[];
    private PbD: number[];
    // Costruttore
    constructor(
        Id: number,
        nome?: string,
        pattern?: number[],
        MVC?: number[],
        PbD?: number[]
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
        if (MVC !== undefined) {
            this.MVC = MVC;
        } else {
            this.MVC = [];
        }
        if (PbD !== undefined) {
            this.PbD = PbD;
        } else {
            this.PbD = [];
        }
    }

    // get MVC by filtro
    getISObyFiltro(filtro: FiltroApplicato) {
        const retISO = new FaseISO(
            filtro.filtroISO.getId(),
            filtro.filtroISO.getNome()
        );
        return retISO;
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
    getMVC() {
        return this.MVC;
    }
    getPbD() {
        return this.PbD;
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
        const query = "SELECT patternId FROM IsoPattern WHERE IsoId = ?";
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
    setMVC() {
        const query = "SELECT MvcId FROM IsoMvc WHERE IsoId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.MVC = results.map((row: any) => row.MvcId);
                        resolve();
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
    setPbD() {
        const query = "SELECT PbDId FROM PbdIso WHERE IsoId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.PbD = results.map((row: any) => row.PbDId);
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
        let Id = filtro.filtroISO.getId();
        const query = "SELECT * FROM faseIso WHERE id = ?";

        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [Id],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const isoData = results[0];
                        filtro.filtroISO.setId(isoData.Id);
                        filtro.filtroISO.setNome(isoData.nome);
                        if (tipo === "pattern-ISO") {
                            await filtro.filtroISO.setPattern();
                        }
                        if (tipo === "MVC-ISO") {
                            await filtro.filtroISO.setMVC();
                        }
                        if (tipo === "PbD-ISO") {
                            await filtro.filtroISO.setPbD();
                        }
                        resolve();
                    } else {
                        reject(new Error("ISO not found"));
                    }
                }
            );
        });
    }

    // get dal database
    public static async getISODB(id: number): Promise<FaseISO> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM faseIso WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const isoRicercata = new FaseISO(
                            results[0].Id,
                            results[0].nome
                        );
                        resolve(isoRicercata);
                    } else {
                        reject(new Error(`iso not found for id: ${id}`));
                    }
                }
            );
        });
    }

    public async updateISODB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "UPDATE faseISO SET ";
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

    public async insertISODB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO faseISO (";
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

    public async deleteISODB(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM faseISO WHERE id = ?";
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

export default FaseISO;
