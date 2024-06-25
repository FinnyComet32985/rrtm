import InterfacciaModificaPKB from "../pkb/InterfacciaModificaPKB";

class ModificaPKB {
    private Id;
    private titolo;
    private nome;

    /* pattern */
    private sommario: string;
    private contesto: string;
    private problema: string;
    private soluzione: string;
    private esempio: string;

    /* vulnerabilita */
    private cwe: number;
    private statoVul: string;

    constructor(
        Id: number,
        titolo?: string,
        nome?: string,
        sommario?: string,
        contesto?: string,
        problema?: string,
        soluzione?: string,
        esempio?: string,
        cwe?: number,
        statoVul?: string
    ) {
        this.Id = Id;
        this.statoVul = "";
        this.titolo = "";
        this.nome = "";
        this.sommario = "";
        this.contesto = "";
        this.problema = "";
        this.soluzione = "";
        this.esempio = "";
        this.cwe = 0;
        if (titolo !== undefined) {
            this.titolo = titolo;
        }
        if (nome !== undefined) {
            this.nome = nome;
        } 
        if (sommario !== undefined) {
            this.sommario = sommario;
        } 
        if (contesto !== undefined) {
            this.contesto = contesto;
        }
        if (problema !== undefined) {
            this.problema = problema;
        }
        if (soluzione !== undefined) {
            this.soluzione = soluzione;
        }
        if (esempio !== undefined) {
            this.esempio = esempio;
        }
        if (cwe !== undefined) {
            this.cwe = cwe;
        }
        if (statoVul !== undefined) {
            this.statoVul = statoVul;
        }
    }

    /* Pattern */
    public async modifyPattern(): Promise<boolean> {
        return InterfacciaModificaPKB.updatePattern(
            this.Id,
            this.titolo,
            this.sommario,
            this.contesto,
            this.problema,
            this.soluzione,
            this.esempio
        );
    }
    public async insertPattern(): Promise<boolean> {
        return InterfacciaModificaPKB.insertPattern(
            this.titolo,
            this.sommario,
            this.contesto,
            this.problema,
            this.soluzione,
            this.esempio
        );
    }
    public async deletePattern(): Promise<boolean> {
        return InterfacciaModificaPKB.deletePattern(this.Id);
    }

    // Articolo GDPR
    public async modifyArticolo(): Promise<boolean> {
        return InterfacciaModificaPKB.updateArticolo(this.Id, this.titolo);
    }
    public async insertArticolo(): Promise<boolean> {
        return InterfacciaModificaPKB.insertArticolo(this.Id, this.titolo);
    }
    public async deleteArticolo(): Promise<boolean> {
        return InterfacciaModificaPKB.deleteArticolo(this.Id);
    }

    // Categoria OWASP
    public async modifyOWASP(): Promise<boolean> {
        return InterfacciaModificaPKB.updateOWASP(this.Id, this.nome);
    }
    public async insertOWASP(): Promise<boolean> {
        return InterfacciaModificaPKB.insertOWASP(this.nome);
    }
    public async deleteOWASP(): Promise<boolean> {
        return InterfacciaModificaPKB.deleteOWASP(this.Id);
    }

    // Fase ISO
    public async modifyISO(): Promise<boolean> {
        return InterfacciaModificaPKB.updateISO(this.Id, this.nome);
    }
    public async insertISO(): Promise<boolean> {
        return InterfacciaModificaPKB.insertISO(this.Id, this.nome);
    }
    public async deleteISO(): Promise<boolean> {
        return InterfacciaModificaPKB.deleteISO(this.Id);
    }

    // principio PbD
    public async modifyPbD(): Promise<boolean> {
        return InterfacciaModificaPKB.updatePbD(this.Id, this.nome);
    }
    public async insertPbD(): Promise<boolean> {
        return InterfacciaModificaPKB.insertPbD(this.nome);
    }
    public async deletePbD(): Promise<boolean> {
        return InterfacciaModificaPKB.deletePbD(this.Id);
    }

    // strategia
    public async modifyStrategia(): Promise<boolean> {
        return InterfacciaModificaPKB.updateStrategia(this.Id, this.nome);
    }
    public async insertStrategia(): Promise<boolean> {
        return InterfacciaModificaPKB.insertStrategia(this.nome);
    }
    public async deleteStrategia(): Promise<boolean> {
        return InterfacciaModificaPKB.deleteStrategia(this.Id);
    }

    // Vulnerabilita
    public async modifyVulnerabilita(): Promise<boolean> {
        return InterfacciaModificaPKB.updateVulnerabilita(
            this.Id,
            this.titolo,
            this.cwe,
            this.statoVul
        );
    }
    public async insertVulnerabilita(): Promise<boolean> {
        return InterfacciaModificaPKB.insertVulnerabilita(
            this.titolo,
            this.cwe,
            this.statoVul
        );
    }
    public async deleteVulnerabilita(): Promise<boolean> {
        return InterfacciaModificaPKB.deleteVulnerabilita(this.Id);
    }
}
export default ModificaPKB;
