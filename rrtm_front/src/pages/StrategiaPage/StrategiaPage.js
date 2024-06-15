import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./StrategiaPage.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";

function StrategiaPage() {
    let { strategiaId } = useParams();
    const [isPatternExpanded, setIsPatternExpanded] = useState(false);
    const [isArticoliExpanded, setIsArticoloExpanded] = useState(false);

    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findStrategia/${strategiaId}`
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findPattStrat/${strategiaId}`);
    const { data: data3, loading: loading3, error: error3 } = useFetch(
        `http://localhost:1337/api/findArtStrat/${strategiaId}`
    );


    const navigate = useNavigate();

    const handlePatternToggle = () => {
        setIsPatternExpanded(!isPatternExpanded);
    };
    const handleArticoliToggle = () => {
        setIsArticoloExpanded(!isArticoliExpanded);
    };
    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`)
    }
    const handleArticoloClick = (articoloId) => {
        navigate(`/articoloPage/${articoloId}`)
    }
    if (loading || loading2 || loading3) {
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
        return <div>Error3: {error3.message}</div>
    }
    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="Strategia">{data && <h3>{data.nome}</h3>}</div>
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
                                <div key={pattern.Id} onClick={() => handlePatternClick(pattern.Id)}>
                                    <h4>{pattern.titolo}</h4>
                                    <p>{pattern.sommario}</p>
                                </div>
                            ))}
                    </div>
                </div>
                <div
                    className={`ArticoliAssociati ${
                        isArticoliExpanded ? "open" : "closed"
                    }`}
                    onClick={handleArticoliToggle}
                >
                    <h3>Articoli Associati</h3>
                    <div className="articoli-details">
                        {data3 &&
                            data3.map((articolo) => (
                                <div key={articolo.Id} onClick={() => handleArticoloClick(articolo.Id)}>
                                    <h4>{articolo.titolo}</h4>
                                    <p>Articolo N°: {articolo.Id}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StrategiaPage;
