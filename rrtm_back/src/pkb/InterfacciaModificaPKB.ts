import Pattern from "../pkb/Pattern";
import ArticoloGDPR from "../pkb/ArticoloGDPR";
import CategoriaOWASP from "../pkb/CategoriaOWASP";
import CollocazioneMVC from "../pkb/CollocazioneMVC";
import FaseISO from "../pkb/FaseISO";
import PrincipioPbD from "../pkb/PrincipioPbD";
import Strategia from "../pkb/Strategia";
import Vulnerabilita from "../pkb/Vulnerabilita";

class InterfacciaModificaPKB {
    // pattern
    public static async updatePattern(
        Id: number,
        titolo: string,
        sommario: string,
        contesto: string,
        problema: string,
        soluzione: string,
        esempio: string
    ): Promise<boolean> {
        const pattModificato = new Pattern(
            Id,
            titolo,
            sommario,
            contesto,
            problema,
            soluzione,
            esempio
        );
        return pattModificato.updatePatternDB();
    }
    public static async insertPattern(
        titolo: string,
        sommario: string,
        contesto: string,
        problema: string,
        soluzione: string,
        esempio: string
    ): Promise<boolean> {
        const pattInserito = new Pattern(
            (await Pattern.getIdMax()) + 1,
            titolo,
            sommario,
            contesto,
            problema,
            soluzione,
            esempio
        );
        return pattInserito.insertPatternDB();
    }
    public static async deletePattern(Id: number): Promise<boolean> {
        const pattEliminato = new Pattern(Id);
        return pattEliminato.deletePatternDB();
    }
    // articolo GDPR
    public static async updateArticolo(
        Id: number,
        titolo: string
    ): Promise<boolean> {
        const artModificato = new ArticoloGDPR(Id, titolo);
        return artModificato.updateArticoloDB();
    }
    public static async insertArticolo(
        Id: number,
        titolo: string
    ): Promise<boolean> {
        const artInserito = new ArticoloGDPR(Id, titolo);
        return artInserito.insertArticoloDB();
    }
    public static async deleteArticolo(Id: number): Promise<boolean> {
        const artEliminato = new ArticoloGDPR(Id);
        return artEliminato.deleteArticoloDB();
    }
    // Categoria OWASP
    public static async updateOWASP(
        Id: number,
        nome: string
    ): Promise<boolean> {
        const owaspModificato = new CategoriaOWASP(Id, nome);
        return owaspModificato.updateOWASPDB();
    }
    public static async insertOWASP(nome: string): Promise<boolean> {
        const owaspInserito = new CategoriaOWASP(
            (await CategoriaOWASP.getIdMax()) + 1,
            nome
        );
        return owaspInserito.insertOWASPDB();
    }
    public static async deleteOWASP(Id: number): Promise<boolean> {
        const owaspEliminato = new CategoriaOWASP(Id);
        return owaspEliminato.deleteOWASPDB();
    }
    // Fase ISO
    public static async updateISO(Id: number, nome: string): Promise<boolean> {
        const isoModificato = new FaseISO(Id, nome);
        return isoModificato.updateISODB();
    }
    public static async insertISO(Id: number, nome: string): Promise<boolean> {
        const isoInserito = new FaseISO(Id, nome);
        return isoInserito.insertISODB();
    }
    public static async deleteISO(Id: number): Promise<boolean> {
        const isoEliminato = new FaseISO(Id);
        return isoEliminato.deleteISODB();
    }
    // principio PbD
    public static async updatePbD(Id: number, nome: string): Promise<boolean> {
        const Modificato = new PrincipioPbD(Id, nome);
        return Modificato.updatePbDDB();
    }
    public static async insertPbD(nome: string): Promise<boolean> {
        const Inserito = new PrincipioPbD(
            (await PrincipioPbD.getIdMax()) + 1,
            nome
        );
        return Inserito.insertPbDDB();
    }
    public static async deletePbD(Id: number): Promise<boolean> {
        const Eliminato = new PrincipioPbD(Id);
        return Eliminato.deletePbDDB();
    }
    // Strategia
    public static async updateStrategia(
        Id: number,
        nome: string
    ): Promise<boolean> {
        const Modificato = new Strategia(Id, nome);
        return Modificato.updateStrategiaDB();
    }
    public static async insertStrategia(nome: string): Promise<boolean> {
        const Inserito = new Strategia((await Strategia.getIdMax()) + 1, nome);
        return Inserito.insertStrategiaDB();
    }
    public static async deleteStrategia(Id: number): Promise<boolean> {
        const Eliminato = new Strategia(Id);
        return Eliminato.deleteStrategiaDB();
    }
    // Vulnerabilita
    public static async updateVulnerabilita(
        Id: number,
        titolo: string,
        cwe: number,
        statoVul: string
    ): Promise<boolean> {
        const Modificato = new Vulnerabilita(Id, titolo, statoVul, cwe);
        return Modificato.updateVulnerabilitaDB();
    }
    public static async insertVulnerabilita(
        titolo: string,
        cwe: number,
        statoVul: string
    ): Promise<boolean> {
        const Inserito = new Vulnerabilita(
            (await Vulnerabilita.getIdMax()) + 1,
            titolo,
            statoVul,
            cwe
        );
        return Inserito.insertVulnerabilitaDB();
    }
    public static async deleteVulnerabilita(Id: number): Promise<boolean> {
        const artEliminato = new Vulnerabilita(Id);
        return artEliminato.deleteVulnerabilitaDB();
    }
}
export default InterfacciaModificaPKB;
