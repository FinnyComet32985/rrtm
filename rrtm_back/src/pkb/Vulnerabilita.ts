import connection from "../index";
import * as mysql from "mysql";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class Vulnerabilita {
    private Id: number;
    private cwe: number;
    private titolo: string;
    private stato: string;

    private pattern: number[];
    // costruttore
    public constructor(
        Id: number,
        titolo?: string,
        stato?: string,
        cwe?: number,
        pattern?: number[]
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
                        reject(new Error("nessun risultato"));
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
}
export default Vulnerabilita;
