import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import "./MVCPage.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/Header/Header";

function MVCPage() {
    let { MVCId } = useParams();
    const [isPatternExpanded, setIsPatternExpanded] = useState(false);
    const [ISOExpanded, setISOExpanded] = useState(false);
    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findMVC/${MVCId}`
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findPattMVC/${MVCId}`);
    const { data: data3, loading: loading3, error: error3 } = useFetch(
        `http://localhost:1337/api/findISOMVC/${MVCId}`
    );

    const navigate = useNavigate();

    const handlePatternToggle = () => {
        setIsPatternExpanded(!isPatternExpanded);
    };
    const handleToggleISO = () => {
        setISOExpanded(!ISOExpanded);
    };
    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`)
    }
    const handleClickISO = (ISOId) => {
        navigate(`/ISOPage/${ISOId}`)
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
                <div className="MVC">{data && <h3>{data.nome}</h3>}</div>
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
                {/* ISO Associate */}
                <div
                    className={`ISOAssociati ${
                        ISOExpanded ? "open" : "closed"
                    }`}
                    onClick={handleToggleISO}
                >
                    <h3>Fasi ISO Associate</h3>
                    <div className="ISOAssocMap">
                        {data3 &&
                            data3.map((ISO) => (
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
                </div>
            </div>
        </div>
    );
}

export default MVCPage;
