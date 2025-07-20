import React from 'react';
import '../pages/HomePage.css';

function ViewSwitcher({ viewMode, setViewMode }) {
    return (
        // Conteneur principal du switch
        <div className="view-switcher-container">
            <button
                // Applique la classe 'active' si le mode est 'map'
                className={`view-switcher-button ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
            >
                Carte
            </button>
            <button
                // Applique la classe 'active' si le mode est 'list'
                className={`view-switcher-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
            >
                Tableau
            </button>
        </div>
    );
}

export default ViewSwitcher;