import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import finny from "../../assets/FinnyComet32985.png";
import "./LoginPage.css";

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleTitleClick = () => {
        navigate("/"); // Reindirizza alla homepage
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Esegui la logica di autenticazione qui (puoi implementare la tua logica di autenticazione, ad esempio, chiamando un'API)
        if (username === "admin" && password === "password") {
            // Esegui il login
            login(username, finny);
            navigate("/");
        } else {
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
        <div className="login-page">
            <div className="login-container">
                <h2 className=".titleLogin" onClick={handleTitleClick}>
                    RRTM
                </h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <button type="submit">Login</button>
                </form>
            </div>
            <p className="photo-credit">
                Foto di{" "}
                <a href="https://unsplash.com/it/@matthewhenry?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Matthew Henry
                </a>{" "}
                su{" "}
                <a href="https://unsplash.com/it/foto/due-donne-che-affrontano-la-telecamera-di-sicurezza-sopra-montata-sulla-struttura-fPxOowbR6ls?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash
                </a>
            </p>
        </div>
    );
}

export default LoginPage;
