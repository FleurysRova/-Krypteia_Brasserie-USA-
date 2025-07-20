import React from 'react';
// Importez HomePage.css pour réutiliser les styles du footer
import '../pages/HomePage.css'; // Réutiliser les styles existants

function AppFooter() {
    return (
        <footer className="homepage-footer"> {/* Réutilise la classe du footer de HomePage */}
            <p>&copy; 2025 Open Brewery Explorer. Tous droits réservés.</p>
            <p>Données fournies par <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer">Open Brewery DB</a>.</p>
        </footer>
    );
}

export default AppFooter;