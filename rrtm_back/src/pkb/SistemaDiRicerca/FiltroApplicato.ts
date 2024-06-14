// src/pkb/SistemaDiRicerca/FiltroApplicato.ts
import ArticoloGDPR from "../ArticoloGDPR";
import Pattern from "../Pattern";
import Strategia from "../Strategia";
import Vulnerabilita from "../Vulnerabilita";

class FiltroApplicato {
    filtroPattern: Pattern;
    filtroStrategia: Strategia;
    filtroVulnerabilita: Vulnerabilita;
    filtroArticolo: ArticoloGDPR;
    tipoRicerca: string;

    constructor(id: number, tipoRicerca: string, nome?: string) {
        this.tipoRicerca = tipoRicerca;
        if (
            tipoRicerca === "pattern" ||
            tipoRicerca === "strategia-pattern" ||
            tipoRicerca === "vulnerabilita-pattern" ||
            tipoRicerca === "articolo-pattern"
        ) {
            this.filtroPattern = new Pattern(id);
        } else {
            this.filtroPattern = new Pattern(0);
        }
        if (
            tipoRicerca === "strategia" ||
            tipoRicerca === "pattern-strategia" ||
            tipoRicerca === "articolo-strategia"
        ) {
            this.filtroStrategia = new Strategia(id);
        } else {
            this.filtroStrategia = new Strategia(0);
        }
        if (tipoRicerca === "vulnerabilita" || "vulnerabilita-pattern") {
            this.filtroVulnerabilita = new Vulnerabilita(id);
        } else {
            this.filtroVulnerabilita = new Vulnerabilita(0);
        }
        if (tipoRicerca === "articolo" || "articolo-pattern") {
            this.filtroArticolo = new ArticoloGDPR(id);
        } else {
            this.filtroArticolo = new ArticoloGDPR(0);
        }
    }
}

export default FiltroApplicato;
