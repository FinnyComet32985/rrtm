import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import TrendingPattern from "../../components/TrendingPattern";
import "./HomePage.css";

function HomePage() {
    const { data, loading, error } = useFetch(
        "http://localhost:1337/api/showPatterns"
    );
    const [showAllPatterns, setShowAllPatterns] = useState(false);

    const handleTogglePatterns = () => {
        setShowAllPatterns(!showAllPatterns);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="homepage">
            <Header />
            <div className="trendingDiv">
                {data &&
                    data.slice(0, showAllPatterns ? data.length : 3).map((pattern) => (
                        <TrendingPattern
                            key={pattern.Id}
                            id={pattern.Id}
                            titolo={pattern.titolo}
                            sommario={pattern.sommario}
                        />
                    ))}
            </div>
            {data.length > 3 && (
                <button className="togglePatterns" onClick={handleTogglePatterns}>
                    {showAllPatterns ? "Nascondi pattern" : "Visualizza tutti i pattern"}
                </button>
            )}
        </div>
    );
}

export default HomePage;
