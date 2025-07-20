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

            <section style={{ marginTop: '40px' }}>
                <h2 className="homepage-section-title">Utilité et Fonctionnalités Clés</h2>
                <p>
                    Cette application est conçue pour simplifier votre recherche de brasseries et vous offrir une expérience utilisateur agréable :
                </p>
                <ul>
                    <li>
                        **Découverte Visuelle :** Grâce à une **carte interactive** (alimentée par React-Leaflet), vous pouvez visualiser l'emplacement exact de chaque brasserie, planifier vos itinéraires et explorer les options à proximité.
                    </li>
                    <li>
                        **Informations Détaillées :** Obtenez rapidement des détails comme le **type de brasserie** (micro, brewpub, etc.), son **adresse**, son **numéro de téléphone** et son **site web officiel**.
                    </li>
                    <li>
                        **Recherche Facile :** Une **barre de recherche** performante vous permet de trouver des brasseries spécifiques par leur nom.
                    </li>
                    <li>
                        **Flexibilité d'Affichage :** Basculez entre la **vue carte** et une **vue liste** paginée pour choisir le mode de consultation qui vous convient le mieux.
                    </li>
                    <li>
                        **Navigation Aisée :** La **pagination** assure une navigation fluide même avec un grand nombre de résultats, évitant les surcharges de données.
                    </li>
                </ul>
                <p>
                    Que vous cherchiez une petite microbrasserie locale ou une grande brasserie régionale, l'Open Brewery Explorer est l'outil qu'il vous faut pour planifier votre prochaine dégustation !
                </p>
                <Link to="/breweries" className="homepage-start-button">
                    Commencer l'Exploration !
                </Link>
            </section>
        </div>
    );
}

export default HomePage;