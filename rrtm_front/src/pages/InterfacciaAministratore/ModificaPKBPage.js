import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useAuth } from "../loginPage/AuthContext";
import "./ModificaPKBPage.css";

function ModificaPKBPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { user, logout } = useAuth();
    const [notify, setNotify] = useState(false);

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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
        const jsonResponse = await result.json();
        if (notify) {
            navigate("/InserimentoNotifichePage");
        }
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
                            <label>Id del pattern da modificare</label>
                            <input type="text" name="Id" required></input>
                            <label>Nuovo Titolo</label>
                            <input type="text" name="titolo" required></input>
                            <label>Nuovo Sommario</label>
                            <input type="text" name="sommario"></input>
                            <label>Nuovo Contesto</label>
                            <input type="text" name="contesto"></input>
                            <label>Nuovo Problema</label>
                            <input type="text" name="problema"></input>
                            <label>Nuova Soluzione</label>
                            <input type="text" name="soluzione"></input>
                            <label>Nuovo Esempio</label>
                            <input type="text" name="esempio"></input>
                            <div className="notificaCk">
                                <input
                                    type="checkbox"
                                    checked={notify}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <label>vuoi inserire una notifica?</label>
                            </div>
                            <button type="submit">Modifica Pattern</button>
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
                            <button type="submit">Inserisci Pattern</button>
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
                            <button type="submit">Elimina Pattern</button>
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
                            <button type="submit">Modifica Strategia</button>
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
                            <button type="submit">Inserisci Strategia</button>
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
                            <button type="submit">Elimina Strategia</button>
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
                            <button type="submit">
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
                            <button type="submit">
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
                            <button type="submit">Elimina Vulnerabilita</button>
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
                            <button type="submit">Modifica Articolo</button>
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
                            <button type="submit">Inserisci Articolo</button>
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
                            <button type="submit">Elimina Articolo</button>
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
                            <button type="submit">Modifica PbD</button>
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
                            <button type="submit">Inserisci PbD</button>
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
                            <button type="submit">Elimina PbD</button>
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
                            <button type="submit">Modifica ISO</button>
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
                            <button type="submit">Inserisci ISO</button>
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
                            <button type="submit">Elimina ISO</button>
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
                            <button type="submit">Modifica OWASP</button>
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
                            <button type="submit">Inserisci OWASP</button>
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
                            <button type="submit">Elimina OWASP</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModificaPKBPage;
