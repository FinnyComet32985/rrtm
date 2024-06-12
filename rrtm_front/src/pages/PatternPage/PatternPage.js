import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import "./PatternPage.css"

function PatternPage() {
    let { patternId } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findPattern/${patternId}`
    );
    const handleClickStrategia = (strategiaId) => {
        navigate(`/StrategiaPage/${strategiaId}`); // Passa l'ID come parte dell'URL
    };
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findStratPatt/${patternId}`);
    if (loading || loading2) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (error2) {
        return <div>Error2: {error2.message}</div>;
    }
    return (
        <div>
            <Header></Header>
            {data && (
                <div className="pattern">
                    <h3 key={data.Id}>{data.titolo}</h3>
                    <div>
                        <h3>sommario:</h3>
                        <p key={data.Id}>{data.sommario}</p>
                    </div>
                    <div>
                        <h3>contesto:</h3>
                        <p key={data.Id}>{data.contesto}</p>
                    </div>
                    <div>
                        <h3>problema:</h3>
                        <p key={data.Id}>{data.problema}</p>
                    </div>
                    <div>
                        <h3>soluzione:</h3>
                        <p key={data.Id}>{data.soluzione}</p>
                    </div>
                    <div>
                        <h3>esempio:</h3>
                        <p key={data.Id}>{data.esempio}</p>
                    </div>
                </div>
            )}
            <div className="strategieAssociatePattern">
                <h3>strategie:</h3>
                {data2 && data2.map((strategia) => <p onClick={() => handleClickStrategia(strategia.Id)}>{strategia.nome}</p>)}
            </div>
        </div>
    );
}

export default PatternPage;
