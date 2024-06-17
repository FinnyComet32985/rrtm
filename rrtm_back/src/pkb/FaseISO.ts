import * as mysql from "mysql";
import connection from "../index.ts";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class FaseISO {
    private Id: number;
    private nome: string;

    private pattern: number[];
    private MVC: number[];
    // Costruttore
    constructor(Id: number, nome?: string, pattern?: number[], MVC?: number[]) {
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
                        reject(new Error("Pattern not found"));
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
                        reject(new Error("ISO not found"));
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
                        resolve();
                    } else {
                        reject(new Error("Pattern not found"));
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
}

export default FaseISO;
