import "./Articolo.css";
import { useNavigate } from "react-router-dom";

function Articolo({ id, titolo }) {
    const navigate = useNavigate();
    const handleTitleClick = () => {
        navigate(`/ArticoloPage/${id}`); // Passa l'ID come parte dell'URL
    };
    return (
        <div className="trendingArticolo">
            <h3 className="titoloTrendingArticolo" onClick={handleTitleClick}>{titolo}</h3>
            <div className="numeroArticoloTrending">
                    <h4>Articolo n°: </h4>
                    <p>{id}</p>
                </div>
        </div>
    );
}

export default Articolo;