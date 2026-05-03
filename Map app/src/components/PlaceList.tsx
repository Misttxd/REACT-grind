import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList } from '@ionic/react';

interface PlaceListProps {
    places: any[];
}

export default function PlaceList({ places }: PlaceListProps) {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Uložená místa</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    {places.map((place, index) => (
                        <IonItem key={index}>
                            <IonLabel>
                                <h2>{place.name}</h2>
                                <p>
                                    Šířka: {place.lat}, Délka: {place.lon}
                                </p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonCardContent>
        </IonCard>
    );
}
