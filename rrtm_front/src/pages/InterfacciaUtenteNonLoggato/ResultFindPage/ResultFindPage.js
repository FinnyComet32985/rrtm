import Header from "../../../components/Header/Header";
import useFetch from "../../../hooks/useFetch";
import "./ResultFindPage.css";
import { useParams } from "react-router-dom";
import Pattern from "../../../components/Pattern/Pattern";
import Strategia from "../../../components/Strategia/Strategia";
import Vulnerabilita from "../../../components/Vulnerabilita/Vulnerabilita";
import Articolo from "../../../components/Articolo/Articolo";
import PbD from "../../../components/PbD/PbD";
import MVC from "../../../components/MVC/MVC";
import ISO from "../../../components/ISO/ISO";
import OWASP from "../../../components/OWASP/OWASP";

function ResultFindPage() {
    let { name } = useParams();

    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findPatternFromName/${name}`
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findStrategiaFromName/${name}`);
    const {
        data: data3,
        loading: loading3,
        error: error3,
    } = useFetch(`http://localhost:1337/api/findVulnerabilitaFromName/${name}`);
    const {
        data: data4,
        loading: loading4,
        error: error4,
    } = useFetch(`http://localhost:1337/api/findArticoloFromName/${name}`);
    const {
        data: data5,
        loading: loading5,
        error: error5,
    } = useFetch(`http://localhost:1337/api/findPbDFromName/${name}`);
    const {
        data: data6,
        loading: loading6,
        error: error6,
    } = useFetch(`http://localhost:1337/api/findMVCFromName/${name}`);
    const {
        data: data7,
        loading: loading7,
        error: error7,
    } = useFetch(`http://localhost:1337/api/findISOFromName/${name}`);
    const {
        data: data8,
        loading: loading8,
        error: error8,
    } = useFetch(`http://localhost:1337/api/findOWASPFromName/${name}`);

    if (
        loading ||
        loading2 ||
        loading3 ||
        loading4 ||
        loading5 ||
        loading6 ||
        loading7 ||
        loading8
    ) {
        return (
            <div>
                <Header></Header>
                <div className="spinner">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                </div>
            </div>
        );
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (error2) {
        return <div>Error2: {error2.message}</div>;
    }
    if (error3) {
        return <div>Error3: {error3.message}</div>;
    }
    if (error4) {
        return <div>Error4: {error4.message}</div>;
    }
    if (error5) {
        return <div>Error5: {error5.message}</div>;
    }
    if (error6) {
        return <div>Error6: {error6.message}</div>;
    }
    if (error7) {
        return <div>Error7: {error7.message}</div>;
    }
    if (error8) {
        return <div>Error8: {error8.message}</div>;
    }

    return (
        <div>
            <Header />
            <div className="containerFind">
                {/* Pattern */}
                <div className="trendingDivPatt">
                    <h1 className="AllPatternTitle">Pattern</h1>
                    {data &&
                        data.map((pattern) => (
                            <Pattern
                                key={pattern.Id}
                                id={pattern.Id}
                                titolo={pattern.titolo}
                                sommario={pattern.sommario}
                            />
                        ))}
                    {!data && <h3 style={{"color": "white"}}>Nessun pattern trovato</h3>}
                </div>
                {/* Strategie */}
                <div className="trendingDivStrat">
                    <h1 className="AllStrategieTitle">Strategie</h1>
                    {data2 &&
                        data2.map((strategia) => (
                            <Strategia
                                key={strategia.Id}
                                id={strategia.Id}
                                nome={strategia.nome}
                            />
                        ))}
                    {!data2 && <h3 style={{"color": "white"}}>Nessuna strategia trovata</h3>}
                </div>
                {/* Vulnerabilita */}
                <div className="trendingDivVuln">
                    <h1 className="AllVulnerabilitaTitle">Vulnerabilita</h1>
                    {data3 &&
                        data3.map((vulnerabilita) => (
                            <Vulnerabilita
                            key={vulnerabilita.Id}
                            id={vulnerabilita.Id}
                            titolo={vulnerabilita.titolo}
                            cwe={vulnerabilita.cwe}
                            /> 
                        ))}
                    {!data3 && <h3 style={{"color": "white"}}>Nessuna vulnerabilita trovata</h3>}
                </div>
                {/* Articoli */}
                <div className="trendingDivArt">
                    <h1 className="AllArticoliTitle">Articoli</h1>
                    {data4 &&
                        data4.map((articolo) => (
                            <Articolo
                                key={articolo.Id}
                                id={articolo.Id}
                                titolo={articolo.titolo}
                            />
                        ))}
                    {!data4 && <h3 style={{"color": "white"}}>Nessun articolo trovato</h3>}
                </div>
                {/* PbD */}
                <div className="trendingDivPbD">
                    <h1 className="AllPbDTitle">PbD</h1>
                    {data5 &&
                        data5.map((pbd) => (
                            <PbD
                                key={pbd.Id}
                                id={pbd.Id}
                                nome={pbd.nome}
                            />
                        ))}
                    {!data5 && <h3 style={{"color": "white"}}>Nessuna PbD trovata</h3>}
                </div>
                {/* MVC */}
                <div className="trendingDivMVC">
                    <h1 className="AllMVCTitle">MVC</h1>
                    {data6 &&
                        data6.map((mvc) => (
                            <MVC
                            key={mvc.Id}
                            id={mvc.Id}
                            nome={mvc.nome}
                        />
                        ))}
                    {!data6 && <h3 style={{"color": "white"}}>Nessuna MVC trovata</h3>}
                </div>
                {/* ISO */}
                <div className="trendingDivISO">
                    <h1 className="AllISOTitle">ISO</h1>
                    {data7 &&
                        data7.map((iso) => (
                            <ISO
                                key={iso.Id}
                                id={iso.Id}
                                nome={iso.nome}
                            />
                        ))}
                    {!data7 && <h3 style={{"color": "white"}}>Nessuna MVC trovata</h3>}
                </div>
                {/* OWASP */}
                <div className="trendingDivOWASP">
                    <h1 className="AllISOTitle">OWASP</h1>
                    {data8 &&
                        data8.map((owasp) => (
                            <OWASP
                                key={owasp.Id}
                                id={owasp.Id}
                                nome={owasp.nome}
                            />
                        ))}
                    {!data8 && <h3 style={{"color": "white"}}>Nessuna OWASP trovata</h3>}
                </div>
            </div>
        </div>
    );
}
export default ResultFindPage;
