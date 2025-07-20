import React from 'react';
import { Link } from 'react-router-dom';
// Importez HomePage.css pour réutiliser les styles de navigation si vous le souhaitez,
// ou créez un AppHeader.css si vous voulez des styles spécifiques au header global.
import '../pages/HomePage.css'; // Réutiliser les styles existants

function AppHeader() {
    return (
        <header className="homepage-header"> {/* Réutilise la classe du header de HomePage */}
            <h1>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <span role="img" aria-label="bière">🍺</span> Open Brewery Explorer
                </Link>
            </h1>
            <nav className="homepage-nav">
                <Link to="/" className="homepage-nav-link">Accueil</Link>
                <Link to="/breweries" className="homepage-nav-link">Explorer les Brasseries</Link>
                <Link to="/about" className="homepage-nav-link">À Propos</Link>
            </nav>
        </header>
    );
}

export default AppHeader;