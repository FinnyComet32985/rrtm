// UserProfile.js
import React, { useState, useEffect } from "react";
import { ReactComponent as LogoutIcon } from "../../../assets/header/log-out-outline.svg";
import { ReactComponent as NotificationIcon } from "../../../assets/header/notifications-outline.svg";
import { ReactComponent as WeaknessIcon } from "../../../assets/header/bug-outline.svg";
import { ReactComponent as FeedbackIcon } from "../../../assets/header/chatbox-ellipses-outline.svg";
import "./UserMenu.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../pages/InterfacciaUtenteNonLoggato/loginPage/AuthContext";
import defaultUserImage from "../../../assets/header/person-circle-outline.svg";

function UserMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Function to handle clicks outside the menu
    const handleClickOutside = (event) => {
        if (!event.target.closest(".userProfile")) {
            setIsMenuOpen(false);
            setIsOverlayVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);
    }, [isMenuOpen]);

    const toggleMenu = () => {
        if (user?.username) {
            setIsMenuOpen(!isMenuOpen);
            setIsOverlayVisible(!isOverlayVisible);
        } else {
            navigate("/login"); // Reindirizza alla pagina di login se l'utente non è autenticato
        }
    };
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login"); // Dopo il logout, reindirizza alla pagina di login
    };
    const handleFeedback = () => {
        navigate("/inserimentoFeedbackUt");
    };
    const handleVulnerabilita = () => {
        navigate("/inserimentoVulnerabilitaUt");
    };
    const handleNotifiche = () => {
        navigate("/NotifichePage");
    };

    return (
        <div>
            <div className="userProfile">
                <img
                    src={user ? user.userImage : defaultUserImage}
                    alt="profile"
                    className="userImage"
                    onClick={toggleMenu}
                />
                <div id="profileMenu" className={isMenuOpen ? "open" : ""}>
                    <h3 className="username">Ciao, {user?.username}!</h3>
                    <hr className="hr1" />
                    <button id="preferenzeNotifiche" onClick={handleNotifiche}>
                        <NotificationIcon className="notificationIcon"></NotificationIcon>
                        <h3>Notifiche e Preferenze</h3>
                    </button>
                    <hr className="hr1" />
                    <button id="inserimentoFeedback" onClick={handleFeedback}>
                        <FeedbackIcon className="feedbackIcon" />
                        <h3>Inserisci Feedback</h3>
                    </button>
                    <button
                        id="segnalazioneVulnerabilita"
                        onClick={handleVulnerabilita}
                    >
                        <WeaknessIcon className="weaknessIcon" />
                        <h3>Segnala Vulnerabilità</h3>
                    </button>
                    <hr className="hr1" />
                    <button id="logout" onClick={handleLogout}>
                        <LogoutIcon className="logoutIcon" />
                        <h3>Logout</h3>
                    </button>
                </div>
            </div>
            <div id="overlay" className={isOverlayVisible ? "open" : ""}></div>
        </div>
    );
}

export default UserMenu;
