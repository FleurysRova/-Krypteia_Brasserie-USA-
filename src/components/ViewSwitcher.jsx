// src/components/ViewSwitcher.js

import React from 'react';
import '../pages/HomePage.css'; // S'assure que les styles sont bien chargés

// Les noms des props correspondent maintenant à ce qui est passé depuis AppHeader (et App.js)
function ViewSwitcher({ viewMode, setViewMode }) {
    return (
        <div className="view-switcher-container">
            <button
                className={`view-switcher-button ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
                aria-pressed={viewMode === 'map'} // Bonne pratique d'accessibilité
            >
                Carte
            </button>
            <button
                className={`view-switcher-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'} // Bonne pratique d'accessibilité
            >
                Liste
            </button>
        </div>
    );
}

export default ViewSwitcher;