import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../../../components/Header/Header";
import "./PatternPage.css";

function PatternPage() { //NOSONAR
    let { patternId } = useParams();
    const navigate = useNavigate();
    const [strategieExpanded, setStrategieExpanded] = useState(false);
    const [vulnerabilitaExpanded, setVulnerabilitaExpanded] = useState(false);
    const [PbDExpanded, setPbDExpanded] = useState(false);
    const [ISOExpanded, setISOExpanded] = useState(false);
    const [MVCExpanded, setMVCExpanded] = useState(false);
    const [isArticoliExpanded, setIsArticoloExpanded] = useState(false);
    const [OWASPExpanded, setOWASPExpanded] = useState(false);
    const [maxHeightVuln, setMaxHeightVuln] = useState(null);

    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findPattern/${patternId}`
    );

    const handleClickStrategia = (strategiaId) => {
        navigate(`/StrategiaPage/${strategiaId}`); // Passa l'ID come parte dell'URL
    };
    const handleClickVulnerabilita = (vulnerabilitaId) => {
        navigate(`/VulnerabilitaPage/${vulnerabilitaId}`); // Passa l'ID come parte dell'URL
    };
    const handleClickPbD = (PbDId) => {
        navigate(`/PbDPage/${PbDId}`); // Passa l'ID come parte dell'URL
    };
    const handleClickISO = (ISOId) => {
        navigate(`/ISOPage/${ISOId}`); // Passa l'ID come parte dell'URL
    };
    const handleClickMVC = (MVCId) => {
        navigate(`/MVCPage/${MVCId}`); // Passa l'ID come parte dell'URL
    };
    const handleArticoloClick = (articoloId) => {
        navigate(`/articoloPage/${articoloId}`);
    };
    const handleClickOWASP = (OWASPId) => {
        navigate(`/OWASPPage/${OWASPId}`); // Passa l'ID come parte dell'URL
    };
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findStratPatt/${patternId}`);
    const {
        data: data3,
        loading: loading3,
        error: error3,
    } = useFetch(`http://localhost:1337/api/findVulnPatt/${patternId}`);
    const {
        data: data4,
        loading: loading4,
        error: error4,
    } = useFetch(`http://localhost:1337/api/findPbDPatt/${patternId}`);
    const {
        data: data5,
        loading: loading5,
        error: error5,
    } = useFetch(`http://localhost:1337/api/findISOPatt/${patternId}`);
    const {
        data: data6,
        loading: loading6,
        error: error6,
    } = useFetch(`http://localhost:1337/api/findMVCPatt/${patternId}`);
    const {
        data: data7,
        loading: loading7,
        error: error7,
    } = useFetch(`http://localhost:1337/api/findArtPatt/${patternId}`);
    const {
        data: data8,
        loading: loading8,
        error: error8,
    } = useFetch(`http://localhost:1337/api/findOWASPPatt/${patternId}`);
    const initialMount = useRef(true);

    useEffect(() => {
        // Calcolo dell'altezza massima per le vulnerabilità solo alla prima apertura
        if (vulnerabilitaExpanded && data3 && initialMount.current) {
            const maxHeightCalcVuln = `${data3.length * 14.52 + 7.6}vh`;
            setMaxHeightVuln(maxHeightCalcVuln);
            initialMount.current = false; // Imposta il primo montaggio a false dopo il calcolo iniziale
        }
    }, [vulnerabilitaExpanded, data3]);

    const handleToggleStrategie = () => {
        setStrategieExpanded(!strategieExpanded);
    };

    const handleToggleVulnerabilita = () => {
        setVulnerabilitaExpanded(!vulnerabilitaExpanded);
    };

    const handleTogglePbD = () => {
        setPbDExpanded(!PbDExpanded);
    };

    const handleToggleISO = () => {
        setISOExpanded(!ISOExpanded);
    };
    const handleToggleMVC = () => {
        setMVCExpanded(!MVCExpanded);
    };
    const handleArticoliToggle = () => {
        setIsArticoloExpanded(!isArticoliExpanded);
    };
    const handleToggleOWASP = () => {
        setOWASPExpanded(!OWASPExpanded);
    };
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
        return <div>Error7: {error7.message}</div>;
    }
    return (
        <div className="PatternPage">
            <Header />
            <div className="container">
                {data && (
                    <div className="pattern">
                        <div className="titoloPattern">
                            <h3 key={data.Id}>{data.titolo}</h3>
                        </div>
                        <div className="PatternDivs">
                            <h3>sommario:</h3>
                            <p key={data.Id}>{data.sommario}</p>
                        </div>
                        <div className="PatternDivs">
                            <h3>contesto:</h3>
                            <p key={data.Id}>{data.contesto}</p>
                        </div>
                        <div className="PatternDivs">
                            <h3>problema:</h3>
                            <p key={data.Id}>{data.problema}</p>
                        </div>
                        <div className="PatternDivs">
                            <h3>soluzione:</h3>
                            <p key={data.Id}>{data.soluzione}</p>
                        </div>
                        <div className="PatternDivs">
                            <h3>esempio:</h3>
                            <p key={data.Id}>{data.esempio}</p>
                        </div>
                    </div>
                )}

                {/* Strategie Associate */}
                {data2.length !== 0  && <div
                    className={`StrategieAssociate ${
                        strategieExpanded ? "open" : "closed"
                    }`}
                    onClick={handleToggleStrategie}
                >
                    <h3>strategie Associate</h3>
                    <div className="stratAssocMap">
                        {data2 &&
                            data2.map((strategia) => (
                                <div
                                    className="strategie-details"
                                    key={strategia.Id}
                                    onClick={() =>
                                        handleClickStrategia(strategia.Id)
                                    }
                                >
                                    <h4>{strategia.nome}</h4>
                                </div>
                            ))}
                    </div>
                </div>}

                {/* Vulnerabilità Associate */}
                {data3.length !== 0  && <div
                    className={`VulnerabilitaAssociate ${
                        vulnerabilitaExpanded ? "open" : "closed"
                    }`}
                    style={{ "--max-height-vuln": maxHeightVuln }}
                    onClick={handleToggleVulnerabilita}
                >
                    <h3>vulnerabilità Associate</h3>
                    {data3 &&
                        data3.map((vulnerabilita) => (
                            <div
                                className="vulnerabilita-details"
                                key={vulnerabilita.Id}
                                onClick={() =>
                                    handleClickVulnerabilita(vulnerabilita.Id)
                                }
                            >
                                <h4>{vulnerabilita.titolo}</h4>
                                <p>CWE: {vulnerabilita.cwe}</p>
                            </div>
                        ))}
                </div>}
                {/* PbD Associate */}
                {data4.length !== 0 && <div
                    className={`PbDAssociati ${
                        PbDExpanded ? "open" : "closed"
                    }`}
                    onClick={handleTogglePbD}
                >
                    <h3>Principi PbD Associati</h3>
                    <div className="PbDAssocMap">
                        {data4 &&
                            data4.map((PbD) => (
                                <div
                                    className="PbD-details"
                                    key={PbD.Id}
                                    onClick={() => handleClickPbD(PbD.Id)}
                                >
                                    <h4>{PbD.nome}</h4>
                                </div>
                            ))}
                    </div>
                </div>}
                {/* MVC Associati */}
                {data5.length !== 0  && <div
                    className={`MVCAssociati ${
                        MVCExpanded ? "open" : "closed"
                    }`}
                    onClick={handleToggleMVC}
                >
                    <h3>MVC Associati</h3>
                    <div className="MVCAssocMap">
                        {data6 &&
                            data6.map((MVC) => (
                                <div
                                    className="MVC-details"
                                    key={MVC.Id}
                                    onClick={() => handleClickMVC(MVC.Id)}
                                >
                                    <h4>{MVC.nome}</h4>
                                </div>
                            ))}
                    </div>
                </div>}
                {/* ISO Associate */}
                {data6.length !== 0  && <div
                    className={`ISOAssociati ${
                        ISOExpanded ? "open" : "closed"
                    }`}
                    onClick={handleToggleISO}
                >
                    <h3>Fasi ISO Associate</h3>
                    <div className="ISOAssocMap">
                        {data5 &&
                            data5.map((ISO) => (
                                <div
                                    className="ISO-details"
                                    key={ISO.Id}
                                    onClick={() => handleClickISO(ISO.Id)}
                                >
                                    <div>
                                        <h4>{ISO.Id}</h4>
                                        <h4>{ISO.nome}</h4>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>}
                {/* Articoli Associati */}
                {data7.length !== 0  && <div
                    className={`ArticoliAssociati ${
                        isArticoliExpanded ? "open" : "closed"
                    }`}
                    onClick={handleArticoliToggle}
                >
                    <h3>Articoli Associati</h3>
                    <div className="articoli-details">
                        {data7 &&
                            data7.map((articolo) => (
                                <div
                                    key={articolo.Id}
                                    onClick={() =>
                                        handleArticoloClick(articolo.Id)
                                    }
                                >
                                    <h4>{articolo.titolo}</h4>
                                    <p>Articolo N°: {articolo.Id}</p>
                                </div>
                            ))}
                    </div>
                </div>}
                {/* OWASP Associate */}
                {data8.length !== 0  && <div
                    className={`OWASPAssociate ${
                        OWASPExpanded ? "open" : "closed"
                    }`}
                    onClick={handleToggleOWASP}
                >
                    <h3>Categorie OWASP Associate</h3>
                    <div className="OWASPAssocMap">
                        {data8 &&
                            data8.map((OWASP) => (
                                <div
                                    className="OWASP-details"
                                    key={OWASP.Id}
                                    onClick={() => handleClickOWASP(OWASP.Id)}
                                >
                                    <h4>{OWASP.nome}</h4>
                                </div>
                            ))}
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default PatternPage;
