import ModificaPKB from "./ModificaPKB";
import Feedback from "./SistemaSegnalazione/Feedback";
import connection from "..";
import * as mysql from "mysql";
import VulnerabilitaSegnalata from "./SistemaSegnalazione/VulnerabilitaSegnalata";
import Notifica from "./SistemaNotifica/Notifica";
class InterfacciaModifica {
    // Pattern
    public static async modificaPattern(
        Id: number,
        titolo?: string,
        sommario?: string,
        contesto?: string,
        problema?: string,
        soluzione?: string,
        esempio?: string
    ) {
        let modificaPKB = new ModificaPKB(
            Id,
            titolo,
            "",
            sommario,
            contesto,
            problema,
            soluzione,
            esempio
        );
        return modificaPKB.modifyPattern();
    }
    public static async inserisciPattern(
        titolo?: string,
        sommario?: string,
        contesto?: string,
        problema?: string,
        soluzione?: string,
        esempio?: string
    ) {
        let modificaPKB = new ModificaPKB(
            0,
            titolo,
            "",
            sommario,
            contesto,
            problema,
            soluzione,
            esempio
        );
        return modificaPKB.insertPattern();
    }
    public static async eliminaPattern(Id: number) {
        let modificaPKB = new ModificaPKB(Id);
        return modificaPKB.deletePattern();
    }
    // articolo Gdpr
    public static async modificaArticolo(Id: number, titolo?: string) {
        let modificaPKB = new ModificaPKB(Id, titolo);
        return modificaPKB.modifyArticolo();
    }
    public static async inserisciArticolo(Id: number, titolo?: string) {
        let modificaPKB = new ModificaPKB(Id, titolo);
        return modificaPKB.insertArticolo();
    }
    public static async eliminaArticolo(Id: number) {
        let modificaPKB = new ModificaPKB(Id);
        return modificaPKB.deleteArticolo();
    }
    // categoria OWASP
    public static async modificaOWASP(Id: number, nome?: string) {
        let modificaPKB = new ModificaPKB(Id, "", nome);
        return modificaPKB.modifyOWASP();
    }
    public static async inserisciOWASP(nome?: string) {
        let modificaPKB = new ModificaPKB(0, "", nome);
        return modificaPKB.insertOWASP();
    }
    public static async eliminaOWASP(Id: number) {
        let modificaPKB = new ModificaPKB(Id);
        return modificaPKB.deleteOWASP();
    }
    // categoria ISO
    public static async modificaISO(Id: number, nome?: string) {
        let modificaPKB = new ModificaPKB(Id, "", nome);
        return modificaPKB.modifyISO();
    }
    public static async inserisciISO(Id: number, nome?: string) {
        let modificaPKB = new ModificaPKB(Id, "", nome);
        return modificaPKB.insertISO();
    }
    public static async eliminaISO(Id: number) {
        let modificaPKB = new ModificaPKB(Id);
        return modificaPKB.deleteISO();
    }
    // principio PbD
    public static async modificaPbD(Id: number, nome?: string) {
        let modificaPKB = new ModificaPKB(Id, "", nome);
        return modificaPKB.modifyPbD();
    }
    public static async inserisciPbD(nome?: string) {
        let modificaPKB = new ModificaPKB(0, "", nome);
        return modificaPKB.insertPbD();
    }
    public static async eliminaPbD(Id: number) {
        let modificaPKB = new ModificaPKB(Id);
        return modificaPKB.deletePbD();
    }
    // strategia
    public static async modificaStrategia(Id: number, nome?: string) {
        let modificaPKB = new ModificaPKB(Id, "", nome);
        return modificaPKB.modifyStrategia();
    }
    public static async inserisciStrategia(nome?: string) {
        let modificaPKB = new ModificaPKB(0, "", nome);
        return modificaPKB.insertStrategia();
    }
    public static async eliminaStrategia(Id: number) {
        let modificaPKB = new ModificaPKB(Id);
        return modificaPKB.deleteStrategia();
    }
    // Vulnerabilita
    public static async modificaVulnerabilita(
        Id: number,
        titolo?: string,
        cwe?: number,
        stato?: string
    ) {
        let modificaPKB = new ModificaPKB(
            Id,
            titolo,
            "",
            "",
            "",
            "",
            "",
            "",
            cwe,
            stato
        );
        return modificaPKB.modifyVulnerabilita();
    }
    public static async inserisciVulnerabilita(
        titolo?: string,
        cwe?: number,
        stato?: string
    ) {
        let modificaPKB = new ModificaPKB(
            0,
            titolo,
            "",
            "",
            "",
            "",
            "",
            "",
            cwe,
            stato
        );
        return modificaPKB.insertVulnerabilita();
    }
    public static async eliminaVulnerabilita(Id: number) {
        let modificaPKB = new ModificaPKB(Id);
        return modificaPKB.deleteVulnerabilita();
    }

    // feedback
    public static async showFeedback(): Promise<Feedback[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM Feedback";
            connection.query(
                query,
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const feedbackIds = results.map(
                                (row: any) => row.Id
                            );
                            const promises = feedbackIds.map((id: number) =>
                                Feedback.getFeedbackDB(id)
                            );
                            const feedback = await Promise.all(promises);
                            resolve(feedback);
                        } catch (err) {
                            reject(err); //
                        }
                    } else {
                        reject(new Error("No feedback found"));
                    }
                }
            );
        });
    }

    // vulnerabilita segnalate
    public static async showVulnerabilitaSegnalate(): Promise<
        VulnerabilitaSegnalata[]
    > {
        return new Promise((resolve, reject) => {
            const query = "SELECT Id FROM vulnerabilita WHERE tipo='segnalata'";
            connection.query(
                query,
                async (err: mysql.MysqlError | null, results: any) => {
                    if (err) return reject(err);
                    if (results.length > 0) {
                        try {
                            const vulIds = results.map((row: any) => row.Id);
                            const promises = vulIds.map((id: number) =>
                                VulnerabilitaSegnalata.getVulnerabilitaDB(id)
                            );
                            const vuln = await Promise.all(promises);
                            resolve(vuln);
                        } catch (err) {
                            reject(err); //
                        }
                    } else {
                        reject(new Error("No vulnerabilita segnalate found"));
                    }
                }
            );
        });
    }

    public static async inserisciNotifica(
        titolo: string,
        oggetto: string,
        testo: string,
        usernameAmm: string
    ) {
        const idMax = await Notifica.getIdMax();
        const not = new Notifica(
            idMax + 1,
            titolo,
            oggetto,
            testo,
            usernameAmm
        );
        not.insertDB();
        return not.send();
    }

    public static async pubblicaVulnerabilita(
        Id: number,
        cwe: number,
        titolo: string,
        usernameAmm: string
    ) {
        const vulnSegn = new VulnerabilitaSegnalata(Id, titolo, cwe);
        return vulnSegn.pubblica(usernameAmm);
    }
}
export default InterfacciaModifica;
