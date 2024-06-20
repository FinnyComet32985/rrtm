import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header/Header";
import "./PbDPage.css";

function PbDPage() {
    let { PbDId } = useParams();
    const navigate = useNavigate();
    const [isPatternExpanded, setIsPatternExpanded] = useState(false);
    const [isStrategiaExpanded, setIsStrategiaExpanded] = useState(false);
    const [isISOExpanded, setIsISOExpanded] = useState(false);
    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findPbD/${PbDId}`
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findPattPbD/${PbDId}`);
    const {
        data: data3,
        loading: loading3,
        error: error3,
    } = useFetch(`http://localhost:1337/api/findStratPbD/${PbDId}`);

    const {
        data: data4,
        loading: loading4,
        error: error4,
    } = useFetch(`http://localhost:1337/api/findISOPbD/${PbDId}`);

    const handlePatternToggle = () => {
        setIsPatternExpanded(!isPatternExpanded);
    };
    const handleStrategieToggle = () => {
        setIsStrategiaExpanded(!isStrategiaExpanded);
    };
    const handleISOToggle = () => {
        setIsISOExpanded(!isISOExpanded);
    };

    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`)
    }
    const handleStrategiaClick = (strategiaId) => {
        navigate(`/StrategiaPage/${strategiaId}`)
    }
    const handleISOClick = (ISOId) => {
        navigate(`/ISOPage/${ISOId}`)
    }
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
                <div className="PbD">{data && <h3>{data.nome}</h3>}</div>
                <div
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
                </div>
                {/* Strategie Associate */}
                <div
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
                                >
                                    <h4
                                        onClick={() =>
                                            handleStrategiaClick(strategia.Id)
                                        }
                                    >
                                        {strategia.nome}
                                    </h4>
                                </div>
                            ))}
                    </div>
                </div>
                {/* ISO */}
                <div
                    className={`ISOAssociate ${
                        isISOExpanded ? "open" : "closed"
                    }`}
                    onClick={handleISOToggle}
                >
                    <h3>Fasi ISO Associate</h3>
                    <div className="ISO-details">
                        {data4 &&
                            data4.map((iso) => (
                                <div
                                    key={iso.Id}
                                    onClick={() =>
                                        handleISOClick(iso.Id)
                                    }
                                >
                                    <h4>{iso.Id}</h4>
                                    <h4>{iso.nome}</h4>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PbDPage;