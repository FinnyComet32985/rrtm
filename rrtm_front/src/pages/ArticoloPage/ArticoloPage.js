import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import "./ArticoloPage.css";

function ArticoloPage() {
    let { articoloId } = useParams();
    const navigate = useNavigate();
    const [isPatternExpanded, setIsPatternExpanded] = useState(false);

    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findArticolo/${articoloId}`
    );
    console.log(data);
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findPattArt/${articoloId}`);
    const handlePatternToggle = () => {
        setIsPatternExpanded(!isPatternExpanded);
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

export default ArticoloPage;

