import React, { useEffect, useState, useCallback, useRef } from "react";
import Header from "../../components/Header/Header";
import "./VulnerabilitaSegnalatePage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../loginPage/AuthContext";

function VulnerabilitaSegnalatePage() {
    const token = localStorage.getItem("token");
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [buttonStatus, setButtonStatus] = useState(null);
    const pubblicaVulnSegnForm = useRef(null);
    const handleUnauthorized = () => {
        alert("C'è stato un problema di autenticazione. Riesegui il login.");
        logout();
        navigate("/login");
    };

    const resetButtonStatus = () => {
        setTimeout(() => {
            setButtonStatus(null);
        }, 2000);
    };
    const getVulnerabilita = useCallback(async () => {
        const handleUnauthorized = () => {
            alert(
                "C'è stato un problema di autenticazione. Riesegui il login."
            );
            logout();
            navigate("/login");
        };
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
            if (response.status === 401) {
                handleUnauthorized();
                return null;
            }
            if (!response.ok) {
                throw new Error("Errore nella risposta della rete");
            }
            const json = await response.json();
            setVulnerabilities(json);
        } catch (error) {
            console.error(
                "Errore durante il recupero delle vulnerabilita:",
                error
            );
        }
    }, [token, navigate, logout]);

    const handlePubblicaVulnerabilitaSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(pubblicaVulnSegnForm.current);
        const data = Object.fromEntries(formData.entries());
        const result = await fetch(
            "http://localhost:1337/api/pubblicaVulnerabilita",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status === 400) {
            setButtonStatus("error");
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus("success");

            navigate("/InserimentoNotifichePage");
        } else {
            setButtonStatus("error");
        }
        resetButtonStatus();

        return jsonResponse;
    };

    useEffect(() => {
        getVulnerabilita();
    }, [getVulnerabilita]);

    return (
        <div>
            <Header />
            <div className="container">
                <div className="visioneVulnerabilitaUt">
                    <h1 className="AllVulnerabilitaUtTitle">
                        Vulnerabilita Segnalate
                    </h1>
                    {vulnerabilities.length > 0 ? (
                        vulnerabilities.map((vulnerabilita) => (
                            <div
                                key={vulnerabilita.Id}
                                className="vulnerabilitaUtAmm"
                            >
                                <h3 className="titoloVulnerabilitaUt">
                                    {vulnerabilita.titolo}
                                </h3>
                                <p className="usernameVulnIns">
                                    {vulnerabilita.usernameUt}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "white" }}>
                            Nessuna vulnerabilità trovata.
                        </p>
                    )}
                </div>
                <div className="pubblicaVuln">
                    <h1>Pubblica una Vulnerabilita Segnalata</h1>
                    <form
                        ref={pubblicaVulnSegnForm}
                        onSubmit={handlePubblicaVulnerabilitaSubmit}
                    >
                        <label>Id della Vulnerabilita da pubblicare</label>
                        <input type="text" name="Id" required></input>
                        <label>
                            Nuovo numero della CWE di cui si pubblicare
                        </label>
                        <input type="text" name="cwe" required></input>
                        <label>Nuovo Titolo</label>
                        <input type="text" name="titolo"></input>
                        <button
                            type="submit"
                            className={
                                buttonStatus === "success"
                                    ? "success"
                                    : buttonStatus === "error"
                                    ? "error"
                                    : "button"
                            }
                        >
                            Pubblica Vulnerabilita
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VulnerabilitaSegnalatePage;
