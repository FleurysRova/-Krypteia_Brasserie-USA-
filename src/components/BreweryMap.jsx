// src/components/BreweryMap.js

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Composant interne pour gérer la logique de la carte et du zoom
// Il a besoin d'accéder à l'instance de la carte via useMap()
function MapUpdater({ selectedBrewery }) {
    const map = useMap(); // Hook pour accéder à l'instance de la carte

    useEffect(() => {
        if (selectedBrewery && selectedBrewery.latitude && selectedBrewery.longitude) {
            const lat = parseFloat(selectedBrewery.latitude);
            const lng = parseFloat(selectedBrewery.longitude);

            if (!isNaN(lat) && !isNaN(lng)) {
                // Utilise flyTo pour une animation de zoom douce
                // Zoom level 15 est un bon niveau pour une ville/quartier
                map.flyTo([lat, lng], 15);
            }
        }
    }, [selectedBrewery, map]); // Déclencher l'effet quand selectedBrewery change ou la carte est prête

    return null; // Ce composant ne rend rien visuellement
}


function BreweryMap({ breweries, setSelectedBrewery, selectedBrewery: propSelectedBrewery }) {
    // Coordonnées de Denver, Colorado (centre par défaut)
    const defaultCenter = [39.7392, -104.9903];
    const defaultZoom = 4; // Zoom initial pour voir une grande partie des USA

    return (
        <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            style={{ height: '600px', width: '100%', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            scrollWheelZoom={true} // Permet de zoomer avec la molette de la souris
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Inclure le composant MapUpdater pour le zoom programmé */}
            <MapUpdater selectedBrewery={propSelectedBrewery} />

            {breweries.map((brewery) => {
                const lat = parseFloat(brewery.latitude);
                const lng = parseFloat(brewery.longitude);

                // Vérifiez que les coordonnées sont valides
                if (isNaN(lat) || isNaN(lng)) {
                    return null; // Ne pas afficher le marqueur si les coordonnées sont invalides
                }

                return (
                    <Marker
                        key={brewery.id}
                        position={[lat, lng]}
                        // eventHandlers permet de gérer les événements sur le marqueur
                        eventHandlers={{
                            click: () => {
                                setSelectedBrewery(brewery); // Met à jour l'état selectedBrewery global
                            },
                        }}
                    >
                        <Popup>
                            <h3>{brewery.name}</h3>
                            <p>{brewery.street}, {brewery.city}</p>
                            {brewery.phone && <p>Téléphone: {brewery.phone}</p>}
                            {brewery.website_url && (
                                <p>
                                    <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                                        Site Web
                                    </a>
                                </p>
                            )}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}

export default BreweryMap;