import React from "react";
import TitleCards from "../../components/TitleCards/TitleCards";
import "./NewAndPopular.css";
import Footer from "../../components/Footer/Footer";

const NewAndPopular = () => {
    return (
        <>
        <div className="new-popular-page">
            <TitleCards title="Trending Now" category="trending" />
            <TitleCards title="Now Playing" category="now_playing" />
        </div>
        <Footer />
        </>
    );
};

export default NewAndPopular;
