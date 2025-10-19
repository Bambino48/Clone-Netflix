/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category, type, language }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    // Configuration TMDB
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjE0Y2NhYmVmYjhhYTVlMGY3MzRlZDkxNWZkYjcwZCIsIm5iZiI6MTc2MDc0Mjc4OS40MzgwMDAyLCJzdWIiOiI2OGYyY2Q4NWYwZDU3YTM3YzMzOTEyOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zcoJsNzPpvgNohIf29KreAWz5DwI23yHVn5HT9MZskc",
        },
    };

    // Liste des endpoints possibles
    const endpoints = {
        now_playing: "movie/now_playing",
        popular: "movie/popular",
        top_rated: "movie/top_rated",
        upcoming: "movie/upcoming",
        trending: "trending/all/week",
        tv_popular: "tv/popular",
        tv_top_rated: "tv/top_rated",
        tv_airing_today: "tv/airing_today",
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    };

    useEffect(() => {
        let url = "";

        if (language) {
            // 🔹 Mode "browse by language"
            url = `https://api.themoviedb.org/3/discover/movie?with_original_language=${language}&page=1`;
        } else {
            // 🔹 Mode normal basé sur la catégorie
            const endpoint = endpoints[category] || endpoints.now_playing;
            url = `https://api.themoviedb.org/3/${endpoint}?language=en-US&page=1`;
        }

        fetch(url, options)
            .then((res) => res.json())
            .then((res) => {
                if (res && res.results) {
                    setApiData(res.results);
                }
            })
            .catch((err) => console.error(err));

        cardsRef.current?.addEventListener("wheel", handleWheel);
        return () => {
            cardsRef.current?.removeEventListener("wheel", handleWheel);
        };
    }, [category, language]);

    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on Netflix"}</h2>

            <div className="card-list" ref={cardsRef}>
                {apiData.length > 0 ? (
                    apiData.map((card, index) => {
                        const name = card.title || card.original_title || card.name;
                        const imagePath = card.backdrop_path || card.poster_path;
                        return (
                            <Link
                                to={`/player/${type || (category?.includes("tv") ? "tv" : "movie")}/${card.id}`}
                                className="card"
                                key={index}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${imagePath}`}
                                    alt={name}
                                />
                                <p>{name}</p>
                            </Link>
                        );
                    })
                ) : (
                    <p style={{ color: "gray" }}>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default TitleCards;
