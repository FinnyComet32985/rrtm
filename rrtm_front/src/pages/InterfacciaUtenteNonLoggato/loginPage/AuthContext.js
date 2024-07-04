import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) { //NOSONAR
    const [user, setUser] = useState({ isLoggedIn: false, isAdmin: false });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const tipo = localStorage.getItem("tipo");
        if (tipo === 'utente') {
            localStorage.getItem("notifiche");
        }

        if (token && username && tipo) {
            const isAdminUser = tipo === "amministratore";
            setUser({ isLoggedIn: true, username, isAdmin: isAdminUser });
        }
    }, []);

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
            const { token, tipo, notifiche } = data;
            const isAdminUser = tipo === "amministratore";
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("tipo", tipo);
            if (tipo === 'utente') {
                localStorage.setItem("notifiche", notifiche);
            }
            setUser({ isLoggedIn: true, username, isAdmin: isAdminUser });
        } catch (error) {
            throw new Error("Credenziali non valide. Riprova.");
        }
    };

    const register = async (formData) => {
        try {
            const response = await fetch("http://localhost:1337/api/creaUtente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Errore nella creazione dell'utente.");
            }

            const data = await response.json();
            const { token, tipo, notifiche } = data;
            const isAdminUser = tipo === "amministratore";
            localStorage.setItem("token", token);
            localStorage.setItem("username", formData.username);
            localStorage.setItem("tipo", tipo);
            if (tipo === 'utente') {
                localStorage.setItem("notifiche", notifiche);
            }
            setUser({ isLoggedIn: true, username: formData.username, isAdmin: isAdminUser });
        } catch (error) {
            throw new Error(error.message || "Errore nella creazione dell'utente.");
        }
    };

    const registerAdmin = async (formData) => {
        try {
            const response = await fetch("http://localhost:1337/api/creaAmministratore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Errore nella creazione dell'amministratore.");
            }

            const data = await response.json();
            const { token, tipo, notifiche } = data;
            const isAdminUser = tipo === "amministratore";
            localStorage.setItem("token", token);
            localStorage.setItem("username", formData.username);
            localStorage.setItem("tipo", tipo);
            if (tipo === 'utente') {
                localStorage.setItem("notifiche", notifiche);
            }
            setUser({ isLoggedIn: true, username: formData.username, isAdmin: isAdminUser });
        } catch (error) {
            throw new Error(error.message || "Errore nella creazione dell'amministratore.");
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
            localStorage.removeItem("username");
            localStorage.removeItem("tipo");
            localStorage.removeItem("notifiche");
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
            value={{ user, login, logout, register, registerAdmin, isAuthenticated, isAdmin }} //NOSONAR
        >
            {children}
        </AuthContext.Provider>
    );
}
