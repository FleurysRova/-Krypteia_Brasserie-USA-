import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';
import BreweryDetails from './components/BreweryDetails';
import BreweryMap from './components/BreweryMap';
import BreweryList from './components/BreweryList';
import PaginationControls from './components/PaginationControls';
import HomePage from './pages/HomePage';

// Importez les fonctions de votre nouveau fichier de service
import { fetchBreweries as apiFetchBreweries, hasMoreData } from './services/api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function AppContent() {
    const navigate = useNavigate();

    const [breweries, setBreweries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearchQuery, setActiveSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [selectedBrewery, setSelectedBrewery] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const searchTimeoutRef = useRef(null);

    const handleSearchSubmit = (term) => {
        setActiveSearchQuery(term);
        setCurrentPage(1);
        setHasMore(true);
        navigate('/breweries');
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        navigate('/breweries');
    };

    // La fonction de récupération des brasseries utilise maintenant le service
    const getBreweries = async (page, query) => {
        setLoading(true);
        try {
            const data = await apiFetchBreweries(page, query); // Appel au service
            setBreweries(data);
            setHasMore(hasMoreData(data)); // Utilise la fonction hasMoreData du service
        } catch (error) {
            console.error("Erreur lors de la récupération des brasseries dans le composant:", error);
            setBreweries([]);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBreweries(currentPage, activeSearchQuery);
        window.scrollTo(0, 0);
    }, [currentPage, activeSearchQuery]);

    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            if (searchTerm !== activeSearchQuery) {
                setActiveSearchQuery(searchTerm);
                setCurrentPage(1);
                setHasMore(true);
            }
        }, 500);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchTerm, activeSearchQuery]);

    const handlePageChange = (newPage) => {
        // La logique est robuste ici : on ne change que si la page est valide et s'il y a plus de données pour avancer.
        if (newPage >= 1 && (newPage < currentPage || hasMore)) {
            setCurrentPage(newPage);
            setSelectedBrewery(null);
            navigate('/breweries');
        }
    };

    const breweriesWithCoords = breweries.filter(brewery =>
        brewery.latitude && brewery.longitude &&
        !isNaN(parseFloat(brewery.latitude)) && !isNaN(parseFloat(brewery.longitude))
    );

    return (
        <>
            <AppHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearchSubmit={handleSearchSubmit}
                viewMode={viewMode}
                setViewMode={handleViewModeChange}
            />

            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/breweries"
                        element={
                            <BreweryExplorer
                                breweries={breweries}
                                selectedBrewery={selectedBrewery}
                                setSelectedBrewery={setSelectedBrewery}
                                currentPage={currentPage}
                                loading={loading}
                                hasMore={hasMore}
                                handlePageChange={handlePageChange}
                                breweriesWithCoords={breweriesWithCoords}
                                viewMode={viewMode}
                            />
                        }
                    />
                    <Route path="/about" element={
                        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '20px auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <h2>À Propos de cette Application</h2>
                            <p>Ceci est une page d'exemple pour "À Propos".</p>
                            <p>Vous pouvez ajouter plus de détails sur le projet, l'équipe, les technologies, etc.</p>
                        </div>
                    } />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </div>

            <AppFooter />
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function BreweryExplorer({ breweries, selectedBrewery, setSelectedBrewery, currentPage, loading, hasMore, handlePageChange, breweriesWithCoords, viewMode }) {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {loading && <p style={{ textAlign: 'center', color: '#555' }}>Chargement des brasseries...</p>}
            {selectedBrewery && (
                <BreweryDetails
                    brewery={selectedBrewery}
                    onClose={() => setSelectedBrewery(null)}
                />
            )}

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

            {!loading && breweries.length === 0 && (
                <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
                    Aucune brasserie trouvée pour votre recherche.
                </p>
            )}
        </div>
    );
}

export default App;