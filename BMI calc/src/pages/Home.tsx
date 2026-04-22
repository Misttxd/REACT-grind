import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage,
  IonTitle, IonToolbar
} from '@ionic/react';
import './Home.css';
import MyCard from '../components/MyCard';
import BMIResult from '../components/BMIResult'
import History from '../components/History';

function Home() {

  const [bmi, setBmi] = useState<number | null>(null);

  const [kategorie, setKategorie] = useState<string | null>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic + React</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <MyCard
          calcText="Calculate"
          resetText="Reset"
          onResult={setBmi}
          
        />

        <BMIResult 
        bmiValue={bmi}
        onResult={setKategorie} 
        />

        <History
        bmiValue={bmi}
        bmiKategorie = {kategorie}
        />



      </IonContent>
    </IonPage >
  );
};

export default Home;