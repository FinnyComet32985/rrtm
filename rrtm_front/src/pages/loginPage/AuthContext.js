// AuthContext.js
import React, { createContext, useState, useContext } from "react";
import defaultUserImage from "../../assets/header/person-circle-outline.svg";
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Funzione per eseguire il login
    const login = (username, userImage) => {
        setUser({ username, userImage });
    };

    // Funzione per eseguire il logout
    const logout = () => {
        setUser(null);
    };

    // Controllo se l'utente è autenticato
    const isAuthenticated = () => {
        return !!user;
    };

    // Immagine predefinita per l'utente non autenticato
    // Aggiungi il percorso all'immagine predefinita

    return (
        <AuthContext.Provider
            value={{ user, login, logout, isAuthenticated, defaultUserImage }}
        >
            {children}
        </AuthContext.Provider>
    );
}
