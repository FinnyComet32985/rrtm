import useFetch from "../../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../../components/Header/Header";
import "./ArticoloPage.css";

function ArticoloPage() {
    let { articoloId } = useParams();
    const navigate = useNavigate();
    const [isPatternExpanded, setIsPatternExpanded] = useState(false);
    const [isStrategiaExpanded, setIsStrategiaExpanded] = useState(false);
    const [isVulnerabilitaExpanded, setIsVulnerabilitaExpanded] =
        useState(false);
    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findArticolo/${articoloId}`
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findPattArt/${articoloId}`);
    const {
        data: data3,
        loading: loading3,
        error: error3,
    } = useFetch(`http://localhost:1337/api/findStratArt/${articoloId}`);
    const {
        data: data4,
        loading: loading4,
        error: error4,
    } = useFetch(`http://localhost:1337/api/findVulnArt/${articoloId}`);

    const handlePatternToggle = () => {
        setIsPatternExpanded(!isPatternExpanded);
    };
    const handleStrategieToggle = () => {
        setIsStrategiaExpanded(!isStrategiaExpanded);
    };
    const handleVulnerabilitaToggle = () => {
        setIsVulnerabilitaExpanded(!isVulnerabilitaExpanded);
    };
    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`);
    };
    const handleStrategiaClick = (strategiaId) => {
        navigate(`/strategiaPage/${strategiaId}`);
    };
    const handleVulnerabilitaClick = (vulnerabilitaId) => {
        navigate(`/vulnerabilitaPage/${vulnerabilitaId}`);
    };
    if (loading || loading2 || loading3 || loading4) {
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
    return (
        <div>
            <Header></Header>
            <div className="container">
                {data && (
                    <div className="articolo">
                        <div className="titoloArticolo">
                            <h3 key={data.Id}>{data.titolo}</h3>
                        </div>
                        <div className="articoloDiv">
                            <h3>Articolo n°: {data.Id}</h3>
                        </div>
                    </div>
                )}
                {data2.lenght !== 0 && <div
                    className={`PatternAssociati ${
                        isPatternExpanded ? "open" : "closed"
                    }`}
                    onClick={handlePatternToggle}
                >
                    <h3>Pattern Associati</h3>
                    <div className="pattern-details">
                        {data2 &&
                            data2.map((pattern) => (
                                <div
                                    key={pattern.Id}
                                    onClick={() =>
                                        handlePatternClick(pattern.Id)
                                    }
                                >
                                    <h4>{pattern.titolo}</h4>
                                    <p>{pattern.sommario}</p>
                                </div>
                            ))}
                    </div>
                </div>}
                {/* Strategie Associate */}
                {data3.lenght !== 0 && <div
                    className={`StrategieAssociate ${
                        isStrategiaExpanded ? "open" : "closed"
                    }`}
                    onClick={handleStrategieToggle}
                >
                    <h3>strategie Associate</h3>
                    <div className="stratAssocMap">
                        {data3 &&
                            data3.map((strategia) => (
                                <div
                                    className="strategie-details"
                                    key={strategia.Id}
                                    onClick={() =>
                                        handleStrategiaClick(strategia.Id)
                                    }
                                >
                                    <h4>{strategia.nome}</h4>
                                </div>
                            ))}
                    </div>
                </div>}
                {/* vulnerabilita associate*/}
                {data4.lenght !== 0 && <div
                    className={`VulnerabilitaAssociate ${
                        isVulnerabilitaExpanded ? "open" : "closed"
                    }`}
                    onClick={handleVulnerabilitaToggle}
                >
                    <h3>vulnerabilità Associate</h3>
                    {data4 &&
                        data4.map((vulnerabilita) => (
                            <div
                                className="vulnerabilita-details"
                                key={vulnerabilita.Id}
                                onClick={() =>
                                    handleVulnerabilitaClick(vulnerabilita.Id)
                                }
                            >
                                <h4>{vulnerabilita.titolo}</h4>
                                <p>CWE: {vulnerabilita.cwe}</p>
                            </div>
                        ))}
                </div>}
            </div>
        </div>
    );
}

export default ArticoloPage;
