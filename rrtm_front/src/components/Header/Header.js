import React from "react";
import "./Header.css";
import UserMenu from "./UserMenu/UserMenu";
import AdminMenu from "./AdminMenu/AdminMenu";
import { useAuth } from "../../pages/InterfacciaUtenteNonLoggato/loginPage/AuthContext";
import { useNavigate } from "react-router-dom";
import defaultUserImage from "../../assets/header/person-circle-outline.svg";
import { useState } from "react";
import { ReactComponent as FindIcon } from "../../assets/header/search-outline.svg";

function Header() {
    const { isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState("");

    const handleTitleClick = () => {
        navigate("/"); // Reindirizza alla homepage
    };

    const handleDefaultImageClick = () => {
        navigate("/login"); // Reindirizza alla pagina di login se l'utente non è autenticato
    };

    const handleFind = () => {
        navigate(`/ResultFindPage/${formData}`);
    };
    const handleChange = (e) => {
        setFormData(e.target.value); // Aggiorna direttamente formData con il valore dell'input
    };

    return (
        <div className="header">
            <h1 className="title" onClick={handleTitleClick}>
                RRTM
            </h1>
            <div className="finder">
                <form onSubmit={handleFind}>
                    <input
                        type="text"
                        id="find"
                        name="find"
                        value={formData}
                        onChange={handleChange}
                    />
                    <button type="submit" className="findButton">
                        <FindIcon className="findIco" />
                    </button>
                </form>
            </div>
            {isAuthenticated() ? (
                isAdmin() ? (
                    <AdminMenu />
                ) : (
                    <UserMenu />
                )
            ) : (
                <img
                    src={defaultUserImage}
                    alt="default"
                    className="defaultImage"
                    onClick={handleDefaultImageClick}
                />
            )}
        </div>
    );
}

export default Header;
