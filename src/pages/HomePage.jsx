// src/pages/HomePage.js

import React from 'react';
import '../pages/HomePage.css'; // Assurez-vous d'avoir vos styles pour la page d'accueil

// HomePage n'a plus besoin de recevoir les props de brasseries
function HomePage() {
    return (
        <main className="homepage-main-content">
            <h2 className="homepage-title">Bienvenue sur Open Brewery Explorer</h2>
            <p className="homepage-description">
                Explorez des milliers de brasseries à travers le monde.
                Utilisez la barre de recherche ci-dessus pour trouver une brasserie par nom,
                ou changez le mode d'affichage pour voir les résultats sur une carte ou sous forme de liste.
            </p>
            {/* Vous pouvez ajouter une image, des liens vers les fonctionnalités principales ici */}
            {/* Par exemple, si vous voulez un bouton "Commencer l'exploration" */}
            {/* <Link to="/breweries" className="homepage-button">Commencer l'exploration</Link> */}
        </main>
    );
}

export default HomePage;