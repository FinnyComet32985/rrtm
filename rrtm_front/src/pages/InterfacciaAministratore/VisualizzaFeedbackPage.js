import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import "./VisualizzaFeedbackPage.css";

function VisualizzaFeedbackPage() {
    const [feedbacks, setFeedbacks] = useState([]);
    const token = localStorage.getItem("token");

    const getFeedback = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:1337/api/showFeedback`,
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
            setFeedbacks(json);
        } catch (error) {
            console.error("Errore durante il recupero dei feedback:", error);
        }
    }, [token]);

    useEffect(() => {
        getFeedback();
    }, [getFeedback]);

    return (
        <div>
            <Header />
            <div className="container">
                <div className="visioneFeedback">
                    <h1 className="AllFeedbackTitle">Feedback Inseriti</h1>
                    {feedbacks.length > 0 ? (
                        feedbacks.map((feedback) => (
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
                </div>
            </div>
        </div>
    );
}

export default VisualizzaFeedbackPage;
