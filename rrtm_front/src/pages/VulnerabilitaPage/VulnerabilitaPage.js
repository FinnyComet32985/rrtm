import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./VulnerabilitaPage.css";

function VulnerabilitaPage() {
    let { vulnerabilitaId } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findVulnerabilita/${vulnerabilitaId}`
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findPattVuln/${vulnerabilitaId}`);
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const handlePatternClick = (patternId) => {
        navigate(`/patternPage/${patternId}`);
    };
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
        return <div>Error2: {error2.message}</div>;
    }
    return (
        <div>
            <Header />
            <div className="container">
                <div className="Vulnerabilita">
                    {data && <h3>{data.titolo}</h3>}
                </div>
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
            </div>
        </div>
    );
}
export default VulnerabilitaPage;
