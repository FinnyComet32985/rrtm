import "./OWASP.css";
import { useNavigate } from "react-router-dom";

function OWASP({ id, nome }) {
    const navigate = useNavigate();
    const handleTitleClick = () => {
        navigate(`/OWASPPage/${id}`); // Passa l'ID come parte dell'URL
    };
    return (
        <div className="trendingOWASP">
            <h3 className="titoloTrendingOWASP" onClick={handleTitleClick}>{nome}</h3>
        </div>
    );
}

export default OWASP;