import * as mysql from "mysql";
import connection from "../index.ts";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class Strategia {
    private Id: number;
    private nome: string;

    private pattern: number[];
    private articoli: number[];

    constructor(
        Id: number,
        nome?: string,
        pattern?: number[],
        articoli?: number[]
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
                        reject(new Error("Pattern not found"));
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
                        reject(new Error("articolo not found"));
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
}
export default Strategia;
