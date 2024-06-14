import "./Strategia.css";
import { useNavigate } from "react-router-dom";

function Strategia({ id, nome }) {
    const navigate = useNavigate();
    const handleTitleClick = () => {
        navigate(`/StrategiaPage/${id}`); // Passa l'ID come parte dell'URL
    };
    return (
        <div className="trendingStrategia">
            <h3 className="titoloTrendingStrategia" onClick={handleTitleClick}>{nome}</h3>
        </div>
    );
}

export default Strategia;