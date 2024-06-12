import React from "react";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import TrendingPattern from "../../components/TrendingPattern";
import "./HomePage.css";

function HomePage() {
    const { data, loading, error } = useFetch(
        "http://localhost:1337/api/showPatterns"
    );
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
                    data.map((pattern) => (
                        <TrendingPattern
                            key={pattern.Id}
                            id={pattern.Id}
                            titolo={pattern.titolo}
                            sommario={pattern.sommario}
                        />
                    ))}
            </div>
        </div>
    );
}

export default HomePage;
