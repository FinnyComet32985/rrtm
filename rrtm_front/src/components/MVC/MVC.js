import "./MVC.css";
import { useNavigate } from "react-router-dom";

function MVC({ id, nome }) {
    const navigate = useNavigate();
    const handleTitleClick = () => {
        navigate(`/MVCPage/${id}`); // Passa l'ID come parte dell'URL
    };
    return (
        <div className="trendingMVC">
            <h3 className="titoloTrendingMVC" onClick={handleTitleClick}>{nome}</h3>
        </div>
    );
}

export default MVC;