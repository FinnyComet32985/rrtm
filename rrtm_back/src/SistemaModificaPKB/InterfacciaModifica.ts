import ModificaPKB from "./ModificaPKB";

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
    public static async inserisciOWASP(Id: number, nome?: string) {
        let modificaPKB = new ModificaPKB(Id, "", nome);
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
    public static async inserisciPbD(Id: number, nome?: string) {
        let modificaPKB = new ModificaPKB(Id, "", nome);
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
    public static async inserisciStrategia(Id: number, nome?: string) {
        let modificaPKB = new ModificaPKB(Id, "", nome);
        return modificaPKB.insertStrategia();
    }
    public static async eliminaStrategia(Id: number) {
        let modificaPKB = new ModificaPKB(Id);
        return modificaPKB.deleteStrategia();
    }
}
export default InterfacciaModifica;
