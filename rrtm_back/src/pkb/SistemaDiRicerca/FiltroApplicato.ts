// src/pkb/SistemaDiRicerca/FiltroApplicato.ts
import ArticoloGDPR from "../ArticoloGDPR";
import Pattern from "../Pattern";
import Strategia from "../Strategia";
import Vulnerabilita from "../Vulnerabilita";
import PrincipioPbD from "../PrincipioPbD";
import CollocazioneMVC from "../CollocazioneMVC";
import FaseISO from "../FaseISO";
import CategoriaOWASP from "../CategoriaOWASP";

class FiltroApplicato {
    filtroPattern: Pattern;
    filtroStrategia: Strategia;
    filtroVulnerabilita: Vulnerabilita;
    filtroArticolo: ArticoloGDPR;
    filtroPbD: PrincipioPbD;
    filtroMVC: CollocazioneMVC;
    filtroISO: FaseISO;
    filtroOWASP: CategoriaOWASP;
    tipoRicerca: string;

    constructor(id: number, tipoRicerca: string, nome?: string) {
        this.tipoRicerca = tipoRicerca;
        
        this.filtroPattern = this.createFiltro(tipoRicerca, id, [
            "pattern", "strategia-pattern", "vulnerabilita-pattern", 
            "articolo-pattern", "PbD-pattern", "MVC-pattern", 
            "ISO-pattern", "OWASP-pattern"
        ], Pattern);
        
        this.filtroStrategia = this.createFiltro(tipoRicerca, id, [
            "strategia", "pattern-strategia", "articolo-strategia", 
            "PbD-strategia"
        ], Strategia);
        
        this.filtroVulnerabilita = this.createFiltro(tipoRicerca, id, [
            "vulnerabilita", "pattern-vulnerabilita", "articolo-vulnerabilita"
        ], Vulnerabilita);
        
        this.filtroArticolo = this.createFiltro(tipoRicerca, id, [
            "articolo", "pattern-articolo", "strategia-articolo", 
            "vulnerabilita-articolo"
        ], ArticoloGDPR);
        
        this.filtroPbD = this.createFiltro(tipoRicerca, id, [
            "PbD", "pattern-PbD", "strategia-PbD", "ISO-PbD"
        ], PrincipioPbD);
        
        this.filtroMVC = this.createFiltro(tipoRicerca, id, [
            "MVC", "pattern-MVC", "ISO-MVC"
        ], CollocazioneMVC);
        
        this.filtroISO = this.createFiltro(tipoRicerca, id, [
            "ISO", "pattern-ISO", "MVC-ISO", "PbD-ISO"
        ], FaseISO);
        
        this.filtroOWASP = this.createFiltro(tipoRicerca, id, [
            "OWASP", "pattern-OWASP"
        ], CategoriaOWASP);
    }
    
    private createFiltro<T>(tipoRicerca: string, id: number, validTypes: string[], FiltroClass: new (id: number) => T): T {
        return validTypes.includes(tipoRicerca) ? new FiltroClass(id) : new FiltroClass(0);
    }
}

export default FiltroApplicato;
