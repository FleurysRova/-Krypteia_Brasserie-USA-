import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Brewery } from "../types/Brewery";
import { useEffect } from "react";

// Fix des icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  breweries: Brewery[];
  onSelect: (brewery: Brewery) => void;
}

export const MapView: React.FC<Props> = ({ breweries, onSelect }) => {
  return (
    <MapContainer center={[39.5, -98.35]} zoom={4} className="h-[70vh] w-full z-0 rounded-lg">
      <TileLayer
        attribution='© OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {breweries.map(brewery => (
        brewery.latitude && brewery.longitude && (
          <Marker
            key={brewery.id}
            position={[parseFloat(brewery.latitude), parseFloat(brewery.longitude)]}
            eventHandlers={{ click: () => onSelect(brewery) }}
          >
            <Popup>{brewery.name}</Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};
