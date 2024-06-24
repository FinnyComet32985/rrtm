// LoginPage.js
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleTitleClick = () => {
        navigate("/");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login(username, password);
            navigate("/");
        } catch (error) {
            setError("Credenziali non valide. Riprova.");
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className="log-page">
            <div className="log-container">
                <h2 onClick={handleTitleClick}>RRTM</h2>
                <form className="login" onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            className={error ? "inputError" : ""}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={error ? "inputError" : ""}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="buttonInsertVulnerabilitaUt">Login</button>
                    <div className="link">
                        <p>Non hai ancora un account? <Link to="/register">Registrati ora</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;