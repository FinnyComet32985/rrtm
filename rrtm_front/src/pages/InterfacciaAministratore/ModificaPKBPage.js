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

        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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
        if (!result.ok || result.status === 400) {
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

                            <label htmlFor="esempio">Nuovo Esempio</label>
                            <input type="text" name="esempio"></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label htmlFor="notifica">vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.modificaPattern)}
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
                            <label htmlFor="titolo">Titolo del nuovo Pattern</label>
                            <input type="text" name="titolo" required></input>
                            <label htmlFor="sommario">Sommario del nuovo Pattern</label>
                            <input type="text" name="sommario"></input>
                            <label htmlFor="contesto">Contesto del nuovo Pattern</label>
                            <input type="text" name="contesto"></input>
                            <label htmlFor="problema">Problema del nuovo Pattern</label>
                            <input type="text" name="problema"></input>
                            <label htmlFor="soluzione">Soluzione del nuovo Pattern</label>
                            <input type="text" name="soluzione"></input>
                            <label htmlFor="esempio">Esempio del nuovo Pattern</label>
                            <input type="text" name="esempio"></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label htmlFor="notifica">vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.inserisciPattern)}
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
                            <label htmlFor="patternId">Id del pattern da eliminare</label>
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
                                <label htmlFor="notifica">vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.eliminaPattern)}
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
                            <label htmlFor="Id">Id della strategia da modificare</label>
                            <input type="text" name="Id" required></input>
                            <label htmlFor="nome">Nuovo Nome</label>
                            <input type="text" name="nome" required></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label htmlFor="notifica">vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.modificaStrategia)}
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
                            <label htmlFor="nome">Nome della nuova Strategia</label>
                            <input type="text" name="nome" required></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label htmlFor="notifica">vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.inserisciStrategia)}
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
                            <label htmlFor="strategyId">Id della strategia da eliminare</label>
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
                                <label htmlFor="notifica">vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.eliminaStrategia)}
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
                            <label htmlFor="Id">Id della Vulnerabilita da modificare</label>
                            <input type="text" name="Id" required></input>
                            <label htmlFor="cwe">Nuovo numero CWE</label>
                            <input type="text" name="cwe" required></input>
                            <label htmlFor="titolo">Nuovo Titolo</label>
                            <input type="text" name="titolo" required></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label htmlFor="notifica">vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.modificaVulnerabilita)}
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
                            <label htmlFor="cwe">Numero CWE della nuova Vulnerabilita</label>
                            <input type="text" name="cwe" required></input>
                            <label htmlFor="titolo">Titolo della nuova Vulnerabilita</label>
                            <input type="text" name="titolo" required></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label htmlFor="notifica">vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.inserisciVulnerabilita)}
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
                            <label htmlFor="vulnerabilityId">Id della vulnerabilita da eliminare</label>
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
                                <label htmlFor="notifica">vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.eliminaVulnerabilita)}
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
                        <form ref={modificaArticoloForm} onSubmit={handleModificaArticoloSubmit}>
                            <label htmlFor="modificaId">ID dell'articolo da modificare</label>
                            <input type="text" id="modificaId" name="Id" required />
                            <label htmlFor="modificaTitolo">Nuovo Titolo</label>
                            <input type="text" id="modificaTitolo" name="titolo" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.modificaArticolo)}
                            >
                                Modifica Articolo
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuovo Articolo</h3>
                        <form ref={inserisciArticoloForm} onSubmit={handleInserisciArticoloSubmit}>
                            <label htmlFor="inserisciId">ID del nuovo Articolo</label>
                            <input type="text" id="inserisciId" name="Id" required />
                            <label htmlFor="inserisciTitolo">Titolo del nuovo Articolo</label>
                            <input type="text" id="inserisciTitolo" name="titolo" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.inserisciArticolo)}
                            >
                                Inserisci Articolo
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina Articolo Esistente</h3>
                        <form ref={eliminaArticoloForm} onSubmit={handleEliminaArticoloSubmit}>
                            <label htmlFor="eliminaId">ID dell'articolo da eliminare</label>
                            <input type="text" id="eliminaId" name="Id" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.eliminaArticolo)}
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
                        <form ref={modificaPbDForm} onSubmit={handleModificaPbDSubmit}>
                            <label htmlFor="modificaPbDId">ID della PbD da modificare</label>
                            <input type="text" id="modificaPbDId" name="Id" required />
                            <label htmlFor="modificaPbDNome">Nuovo Nome</label>
                            <input type="text" id="modificaPbDNome" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.modificaPbD)}
                            >
                                Modifica PbD
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuova PbD</h3>
                        <form ref={inserisciPbDForm} onSubmit={handleInserisciPbDSubmit}>
                            <label htmlFor="inserisciPbDNome">Nome della nuova PbD</label>
                            <input type="text" id="inserisciPbDNome" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.inserisciPbD)}
                            >
                                Inserisci PbD
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina PbD Esistente</h3>
                        <form ref={eliminaPbDForm} onSubmit={handleEliminaPbDSubmit}>
                            <label htmlFor="eliminaPbDId">ID della PbD da eliminare</label>
                            <input type="text" id="eliminaPbDId" name="Id" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.eliminaPbD)}
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
                        <form ref={modificaISOForm} onSubmit={handleModificaISOSubmit}>
                            <label htmlFor="modificaISOId">ID della fase ISO da modificare</label>
                            <input type="text" id="modificaISOId" name="Id" required />
                            <label htmlFor="modificaISONome">Nuovo Nome</label>
                            <input type="text" id="modificaISONome" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.modificaISO)}
                            >
                                Modifica ISO
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuova ISO</h3>
                        <form ref={inserisciISOForm} onSubmit={handleInserisciISOSubmit}>
                            <label htmlFor="inserisciISOId">ID della nuova ISO</label>
                            <input type="text" id="inserisciISOId" name="Id" required />
                            <label htmlFor="inserisciISONome">Nome della nuova ISO</label>
                            <input type="text" id="inserisciISONome" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.inserisciISO)}
                            >
                                Inserisci ISO
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina ISO Esistente</h3>
                        <form ref={eliminaISOForm} onSubmit={handleEliminaISOSubmit}>
                            <label htmlFor="eliminaISOId">ID della ISO da eliminare</label>
                            <input type="text" id="eliminaISOId" name="Id" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.eliminaISO)}
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
                        <form ref={modificaOWASPForm} onSubmit={handleModificaOWASPSubmit}>
                            <label htmlFor="modificaOWASPId">ID della fase OWASP da modificare</label>
                            <input type="text" id="modificaOWASPId" name="Id" required />
                            <label htmlFor="modificaOWASPNome">Nuovo Nome</label>
                            <input type="text" id="modificaOWASPNome" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.modificaOWASP)}
                            >
                                Modifica OWASP
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Inserisci nuova OWASP</h3>
                        <form ref={inserisciOWASPForm} onSubmit={handleInserisciOWASPSubmit}>
                            <label htmlFor="inserisciOWASPNome">Nome della nuova OWASP</label>
                            <input type="text" id="inserisciOWASPNome" name="nome" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.inserisciOWASP)}
                            >
                                Inserisci OWASP
                            </button>
                        </form>
                    </div>
                    <div className="modifica">
                        <h3>Elimina OWASP Esistente</h3>
                        <form ref={eliminaOWASPForm} onSubmit={handleEliminaOWASPSubmit}>
                            <label htmlFor="eliminaOWASPId">ID della OWASP da eliminare</label>
                            <input type="text" id="eliminaOWASPId" name="Id" required />
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="notifica">Vuoi inserire una notifica?</label>
                            </div>
                            <button
                                type="submit"
                                className={getButtonClass(buttonStatus.eliminaOWASP)}
                            >
                                Elimina OWASP
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

    function getButtonClass(status) {
        if (status === "success") {
            return "success";
        } else if (status === "error") {
            return "error"; /* NOSONAR */
        } else {
            return "button";
        }
    }

}
export default ModificaPKBPage;
