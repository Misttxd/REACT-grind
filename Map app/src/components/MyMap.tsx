import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MyMapProps {
    places: any[];
}

export default function MyMap({ places }: MyMapProps) {
    const lastPlace = places[places.length - 1];
    const center: [number, number] = lastPlace ? [lastPlace.lat, lastPlace.lon] : [49.8209, 18.2625];

    return (
        <MapContainer key={center.join(',')} center={center} zoom={10} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {places.map((place, index) => (
                <Marker key={index} position={[place.lat, place.lon]}>
                    <Popup>{place.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
