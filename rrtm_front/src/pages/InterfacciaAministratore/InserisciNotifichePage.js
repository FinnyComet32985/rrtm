import Header from "../../components/Header/Header";
import "./InserisciNotifichePage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../loginPage/AuthContext";

function InserisciNotifichePage() {
    const token = localStorage.getItem("token");
    const [buttonStatus, setButtonStatus] = useState(null);
    const [formData, setFormData] = useState({
        titolo: "",
        oggetto: "",
        testo: "",
    });
    const [errors, setErrors] = useState({ titolo: false, descrizione: false });
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleUnauthorized = () => {
        alert("C'è stato un problema di autenticazione. Riesegui il login.");
        logout();
        navigate("/login");
    };

    const handleInserisci = async (e) => {
        e.preventDefault();

        // Controlla se i campi sono vuoti
        const newErrors = {
            titolo: !formData.titolo,
            oggetto: !formData.oggetto,
            testo: !formData.testo,
        };
        setErrors(newErrors);

        // Se ci sono errori, non inviare il form
        if (newErrors.titolo || newErrors.oggetto || newErrors.testo) {
            setButtonStatus("error");
            // Forza il ricaricamento degli stili per l'animazione
            setTimeout(() => {
                setErrors({ titolo: false, oggetto: false, testo: false });
                setButtonStatus(null);
            }, 2000); // Reset button status and errors after 2 seconds
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:1337/api/inserisciNotifica",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...formData,
                        usernameAmm: user.username,
                    }),
                }
            );
            const result = await response.text();
            if (result.status === 401) {
                handleUnauthorized();
                return null;
            }
            if (result === "true") {
                setButtonStatus("success");
                setFormData({ titolo: "", oggetto: "", testo: "" }); // Reset form data
            } else {
                setButtonStatus("error");
            }
        } catch (error) {
            console.error("Errore durante l'inserimento:", error);
            setButtonStatus("error");
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
        <div className="container">
            <Header />
            <form className="inserisciNotifica" onSubmit={handleInserisci}>
                <h1>Invia Notifica</h1>
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
                    <label htmlFor="oggetto">Oggetto</label>
                    <input
                        type="text"
                        id="oggetto"
                        name="oggetto"
                        value={formData.oggetto}
                        onChange={handleChange}
                        className={errors.oggetto ? "inputError" : ""}
                    />
                </div>
                <div>
                    <label htmlFor="testo">Testo</label>
                    <input
                        type="text"
                        id="testo"
                        name="testo"
                        value={formData.testo}
                        onChange={handleChange}
                        className={errors.testo ? "inputError" : ""}
                    />
                </div>
                <button
                    type="submit"
                    className={
                        buttonStatus === "success"
                            ? "success"
                            : buttonStatus === "error"
                            ? "error"
                            : "buttonInsertNotifica"
                    }
                >
                    Inserisci
                </button>
            </form>
        </div>
    );
}
export default InserisciNotifichePage;
