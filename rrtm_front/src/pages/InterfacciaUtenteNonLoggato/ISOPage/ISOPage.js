import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import "./ISOPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";

function ISOPage() {
    let { ISOId } = useParams();
    const [isPatternExpanded, setIsPatternExpanded] = useState(false);
    const [MVCExpanded, setMVCExpanded] = useState(false);
    const [PbDExpanded, setPbDExpanded] = useState(false);
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
    const {
        data: data4,
        loading: loading4,
        error: error4,
    } = useFetch(`http://localhost:1337/api/findPbDISO/${ISOId}`);
    const navigate = useNavigate();

    const handlePatternToggle = () => {
        setIsPatternExpanded(!isPatternExpanded);
    };
    const handleToggleMVC = () => {
        setMVCExpanded(!MVCExpanded);
    };
    const handleTogglePbD = () => {
        setPbDExpanded(!PbDExpanded);
    };
    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`);
    };
    const handleClickMVC = (mvcId) => {
        navigate(`/MVCPage/${mvcId}`);
    };
    const handleClickPbD = (pbdId) => {
        navigate(`/PbDPage/${pbdId}`);
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
                <div className="ISO">
                    {data && <h3>{data.Id}</h3>}
                    {data && <h3>{data.nome}</h3>}
                </div>
                {/* Pattern Associati */}
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
                {/* MVC Associati */}
                {data3.lenght !== 0 && <div
                    className={`MVCAssociati ${
                        MVCExpanded ? "open" : "closed"
                    }`}
                    onClick={handleToggleMVC}
                >
                    <h3>MVC Associati</h3>
                    <div className="MVCAssocMap">
                        {data3 &&
                            data3.map((mvc) => (
                                <div
                                    className="MVC-details"
                                    key={mvc.Id}
                                    onClick={() => handleClickMVC(mvc.Id)}
                                >
                                    <h4>{mvc.nome}</h4>
                                </div>
                            ))}
                    </div>
                </div>}
                {/* PbD Associate */}
                {data4.lenght !== 0 && <div
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
            </div>
        </div>
    );
}

export default ISOPage;
