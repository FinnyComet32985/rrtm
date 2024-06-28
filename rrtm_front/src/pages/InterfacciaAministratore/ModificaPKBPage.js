import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useAuth } from "../loginPage/AuthContext";
import "./ModificaPKBPage.css";

function ModificaPKBPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { logout } = useAuth();
    const [notify, setNotify] = useState(false);
    const [buttonStatus, setButtonStatus] = useState({
        // Pattern
        modificaPattern: "wating",
        inserisciPattern: "wating",
        eliminaPattern: "wating",
        // Strategia
        modificaStrategia: "wating",
        inserisciStrategia: "wating",
        eliminaStrategia: "wating",
        // Vulnerabilita
        modificaVulnerabilita: "wating",
        inserisciVulnerabilita: "wating",
        eliminaVulnerabilita: "wating",
        // Articolo
        modificaArticolo: "wating",
        inserisciArticolo: "wating",
        eliminaArticolo: "wating",
        // PbD
        modificaPbD: "wating",
        inserisciPbD: "wating",
        eliminaPbD: "wating",
        // ISO
        modificaISO: "wating",
        inserisciISO: "wating",
        eliminaISO: "wating",
        // OWASP
        modificaOWASP: "wating",
        inserisciOWASP: "wating",
        eliminaOWASP: "wating",
    });

    const resetButtonStatus = () => {
        setTimeout(() => {
            setButtonStatus({
                // Pattern
                modificaPattern: "wating",
                inserisciPattern: "wating",
                eliminaPattern: "wating",
                // Strategia
                modificaStrategia: "wating",
                inserisciStrategia: "wating",
                eliminaStrategia: "wating",
                // Vulnerabilita
                modificaVulnerabilita: "wating",
                inserisciVulnerabilita: "wating",
                eliminaVulnerabilita: "wating",
                // Articolo
                modificaArticolo: "wating",
                inserisciArticolo: "wating",
                eliminaArticolo: "wating",
                // PbD
                modificaPbD: "wating",
                inserisciPbD: "wating",
                eliminaPbD: "wating",
                // ISO
                modificaISO: "wating",
                inserisciISO: "wating",
                eliminaISO: "wating",
                // OWASP
                modificaOWASP: "wating",
                inserisciOWASP: "wating",
                eliminaOWASP: "wating",
            });
        }, 2000); // Torna allo stato di partenza dopo 3 secondi
    };

    // Pattern
    const modificaPatternForm = useRef(null);
    const inserisciPatternForm = useRef(null);
    const eliminaPatternForm = useRef(null);
    // Strategia
    const modificaStrategiaForm = useRef(null);
    const inserisciStrategiaForm = useRef(null);
    const eliminaStrategiaForm = useRef(null);
    // Vulnerabilita
    const modificaVulnerabilitaForm = useRef(null);
    const inserisciVulnerabilitaForm = useRef(null);
    const eliminaVulnerabilitaForm = useRef(null);
    // Articolo
    const modificaArticoloForm = useRef(null);
    const inserisciArticoloForm = useRef(null);
    const eliminaArticoloForm = useRef(null);
    // PbD
    const modificaPbDForm = useRef(null);
    const inserisciPbDForm = useRef(null);
    const eliminaPbDForm = useRef(null);
    // ISO
    const modificaISOForm = useRef(null);
    const inserisciISOForm = useRef(null);
    const eliminaISOForm = useRef(null);
    // OWASP
    const modificaOWASPForm = useRef(null);
    const inserisciOWASPForm = useRef(null);
    const eliminaOWASPForm = useRef(null);

    const handleCheckboxChange = (event) => {
        setNotify(event.target.checked);
    };

    const handleUnauthorized = () => {
        alert("C'è stato un problema di autenticazione. Riesegui il login.");
        logout();
        navigate("/login");
    };

    /* Pattern */
    const handleModificaPatternSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(modificaPatternForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            "http://localhost:1337/api/modificaPattern",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }

        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                modificaPattern: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                modificaPattern: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                modificaPattern: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleInserisciPatternSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(inserisciPatternForm.current);
        const data = Object.fromEntries(formData.entries());
        const result = await fetch(
            "http://localhost:1337/api/inserisciPattern",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                insersciPattern: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                insersciPattern: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                insersciPattern: "error",
            });
        }
        resetButtonStatus();
        
        return jsonResponse;
    };
    const handleEliminaPatternSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(eliminaPatternForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            `http://localhost:1337/api/eliminaPattern/${data.patternId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                eliminaPattern: "error",
            });
            resetButtonStatus();
            return null;
        } 
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                eliminaPattern: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                eliminaPattern: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };

    /* Strategia */
    const handleModificaStrategiaSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(modificaStrategiaForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            "http://localhost:1337/api/modificaStrategia",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                modificaStrategia: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                modificaStrategia: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                modificaStrategia: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleInserisciStrategiaSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(inserisciStrategiaForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            "http://localhost:1337/api/inserisciStrategia",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                inserisciStrategia: "error",
            });
            resetButtonStatus();
            return null;

        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                inserisciStrategia: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                inserisciStrategia: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleEliminaStrategiaSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(eliminaStrategiaForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            `http://localhost:1337/api/eliminaStrategia/${data.strategyId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                eliminaStrategia: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                eliminaStrategia: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                eliminaStrategia: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };

    /* Vulnerabilita */
    const handleModificaVulnerabilitaSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(modificaVulnerabilitaForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            "http://localhost:1337/api/modificaVulnerabilita",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                modificaVulnerabilita: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                modificaVulnerabilita: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                modificaVulnerabilita: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleInserisciVulnerabilitaSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(inserisciVulnerabilitaForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            "http://localhost:1337/api/inserisciVulnerabilita",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                inserisciVulnerabilita: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                inserisciVulnerabilita: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                inserisciVulnerabilita: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleEliminaVulnerabilitaSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(eliminaVulnerabilitaForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            `http://localhost:1337/api/eliminaVulnerabilita/${data.vulnerabilityId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                eliminaVulnerabilita: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                eliminaVulnerabilita: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                eliminaVulnerabilita: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };

    /* Articolo */
    const handleModificaArticoloSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(modificaArticoloForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            "http://localhost:1337/api/modificaArticolo",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                modificaArticolo: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                modificaArticolo: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                modificaArticolo: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleInserisciArticoloSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(inserisciArticoloForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            "http://localhost:1337/api/inserisciArticolo",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                inserisciArticolo: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                inserisciArticolo: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                inserisciArticolo: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleEliminaArticoloSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(eliminaArticoloForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            `http://localhost:1337/api/eliminaArticolo/${data.Id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                eliminaArticolo: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                eliminaArticolo: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                eliminaArticolo: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };

    /* PbD */
    const handleModificaPbDSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(modificaPbDForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch("http://localhost:1337/api/modificaPbD", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                modificaPbD: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                modificaPbD: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                modificaPbD: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleInserisciPbDSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(inserisciPbDForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch("http://localhost:1337/api/inserisciPbD", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                inserisciPbD: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                inserisciPbD: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                inserisciPbD: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleEliminaPbDSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(eliminaPbDForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            `http://localhost:1337/api/eliminaPbD/${data.Id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                eliminaPbD: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                eliminaPbD: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                eliminaPbD: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };

    /* ISO */
    const handleModificaISOSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(modificaISOForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch("http://localhost:1337/api/modificaISO", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                modificaISO: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                modificaISO: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                modificaISO: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleInserisciISOSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(inserisciISOForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch("http://localhost:1337/api/inserisciISO", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                inserisciISO: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                inserisciISO: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                inserisciISO: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleEliminaISOSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(eliminaISOForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            `http://localhost:1337/api/eliminaISO/${data.Id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                eliminaISO: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                eliminaISO: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                eliminaISO: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };

    /* OWASP */
    const handleModificaOWASPSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(modificaOWASPForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch("http://localhost:1337/api/modificaOWASP", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                modificaOWASP: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                modificaOWASP: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                modificaOWASP: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleInserisciOWASPSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(inserisciOWASPForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch("http://localhost:1337/api/inserisciOWASP", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                inserisciOWASP: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                inserisciOWASP: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                inserisciOWASP: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };
    const handleEliminaOWASPSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(eliminaOWASPForm.current);
        const data = Object.fromEntries(formData.entries());

        const result = await fetch(
            `http://localhost:1337/api/eliminaOWASP/${data.Id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (result.status === 401) {
            handleUnauthorized();
            return null;
        }
        if (!result.ok || result.status===400) {
            setButtonStatus({
                ...buttonStatus,
                eliminaOWASP: "error",
            });
            resetButtonStatus();
            return null;
        }
        const jsonResponse = await result.json();
        if (jsonResponse) {
            setButtonStatus({
                ...buttonStatus,
                eliminaOWASP: "success",
            });
            if (notify) {
                navigate("/InserimentoNotifichePage");
            }
        } else {
            setButtonStatus({
                ...buttonStatus,
                eliminaOWASP: "error",
            });
        }
        resetButtonStatus();
        return jsonResponse;
    };

    return (
        <div>
            <Header />
            <div className="container">
                {/* Pattern */}
                <div className="modificaContainer">
                    <h1>Pattern</h1>
                    <div className="modifica">
                        <h3>Modifica Pattern Esistente</h3>
                        <form
                            ref={modificaPatternForm}
                            onSubmit={handleModificaPatternSubmit}
                        >
                            <label> <input type="text" name="Id" required></input> Id del pattern da modificare</label>
                            
                            <label> <input type="text" name="titolo" required></input> Nuovo Titolo</label>
                            
                            <label> <input type="text" name="sommario"></input> Nuovo Sommario</label>
                            
                            <label> <input type="text" name="contesto"></input> Nuovo Contesto</label>
                            
                            <label> <input type="text" name="problema"></input> Nuovo Problema</label>
                            
                            <label> <input type="text" name="soluzione"></input> Nuova Soluzione</label>
                            
                            <label>Nuovo Esempio</label> {/* NOSONAR */}
                            <input type="text" name="esempio"></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label> {/* NOSONAR */}
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.modificaPattern === "success"
                                        ? "success"
                                        : buttonStatus.modificaPattern === "error" /* NOSONAR */
                                        ? "error"
                                        : "button"
                                }
                            >
                                Modifica Pattern
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuovo Pattern</h3>
                        <form
                            ref={inserisciPatternForm}
                            onSubmit={handleInserisciPatternSubmit}
                        >
                            <label>Titolo del nuovo Pattern</label>
                            <input type="text" name="titolo" required></input>
                            <label>Sommario del nuovo Pattern</label>
                            <input type="text" name="sommario"></input>
                            <label>Contesto del nuovo Pattern</label>
                            <input type="text" name="contesto"></input>
                            <label>Problema del nuovo Pattern</label>
                            <input type="text" name="problema"></input>
                            <label>Soluzione del nuovo Pattern</label>
                            <input type="text" name="soluzione"></input>
                            <label>Esempio del nuovo Pattern</label>
                            <input type="text" name="esempio"></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.inserisciPattern === "success"
                                        ? "success"
                                        : buttonStatus.inserisciPattern === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Inserisci Pattern
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina Pattern Esistente</h3>
                        <form
                            ref={eliminaPatternForm}
                            onSubmit={handleEliminaPatternSubmit}
                        >
                            <label>Id del pattern da eliminare</label>
                            <input
                                type="text"
                                name="patternId"
                                required
                            ></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.eliminaPattern === "success"
                                        ? "success"
                                        : buttonStatus.eliminaPattern === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Elimina Pattern
                            </button>
                        </form>
                    </div>
                </div>
                {/* Strategia */}
                <div className="modificaContainer">
                    <h1>Strategia</h1>
                    <div className="modifica">
                        <h3>Modifica Strategia Esistente</h3>
                        <form
                            ref={modificaStrategiaForm}
                            onSubmit={handleModificaStrategiaSubmit}
                        >
                            <label>Id della strategia da modificare</label>
                            <input type="text" name="Id" required></input>
                            <label>Nuovo Nome</label>
                            <input type="text" name="nome" required></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.modificaStrategia === "success"
                                        ? "success"
                                        : buttonStatus.modificaStrategia === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Modifica Strategia
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuova Strategia</h3>
                        <form
                            ref={inserisciStrategiaForm}
                            onSubmit={handleInserisciStrategiaSubmit}
                        >
                            <label>Nome della nuova Strategia</label>
                            <input type="text" name="nome" required></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.inserisciStrategia === "success"
                                        ? "success"
                                        : buttonStatus.inserisciStrategia === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Inserisci Strategia
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina Strategia Esistente</h3>
                        <form
                            ref={eliminaStrategiaForm}
                            onSubmit={handleEliminaStrategiaSubmit}
                        >
                            <label>Id della strategia da eliminare</label>
                            <input
                                type="text"
                                name="strategyId"
                                required
                            ></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.eliminaStrategia === "success"
                                        ? "success"
                                        : buttonStatus.eliminaStrategia === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Elimina Strategia
                            </button>
                        </form>
                    </div>
                </div>
                {/* Vulnerabilita */}
                <div className="modificaContainer">
                    <h1>Vulnerabilita</h1>
                    <div className="modifica">
                        <h3>Modifica Vulnerabilita Esistente</h3>
                        <form
                            ref={modificaVulnerabilitaForm}
                            onSubmit={handleModificaVulnerabilitaSubmit}
                        >
                            <label>Id della Vulnerabilita da modificare</label>
                            <input type="text" name="Id" required></input>
                            <label>Nuovo numero CWE</label>
                            <input type="text" name="cwe" required></input>
                            <label>Nuovo Titolo</label>
                            <input type="text" name="titolo" required></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.modificaVulnerabilita === "success"
                                        ? "success"
                                        : buttonStatus.modificaVulnerabilita === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Modifica Vulnerabilita
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuova Vulnerabilita</h3>
                        <form
                            ref={inserisciVulnerabilitaForm}
                            onSubmit={handleInserisciVulnerabilitaSubmit}
                        >
                            <label>Numero CWE della nuova Vulnerabilita</label>
                            <input type="text" name="cwe" required></input>
                            <label>Titolo della nuova Vulnerabilita</label>
                            <input type="text" name="titolo" required></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.inserisciVulnerabilita === "success"
                                        ? "success"
                                        : buttonStatus.inserisciVulnerabilita === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Inserisci Vulnerabilita
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina Vulnerabilita Esistente</h3>
                        <form
                            ref={eliminaVulnerabilitaForm}
                            onSubmit={handleEliminaVulnerabilitaSubmit}
                        >
                            <label>Id della vulnerabilita da eliminare</label>
                            <input
                                type="text"
                                name="vulnerabilityId"
                                required
                            ></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.eliminaVulnerabilita === "success"
                                        ? "success"
                                        : buttonStatus.eliminaVulnerabilita === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Elimina Vulnerabilita
                            </button>
                        </form>
                    </div>
                </div>

                {/* Articoli */}
                <div className="modificaContainer">
                    <h1>Articolo</h1>
                    <div className="modifica">
                        <h3>Modifica Articolo Esistente</h3>
                        <form
                            ref={modificaArticoloForm}
                            onSubmit={handleModificaArticoloSubmit}
                        >
                            <label>ID dell'articolo da modificare</label>
                            <input type="text" name="Id" required />
                            <label>Nuovo Titolo</label>
                            <input type="text" name="titolo" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.modificaArticolo === "success"
                                        ? "success"
                                        : buttonStatus.modificaArticolo === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Modifica Articolo
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuovo Articolo</h3>
                        <form
                            ref={inserisciArticoloForm}
                            onSubmit={handleInserisciArticoloSubmit}
                        >
                            <label>ID del nuovo Articolo</label>
                            <input type="text" name="Id" required />
                            <label>Titolo del nuovo Articolo</label>
                            <input type="text" name="titolo" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.inserisciArticolo === "success"
                                        ? "success"
                                        : buttonStatus.inserisciArticolo === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Inserisci Articolo
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina Articolo Esistente</h3>
                        <form
                            ref={eliminaArticoloForm}
                            onSubmit={handleEliminaArticoloSubmit}
                        >
                            <label>ID dell'articolo da eliminare</label>
                            <input type="text" name="Id" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.eliminaArticolo === "success"
                                        ? "success"
                                        : buttonStatus.eliminaArticolo === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Elimina Articolo
                            </button>
                        </form>
                    </div>
                </div>

                {/* PbD */}
                <div className="modificaContainer">
                    <h1>Privacy by Design</h1>
                    <div className="modifica">
                        <h3>Modifica PbD Esistente</h3>
                        <form
                            ref={modificaPbDForm}
                            onSubmit={handleModificaPbDSubmit}
                        >
                            <label>ID della PbD da modificare</label>
                            <input type="text" name="Id" required />
                            <label>Nuovo Nome</label>
                            <input type="text" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.modificaPbD === "success"
                                        ? "success"
                                        : buttonStatus.modificaPbD === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Modifica PbD
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuova PbD</h3>
                        <form
                            ref={inserisciPbDForm}
                            onSubmit={handleInserisciPbDSubmit}
                        >
                            <label>Nome della nuova PbD</label>
                            <input type="text" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.inserisciPbD === "success"
                                        ? "success"
                                        : buttonStatus.inserisciPbD === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Inserisci PbD
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina PbD Esistente</h3>
                        <form
                            ref={eliminaPbDForm}
                            onSubmit={handleEliminaPbDSubmit}
                        >
                            <label>ID della PbD da eliminare</label>
                            <input type="text" name="Id" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.eliminaPbD === "success"
                                        ? "success"
                                        : buttonStatus.eliminaPbD === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Elimina PbD
                            </button>
                        </form>
                    </div>
                </div>

                {/* ISO */}
                <div className="modificaContainer">
                    <h1>Fasi ISO</h1>
                    <div className="modifica">
                        <h3>Modifica fase ISO Esistente</h3>
                        <form
                            ref={modificaISOForm}
                            onSubmit={handleModificaISOSubmit}
                        >
                            <label>ID della fase ISO da modificare</label>
                            <input type="text" name="Id" required />
                            <label>Nuovo Nome</label>
                            <input type="text" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.modificaISO === "success"
                                        ? "success"
                                        : buttonStatus.modificaISO === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Modifica ISO
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuova ISO</h3>
                        <form
                            ref={inserisciISOForm}
                            onSubmit={handleInserisciISOSubmit}
                        >
                            <label>ID della nuova ISO</label>
                            <input type="text" name="Id" required />
                            <label>Nome della nuova ISO</label>
                            <input type="text" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.inserisciISO === "success"
                                        ? "success"
                                        : buttonStatus.inserisciISO === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Inserisci ISO
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina ISO Esistente</h3>
                        <form
                            ref={eliminaISOForm}
                            onSubmit={handleEliminaISOSubmit}
                        >
                            <label>ID della ISO da eliminare</label>
                            <input type="text" name="Id" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.eliminaISO === "success"
                                        ? "success"
                                        : buttonStatus.eliminaISO === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Elimina ISO
                            </button>
                        </form>
                    </div>
                </div>

                {/* OWASP */}
                <div className="modificaContainer">
                    <h1>Fasi OWASP</h1>
                    <div className="modifica">
                        <h3>Modifica fase OWASP Esistente</h3>
                        <form
                            ref={modificaOWASPForm}
                            onSubmit={handleModificaOWASPSubmit}
                        >
                            <label>ID della fase OWASP da modificare</label>
                            <input type="text" name="Id" required />
                            <label>Nuovo Nome</label>
                            <input type="text" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.modificaOWASP === "success"
                                        ? "success"
                                        : buttonStatus.modificaOWASP === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Modifica OWASP
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuova OWASP</h3>
                        <form
                            ref={inserisciOWASPForm}
                            onSubmit={handleInserisciOWASPSubmit}
                        >
                            <label>Nome della nuova OWASP</label>
                            <input type="text" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.inserisciOWASP === "success"
                                        ? "success"
                                        : buttonStatus.inserisciOWASP === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Inserisci OWASP
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina OWASP Esistente</h3>
                        <form
                            ref={eliminaOWASPForm}
                            onSubmit={handleEliminaOWASPSubmit}
                        >
                            <label>ID della OWASP da eliminare</label>
                            <input type="text" name="Id" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={
                                    buttonStatus.eliminaOWASP === "success"
                                        ? "success"
                                        : buttonStatus.eliminaOWASP === "error"
                                        ? "error"
                                        : "button"
                                }
                            >
                                Elimina OWASP
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModificaPKBPage;
