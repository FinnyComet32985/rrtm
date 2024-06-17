// src/pkb/SistemaDiRicerca/FiltroApplicato.ts
import ArticoloGDPR from "../ArticoloGDPR";
import Pattern from "../Pattern";
import Strategia from "../Strategia";
import Vulnerabilita from "../Vulnerabilita";
import PrincipioPbD from "../PrincipioPbD";

class FiltroApplicato {
    filtroPattern: Pattern;
    filtroStrategia: Strategia;
    filtroVulnerabilita: Vulnerabilita;
    filtroArticolo: ArticoloGDPR;
    filtroPbD: PrincipioPbD;
    tipoRicerca: string;

    constructor(id: number, tipoRicerca: string, nome?: string) {
        this.tipoRicerca = tipoRicerca;
        if (
            tipoRicerca === "pattern" ||
            tipoRicerca === "strategia-pattern" ||
            tipoRicerca === "vulnerabilita-pattern" ||
            tipoRicerca === "articolo-pattern" ||
            tipoRicerca === "PbD-pattern"
        ) {
            this.filtroPattern = new Pattern(id);
        } else {
            this.filtroPattern = new Pattern(0);
        }
        if (
            tipoRicerca === "strategia" ||
            tipoRicerca === "pattern-strategia" ||
            tipoRicerca === "articolo-strategia" ||
            tipoRicerca === "PbD-strategia"
        ) {
            this.filtroStrategia = new Strategia(id);
        } else {
            this.filtroStrategia = new Strategia(0);
        }
        if (
            tipoRicerca === "vulnerabilita" ||
            tipoRicerca === "pattern-vulnerabilita" ||
            tipoRicerca === "articolo-vulnerabilita"
        ) {
            this.filtroVulnerabilita = new Vulnerabilita(id);
        } else {
            this.filtroVulnerabilita = new Vulnerabilita(0);
        }
        if (
            tipoRicerca === "articolo" ||
            tipoRicerca === "pattern-articolo" ||
            tipoRicerca === "strategia-articolo" ||
            tipoRicerca === "vulnerabilita-articolo"
        ) {
            this.filtroArticolo = new ArticoloGDPR(id);
        } else {
            this.filtroArticolo = new ArticoloGDPR(0);
        }
        if (
            tipoRicerca === "PbD" ||
            tipoRicerca === "pattern-PbD" ||
            tipoRicerca === "strategia-PbD"
        ) {
            this.filtroPbD = new PrincipioPbD(id);
        } else {
            this.filtroPbD = new PrincipioPbD(0);
        }
    }
}

export default FiltroApplicato;
