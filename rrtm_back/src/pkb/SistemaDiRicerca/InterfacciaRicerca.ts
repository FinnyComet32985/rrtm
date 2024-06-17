import FiltroApplicato from "./FiltroApplicato";
import Pattern from "../Pattern.ts";
import Strategia from "../Strategia.ts";

import * as mysql from "mysql";
import connection from "../../index.ts";
import Vulnerabilita from "../Vulnerabilita.ts";
import ArticoloGDPR from "../ArticoloGDPR.ts";
import PrincipioPbD from "../PrincipioPbD.ts";

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
    public static async findPbDPatt(
        idPattern: number
    ): Promise<PrincipioPbD[]> {
        let filtro = new FiltroApplicato(idPattern, "PbD-pattern");
        await Pattern.updateFiltro(filtro, "PbD-pattern");
        const principioIds = filtro.filtroPattern.getPbD();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(principioIds) || principioIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = principioIds.map((id: number) =>
                    PrincipioPbD.getPbDDB(id)
                );
                const PbD = await Promise.all(promises);
                resolve(PbD);
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
            const query = "SELECT Id FROM strategia";
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
    public static async findArtStrat(
        idStrategia: number
    ): Promise<ArticoloGDPR[]> {
        let filtro = new FiltroApplicato(idStrategia, "articolo-strategia");
        await Strategia.updateFiltro(filtro, "articolo-strategia");
        const articoloIds = filtro.filtroStrategia.getArticoli();
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
    public static async findPbDStrat(
        idStrategia: number
    ): Promise<PrincipioPbD[]> {
        let filtro = new FiltroApplicato(idStrategia, "PbD-strategia");
        await Strategia.updateFiltro(filtro, "PbD-strategia");
        const PbDIds = filtro.filtroStrategia.getPbD();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(PbDIds) || PbDIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = PbDIds.map((id: number) =>
                    PrincipioPbD.getPbDDB(id)
                );
                const PbD = await Promise.all(promises);
                resolve(PbD);
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
    public static async showVulnerabilitaPubblicate(): Promise<
        Vulnerabilita[]
    > {
        return new Promise(async (resolve, reject) => {
            const query =
                "SELECT Id FROM Vulnerabilita WHERE stato='Pubblicata'";
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
    public static async findArtVuln(
        idVulnerabilita: number
    ): Promise<ArticoloGDPR[]> {
        let filtro = new FiltroApplicato(
            idVulnerabilita,
            "pattern-vulnerabilita"
        );
        await Vulnerabilita.updateFiltro(filtro, "articolo-vulnerabilita");
        const articoliIds = filtro.filtroVulnerabilita.getArticoli();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(articoliIds) || articoliIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = articoliIds.map((id: number) =>
                    ArticoloGDPR.getArticoloDB(id)
                );
                const articoli = await Promise.all(promises);
                resolve(articoli);
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
    public static async findStratArt(idArticolo: number): Promise<Strategia[]> {
        let filtro = new FiltroApplicato(idArticolo, "strategia-articolo");
        await ArticoloGDPR.updateFiltro(filtro, "strategia-articolo");
        const strategiaIds = filtro.filtroArticolo.getStrategie();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(strategiaIds) || strategiaIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = strategiaIds.map((id: number) =>
                    Strategia.getStrategiaDB(id)
                );
                const strategie = await Promise.all(promises);
                resolve(strategie);
            } catch (err) {
                reject(err);
            }
        });
    }
    public static async findVulnArt(
        idArticolo: number
    ): Promise<Vulnerabilita[]> {
        let filtro = new FiltroApplicato(idArticolo, "vulnerabilita-articolo");
        await ArticoloGDPR.updateFiltro(filtro, "vulnerabilita-articolo");
        const vulnerabilitaIds = filtro.filtroArticolo.getVulnerabilita();
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

    // PbD
    public static async findPbD(Id: number) {
        let filtroPbD = new FiltroApplicato(Id, "PbD");
        await PrincipioPbD.updateFiltro(filtroPbD, "PbD");
        return filtroPbD.filtroPbD.getPbDbyFiltro(filtroPbD);
    }
    public static async showPbD(): Promise<PrincipioPbD[]> {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT Id FROM principioPbD";
            connection.query(
                query,
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const PbDIds = results.map((row: any) => row.Id);
                            const promises = PbDIds.map((id: number) =>
                                PrincipioPbD.getPbDDB(id)
                            );
                            const principi = await Promise.all(promises);
                            resolve(principi);
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        reject(new Error("No principi found"));
                    }
                }
            );
        });
    }
    public static async findPattPbD(idPbD: number): Promise<Pattern[]> {
        let filtro = new FiltroApplicato(idPbD, "pattern-PbD");
        await PrincipioPbD.updateFiltro(filtro, "pattern-PbD");
        const patternIds = filtro.filtroPbD.getPattern();
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
    public static async findStratPbD(idPbD: number): Promise<Strategia[]> {
        let filtro = new FiltroApplicato(idPbD, "strategia-PbD");
        await PrincipioPbD.updateFiltro(filtro, "strategia-PbD");
        const strategiaIds = filtro.filtroPbD.getStrategie();
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(strategiaIds) || strategiaIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = strategiaIds.map((id: number) =>
                    Strategia.getStrategiaDB(id)
                );
                const strategie = await Promise.all(promises);
                resolve(strategie);
            } catch (err) {
                reject(err);
            }
        });
    }
}
export default InterfacciaRicerca;
