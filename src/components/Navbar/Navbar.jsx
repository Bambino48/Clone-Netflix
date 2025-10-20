import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navRef = useRef(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        "New show added: Stranger Things",
        "Your subscription will renew tomorrow",
        "New movie recommendation: The Matrix",
    ]);

    const location = useLocation();
    const navigate = useNavigate();
    const hideNavbarOnPlayer = location.pathname.startsWith("/player");

    const TMDB_API_KEY =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjE0Y2NhYmVmYjhhYTVlMGY3MzRlZDkxNWZkYjcwZCIsIm5iZiI6MTc2MDc0Mjc4OS40MzgwMDAyLCJzdWIiOiI2OGYyY2Q4NWYwZDU3YTM3YzMzOTEyOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zcoJsNzPpvgNohIf29KreAWz5DwI23yHVn5HT9MZskc";

    // 🔹 Scroll effect sécurisé
    useEffect(() => {
        const handleScroll = () => {
            if (!navRef.current) return;
            if (window.scrollY >= 80) {
                navRef.current.classList.add("nav-dark");
            } else {
                navRef.current.classList.remove("nav-dark");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 🔹 Recherche dynamique
    useEffect(() => {
        if (!searchQuery) {
            setSearchResults([]);
            return;
        }

        const controller = new AbortController();

        fetch(
            `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
                searchQuery
            )}&language=en-US&page=1&include_adult=false`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                },
                signal: controller.signal,
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data && data.results)
                    setSearchResults(data.results.slice(0, 5)); // top 5 résultats
            })
            .catch((err) => console.error("Erreur recherche TMDB :", err));

        return () => controller.abort();
    }, [searchQuery]);

    const handleSearchSelect = (item) => {
        setSearchQuery("");
        setSearchResults([]);
        setSearchOpen(false);
        const type = item.media_type === "movie" ? "movie" : "tv";
        navigate(`/player/${type}/${item.id}`);
    };

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) setNotifications([]);
    };

    // 🔹 Déconnexion avec redirection
    const handleLogout = () => {
        logout(() => navigate("/login")); // ✅ redirection immédiate
    };

    if (hideNavbarOnPlayer) return null;

    return (
        <div ref={navRef} className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" />
                <ul>
                    <li>
                        <NavLink to="/" end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tv-shows">Tv Shows</NavLink>
                    </li>
                    <li>
                        <NavLink to="/movies">Movies</NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-and-popular">New & Popular</NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-list">My List</NavLink>
                    </li>
                    <li>
                        <NavLink to="/browse-by-languages">Browse by languages</NavLink>
                    </li>
                </ul>
            </div>

            <div className="navbar-right">
                {/* 🔹 Search */}
                <div className="search-container">
                    <img
                        src={search_icon}
                        alt="Search"
                        className="icons"
                        onClick={() => setSearchOpen(!searchOpen)}
                    />
                    {searchOpen && (
                        <div className="search-dropdown">
                            <input
                                type="text"
                                placeholder="Titles, people, genres"
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.map((item) => {
                                        const name = item.title || item.name;
                                        const image =
                                            item.poster_path || item.backdrop_path;
                                        return (
                                            <div
                                                key={item.id}
                                                className="search-item"
                                                onClick={() => handleSearchSelect(item)}
                                            >
                                                {image && (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w92/${image}`}
                                                        alt={name}
                                                    />
                                                )}
                                                <span>{name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <p>Children</p>

                {/* 🔹 Notifications */}
                <div
                    className="notification-container"
                    style={{ position: "relative" }}
                >
                    <img
                        src={bell_icon}
                        alt="Notifications"
                        className="icons"
                        onClick={handleNotificationClick}
                    />
                    {notifications.length > 0 && (
                        <span className="notification-badge">
                            {notifications.length}
                        </span>
                    )}
                    {showNotifications && (
                        <div className="notification-dropdown">
                            {notifications.length > 0 ? (
                                notifications.map((note, idx) => <p key={idx}>{note}</p>)
                            ) : (
                                <p>No new notifications</p>
                            )}
                        </div>
                    )}
                </div>

                {/* 🔹 Profile */}
                <div
                    className="navbar-profile"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <img src={profile_img} alt="Profile" className="profile" />
                    <img src={caret_icon} alt="Caret" />
                    {dropdownOpen && (
                        <div className="dropdown">
                            <p onClick={handleLogout}>Sign Out of Netflix</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
