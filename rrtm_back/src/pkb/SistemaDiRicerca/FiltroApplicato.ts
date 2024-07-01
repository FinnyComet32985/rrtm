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
        const nomePattern = tipoRicerca.includes("nomePattern") ? nome : "";
        const nomeStrategia = tipoRicerca.includes("nomeStrategia") ? nome : "";
        const nomeVulnerabilita = tipoRicerca.includes("nomeVulnerabilita")
            ? nome
            : "";
        const nomeArticolo = tipoRicerca.includes("nomeArticolo") ? nome : "";
        const nomePbD = tipoRicerca.includes("nomePbD") ? nome : "";
        const nomeMVC = tipoRicerca.includes("nomeMVC") ? nome : "";
        const nomeISO = tipoRicerca.includes("nomeISO") ? nome : "";
        const nomeOWASP = tipoRicerca.includes("nomeOWASP") ? nome : "";

        this.filtroPattern = new Pattern(patternId, nomePattern);
        this.filtroStrategia = new Strategia(strategiaId, nomeStrategia);
        this.filtroVulnerabilita = new Vulnerabilita(
            vulnerabilitaId,
            nomeVulnerabilita
        );
        this.filtroArticolo = new ArticoloGDPR(articoloId, nomeArticolo);
        this.filtroPbD = new PrincipioPbD(PbDId, nomePbD);
        this.filtroMVC = new CollocazioneMVC(MVCId, nomeMVC);
        this.filtroISO = new FaseISO(ISOId, nomeISO);
        this.filtroOWASP = new CategoriaOWASP(OWASPId, nomeOWASP);
    }
}

export default FiltroApplicato;
