// RegisterPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./InterfacciaUtenteNonLoggato/loginPage/AuthContext";

function RegisterAdmin() {
    const { registerAdmin } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        nome: "",
        cognome: "",
        notPref: false
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await registerAdmin(formData);
            setSuccess("Amministratore creato con successo!");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setError(error.message || "Errore nella creazione dell'amministratore. Riprova.");
        }
    };

    return (
        <div className="reg-page">
            <div className="reg-container">
                <h2 onClick={() => navigate("/")}>RRTM</h2>
                <form className="register" onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Cognome:</label>
                        <input
                            type="text"
                            name="cognome"
                            value={formData.cognome}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <button type="submit" className="buttonInsertVulnerabilitaUt">Registrati</button>
                    <div className="link">
                        <p>Hai già un account? <Link to="/login">Accedi</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterAdmin;