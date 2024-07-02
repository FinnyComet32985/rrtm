import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import "./NotifichePage.css";
import { useAuth } from "../InterfacciaUtenteNonLoggato/loginPage/AuthContext";
import { useNavigate } from "react-router-dom";

function NotifichePage() {
    const token = localStorage.getItem("token");
    const [notifiche, setNotifiche] = useState([]);
    const storedNotPref = localStorage.getItem("notifiche");
    const [consenso, setConsenso] = useState(storedNotPref === "1");
    const navigate = useNavigate();
    const { logout } = useAuth();

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
            isChecked
                ? localStorage.setItem("notifiche", "1")
                : localStorage.setItem("notifiche", "0");
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
        const handleUnauthorized = () => {
            alert(
                "C'è stato un problema di autenticazione. Riesegui il login."
            );
            logout();
            navigate("/login");
        };
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
            if (response.status === 401) {
                handleUnauthorized();
                throw new Error("unauthorized");
            }
            if (!response.ok) {
                throw new Error("Errore nella risposta della rete");
            }
            const json = await response.json();
            setNotifiche(json);
        } catch (error) {
            console.error("Errore durante il recupero delle notifiche:", error);
        }
    }, [token, navigate, logout]);

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
