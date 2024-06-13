import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import "./PatternPage.css";

function PatternPage() {
    let { patternId } = useParams();
    const navigate = useNavigate();
    const [strategieExpanded, setStrategieExpanded] = useState(false);
    const [vulnerabilitaExpanded, setVulnerabilitaExpanded] = useState(false);
    const [maxHeightVuln, setMaxHeightVuln] = useState(null);

    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findPattern/${patternId}`
    );

    const handleClickStrategia = (strategiaId) => {
        navigate(`/StrategiaPage/${strategiaId}`); // Passa l'ID come parte dell'URL
    };
    const handleClickVulnerabilita = (vulnerabilitaId) => {
        navigate(`/StrategiaPage/${vulnerabilitaId}`); // Passa l'ID come parte dell'URL
    };

    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch(`http://localhost:1337/api/findStratPatt/${patternId}`);
    const {
        data: data3,
        loading: loading3,
        error: error3,
    } = useFetch(`http://localhost:1337/api/findVulnPatt/${patternId}`);
    
    
    const initialMount = useRef(true);

    useEffect(() => {
        // Calcolo dell'altezza massima per le vulnerabilità solo alla prima apertura
        if (vulnerabilitaExpanded && data3 && initialMount.current) {
            const maxHeightCalcVuln = `${(data3.length*9.36)+7.6}vh`;
            setMaxHeightVuln(maxHeightCalcVuln);
            initialMount.current = false; // Imposta il primo montaggio a false dopo il calcolo iniziale
        }
    }, [vulnerabilitaExpanded, data3]);
    
    const handleToggleStrategie = () => {
        setStrategieExpanded(!strategieExpanded);
    };

    const handleToggleVulnerabilita = () => {
        setVulnerabilitaExpanded(!vulnerabilitaExpanded);
    };

    if (loading || loading2 || loading3) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (error2) {
        return <div>Error2: {error2.message}</div>;
    }
    if (error3) {
        return <div>Error3: {error3.message}</div>;
    }

    return (
        <div className="PatternPage">
            <Header />
            {data && (
                <div className="pattern">
                    <div className="titoloPattern">
                        <h3 key={data.Id}>{data.titolo}</h3>
                    </div>
                    <div className="PatternDivs">
                        <h3>sommario:</h3>
                        <p key={data.Id}>{data.sommario}</p>
                    </div>
                    <div className="PatternDivs">
                        <h3>contesto:</h3>
                        <p key={data.Id}>{data.contesto}</p>
                    </div>
                    <div className="PatternDivs">
                        <h3>problema:</h3>
                        <p key={data.Id}>{data.problema}</p>
                    </div>
                    <div className="PatternDivs">
                        <h3>soluzione:</h3>
                        <p key={data.Id}>{data.soluzione}</p>
                    </div>
                    <div className="PatternDivs">
                        <h3>esempio:</h3>
                        <p key={data.Id}>{data.esempio}</p>
                    </div>
                </div>
            )}
            
            {/* Strategie Associate */}
            <div
                className={`StrategieAssociate ${
                    strategieExpanded ? "open" : "closed"
                }`}
                onClick={handleToggleStrategie}
            >
                <h3>strategie Associate</h3>
                <div className="stratAssocMap">
                    {data2 &&
                        data2.map((strategia) => (
                            <div className="strategie-details" key={strategia.Id}>
                                <h4
                                    onClick={() =>
                                        handleClickStrategia(strategia.Id)
                                    }
                                >
                                    {strategia.nome}
                                </h4>
                            </div>
                        ))}
                </div>
            </div>

            {/* Vulnerabilità Associate */}
            <div
                className={`VulnerabilitaAssociate ${
                    vulnerabilitaExpanded ? "open" : "closed"
                }`}
                style={{ "--max-height-vuln": maxHeightVuln }}
                onClick={handleToggleVulnerabilita}
            >
                <h3>vulnerabilità Associate</h3>
                {data3 && data3.map((vulnerabilita) => (
                    <div className="vulnerabilita-details" key={vulnerabilita.Id}>
                    <h4
                        onClick={() =>
                            handleClickVulnerabilita(vulnerabilita.Id)
                        }
                    >
                        {vulnerabilita.titolo}
                    </h4>
                </div>
                ))}
            </div>
        </div>
    );
}

export default PatternPage;

