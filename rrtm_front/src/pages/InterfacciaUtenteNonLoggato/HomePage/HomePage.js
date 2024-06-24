import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Header from "../../../components/Header/Header";
import Pattern from "../../../components/Pattern/Pattern";
import Strategia from "../../../components/Strategia/Strategia";
import Vulnerabilita from "../../../components/Vulnerabilita/Vulnerabilita";
import Articolo from "../../../components/Articolo/Articolo";
import PbD from "../../../components/PbD/PbD";
import MVC from "../../../components/MVC/MVC";
import ISO from "../../../components/ISO/ISO";
import OWASP from "../../../components/OWASP/OWASP";

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
    } = useFetch("http://localhost:1337/api/showVulnerabilitaInserite");
    const {
        data: data4,
        loading: loading4,
        error: error4,
    } = useFetch("http://localhost:1337/api/showArticoli");
    const {
        data: data5,
        loading: loading5,
        error: error5,
    } = useFetch("http://localhost:1337/api/showPbD");
    const {
        data: data6,
        loading: loading6,
        error: error6,
    } = useFetch("http://localhost:1337/api/showMVC");
    const {
        data: data7,
        loading: loading7,
        error: error7,
    } = useFetch("http://localhost:1337/api/showISO");
    const {
        data: data8,
        loading: loading8,
        error: error8,
    } = useFetch("http://localhost:1337/api/showOWASP");
    const [showAllPatterns, setShowAllPatterns] = useState(false);
    const [showAllVulnerabilita, setShowAllVulnerabilita] = useState(false);
    const [showAllArticoli, setShowAllArticoli] = useState(false);
    const [showAllPbD, setShowAllPbD] = useState(false);
    const [showAllISO, setShowAllISO] = useState(false);
    const [showAllOWASP, setShowAllOWASP] = useState(false);

    const handleTogglePatterns = () => {
        setShowAllPatterns(!showAllPatterns);
    };
    const handleToggleVulnerabilita = () => {
        setShowAllVulnerabilita(!showAllVulnerabilita);
    };
    const handleToggleArticoli = () => {
        setShowAllArticoli(!showAllArticoli);
    };
    const handleTogglePbD = () => {
        setShowAllPbD(!showAllPbD);
    };
    const handleToggleISO = () => {
        setShowAllISO(!showAllISO);
    };
    const handleToggleOWASP = () => {
        setShowAllOWASP(!showAllOWASP);
    };
    if (loading || loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8) {
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
    if (error5) {
        return <div>Error5: {error5.message}</div>;
    }
    if (error6) {
        return <div>Error6: {error6.message}</div>;
    }
    if (error7) {
        return <div>Error7: {error7.message}</div>;
    }
    if (error8) {
        return <div>Error8: {error8.message}</div>;
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
            
            {/* PbD */}
            <div className="trendingDivPbD">
                <h1 className="AllPbDTitle">Principi PbD</h1>
                {data5 &&
                    data5
                        .slice(0, showAllPbD ? data5.length : 3)
                        .map((pbd) => (
                            <PbD
                                key={pbd.Id}
                                id={pbd.Id}
                                nome={pbd.nome}
                            />
                        ))}
                {data5.length > 3 && (
                    <div className="buttonDivPbD">
                        <button onClick={handleTogglePbD}>
                            {showAllPbD
                                ? "Nascondi i principi PbD"
                                : "Visualizza tutti i principi PbD"}
                        </button>
                    </div>
                )}
            </div>

            {/* MVC */}
            <div className="trendingDivMVC">
                <h1 className="AllMVCTitle">MVC</h1>
                {data6 &&
                    data6.map((mvc) => (
                        <MVC
                            key={mvc.Id}
                            id={mvc.Id}
                            nome={mvc.nome}
                        />
                    ))}
            </div>

            {/* ISO */}
            <div className="trendingDivISO">
                <h1 className="AllISOTitle">Fasi ISO</h1>
                {data7 &&
                    data7
                        .slice(0, showAllISO ? data7.length : 2)
                        .map((iso) => (
                            <ISO
                                key={iso.Id}
                                id={iso.Id}
                                nome={iso.nome}
                            />
                        ))}
                {data7.length > 2 && (
                    <div className="buttonDivISO">
                        <button onClick={handleToggleISO}>
                            {showAllISO
                                ? "Nascondi le fasi ISO"
                                : "Visualizza tutte le fasi ISO"}
                        </button>
                    </div>
                )}
            </div>

            {/* OWASP */}
            <div className="trendingDivOWASP">
                <h1 className="AllOWASPTitle">Categorie OWASP</h1>
                {data8 &&
                    data8
                        .slice(0, showAllOWASP ? data8.length : 3)
                        .map((owasp) => (
                            <OWASP
                                key={owasp.Id}
                                id={owasp.Id}
                                nome={owasp.nome}
                            />
                        ))}
                {data8.length > 3 && (
                    <div className="buttonDivOWASP">
                        <button onClick={handleToggleOWASP}>
                            {showAllOWASP
                                ? "Nascondi le categorie OWASP"
                                : "Visualizza tutte le categorie OWASP"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
