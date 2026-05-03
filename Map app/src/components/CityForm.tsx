import { useState } from 'react';
import { IonButton, IonInput } from '@ionic/react';

interface CityFormProps {
    onAddPlace: (place: any) => void;
}

export default function CityForm({ onAddPlace }: CityFormProps) {
    const [city, setCity] = useState('');

    async function searchCity() {
        if (city.trim() === '') {
            alert('Zadejte název místa');
            return;
        }

        const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(city);
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            alert('Místo nebylo nalezeno');
            return;
        }

        const firstPlace = data[0];

        const newPlace = {
            name: firstPlace.display_name,
            lat: parseFloat(firstPlace.lat),
            lon: parseFloat(firstPlace.lon),
        };

        onAddPlace(newPlace);
        setCity('');
    }

    return (
        <>
            <IonInput
                fill="outline"
                placeholder="Zadejte název místa"
                value={city}
                onIonInput={(e) => setCity(String(e.detail.value))}
            />
            <IonButton expand="block" onClick={searchCity}>
                PŘIDAT MÍSTO
            </IonButton>
        </>
    );
}
