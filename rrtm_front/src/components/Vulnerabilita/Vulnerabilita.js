import "./Vulnerabilita.css";
import { useNavigate } from "react-router-dom";

function Vulnerabilita({ id, titolo, cwe }) {
    const navigate = useNavigate();
    const handleTitleClick = () => {
        navigate(`/VulnerabilitaPage/${id}`); // Passa l'ID come parte dell'URL
    };
    return (
        <div className="trendingVulnerabilita">
            <h3
                className="titoloTrendingVulnerabilita"
                onClick={handleTitleClick}
            >
                {titolo}
            </h3>
            {cwe && (
                <div className="cweTrending">
                    <h4>CWE: </h4>
                    <p>{cwe}</p>
                </div>
            )}
        </div>
    );
}

export default Vulnerabilita;
