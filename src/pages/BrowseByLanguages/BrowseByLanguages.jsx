import React from "react";
import TitleCards from "../../components/TitleCards/TitleCards";
import "./BrowseByLanguage.css";
import Footer from "../../components/Footer/Footer";

const BrowseByLanguage = () => {
    // Liste des langues à afficher
    const languages = [
        { code: "en", label: "English Movies" },
        { code: "fr", label: "Films en Français" },
        { code: "es", label: "Películas en Español" },
        { code: "hi", label: "Movies in Hindi" },
        { code: "ja", label: "Japanese Movies" },
        { code: "ko", label: "Korean Movies" },
    ];

    return (
        <>
        <div className="browse-language">
            <h1 className="browse-title">Browse by Language</h1>

            {/* Boucle sur chaque langue */}
            {languages.map((lang, index) => (
                <TitleCards
                    key={index}
                    title={lang.label}
                    language={lang.code}
                    type="movie"
                />
            ))}
        </div>
        <Footer />
        </>
    );
};

export default BrowseByLanguage;
