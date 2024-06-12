import React from "react";
import "./Header.css";
import UserMenu from "./UserMenu/UserMenu";
import AdminMenu from "./AdminMenu/AdminMenu"; // Import del componente del menu amministratore
import { useAuth } from "../../pages/loginPage/AuthContext"; // Import del context per l'autenticazione
import { useNavigate } from "react-router-dom";
import defaultUserImage from "../../assets/header/person-circle-outline.svg";

function Header() {
    const { isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/"); // Reindirizza alla homepage
    };

    const handleDefaultImageClick = () => {
            navigate("/login"); // Reindirizza alla pagina di login se l'utente non è autenticato
    };

    return (
        <div className="header">
            <h1 className="title" onClick={handleTitleClick}>
                RRTM
            </h1>
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
