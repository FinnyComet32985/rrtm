import React, { useEffect, useState, useCallback, useRef } from "react";
import Header from "../../components/Header/Header";
import "./VulnerabilitaSegnalatePage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../loginPage/AuthContext";

function VulnerabilitaSegnalatePage() {
    const token = localStorage.getItem("token");
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [buttonStatus, setButtonStatus] = useState(null);
    const [progress, setProgress] = useState(0);
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
    const navNotifica = () => {
        setProgress(100);
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                const newProgress = prevProgress - 0.8; // Riduce progressivamente la larghezza
                if (newProgress <= 0) {
                    clearInterval(interval);
                    navigate("/InserimentoNotifichePage");
                }
                return newProgress;
            });
        }, 16);
    }; 
    const getVulnerabilita = useCallback(async () => {
        const handleUnauthorized = (error) => {
            console.error(error);
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
                body: JSON.stringify({
                    ...data,
                    usernameAmm: user.username,
                }),
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
            navNotifica();
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
            <div className="successBarDiv">
                <div className="successBar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="containerMod">
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
                    className="modificaContainer"
                        ref={pubblicaVulnSegnForm}
                        onSubmit={handlePubblicaVulnerabilitaSubmit}
                    >
                        <label htmlFor="Id">Id della Vulnerabilita da pubblicare</label>
                        <input type="text" name="Id" required></input>
                        <label htmlFor="cwe">
                            Nuovo numero della CWE di cui si pubblicare
                        </label>
                        <input type="text" name="cwe" required></input>
                        <label htmlFor="titolo">Nuovo Titolo</label>
                        <input type="text" name="titolo"></input>
                        <button
                            type="submit"
                            className={getButtonClass(buttonStatus)}
                        >
                            Pubblica Vulnerabilita
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
    function getButtonClass(status) {
        if (status === "success") {
            return "success";
        } else if (status === "error") {
            return "error";
        } else {
            return "button";
        }
    }
}

export default VulnerabilitaSegnalatePage;
