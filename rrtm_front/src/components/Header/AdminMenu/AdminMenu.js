// UserProfile.js
import React, { useState, useEffect } from "react";
import { ReactComponent as LogoutIcon } from "../../../assets/header/log-out-outline.svg";
import { ReactComponent as ModifyIcon } from "../../../assets/header/server-outline.svg";
import { ReactComponent as WeaknessIcon } from "../../../assets/header/bug-outline.svg";
import { ReactComponent as FeedbackIcon } from "../../../assets/header/chatbox-ellipses-outline.svg";
import "./AdminMenu.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../pages/loginPage/AuthContext";
import defaultUserImage from "../../../assets/header/person-circle-outline.svg";

function AdminMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    
    // Function to handle clicks outside the menu
    const handleClickOutside = (event) => {
        if (!event.target.closest(".adminProfile")) {
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
    const handleVulnerabilita = () => {
        navigate("/visualizzaVulnerabilitaUt");
    }
    const handleFeedback = () => {
        navigate("/visualizzaFeedback");
    }

    return (
        <div>
            <div className="adminProfile">
                <img
                    src={user ? user.userImage : defaultUserImage}
                    alt="profile"
                    className="userImage"
                    onClick={toggleMenu}
                />
                <div id="profileMenuAd" className={isMenuOpen ? "open" : ""}>
                    <h3 className="username">Ciao, {user?.username}!</h3>
                    <hr className="hr1" />
                    <button id="modificaPKB">
                        <ModifyIcon className="modificaPKBIcon"></ModifyIcon>
                        <h3>Modifica Pkb</h3>
                    </button>
                    <hr className="hr1" />
                    <button id="visioneFeedback" onClick={handleFeedback}>
                        <FeedbackIcon className="feedbackIcon" />
                        <h3>Visualizza Feedback</h3>
                    </button>
                    <button id="visioneVulnerabilita" onClick={handleVulnerabilita}>
                        <WeaknessIcon className="weaknessIcon" />
                        <h3>Visualizza Vulnerabilità</h3>
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

export default AdminMenu;
