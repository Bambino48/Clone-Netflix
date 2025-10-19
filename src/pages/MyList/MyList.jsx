import React, { useState, useEffect } from "react";
import "./MyList.css";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const MyList = () => {
    const [myMovies, setMyMovies] = useState([]);

    useEffect(() => {
        // ✅ Simulation locale : à remplacer par ton vrai système de favoris plus tard
        const savedList = JSON.parse(localStorage.getItem("myList")) || [];
        setMyMovies(savedList);
    }, []);

    return (
        <>
        <div className="mylist-page">
            <h2>My List</h2>
            {myMovies.length > 0 ? (
                <div className="mylist-cards">
                    {myMovies.map((movie, index) => (
                        <div key={index} className="mylist-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                alt={movie.title}
                            />
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-list">Your list is empty 😅</p>
            )}

            {/* Optionnel : affichage dynamique avec API TMDB */}
            <div className="suggestions">
                <TitleCards title="Popular Picks" category="popular" />
            </div>
        </div>
        <Footer />
        </>
    );
};

export default MyList;
