/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
    const { id, type } = useParams(); // 🔹 type = "movie" ou "tv"
    const navigate = useNavigate();

    const [apiData, setApiData] = useState(null); // 🔹 initialisé à null

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjE0Y2NhYmVmYjhhYTVlMGY3MzRlZDkxNWZkYjcwZCIsIm5iZiI6MTc2MDc0Mjc4OS40MzgwMDAyLCJzdWIiOiI2OGYyY2Q4NWYwZDU3YTM3YzMzOTEyOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zcoJsNzPpvgNohIf29KreAWz5DwI23yHVn5HT9MZskc",
        },
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${type || "movie"}/${id}/videos?language=en-US`, options)
            .then((res) => res.json())
            .then((res) => setApiData(res.results?.[0] || null))
            .catch((err) => {
                console.error(err);
                setApiData(null);
            });
    }, [id, type]);

    if (!apiData) {
        return (
            <div className="player">
                <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
                <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
                    Video not available
                </p>
            </div>
        );
    }

    return (
        <div className="player">
            <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
            <iframe
                width="90%"
                height="90%"
                src={`https://www.youtube.com/embed/${apiData.key}`}
                title={apiData.name}
                frameBorder="0"
                allowFullScreen
            ></iframe>
            <div className="player-info">
                <p>{apiData.published_at?.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    );
};

export default Player;
