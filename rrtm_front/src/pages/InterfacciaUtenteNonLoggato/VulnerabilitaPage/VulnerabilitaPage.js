import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./VulnerabilitaPage.css";

function VulnerabilitaPage() {
    let { vulnerabilitaId } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isArticoliExpanded, setIsArticoloExpanded] = useState(false);
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findVulnerabilita/${vulnerabilitaId}`
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findPattVuln/${vulnerabilitaId}`);
    const {
        data: data3,
        loading: loading3,
        error: error3,
    } = useFetch(`http://localhost:1337/api/findArtVuln/${vulnerabilitaId}`);
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const handleArticoliToggle = () => {
        setIsArticoloExpanded(!isArticoliExpanded);
    };
    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`);
    };
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
        return <div>Error2: {error2.message}</div>;
    }
    return (
        <div>
            <Header />
            <div className="container">
                <div className="Vulnerabilita">
                    {data && <h3>{data.titolo}</h3>}
                </div>
                {/* Articoli Associati */}
                <div
                    className={`PatternAssociati ${
                        isExpanded ? "open" : "closed"
                    }`}
                    onClick={handleToggle}
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
                {/* Articoli Associati */}
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
export default VulnerabilitaPage;
