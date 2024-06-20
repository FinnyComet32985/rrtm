import "./Pattern.css";
import { useNavigate } from "react-router-dom";

function Pattern({ id, titolo, sommario }) {
    const navigate = useNavigate();
    const handleTitleClick = () => {
        navigate(`/patternPage/${id}`); // Passa l'ID come parte dell'URL
    };
    return (
        <div className="trendingPattern">
            <h3 className="titoloTrendingPattern" onClick={handleTitleClick}>{titolo}</h3>
            <div className="sommarioTrending">
                <p>{sommario}</p>
            </div>
        </div>
    );
}

export default Pattern;
