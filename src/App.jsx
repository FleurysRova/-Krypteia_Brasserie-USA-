import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import de nos composants de layout et de page
import AppHeader from './layouts/AppHeader'; // Nouveau composant Header
import AppFooter from './layouts/AppFooter'; // Nouveau composant Footer
import SearchBar from './components/SearchBar';
import ViewSwitcher from './components/ViewSwitcher';
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

const ITEMS_PER_PAGE = 2;

// Composant pour l'explorateur de brasseries (qui sera rendu par une route)
function BreweryExplorer() {
    const [breweries, setBreweries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('map');
    const [selectedBrewery, setSelectedBrewery] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const searchTimeoutRef = useRef(null);

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

    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            setCurrentPage(1);
            fetchBreweries(1, searchTerm);
        }, 500);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchTerm]);

    useEffect(() => {
        if (!searchTerm) {
            fetchBreweries(currentPage);
        }
    }, [currentPage]);

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
        // Le contenu spécifique à la page de l'explorateur, sans son propre header/footer
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginTop: '0' }}>
                <span role="img" aria-label="bière">🍺</span> Découverte de Brasseries aux États-Unis
            </h1>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />

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
        </div>
    );
}

// Composant racine de l'application avec les routes et le layout global
function App() {
    return (
        <Router>
            {/* Le Header sera affiché sur TOUTES les pages */}
            <AppHeader />

            {/* Main content area that changes based on the route */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> {/* Permet au contenu de s'étirer */}
                <Routes>
                    {/* Route pour la page d'accueil */}
                    <Route path="/" element={<HomePage />} />
                    {/* Route pour l'explorateur de brasseries */}
                    <Route path="/breweries" element={<BreweryExplorer />} />
                    {/* Route pour la page "À Propos" (vous pouvez la créer plus tard) */}
                    <Route path="/about" element={
                        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '20px auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <h2 style={{ color: '#0056b3', borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px' }}>À Propos de cette Application</h2>
                            <p>Ceci est une page d'exemple pour "À Propos".</p>
                            <p>Vous pouvez ajouter plus de détails sur le projet, l'équipe, les technologies, etc.</p>
                        </div>
                    } />
                </Routes>
            </div>


            {/* Le Footer sera affiché sur TOUTES les pages */}
            <AppFooter />
        </Router>
    );
}

export default App;