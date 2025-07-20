// src/layouts/AppHeader.js

import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ViewSwitcher from '../components/ViewSwitcher';
import '../pages/HomePage.css'; // Assurez-vous que cette ligne est présente

function AppHeader({ onSearch, currentView, onViewChange }) {
    // La date de dernière mise à jour de l'API doit être mise à jour manuellement ici
    // ou récupérée d'une source externe si disponible et fiable.
    const lastApiUpdate = "15 juillet 2024"; // REMPLACEZ PAR LA VRAIE DATE DE MISE À JOUR DE L'API

    return (
        <header className="homepage-header">
            <div className="header-content-wrapper">
                <h1 className="header-title">
                    <Link to="/">Open Brewery Explorer</Link>
                </h1>

                <nav className="homepage-nav">
                    <Link to="/" className="homepage-nav-link">Accueil</Link>
                    {/* Ajoutez d'autres liens de navigation ici si nécessaire */}
                </nav>

                <div className="header-controls">
                    <SearchBar onSearch={onSearch} />
                    <ViewSwitcher currentView={currentView} onViewChange={onViewChange} />
                </div>

                {/* NOUVEAU: Information sur la dernière mise à jour de l'API */}
                <p className="api-update-info">
                    Dernière mise à jour de l'API: {lastApiUpdate}
                </p>
            </div>
        </header>
    );
}

export default AppHeader;