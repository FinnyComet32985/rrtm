import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import "./InserimentoVulnerabilitaPage.css";

function InserimentoVulnerabilitaPage() {
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [showAllVulnerabilita, setShowAllVulnerabilita] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(null); // null, 'success', 'error'
    const [formData, setFormData] = useState({ titolo: ""});
    const [errors, setErrors] = useState({ titolo: false}); // Stato degli errori sugli input
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    const getVulnerabilita = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:1337/api/findVulnSegnUt/${username}`,
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
    }, [username, token]);

    useEffect(() => {
        getVulnerabilita();
    }, [getVulnerabilita]);

    const handleToggleVulnerabilita = () => {
        setShowAllVulnerabilita(!showAllVulnerabilita);
    };

    const handleInserisci = async (e) => {
        e.preventDefault();

        // Controlla se i campi sono vuoti
        const newErrors = {
            titolo: !formData.titolo
        };
        setErrors(newErrors);

        // Se ci sono errori, non inviare il form
        if (newErrors.titolo) {
            setButtonStatus('error');
            // Forza il ricaricamento degli stili per l'animazione
            setTimeout(() => {
                setErrors({ titolo: false});
                setButtonStatus(null);
            }, 2000); // Reset button status and errors after 2 seconds
            return;
        }

        try {
            const response = await fetch("http://localhost:1337/api/segnalaVulnerabilita", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formData, usernameUt: username }),
            });
            const result = await response.text();
            if (result === "true") {
                setButtonStatus('success');
                getVulnerabilita(); // Ricarica i feedback dopo l'inserimento
                setFormData({ titolo: ""}); // Reset form data
            } else {
                setButtonStatus('error');
            }
        } catch (error) {
            console.error("Errore durante l'inserimento:", error);
            setButtonStatus('error');
        }

        // Ripristina il pulsante allo stato iniziale dopo 2 secondi
        setTimeout(() => {
            setButtonStatus(null);
        }, 2000); // 2000 millisecondi = 2 secondi
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false })); // Reset error state on change
    };

    return (
        <div>
            <Header />
            <div className="container">
                <div className="visioneVulnerabilitaUt">
                    <h1 className="AllVulnerabilitaUtTitle">Vulnerabilita Segnalate</h1>
                    {vulnerabilities.length > 0 ? (
                        vulnerabilities
                            .slice(0, showAllVulnerabilita ? vulnerabilities.length : 3)
                            .map((vulnerabilita) => (
                                <div key={vulnerabilita.Id} className="vulnerabilitaUt">
                                    <h3 className="titoloVulnerabilitaUt">
                                        {vulnerabilita.titolo}
                                    </h3>
                                </div>
                            ))
                    ) : (
                        <p style={{color: "white"}}>Nessuna vulnerabilità trovata.</p>
                    )}
                    {vulnerabilities.length > 3 && (
                        <div className="buttonDivVulnerabilita">
                            <button onClick={handleToggleVulnerabilita}>
                                {showAllVulnerabilita
                                    ? "Nascondi vulnerabilita segnalate"
                                    : "Visualizza tutte le vulnerabilita segnalate"}
                            </button>
                        </div>
                    )}
                </div>
                <form className="inserisciVulnerabilita" onSubmit={handleInserisci}>
                    <h1>Inserisci Vulnerabilita</h1>
                    <div>
                        <label htmlFor="titolo">Titolo</label>
                        <input
                            type="text"
                            id="titolo"
                            name="titolo"
                            value={formData.titolo}
                            onChange={handleChange}
                            className={errors.titolo ? "inputError" : ""}
                        />
                    </div>
                    <button
                        type="submit"
                        className={
                            buttonStatus === "success"
                                ? "success"
                                : buttonStatus === "error"
                                ? "error"
                                : "buttonInsertVulnerabilitaUt"
                        }
                    >
                        Inserisci
                    </button>
                </form>
            </div>
        </div>
    );
}

export default InserimentoVulnerabilitaPage;
