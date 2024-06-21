import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
return useContext(AuthContext);
}

export function AuthProvider({ children }) {
const [user, setUser] = useState({ isLoggedIn: false, isAdmin: false });

const login = async (username, password) => {
    try {
        const response = await fetch("http://localhost:1337/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Credenziali non valide. Riprova.");
        }

        const data = await response.json();
        const { token, tipo } = data;

        const isAdminUser = tipo === "amministratore";
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("tipo", tipo);
        setUser({ isLoggedIn: true, username, isAdmin: isAdminUser });
    } catch (error) {
        throw new Error("Credenziali non valide. Riprova.");
    }
};

const logout = async () => {
    const token = localStorage.getItem("token");
    const tipo = localStorage.getItem("tipo");
    try {
        await fetch("http://localhost:1337/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ tipo }),
        });
    } catch (error) {
        console.error("Errore durante il logout:", error);
    } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("tipo");
        setUser({ isLoggedIn: false, isAdmin: false });
    }
};

const isAuthenticated = () => {
    return user.isLoggedIn;
};

const isAdmin = () => {
    return user.isAdmin;
};


return (
    <AuthContext.Provider
        value={{ user, login, logout, isAuthenticated, isAdmin }}
    >
        {children}
    </AuthContext.Provider>
);
}