import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import Pattern from "../../components/Pattern/Pattern";
import Strategia from "../../components/Strategia/Strategia";
import Vulnerabilita from "../../components/Vulnerabilita/Vulnerabilita";
import Articolo from "../../components/Articolo/Articolo";
import "./HomePage.css";

function HomePage() {
    const { data, loading, error } = useFetch(
        "http://localhost:1337/api/showPatterns"
    );
    const {
        data: data2,
        loading: loading2,
        error: error2,
    } = useFetch("http://localhost:1337/api/showStrategie");
    const {
        data: data3,
        loading: loading3,
        error: error3,
    } = useFetch("http://localhost:1337/api/showVulnerabilitaPubblicate");
    const {
        data: data4,
        loading: loading4,
        error: error4,
    } = useFetch("http://localhost:1337/api/showArticoli");
    const [showAllPatterns, setShowAllPatterns] = useState(false);
    const [showAllVulnerabilita, setShowAllVulnerabilita] = useState(false);
    const [showAllArticoli, setShowAllArticoli] = useState(false);
    const handleTogglePatterns = () => {
        setShowAllPatterns(!showAllPatterns);
    };
    const handleToggleVulnerabilita = () => {
        setShowAllVulnerabilita(!showAllVulnerabilita);
    };
    const handleToggleArticoli = () => {
        setShowAllArticoli(!showAllArticoli);
    };
    if (loading || loading2 || loading3 || loading4) {
        return (
            <div>
                <Header></Header>
                <div className="spinner">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                </div>
            </div>
        );
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
    if (error4) {
        return <div>Error4: {error4.message}</div>;
    }

    return (
        <div className="homepage">
            <Header />
            {/* Pattern */}
            <div className="trendingDivPatt">
                <h1 className="AllPatternTitle">Pattern</h1>
                {data &&
                    data
                        .slice(0, showAllPatterns ? data.length : 3)
                        .map((pattern) => (
                            <Pattern
                                key={pattern.Id}
                                id={pattern.Id}
                                titolo={pattern.titolo}
                                sommario={pattern.sommario}
                            />
                        ))}
                {data.length > 3 && (
                    <div className="buttonDivPattern">
                        <button onClick={handleTogglePatterns}>
                            {showAllPatterns
                                ? "Nascondi pattern"
                                : "Visualizza tutti i pattern"}
                        </button>
                    </div>
                )}
            </div>
            {/* Strategie */}
            <div className="trendingDivStrat">
                <h1 className="AllStrategieTitle">Strategie</h1>
                {data2 &&
                    data2.map((strategia) => (
                        <Strategia
                            key={strategia.Id}
                            id={strategia.Id}
                            nome={strategia.nome}
                        />
                    ))}
            </div>

            {/* Vulnerabilita */}
            <div className="trendingDivVuln">
                <h1 className="AllVulnerabilitaTitle">Vulnerabilita</h1>
                {data3 &&
                    data3
                        .slice(0, showAllVulnerabilita ? data3.length : 3)
                        .map((vulnerabilita) => (
                            <Vulnerabilita
                                key={vulnerabilita.Id}
                                id={vulnerabilita.Id}
                                titolo={vulnerabilita.titolo}
                                cwe={vulnerabilita.cwe}
                            />
                        ))}
                {data3.length > 3 && (
                    <div className="buttonDivVulnerabilita">
                        <button onClick={handleToggleVulnerabilita}>
                            {showAllVulnerabilita
                                ? "Nascondi vulnerabilita"
                                : "Visualizza tutte le vulnerabilita"}
                        </button>
                    </div>
                )}
            </div>

            {/* Articoli */}
            <div className="trendingDivArt">
                <h1 className="AllArticoliTitle">Articoli</h1>
                {data4 &&
                    data4
                        .slice(0, showAllArticoli ? data4.length : 3)
                        .map((articolo) => (
                            <Articolo
                                key={articolo.Id}
                                id={articolo.Id}
                                titolo={articolo.titolo}
                            />
                        ))}
                {data4.length > 3 && (
                    <div className="buttonDivArticolo">
                        <button onClick={handleToggleArticoli}>
                            {showAllArticoli
                                ? "Nascondi articoli"
                                : "Visualizza tutti gli articoli"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
