import * as mysql from "mysql";
import connection from "../index.ts";
import FiltroApplicato from "./SistemaDiRicerca/FiltroApplicato.ts";

class Pattern {
    private Id: number;
    private titolo: string;
    private sommario: string;
    private contesto: string;
    private problema: string;
    private soluzione: string;
    private esempio: string;
    private strategie: number[];
    private vulnerabilita: number[];
    private articoli: number[];
    private principiPbD: number[];
    private collocazioneMVC: number[];
    private faseISO: number[];
    private categoriaOWASP: number[];
    constructor(
        Id: number,
        titolo?: string,
        sommario?: string,
        contesto?: string,
        problema?: string,
        soluzione?: string,
        esempio?: string,
        strategie?: number[],
        vulnerabilita?: number[],
        articoli?: number[],
        principiPbD?: number[],
        collocazioneMVC?: number[],
        faseISO?: number[],
        categoriaOWASP?: number[]
    ) {
        this.Id = Id;
        if (titolo !== undefined) {
            this.titolo = titolo;
        } else {
            this.titolo = "";
        }
        if (sommario !== undefined) {
            this.sommario = sommario;
        } else {
            this.sommario = "";
        }
        if (contesto !== undefined) {
            this.contesto = contesto;
        } else {
            this.contesto = "";
        }
        if (problema !== undefined) {
            this.problema = problema;
        } else {
            this.problema = "";
        }
        if (soluzione !== undefined) {
            this.soluzione = soluzione;
        } else {
            this.soluzione = "";
        }
        if (esempio !== undefined) {
            this.esempio = esempio;
        } else {
            this.esempio = "";
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
        if (collocazioneMVC !== undefined) {
            this.collocazioneMVC = collocazioneMVC;
        } else {
            this.collocazioneMVC = [];
        }
        if (faseISO !== undefined) {
            this.faseISO = faseISO;
        } else {
            this.faseISO = [];
        }
        if (categoriaOWASP !== undefined) {
            this.categoriaOWASP = categoriaOWASP;
        } else {
            this.categoriaOWASP = [];
        }
    }
    // get Pattern by ID
    getPatternbyFiltro(filtro: FiltroApplicato) {
        const retPattern = new Pattern(
            filtro.filtroPattern.getId(),
            filtro.filtroPattern.getTitolo(),
            filtro.filtroPattern.getSommario(),
            filtro.filtroPattern.getContesto(),
            filtro.filtroPattern.getProblema(),
            filtro.filtroPattern.getSoluzione(),
            filtro.filtroPattern.getEsempio()
        );

        return retPattern;
    }
    // getters
    getId(): number {
        return this.Id;
    }
    getTitolo(): string {
        return this.titolo;
    }
    getSommario(): string {
        return this.sommario;
    }
    getContesto(): string {
        return this.contesto;
    }
    getProblema(): string {
        return this.problema;
    }
    getSoluzione(): string {
        return this.soluzione;
    }
    getEsempio(): string {
        return this.esempio;
    }

    getStrategie() {
        return this.strategie;
    }
    getVulnerabilita() {
        return this.vulnerabilita;
    }
    getArticoli() {
        return this.articoli;
    }
    getPbD() {
        return this.principiPbD;
    }
    getMVC() {
        return this.collocazioneMVC;
    }
    getISO() {
        return this.faseISO;
    }
    getOWASP() {
        return this.categoriaOWASP;
    }

    // setters
    setId(Id: number) {
        this.Id = Id;
    }
    setTitolo(titolo: string) {
        this.titolo = titolo;
    }
    setSommario(sommario: string) {
        this.sommario = sommario;
    }
    setProblema(problema: string) {
        this.problema = problema;
    }
    setSoluzione(soluzione: string) {
        this.soluzione = soluzione;
    }
    setContesto(contesto: string) {
        this.contesto = contesto;
    }
    setEsempio(esempio: string) {
        this.esempio = esempio;
    }
    // set relazioni
    public setStrategie() {
        const query =
            "SELECT strategiaId FROM StrategiaPattern WHERE patternId = ?";
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
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }
    public setVulnerabilita() {
        const query =
            "SELECT vulnerabilitaId FROM VulnerabilitaPattern WHERE patternId = ?";
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
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }
    public setArticoli() {
        const query =
            "SELECT articoloId FROM ArticoloPattern WHERE patternId = ?";
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
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }
    public setPbD() {
        const query = "SELECT PbDId FROM PbDPattern WHERE patternId = ?";
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
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }
    public setMVC() {
        const query = "SELECT MvcId FROM MvcPattern WHERE patternId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.collocazioneMVC = results.map(
                            (row: any) => row.MvcId
                        );
                        resolve();
                    } else {
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }
    public setISO() {
        const query = "SELECT IsoId FROM IsoPattern WHERE patternId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.faseISO = results.map((row: any) => row.IsoId);
                        resolve();
                    } else {
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }
    public setOWASP() {
        const query = "SELECT OwaspId FROM OwaspPattern WHERE patternId = ?";
        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [this.Id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        this.categoriaOWASP = results.map(
                            (row: any) => row.OwaspId
                        );
                        resolve();
                    } else {
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }

    static async updateFiltro(
        filtro: FiltroApplicato,
        tipo: string
    ): Promise<void> {
        let Id = filtro.filtroPattern.getId();
        const query = "SELECT * FROM pattern WHERE id = ?";

        return new Promise<void>((resolve, reject) => {
            connection.query(
                query,
                [Id],
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        const patternData = results[0];
                        filtro.filtroPattern.setId(patternData.Id);
                        filtro.filtroPattern.setTitolo(patternData.titolo);
                        filtro.filtroPattern.setSommario(patternData.sommario);
                        filtro.filtroPattern.setContesto(patternData.contesto);
                        filtro.filtroPattern.setProblema(patternData.problema);
                        filtro.filtroPattern.setSoluzione(
                            patternData.soluzione
                        );
                        filtro.filtroPattern.setEsempio(patternData.esempio);
                        if (tipo === "strategia-pattern") {
                            await filtro.filtroPattern.setStrategie();
                        }
                        if (tipo === "vulnerabilita-pattern") {
                            await filtro.filtroPattern.setVulnerabilita();
                        }
                        if (tipo === "articolo-pattern") {
                            await filtro.filtroPattern.setArticoli();
                        }
                        if (tipo === "PbD-pattern") {
                            await filtro.filtroPattern.setPbD();
                        }
                        if (tipo === "MVC-pattern") {
                            await filtro.filtroPattern.setMVC();
                        }
                        if (tipo === "ISO-pattern") {
                            await filtro.filtroPattern.setISO();
                        }
                        if (tipo === "OWASP-pattern") {
                            await filtro.filtroPattern.setOWASP();
                        }
                        resolve();
                    } else {
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }

    public static async getPatternDB(id: number): Promise<Pattern> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM pattern WHERE id=?";
            connection.query(
                query,
                [id],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length > 0) {
                        const pattern = new Pattern(
                            results[0].Id,
                            results[0].titolo,
                            results[0].sommario,
                            results[0].contesto,
                            results[0].problema,
                            results[0].soluzione,
                            results[0].esempio
                        );
                        resolve(pattern);
                    } else {
                        reject(new Error(`Pattern not found for id: ${id}`));
                    }
                }
            );
        });
    }

    static getIdByTitolo(titolo: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM pattern WHERE titolo = ?";
            connection.query(
                query,
                [titolo],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        resolve(results[0].Id);
                    } else {
                        reject(new Error("Pattern not found"));
                    }
                }
            );
        });
    }
}

export default Pattern;
