import React from "react";
import TitleCards from "../../components/TitleCards/TitleCards";
import "./Movie.css";

const Movies = () => {
    return (
        <div className="movies-page">
            <TitleCards title="Popular Movies" category="popular" />
            <TitleCards title="Top Rated Movies" category="top_rated" />
            <TitleCards title="Upcoming Movies" category="upcoming" />
        </div>
    );
};

export default Movies;
