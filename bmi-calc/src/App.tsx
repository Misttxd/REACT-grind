import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  IonInput,
  IonCard,
  IonCardContent,
  IonIcon,
  IonRadioGroup,
  IonRadio,
  IonRange,
  IonLabel,
} from '@ionic/react';
import { useState } from 'react';
import { accessibilityOutline, calendar, person, scaleOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';

setupIonicReact();
const App: React.FC = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    if (!heightInMeters) {
      setBmi(null);
      return;
    }

    const result = weight / (heightInMeters * heightInMeters);
    setBmi(Number(result.toFixed(1)));
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">

          <IonCard>
            <IonCardContent>
              <IonInput
                className="ion-margin-top"
                id="username_input"
                label="Username"
                labelPlacement="floating"
                fill="outline"
                placeholder="Enter your name..."
              >
                <IonIcon slot="start" icon={person} aria-hidden="true" />
              </IonInput>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonInput
                className="ion-margin-top"
                type="number"
                id="age_input"
                label="Age"
                labelPlacement="floating"
                fill="outline"
                placeholder="Enter your age..."
              >
                <IonIcon slot="start" icon={calendar} aria-hidden="true" />
              </IonInput>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonRadioGroup>
                <IonRadio
                  className="ion-margin-top"
                  value="Male"
                  labelPlacement="end">
                  Male
                </IonRadio>
                <IonRadio
                  className="ion-margin-top"
                  value="Female"
                  labelPlacement="end">
                  Female
                </IonRadio>
              </IonRadioGroup>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonRange
                id="Height_input"
                min={50}
                max={250}
                value={height}
                pin={true}
                onIonChange={(e) => setHeight(Number(e.detail.value))}
              >
                <IonIcon slot="start" icon={accessibilityOutline} />
              </IonRange>
              <IonLabel id="height_label">
                Height is {height} cm
              </IonLabel>
            </IonCardContent>

            <IonCardContent>
              <IonRange
                id="Weight_input"
                min={30}
                max={250}
                value={weight}
                pin={true}
                onIonChange={(e) => setWeight(Number(e.detail.value))}
              >
                <IonIcon slot="start" icon={scaleOutline} />
              </IonRange>
              <IonLabel id="Weight_label">
                Weight is {weight} kg
              </IonLabel>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonButton id="Calculate_button" expand="block" shape="round" onClick={calculateBMI}>
                Calculate BMI
              </IonButton>
              {bmi !== null && <IonLabel className="ion-margin-top ion-display-block">BMI: {bmi}</IonLabel>}
            </IonCardContent>
          </IonCard>
        </IonContent>


      </IonPage>
    </IonApp>
  );
};

export default App;
