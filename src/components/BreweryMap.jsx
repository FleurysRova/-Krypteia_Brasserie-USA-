import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function BreweryMap({ breweries, setSelectedBrewery }) {
    return (
        <MapContainer
            center={[39.8283, -98.5795]} // Centre des États-Unis
            zoom={4}
            style={{ height: '500px', width: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {breweries.map(brewery => (
                <Marker
                    key={brewery.id}
                    position={[parseFloat(brewery.latitude), parseFloat(brewery.longitude)]}
                    eventHandlers={{
                        click: () => setSelectedBrewery(brewery),
                    }}
                >
                    <Popup>
                        <b>{brewery.name}</b><br />
                        {brewery.city}, {brewery.state_province}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default BreweryMap;