import FiltroApplicato from "./FiltroApplicato";
import Pattern from "../Pattern.ts";
import Strategia from "../Strategia.ts";

import * as mysql from "mysql";
import connection from "../../index.ts";
import Vulnerabilita from "../Vulnerabilita.ts";
import ArticoloGDPR from "../ArticoloGDPR.ts";

class InterfacciaRicerca {
    // Pattern
    public static async findPattern(Id: number) {
        let filtroPattern = new FiltroApplicato(Id, "pattern");
        await Pattern.updateFiltro(filtroPattern, "pattern");
        return filtroPattern.filtroPattern.getPatternbyFiltro(filtroPattern);
    }
    public static async showPatterns(): Promise<Pattern[]> {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT Id FROM pattern";
            connection.query(
                query,
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const patternIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = patternIds.map((id: number) =>
                                Pattern.getPatternDB(id)
                            );
                            const patterns = await Promise.all(promises);
                            resolve(patterns);
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        reject(new Error("No patterns found"));
                    }
                }
            );
        });
    }
    public static async findStratPatt(idPattern: number): Promise<Strategia[]> {
        let filtro = new FiltroApplicato(idPattern, "strategia-pattern");
        await Pattern.updateFiltro(filtro, "strategia-pattern");
        const strategieIds = filtro.filtroPattern.getStrategie();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(strategieIds) || strategieIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = strategieIds.map((id: number) =>
                    Strategia.getStrategiaDB(id)
                );
                const strategie = await Promise.all(promises);
                resolve(strategie);
            } catch (err) {
                reject(err);
            }
        });
    }
    public static async findVulnPatt(
        idPattern: number
    ): Promise<Vulnerabilita[]> {
        let filtro = new FiltroApplicato(idPattern, "vulnerabilita-pattern");
        await Pattern.updateFiltro(filtro, "vulnerabilita-pattern");
        const vulnerabilitaIds = filtro.filtroPattern.getVulnerabilita();
        return new Promise(async (resolve, reject) => {
            if (
                !Array.isArray(vulnerabilitaIds) ||
                vulnerabilitaIds.length === 0
            ) {
                return resolve([]);
            }

            try {
                const promises = vulnerabilitaIds.map((id: number) =>
                    Vulnerabilita.getVulnerabilitaDB(id)
                );
                const vulnerabilita = await Promise.all(promises);
                resolve(vulnerabilita);
            } catch (err) {
                reject(err);
            }
        });
    }
    public static async findArtPatt(
        idPattern: number
    ): Promise<ArticoloGDPR[]> {
        let filtro = new FiltroApplicato(idPattern, "articolo-pattern");
        console.log(idPattern);
        await Pattern.updateFiltro(filtro, "articolo-pattern");
        const articoloIds = filtro.filtroPattern.getArticoli();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(articoloIds) || articoloIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = articoloIds.map((id: number) =>
                    ArticoloGDPR.getArticoloDB(id)
                );
                const articoli = await Promise.all(promises);
                resolve(articoli);
            } catch (err) {
                reject(err);
            }
        });
    }
    // Strategia
    public static async findStrategia(Id: number) {
        let filtroStrategia = new FiltroApplicato(Id, "strategia");
        await Strategia.updateFiltro(filtroStrategia, "strategia");
        return filtroStrategia.filtroStrategia.getStrategiabyFiltro(
            filtroStrategia
        );
    }
    public static async showStrategie(): Promise<Strategia[]> {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT Id FROM strategia WHERE stato='pubblicata'";
            connection.query(
                query,
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const strategiaIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = strategiaIds.map((id: number) =>
                                Strategia.getStrategiaDB(id)
                            );
                            const strategie = await Promise.all(promises);
                            resolve(strategie);
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        reject(new Error("No patterns found"));
                    }
                }
            );
        });
    }
    public static async findPattStrat(idStrategia: number): Promise<Pattern[]> {
        let filtro = new FiltroApplicato(idStrategia, "pattern-strategia");
        await Strategia.updateFiltro(filtro, "pattern-strategia");
        const patternIds = filtro.filtroStrategia.getPatterns();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(patternIds) || patternIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = patternIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = await Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Vulnerabilita
    public static async findVulnerabilita(Id: number) {
        let filtroVulnerabilita = new FiltroApplicato(Id, "vulnerabilita");
        await Vulnerabilita.updateFiltro(filtroVulnerabilita, "vulnerabilita");
        return filtroVulnerabilita.filtroVulnerabilita.getVulnerabilitabyFiltro(
            filtroVulnerabilita
        );
    }
    public static async showVulnerabilita(): Promise<Vulnerabilita[]> {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT Id FROM Vulnerabilita";
            connection.query(
                query,
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const vulnerabilitaIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = vulnerabilitaIds.map(
                                (id: number) =>
                                    Vulnerabilita.getVulnerabilitaDB(id)
                            );
                            const vulnerabilita = await Promise.all(promises);
                            resolve(vulnerabilita);
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        reject(new Error("No patterns found"));
                    }
                }
            );
        });
    }
    public static async findPattVuln(
        idVulnerabilita: number
    ): Promise<Pattern[]> {
        let filtro = new FiltroApplicato(
            idVulnerabilita,
            "pattern-vulnerabilita"
        );
        await Vulnerabilita.updateFiltro(filtro, "pattern-vulnerabilita");
        const patternIds = filtro.filtroVulnerabilita.getPatterns();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(patternIds) || patternIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = patternIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = await Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Articolo
    public static async findArticolo(Id: number) {
        let filtroArticolo = new FiltroApplicato(Id, "articolo");
        await ArticoloGDPR.updateFiltro(filtroArticolo, "articolo");
        return filtroArticolo.filtroArticolo.getArticolobyFiltro(
            filtroArticolo
        );
    }
    public static async showArticoli(): Promise<ArticoloGDPR[]> {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT Id FROM articoloGDPR";
            connection.query(
                query,
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const articoloIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = articoloIds.map((id: number) =>
                                ArticoloGDPR.getArticoloDB(id)
                            );
                            const articoli = await Promise.all(promises);
                            resolve(articoli);
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        reject(new Error("No articoli found"));
                    }
                }
            );
        });
    }
    public static async findPattArt(idArticolo: number): Promise<Pattern[]> {
        let filtro = new FiltroApplicato(idArticolo, "pattern-articolo");
        await ArticoloGDPR.updateFiltro(filtro, "pattern-articolo");
        const patternIds = filtro.filtroArticolo.getPatterns();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(patternIds) || patternIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = patternIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = await Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err);
            }
        });
    }
}
export default InterfacciaRicerca;
