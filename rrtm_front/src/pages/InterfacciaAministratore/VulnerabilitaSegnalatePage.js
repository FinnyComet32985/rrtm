import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import "./VulnerabilitaSegnalatePage.css";

function VulnerabilitaSegnalatePage() {
    const token = localStorage.getItem("token");
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const getVulnerabilita = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:1337/api/showVulnerabilitaSegnalate`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Errore nella risposta della rete");
            }
            const json = await response.json();
            setVulnerabilities(json);
        } catch (error) {
            console.error("Errore durante il recupero delle vulnerabilita:", error);
        }
    }, [token]);

    useEffect(() => {
        getVulnerabilita();
    }, [getVulnerabilita]);

    return (
        <div>
            <Header />
            <div className="container">
                <div className="visioneVulnerabilitaUt">
                    <h1 className="AllVulnerabilitaUtTitle">Vulnerabilita Segnalate</h1>
                    {vulnerabilities.length > 0 ? (
                        vulnerabilities
                            .map((vulnerabilita) => (
                                <div key={vulnerabilita.Id} className="vulnerabilitaUtAmm">
                                    <h3 className="titoloVulnerabilitaUt">
                                        {vulnerabilita.titolo}
                                    </h3>
                                    <p className="usernameVulnIns">{vulnerabilita.usernameUt}</p>
                                </div>
                            ))
                    ) : (
                        <p style={{color: "white"}}>Nessuna vulnerabilità trovata.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VulnerabilitaSegnalatePage;
