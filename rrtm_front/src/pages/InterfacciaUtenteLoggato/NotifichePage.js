import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import "./NotifichePage.css";

function NotifichePage() {
    const token = localStorage.getItem("token");
    const [notifiche, setNotifiche] = useState([]);
    const [consenso, setConsenso] = useState(false);

    const handleCheckboxChange = async (e) => {
        const isChecked = e.target.checked;
        setConsenso(isChecked);

        try {
            const response = await fetch(
                `http://localhost:1337/api/${
                    isChecked ? "aggiungiConsenso" : "rimuoviConsenso"
                }`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Errore nella risposta della rete");
            }
        } catch (error) {
            console.error(
                `Errore durante l'aggiornamento del consenso:`,
                error
            );
            // In caso di errore, ripristina lo stato precedente della checkbox
            setConsenso(!isChecked);
        }
    };

    const getNotifiche = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:1337/api/showNotifiche`,
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
            setNotifiche(json);
        } catch (error) {
            console.error("Errore durante il recupero delle notifiche:", error);
        }
    }, [token]);

    useEffect(() => {
        getNotifiche();
    }, [getNotifiche]);

    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="gestioneNotifiche">
                    <h3 className="gestNoth3">
                        Gestisci il consenso delle notifiche
                    </h3>
                    <form className="formNot">
                        <input
                            type="checkbox"
                            className="check"
                            checked={consenso}
                            onChange={handleCheckboxChange}
                        ></input>
                        <label>
                            consenso alla ricezione di notifiche tramite email
                        </label>
                    </form>
                </div>
                <div className="visioneNotifiche">
                    <h1 className="AllNotificaTitle">Notifiche ricevute</h1>
                    {notifiche.length > 0 ? (
                        notifiche.map((notifica) => (
                            <div key={notifica.Id} className="notifica">
                                <h3>{notifica.titolo}</h3>
                                <p className="testoNotifica">
                                    {notifica.testo}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "white" }}>
                            Nessuna notifica trovata.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default NotifichePage;
