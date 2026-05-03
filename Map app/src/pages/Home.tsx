import { useState } from 'react';
import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import CityForm from '../components/CityForm';
import MyMap from '../components/MyMap';
import PlaceList from '../components/PlaceList';
import './Home.css';

const Home: React.FC = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [segment, setSegment] = useState('form');

  function addPlace(place: any) {
    setPlaces([...places, place]);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic + React + Leaflet Maps</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonSegment value={segment} onIonChange={(e) => setSegment(String(e.detail.value))}>
            <IonSegmentButton value="form">
              <IonLabel>FORMULÁŘ A MÍSTA</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="map">
              <IonLabel>MAPA</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {segment == 'form' && (
          <div className="page-content">
            <CityForm onAddPlace={addPlace} />
            <PlaceList places={places} />
          </div>
        )}

        {segment == 'map' && <MyMap places={places} />}
      </IonContent>
    </IonPage>
  );
};

export default Home;
