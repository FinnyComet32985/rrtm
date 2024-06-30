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
        const patternId = tipoRicerca.endsWith("pattern") ? id : 0;
        const strategiaId = tipoRicerca.endsWith("strategia") ? id : 0;
        const vulnerabilitaId = tipoRicerca.endsWith("vulnerabilita") ? id : 0;
        const articoloId = tipoRicerca.endsWith("articolo") ? id : 0;
        const PbDId = tipoRicerca.endsWith("PbD") ? id : 0;
        const MVCId = tipoRicerca.endsWith("MVC") ? id : 0;
        const ISOId = tipoRicerca.endsWith("ISO") ? id : 0;
        const OWASPId = tipoRicerca.endsWith("OWASP") ? id : 0;

        this.filtroPattern = new Pattern(id);
        this.filtroStrategia = new Strategia(id);
        this.filtroVulnerabilita = new Vulnerabilita(id);
        this.filtroArticolo = new ArticoloGDPR(id);
        this.filtroPbD = new PrincipioPbD(id);
        this.filtroMVC = new CollocazioneMVC(id);
        this.filtroISO = new FaseISO(id);
        this.filtroOWASP = new CategoriaOWASP(id);
    }
}

export default FiltroApplicato;
