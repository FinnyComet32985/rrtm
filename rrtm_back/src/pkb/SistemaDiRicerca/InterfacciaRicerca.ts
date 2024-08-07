import FiltroApplicato from "./FiltroApplicato";
import Pattern from "../Pattern.ts";
import Strategia from "../Strategia.ts";

import * as mysql from "mysql";
import connection from "../../index.ts";
import Vulnerabilita from "../Vulnerabilita.ts";
import ArticoloGDPR from "../ArticoloGDPR.ts";
import PrincipioPbD from "../PrincipioPbD.ts";
import CollocazioneMVC from "../CollocazioneMVC.ts";
import FaseISO from "../FaseISO.ts";
import CategoriaOWASP from "../CategoriaOWASP.ts";

class InterfacciaRicerca {
    // Pattern
    public static async findPattern(Id: number) {
        let filtroPattern = new FiltroApplicato(Id, "pattern");
        await Pattern.updateFiltro(filtroPattern, "pattern");
        return filtroPattern.filtroPattern.getPatternbyFiltro(filtroPattern);
    }
    public static async findPatternFromName(nome: string) {
        let filtro = new FiltroApplicato(0, "nomePattern", nome);
        return await Pattern.getResult(filtro, "nomePattern");
    }
    public static async showPatterns(): Promise<Pattern[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM pattern";
            connection.query(
                query,
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const patternIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = patternIds.map((id: number) =>
                                Pattern.getPatternDB(id)
                            );
                            const patterns = Promise.all(promises);
                            resolve(patterns);
                        } catch (err) {
                            reject(err); //
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
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(strategieIds) || strategieIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = strategieIds.map((id: number) =>
                    Strategia.getStrategiaDB(id)
                );
                const strategie = Promise.all(promises);
                resolve(strategie);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findVulnPatt(
        idPattern: number
    ): Promise<Vulnerabilita[]> {
        let filtro = new FiltroApplicato(idPattern, "vulnerabilita-pattern");
        await Pattern.updateFiltro(filtro, "vulnerabilita-pattern");
        const vulnerabilitaIds = filtro.filtroPattern.getVulnerabilita();
        return new Promise((resolve, reject) => {
            //
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
                const vulnerabilita = Promise.all(promises);
                resolve(vulnerabilita);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findArtPatt(
        idPattern: number
    ): Promise<ArticoloGDPR[]> {
        let filtro = new FiltroApplicato(idPattern, "articolo-pattern");
        await Pattern.updateFiltro(filtro, "articolo-pattern");
        const articoloIds = filtro.filtroPattern.getArticoli();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(articoloIds) || articoloIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = articoloIds.map((id: number) =>
                    ArticoloGDPR.getArticoloDB(id)
                );
                const articoli = Promise.all(promises);
                resolve(articoli);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findPbDPatt(
        idPattern: number
    ): Promise<PrincipioPbD[]> {
        let filtro = new FiltroApplicato(idPattern, "PbD-pattern");
        await Pattern.updateFiltro(filtro, "PbD-pattern");
        const principioIds = filtro.filtroPattern.getPbD();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(principioIds) || principioIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = principioIds.map((id: number) =>
                    PrincipioPbD.getPbDDB(id)
                );
                const PbD = Promise.all(promises);
                resolve(PbD);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findMVCPatt(
        idPattern: number
    ): Promise<CollocazioneMVC[]> {
        let filtro = new FiltroApplicato(idPattern, "MVC-pattern");
        await Pattern.updateFiltro(filtro, "MVC-pattern");
        const mvcIds = filtro.filtroPattern.getMVC();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(mvcIds) || mvcIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = mvcIds.map((id: number) =>
                    CollocazioneMVC.getMVCDB(id)
                );
                const MVC = Promise.all(promises);
                resolve(MVC);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findISOPatt(idPattern: number): Promise<FaseISO[]> {
        let filtro = new FiltroApplicato(idPattern, "ISO-pattern");
        await Pattern.updateFiltro(filtro, "ISO-pattern");
        const isoIds = filtro.filtroPattern.getISO();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(isoIds) || isoIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = isoIds.map((id: number) =>
                    FaseISO.getISODB(id)
                );
                const ISO = Promise.all(promises);
                resolve(ISO);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findOWASPPatt(
        idPattern: number
    ): Promise<CategoriaOWASP[]> {
        let filtro = new FiltroApplicato(idPattern, "OWASP-pattern");
        await Pattern.updateFiltro(filtro, "OWASP-pattern");
        const owaspIds = filtro.filtroPattern.getOWASP();
        return new Promise( (resolve, reject) => {
            //
            if (!Array.isArray(owaspIds) || owaspIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = owaspIds.map((id: number) =>
                    CategoriaOWASP.getOWASPDB(id)
                );
                const OWASP = Promise.all(promises);
                resolve(OWASP);
            } catch (err) {
                reject(err); //
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
    public static async findStrategiaFromName(nome: string) {
        let filtro = new FiltroApplicato(0, "nomeStrategia", nome);
        return await Strategia.getResult(filtro, "nomeStrategia");
    }
    public static async showStrategie(): Promise<Strategia[]> {
        return new Promise((resolve, reject) => {
            //
            const query = "SELECT Id FROM strategia";
            connection.query(
                query,
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const strategiaIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = strategiaIds.map((id: number) =>
                                Strategia.getStrategiaDB(id)
                            );
                            const strategie = Promise.all(promises);
                            resolve(strategie);
                        } catch (err) {
                            reject(err); //
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
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(patternIds) || patternIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = patternIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findArtStrat(
        idStrategia: number
    ): Promise<ArticoloGDPR[]> {
        let filtro = new FiltroApplicato(idStrategia, "articolo-strategia");
        await Strategia.updateFiltro(filtro, "articolo-strategia");
        const articoloIds = filtro.filtroStrategia.getArticoli();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(articoloIds) || articoloIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = articoloIds.map((id: number) =>
                    ArticoloGDPR.getArticoloDB(id)
                );
                const articoli = Promise.all(promises);
                resolve(articoli);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findPbDStrat(
        idStrategia: number
    ): Promise<PrincipioPbD[]> {
        let filtro = new FiltroApplicato(idStrategia, "PbD-strategia");
        await Strategia.updateFiltro(filtro, "PbD-strategia");
        const PbDIds = filtro.filtroStrategia.getPbD();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(PbDIds) || PbDIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = PbDIds.map((id: number) =>
                    PrincipioPbD.getPbDDB(id)
                );
                const PbD = Promise.all(promises);
                resolve(PbD);
            } catch (err) {
                reject(err); //
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
    public static async findVulnerabilitaFromName(nome: string) {
        let filtro = new FiltroApplicato(0, "nomeVulnerabilita", nome);
        return await Vulnerabilita.getResult(filtro, "nomeVulnerabilita");
    }
    public static async showVulnerabilitaInserite(): Promise<Vulnerabilita[]> {
        return new Promise((resolve, reject) => {
            //
            const query =
                "SELECT Id FROM Vulnerabilita WHERE stato='Pubblicata'";
            connection.query(
                query,
                (err: mysql.MysqlError | null, results: any) => {
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
                            const vulnerabilita = Promise.all(promises);
                            resolve(vulnerabilita);
                        } catch (err) {
                            reject(err); //
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
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(patternIds) || patternIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = patternIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err); //
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
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(articoliIds) || articoliIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = articoliIds.map((id: number) =>
                    ArticoloGDPR.getArticoloDB(id)
                );
                const articoli = Promise.all(promises);
                resolve(articoli);
            } catch (err) {
                reject(err); //
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
    public static async findArticoloFromName(nome: string) {
        let filtro = new FiltroApplicato(0, "nomeArticolo", nome);
        return await ArticoloGDPR.getResult(filtro, "nomeArticolo");
    }
    public static async showArticoli(): Promise<ArticoloGDPR[]> {
        return new Promise((resolve, reject) => {
            //
            const query = "SELECT Id FROM articoloGDPR";
            connection.query(
                query,
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const articoloIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = articoloIds.map((id: number) =>
                                ArticoloGDPR.getArticoloDB(id)
                            );
                            const articoli = Promise.all(promises);
                            resolve(articoli);
                        } catch (err) {
                            reject(err); //
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
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(patternIds) || patternIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = patternIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findStratArt(idArticolo: number): Promise<Strategia[]> {
        let filtro = new FiltroApplicato(idArticolo, "strategia-articolo");
        await ArticoloGDPR.updateFiltro(filtro, "strategia-articolo");
        const strategiaIds = filtro.filtroArticolo.getStrategie();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(strategiaIds) || strategiaIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = strategiaIds.map((id: number) =>
                    Strategia.getStrategiaDB(id)
                );
                const strategie = Promise.all(promises);
                resolve(strategie);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findVulnArt(
        idArticolo: number
    ): Promise<Vulnerabilita[]> {
        let filtro = new FiltroApplicato(idArticolo, "vulnerabilita-articolo");
        await ArticoloGDPR.updateFiltro(filtro, "vulnerabilita-articolo");
        const vulnerabilitaIds = filtro.filtroArticolo.getVulnerabilita();
        return new Promise((resolve, reject) => {
            //
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
                const vulnerabilita = Promise.all(promises);
                resolve(vulnerabilita);
            } catch (err) {
                reject(err); //
            }
        });
    }

    // PbD
    public static async findPbD(Id: number) {
        let filtroPbD = new FiltroApplicato(Id, "PbD");
        await PrincipioPbD.updateFiltro(filtroPbD, "PbD");
        return filtroPbD.filtroPbD.getPbDbyFiltro(filtroPbD);
    }
    public static async findPbDFromName(nome: string) {
        let filtro = new FiltroApplicato(0, "nomePbD", nome);
        return await PrincipioPbD.getResult(filtro, "nomePbD");
    }
    public static async showPbD(): Promise<PrincipioPbD[]> {
        return new Promise((resolve, reject) => {
            //
            const query = "SELECT Id FROM principioPbD";
            connection.query(
                query,
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const PbDIds = results.map((row: any) => row.Id);
                            const promises = PbDIds.map((id: number) =>
                                PrincipioPbD.getPbDDB(id)
                            );
                            const principi = Promise.all(promises);
                            resolve(principi);
                        } catch (err) {
                            reject(err); //
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
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(patternIds) || patternIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = patternIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findStratPbD(idPbD: number): Promise<Strategia[]> {
        let filtro = new FiltroApplicato(idPbD, "strategia-PbD");
        await PrincipioPbD.updateFiltro(filtro, "strategia-PbD");
        const strategiaIds = filtro.filtroPbD.getStrategie();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(strategiaIds) || strategiaIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = strategiaIds.map((id: number) =>
                    Strategia.getStrategiaDB(id)
                );
                const strategie = Promise.all(promises);
                resolve(strategie);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findISOPbD(idPbD: number): Promise<FaseISO[]> {
        let filtro = new FiltroApplicato(idPbD, "ISO-PbD");
        await PrincipioPbD.updateFiltro(filtro, "ISO-PbD");
        const isoIds = filtro.filtroPbD.getISO();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(isoIds) || isoIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = isoIds.map((id: number) =>
                    FaseISO.getISODB(id)
                );
                const iso = Promise.all(promises);
                resolve(iso);
            } catch (err) {
                reject(err); //
            }
        });
    }

    // MVC
    public static async findMVC(Id: number) {
        let filtroMVC = new FiltroApplicato(Id, "MVC");
        await CollocazioneMVC.updateFiltro(filtroMVC, "MVC");
        return filtroMVC.filtroMVC.getMVCbyFiltro(filtroMVC);
    }
    public static async findMVCFromName(nome: string) {
        let filtro = new FiltroApplicato(0, "nomeMVC", nome);
        return await CollocazioneMVC.getResult(filtro, "nomeMVC");
    }
    public static async showMVC(): Promise<CollocazioneMVC[]> {
        return new Promise((resolve, reject) => {
            //
            const query = "SELECT Id FROM collocazioneMVC";
            connection.query(
                query,
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const MVCIds = results.map((row: any) => row.Id);
                            const promises = MVCIds.map((id: number) =>
                                CollocazioneMVC.getMVCDB(id)
                            );
                            const MVC = Promise.all(promises);
                            resolve(MVC);
                        } catch (err) {
                            reject(err); //
                        }
                    } else {
                        reject(new Error("No principi found"));
                    }
                }
            );
        });
    }
    public static async findPattMVC(idMVC: number): Promise<Pattern[]> {
        let filtro = new FiltroApplicato(idMVC, "pattern-MVC");
        await CollocazioneMVC.updateFiltro(filtro, "pattern-MVC");
        const MVCIds = filtro.filtroMVC.getPattern();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(MVCIds) || MVCIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = MVCIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findISOMVC(idMVC: number): Promise<FaseISO[]> {
        let filtro = new FiltroApplicato(idMVC, "ISO-MVC");
        await CollocazioneMVC.updateFiltro(filtro, "ISO-MVC");
        const MVCIds = filtro.filtroMVC.getISO();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(MVCIds) || MVCIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = MVCIds.map((id: number) =>
                    FaseISO.getISODB(id)
                );
                const iso = Promise.all(promises);
                resolve(iso);
            } catch (err) {
                reject(err); //
            }
        });
    }

    // ISO
    public static async findISO(Id: number) {
        let filtroISO = new FiltroApplicato(Id, "ISO");
        await FaseISO.updateFiltro(filtroISO, "ISO");
        return filtroISO.filtroISO.getISObyFiltro(filtroISO);
    }
    public static async findISOFromName(nome: string) {
        let filtro = new FiltroApplicato(0, "nomeISO", nome);
        return await FaseISO.getResult(filtro, "nomeISO");
    }
    public static async showISO(): Promise<FaseISO[]> {
        return new Promise((resolve, reject) => {
            //
            const query = "SELECT Id FROM faseIso";
            connection.query(
                query,
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const ISOIds = results.map((row: any) => row.Id);
                            const promises = ISOIds.map((id: number) =>
                                FaseISO.getISODB(id)
                            );
                            const ISO = Promise.all(promises);
                            resolve(ISO);
                        } catch (err) {
                            reject(err); //
                        }
                    } else {
                        reject(new Error("No principi found"));
                    }
                }
            );
        });
    }
    public static async findPattISO(idISO: number): Promise<Pattern[]> {
        let filtro = new FiltroApplicato(idISO, "pattern-ISO");
        await FaseISO.updateFiltro(filtro, "pattern-ISO");
        const ISOIds = filtro.filtroISO.getPattern();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(ISOIds) || ISOIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = ISOIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findMVCISO(idISO: number): Promise<CollocazioneMVC[]> {
        let filtro = new FiltroApplicato(idISO, "MVC-ISO");
        await FaseISO.updateFiltro(filtro, "MVC-ISO");
        const ISOIds = filtro.filtroISO.getMVC();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(ISOIds) || ISOIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = ISOIds.map((id: number) =>
                    CollocazioneMVC.getMVCDB(id)
                );
                const mvc = Promise.all(promises);
                resolve(mvc);
            } catch (err) {
                reject(err); //
            }
        });
    }
    public static async findPbDISO(idISO: number): Promise<PrincipioPbD[]> {
        let filtro = new FiltroApplicato(idISO, "PbD-ISO");
        await FaseISO.updateFiltro(filtro, "PbD-ISO");
        const pbdIds = filtro.filtroISO.getPbD();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(pbdIds) || pbdIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = pbdIds.map((id: number) =>
                    PrincipioPbD.getPbDDB(id)
                );
                const pbd = Promise.all(promises);
                resolve(pbd);
            } catch (err) {
                reject(err); //
            }
        });
    }

    // OWASP
    public static async findOWASP(Id: number) {
        let filtroOWASP = new FiltroApplicato(Id, "OWASP");
        await CategoriaOWASP.updateFiltro(filtroOWASP, "OWASP");
        return filtroOWASP.filtroOWASP.getOWASPbyFiltro(filtroOWASP);
    }
    public static async findOWASPFromName(nome: string) {
        let filtro = new FiltroApplicato(0, "nomeOWASP", nome);
        return await CategoriaOWASP.getResult(filtro, "nomeOWASP");
    }
    public static async showOWASP(): Promise<CategoriaOWASP[]> {
        return new Promise((resolve, reject) => {
            //
            const query = "SELECT Id FROM categoriaOWASP";
            connection.query(
                query,
                (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const OWASPIds = results.map((row: any) => row.Id);
                            const promises = OWASPIds.map((id: number) =>
                                CategoriaOWASP.getOWASPDB(id)
                            );
                            const OWASP = Promise.all(promises);
                            resolve(OWASP);
                        } catch (err) {
                            reject(err); //
                        }
                    } else {
                        reject(new Error("No principi found"));
                    }
                }
            );
        });
    }
    public static async findPattOWASP(idOWASP: number): Promise<Pattern[]> {
        let filtro = new FiltroApplicato(idOWASP, "pattern-OWASP");
        await CategoriaOWASP.updateFiltro(filtro, "pattern-OWASP");
        const OWASPIds = filtro.filtroOWASP.getPattern();
        return new Promise((resolve, reject) => {
            //
            if (!Array.isArray(OWASPIds) || OWASPIds.length === 0) {
                return resolve([]);
            }

            try {
                const promises = OWASPIds.map((id: number) =>
                    Pattern.getPatternDB(id)
                );
                const patterns = Promise.all(promises);
                resolve(patterns);
            } catch (err) {
                reject(err); //
            }
        });
    }
}
export default InterfacciaRicerca;
