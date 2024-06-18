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
}

export default CategoriaOWASP;
