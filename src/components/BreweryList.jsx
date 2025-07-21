// src/components/BreweryList.js

import React from 'react';
import './BreweryList.css'; // Toujours nécessaire pour les styles

function BreweryList({ breweries, setSelectedBrewery, loading }) {
    if (loading) {
        return <p className="brewery-list-message">Chargement des brasseries...</p>;
    }

    if (!breweries || breweries.length === 0) {
        return <p className="brewery-list-message">Aucune brasserie trouvée.</p>;
    }

    return (
        <div className="brewery-list-container"> {/* Conteneur général */}
            <h2 className="brewery-list-title">Liste des Brasseries</h2>
            <ul className="brewery-ul"> {/* La liste non ordonnée */}
                {breweries.map(brewery => (
                    <li key={brewery.id} className="brewery-list-item">
                        <div className="brewery-info-content">
                            <h3>{brewery.name}</h3>
                            <p><strong>Type:</strong> {brewery.brewery_type}</p>
                            <p><strong>Adresse:</strong> {brewery.street ? `${brewery.street}, ` : ''}{brewery.city}, {brewery.state}, {brewery.country}</p>
                            {/* Optionnel: Affichez le téléphone si disponible */}
                            {brewery.phone && <p><strong>Téléphone:</strong> {brewery.phone}</p>}
                            {/* Optionnel: Affichez le site web si disponible */}
                            {brewery.website_url && (
                                <p>
                                    <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Visiter le site web</a>
                                </p>
                            )}
                        </div>
                        <button
                            className="view-details-button" // Classe pour le style vert
                            onClick={() => setSelectedBrewery(brewery)}
                        >
                            Voir détails
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BreweryList;