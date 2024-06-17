import "./PbD.css";
import { useNavigate } from "react-router-dom";

function PbD({ id, nome }) {
    const navigate = useNavigate();
    const handleTitleClick = () => {
        navigate(`/PbDPage/${id}`); // Passa l'ID come parte dell'URL
    };
    return (
        <div className="trendingPbD">
            <h3 className="titoloTrendingPbD" onClick={handleTitleClick}>{nome}</h3>
        </div>
    );
}

export default PbD;