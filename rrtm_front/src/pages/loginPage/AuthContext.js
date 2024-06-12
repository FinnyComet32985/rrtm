import React, { createContext, useState, useContext, useEffect } from "react";
import defaultUserImage from "../../assets/header/person-circle-outline.svg";

// Definisci AuthContext prima di usarlo
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState({ isLoggedIn: false, isAdmin: false }); // Inizialmente l'utente non è loggato né admin

    // Funzione per eseguire il login
    const login = (username, userImage, isAdmin) => {
        setUser({ isLoggedIn: true, username, userImage, isAdmin });
    };

    // Funzione per eseguire il logout
    const logout = () => {
        setUser({ isLoggedIn: false, isAdmin: false });
    };

    // Controllo se l'utente è autenticato
    const isAuthenticated = () => {
        return user.isLoggedIn;
    };

    // Controllo se l'utente è un amministratore
    const isAdmin = () => {
        return user.isAdmin;
    };

    // Effetto per controllare l'autenticazione dell'utente
    useEffect(() => {
        // Puoi implementare qui la logica per verificare l'autenticazione dell'utente.
        // Ad esempio, controllando il token JWT, cookie, ecc.
        // Se l'utente è autenticato, puoi impostare setUser({ isLoggedIn: true, ... }) qui.
        // Altrimenti, setUser({ isLoggedIn: false }) per assicurarti che l'utente non sia considerato autenticato.
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, login, logout, isAuthenticated, isAdmin, defaultUserImage }}
        >
            {children}
        </AuthContext.Provider>
    );
}
