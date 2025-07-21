// src/layouts/AppHeader.js

import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ViewSwitcher from '../components/ViewSwitcher';
import '../pages/HomePage.css';

function AppHeader({ searchTerm, setSearchTerm, onSearchSubmit, viewMode, setViewMode }) {
    const lastApiUpdate = "15 juillet 2024"; 

    return (
        <header className="homepage-header">
            <div className="header-content-wrapper">
                <h1 className="header-title">
                    <Link to="/">Open Brewery Explorer</Link>
                </h1>

                <nav className="homepage-nav">
                    <Link to="/" className="homepage-nav-link">Accueil</Link>
                    {/* Ajout d'un lien vers la page des brasseries pour tester */}
                    <Link to="/breweries" className="homepage-nav-link">Brasseries</Link>
                    <Link to="/about" className="homepage-nav-link">À Propos</Link>
                </nav>

                <div className="header-controls">
                    {/* Passe les props correctes à SearchBar */}
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearchSubmit={onSearchSubmit} // Le nom de la prop correspond maintenant
                    />
                    {/* Passe les props correctes à ViewSwitcher */}
                    <ViewSwitcher
                        viewMode={viewMode} // Le nom de la prop correspond maintenant
                        setViewMode={setViewMode} // Le nom de la prop correspond maintenant
                    />
                </div>

                <h3 className="api-update-info">
                    Dernière mise à jour de l'API: {lastApiUpdate}
                </h3>
            </div>
        </header>
    );
}

export default AppHeader;