// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Gardez l'import des styles pour le contenu principal !

function HomePage() {
    return (
        <div className="homepage-main-content" style={{ flexGrow: 1 }}> {/* Ajout de flexGrow pour bien s'étirer */}
            <section>
                <h2 className="homepage-section-title">À Propos de l'Application</h2>
                <p>
                    L'**Open Brewery Explorer** est votre guide interactif pour découvrir les brasseries artisanales à travers les États-Unis. Que vous soyez un passionné de bière, un voyageur ou simplement curieux, cette application vous permet de localiser facilement des brasseries et d'obtenir des informations essentielles à leur sujet.
                </p>
                <p>
                    Notre application utilise les données de l'<a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer">Open Brewery DB API</a>, une source riche et constamment mise à jour sur les brasseries américaines.
                </p>
            </section>

            
        </div>
    );
}

export default HomePage;