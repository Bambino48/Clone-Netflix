import React from "react";
import TitleCards from "../../components/TitleCards/TitleCards";
import "./TvShows.css";
import Footer from "../../components/Footer/Footer";

const TvShows = () => {
    return (
        <>
        <div className="tvshows-page">
            <TitleCards title="Popular TV Shows" category="tv_popular" />
            <TitleCards title="Top Rated TV Shows" category="tv_top_rated" />
            <TitleCards title="Airing Today" category="tv_airing_today" />
        </div>
        <Footer />
        </>
    );
};

export default TvShows;
