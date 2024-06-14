import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header/Header";
import "./ArticoloPage.css";

function ArticoloPage() {
    let { articoloId } = useParams();
    const navigate = useNavigate();
    const [isPatternExpanded, setIsPatternExpanded] = useState(false);
    const [isStrategiaExpanded, setIsStrategiaExpanded] = useState(false);
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
    const handlePatternToggle = () => {
        setIsPatternExpanded(!isPatternExpanded);
    };
    const handleStrategieToggle = () => {
        setIsStrategiaExpanded(!isStrategiaExpanded);
    };
    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`);
    };
    const handleStrategiaClick = (strategiaId) => {
        navigate(`/strategiaPage/${strategiaId}`);
    };
    if (loading || loading2 || loading3) {
        return (
            <div>
                <Header></Header>
                <div>Loading...</div>;
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
                    className={`StrategieAssociateArticolo ${
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
            </div>
        </div>
    );
}

export default ArticoloPage;
