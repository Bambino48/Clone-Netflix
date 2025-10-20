/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages et composants
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import Movies from "./pages/Movie/Movie";
import TvShows from "./pages/TvShows/TvShows";
import NewAndPopular from "./pages/NewAndPopular.jsx/NewAndPopular";
import MyList from "./pages/MyList/MyList";
import BrowseByLanguages from "./pages/BrowseByLanguages/BrowseByLanguages";
import PlayerWrapper from "./components/PlayerWrapper/PlayerWrapper";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie l'utilisateur dans localStorage
    const email = localStorage.getItem("userEmail");

    if (email) {
      console.log("✅ Logged In");
      navigate('/');
    } else {
      console.log("🚪 Logged Out");
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />

      {/* On affiche la Navbar sur toutes les pages sauf la page de connexion */}
      {window.location.pathname !== "/login" && <Navbar />}

      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Catégories liées à TheMovieDB */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/new-and-popular" element={<NewAndPopular />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/browse-by-languages" element={<BrowseByLanguages />} />

        {/* Page du lecteur vidéo */}
        <Route path="/player/:type/:id" element={<PlayerWrapper />} />

        {/* Page de connexion */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
