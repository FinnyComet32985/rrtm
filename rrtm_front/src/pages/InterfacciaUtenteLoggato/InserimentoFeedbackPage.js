import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import "./InserimentoFeedbackPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../loginPage/AuthContext";
function InserimentoFeedbackPage() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [showAllFeedback, setShowAllFeedback] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(null); // null, 'success', 'error'
    const [formData, setFormData] = useState({ titolo: "", descrizione: "" });
    const [errors, setErrors] = useState({ titolo: false, descrizione: false }); // Stato degli errori sugli input
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {logout} = useAuth();
    const handleUnauthorized = () => {
        alert("C'è stato un problema di autenticazione. Riesegui il login.");
        logout();
        navigate("/login");
    };
    const getFeedback = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:1337/api/findFeedbackUt/${username}`,
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
            setFeedbacks(json);
        } catch (error) {
            console.error("Errore durante il recupero dei feedback:", error);
        }
    }, [username, token]);

    useEffect(() => {
        getFeedback();
    }, [getFeedback]);

    const handleToggleFeedback = () => {
        setShowAllFeedback(!showAllFeedback);
    };

    const handleInserisci = async (e) => {
        e.preventDefault();

        // Controlla se i campi sono vuoti
        const newErrors = {
            titolo: !formData.titolo,
            descrizione: !formData.descrizione,
        };
        setErrors(newErrors);

        // Se ci sono errori, non inviare il form
        if (newErrors.titolo || newErrors.descrizione) {
            setButtonStatus('error');
            // Forza il ricaricamento degli stili per l'animazione
            setTimeout(() => {
                setErrors({ titolo: false, descrizione: false });
                setButtonStatus(null);
            }, 2000); // Reset button status and errors after 2 seconds
            return;
        }

        try {
            const response = await fetch("http://localhost:1337/api/inserisciFeedback", {
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
                getFeedback(); // Ricarica i feedback dopo l'inserimento
                setFormData({ titolo: "", descrizione: "" }); // Reset form data
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
                <div className="visioneFeedback">
                    <h1 className="AllFeedbackTitle">Feedback Inseriti</h1>
                    {feedbacks.length > 0 ? (
                        feedbacks
                            .slice(0, showAllFeedback ? feedbacks.length : 3)
                            .map((feedback) => (
                                <div key={feedback.Id} className="feedback">
                                    <h3 className="titoloFeedback">
                                        {feedback.titolo}
                                    </h3>
                                    <p className="descrizioneFeedback">
                                        {feedback.descrizione}
                                    </p>
                                </div>
                            ))
                    ) : (
                        <p style={{color: "white"}}>Nessun feedback trovato.</p>
                    )}
                    {feedbacks.length > 3 && (
                        <div className="buttonDivFeedback">
                            <button onClick={handleToggleFeedback}>
                                {showAllFeedback
                                    ? "Nascondi feedback"
                                    : "Visualizza tutti i feedback"}
                            </button>
                        </div>
                    )}
                </div>
                <form className="inserisciFeedback" onSubmit={handleInserisci}>
                    <h1>Inserisci Feedback</h1>
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
                    <div>
                        <label htmlFor="descrizione">Descrizione</label>
                        <input
                            type="text"
                            id="descrizione"
                            name="descrizione"
                            value={formData.descrizione}
                            onChange={handleChange}
                            className={errors.descrizione ? "inputError" : ""}
                        />
                    </div>
                    <button
                        type="submit"
                        className={
                            buttonStatus === "success"
                                ? "success"
                                : buttonStatus === "error"
                                ? "error"
                                : "buttonInsertFeedback"
                        }
                    >
                        Inserisci
                    </button>
                </form>
            </div>
        </div>
    );
}

export default InserimentoFeedbackPage;
