
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';
import BreweryDetails from './components/BreweryDetails';
import BreweryMap from './components/BreweryMap';
import BreweryList from './components/BreweryList';
import PaginationControls from './components/PaginationControls';
import HomePage from './pages/HomePage';

// Fix pour les icônes Leaflet (doit être global)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ITEMS_PER_PAGE = 50;

// Composant racine de l'application avec les routes et le layout global
function App() {
    // **** Les états globaux remontent ici dans App.js ****
    const [breweries, setBreweries] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // L'état de recherche est MAINTENANT ICI
    const [viewMode, setViewMode] = useState('map'); // L'état du ViewSwitcher est MAINTENANT ICI
    const [selectedBrewery, setSelectedBrewery] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const searchTimeoutRef = useRef(null);

    // La fonction de récupération des données est maintenant globale
    const fetchBreweries = async (page, name = searchTerm) => {
        setLoading(true);
        try {
            const params = {
                page: page,
                per_page: ITEMS_PER_PAGE,
            };
            if (name) {
                params.by_name = name;
            }

            const response = await axios.get('https://api.openbrewerydb.org/v1/breweries', { params });
            setBreweries(response.data);
            setHasMore(response.data.length === ITEMS_PER_PAGE);

        } catch (error) {
            console.error("Erreur lors de la récupération des brasseries:", error);
            setBreweries([]);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    // Effect pour gérer la recherche avec debounce (déclenchée par searchTerm global)
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            setCurrentPage(1); // Réinitialise la pagination pour une nouvelle recherche
            fetchBreweries(1, searchTerm);
        }, 500);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchTerm]); // Déclencheur : changement du terme de recherche

    // Effect pour gérer la pagination (déclenchée par currentPage global)
    useEffect(() => {
        if (!searchTerm) {
             fetchBreweries(currentPage);
        } else {
             fetchBreweries(currentPage, searchTerm);
        }
    }, [currentPage]); // Déclencheur : changement de page


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && (hasMore || newPage < currentPage)) {
            setCurrentPage(newPage);
            setSelectedBrewery(null);
        }
    };

    const breweriesWithCoords = breweries.filter(brewery =>
        brewery.latitude && brewery.longitude &&
        !isNaN(parseFloat(brewery.latitude)) && !isNaN(parseFloat(brewery.longitude))
    );

    return (
        <Router>
            <AppHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            {/* Main content area that changes based on the route */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* Le composant BreweryExplorer ne gère plus ses propres états */}
                    {/* Il reçoit maintenant toutes les données et fonctions via les props de App.js */}
                    <Route
                        path="/breweries"
                        element={
                            <BreweryExplorer
                                breweries={breweries}
                                selectedBrewery={selectedBrewery}
                                setSelectedBrewery={setSelectedBrewery}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                loading={loading}
                                hasMore={hasMore}
                                handlePageChange={handlePageChange}
                                breweriesWithCoords={breweriesWithCoords}
                                viewMode={viewMode} // viewMode et setViewMode sont passés pour les vues carte/liste
                                setViewMode={setViewMode}
                            />
                        }
                    />
                    <Route path="/about" element={
                        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '20px auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <h2 style={{ color: '#0056b3', borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px' }}>À Propos de cette Application</h2>
                            <p>Ceci est une page d'exemple pour "À Propos".</p>
                            <p>Vous pouvez ajouter plus de détails sur le projet, l'équipe, les technologies, etc.</p>
                        </div>
                    } />
                </Routes>
            </div>

            <AppFooter />
        </Router>
    );
}

// Composant BreweryExplorer modifié pour recevoir les props (il n'a plus ses propres useState)
function BreweryExplorer({ breweries, selectedBrewery, setSelectedBrewery, currentPage, loading, hasMore, handlePageChange, breweriesWithCoords, viewMode, setViewMode }) {
    // Les états et les fonctions fetchBreweries/handlePageChange sont maintenant gérés dans App.js
    // searchTimeoutRef et searchTerm/setSearchTerm ne sont plus dans ce composant
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Le h1 a été déplacé dans AppHeader pour la consistance */}
            {/* La SearchBar et le ViewSwitcher sont dans AppHeader */}

            {loading && <p style={{ textAlign: 'center', color: '#555' }}>Chargement des brasseries...</p>}

            {selectedBrewery && (
                <BreweryDetails
                    brewery={selectedBrewery}
                    onClose={() => setSelectedBrewery(null)}
                />
            )}

            {/* Le ViewSwitcher n'est plus ici car il est dans AppHeader */}
            {/* Cependant, BreweryExplorer utilise toujours viewMode pour afficher la carte ou la liste */}
            {viewMode === 'map' && (
                <BreweryMap
                    breweries={breweriesWithCoords}
                    setSelectedBrewery={setSelectedBrewery}
                />
            )}

            {viewMode === 'list' && (
                <>
                    <BreweryList
                        breweries={breweries}
                        setSelectedBrewery={setSelectedBrewery}
                        loading={loading}
                    />
                    <PaginationControls
                        currentPage={currentPage}
                        hasMore={hasMore}
                        loading={loading}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}


export default App;