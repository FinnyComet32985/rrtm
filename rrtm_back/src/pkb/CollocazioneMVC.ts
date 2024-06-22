import * as mysql from "mysql";
import connection from "../index.ts";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class CollocazioneMVC {
    private Id: number;
    private nome: string;

    private pattern: number[];
    private ISO: number[];
    // Costruttore
    constructor(Id: number, nome?: string, pattern?: number[], ISO?: number[]) {
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
        if (ISO !== undefined) {
            this.ISO = ISO;
        } else {
            this.ISO = [];
        }
    }

    // get MVC by filtro
    getMVCbyFiltro(filtro: FiltroApplicato) {
        const retMVC = new CollocazioneMVC(
            filtro.filtroMVC.getId(),
            filtro.filtroMVC.getNome()
        );
        return retMVC;
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
        const query = "SELECT patternId FROM MvcPattern WHERE MvcId = ?";
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
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }
    setISO() {
        const query = "SELECT IsoId FROM IsoMvc WHERE MvcId = ?";
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
                        reject(new Error("Pattern not found"));
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
        let Id = filtro.filtroMVC.getId();
        const query = "SELECT * FROM collocazioneMVC WHERE id = ?";

        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [Id],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const mvcData = results[0];
                        filtro.filtroMVC.setId(mvcData.Id);
                        filtro.filtroMVC.setNome(mvcData.nome);
                        if (tipo === "pattern-MVC") {
                            await filtro.filtroMVC.setPattern();
                        }
                        if (tipo === "ISO-MVC") {
                            await filtro.filtroMVC.setISO();
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
    public static async getMVCDB(id: number): Promise<CollocazioneMVC> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM collocazioneMVC WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const mvcRicercata = new CollocazioneMVC(
                            results[0].Id,
                            results[0].nome
                        );
                        resolve(mvcRicercata);
                    } else {
                        reject(new Error(`Mvc not found for id: ${id}`));
                    }
                }
            );
        });
    }

    public static async getIdMax(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const query = "SELECT MAX(Id) as idMax FROM collocazioneMVC";
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

export default CollocazioneMVC;
