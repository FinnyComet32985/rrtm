import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./ISOPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

function ISOPage() {
    let { ISOId } = useParams();
    const [isPatternExpanded, setIsPatternExpanded] = useState(false);
    const [MVCExpanded, setMVCExpanded] = useState(false);
    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findISO/${ISOId}`
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findPattISO/${ISOId}`);
    const {
        data: data3,
        loading: loading3,
        error: error3,
    } = useFetch(`http://localhost:1337/api/findMVCISO/${ISOId}`);

    const navigate = useNavigate();

    const handlePatternToggle = () => {
        setIsPatternExpanded(!isPatternExpanded);
    };
    const handleToggleMVC = () => {
        setMVCExpanded(!MVCExpanded);
    };
    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`);
    };
    const handleClickMVC = (mvcId) => {
        navigate(`/MVCPage/${mvcId}`);
    };
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
        return <div>Error3: {error3.message}</div>;
    }
    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="ISO">
                    {data && <h3>{data.Id}</h3>}
                    {data && <h3>{data.nome}</h3>}</div>
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
                {/* MVC Associati */}
                <div
                    className={`MVCAssociati ${
                        MVCExpanded ? "open" : "closed"
                    }`}
                    onClick={handleToggleMVC}
                >
                    <h3>MVC Associati</h3>
                    <div className="MVCAssocMap">
                        {data3 &&
                            data3.map((mvc) => (
                                <div className="MVC-details" key={mvc.Id}>
                                    <h4 onClick={() => handleClickMVC(mvc.Id)}>
                                        {mvc.nome}
                                    </h4>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ISOPage;
