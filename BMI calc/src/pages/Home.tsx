import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage,
  IonTitle, IonToolbar,
  IonTabs,
  IonTabBar, IonTabButton,
  IonLabel, IonIcon, IonRouterOutlet
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { homeOutline, timeOutline } from 'ionicons/icons';
import './Home.css';
import MyCard from '../components/MyCard';
import BMIResult from '../components/BMIResult';
import History from '../components/History';

function Home() {

  const [bmi, setBmi] = useState<number | null>(null);

  const [kategorie, setKategorie] = useState<string | null>(null);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home">
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


      </IonContent>
    </IonPage >
        </Route>

        <Route exact path="/tabs/history">
          <IonPage >
            <IonHeader>
              <IonToolbar>
                <IonTitle>History</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

              <History
                bmiValue={bmi}
                bmiKategorie = {kategorie}
              />

            </IonContent>
          </IonPage >
        </Route>

        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>


      <IonTabBar slot="bottom">
        <IonTabButton tab = "home" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="history" href="/tabs/history">
          <IonIcon icon={timeOutline} />
          <IonLabel>History</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Home;