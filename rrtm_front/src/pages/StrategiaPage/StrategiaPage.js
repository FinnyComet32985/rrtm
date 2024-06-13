import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./StrategiaPage.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";

function StrategiaPage() {
    let { strategiaId } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);

    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findStrategia/${strategiaId}`
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findPattStrat/${strategiaId}`);
    const navigate = useNavigate();
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`)
    }
    if (loading || loading2) {
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
        return <div>Error: {error2.message}</div>;
    }

    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="Strategia">{data && <h3>{data.nome}</h3>}</div>
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
                                <div key={pattern.Id} onClick={() => handlePatternClick(pattern.Id)}>
                                    <h4>{pattern.titolo}</h4>
                                    <p>{pattern.sommario}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StrategiaPage;
