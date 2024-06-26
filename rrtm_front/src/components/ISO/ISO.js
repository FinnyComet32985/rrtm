import "./ISO.css";
import { useNavigate } from "react-router-dom";

function ISO({ id, nome }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/ISOPage/${id}`); // Passa l'ID come parte dell'URL
    };
    return (
        <div className="trendingISO" onClick={handleClick}> {/* NOSONAR */}
            <h3>{id}</h3>
            <h3 className="titoloTrendingISO">{nome}</h3>
        </div>
    );
}

export default ISO;