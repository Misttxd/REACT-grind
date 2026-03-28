import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonCardContent, IonIcon, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonItem, IonList, IonInput, IonButton } from '@ionic/react';
import { calendarOutline, cashOutline, earthOutline, hourglassOutline, swapVertical, walletOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

// Tímto říkáme TypeScriptu, jak vypadají data z API, aby neházel chyby.
interface Currency {
  country_label: string;
  curr_label: string;
  unit: string;
  code: string;
  rate: string;
}

const Home: React.FC = () => {
  // --- 1. STAVY (PAMĚŤ APLIKACE) ---
  const [czkAmount, setCzkAmount] = useState<string>('');        // Zadané koruny
  const [language, setLanguage] = useState<string>('en');        // Vybraný jazyk (en/cs)
  const [date, setDate] = useState<string>('2026-03-27');        // Vybrané datum
  const [currencies, setCurrencies] = useState<Currency[]>([]);  // Stažené měny z API
  const [targetCurrency, setTargetCurrency] = useState<string>(''); // Kód měny do které převádíme

  // --- 2. STAHOVÁNÍ DAT PŘES SSE (Server-Sent Events) ---
  useEffect(() => {
    // Poskládáme URL i s parametrem sse=y podle zadání
    const url = `http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php?lang=${language}&date=${date}&sse=y`;
    
    // Otevřeme spojení na server
    const eventSource = new EventSource(url);
    
    // Když server pošle data, uložíme je do paměti
    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setCurrencies(parsedData.data);
    };

    // Když měníme jazyk/datum, staré spojení zavřeme
    return () => eventSource.close();
  }, [language, date]);

  // --- 3. VÝPOČET ---
  let convertedAmount = ''; 
  const selectedObj = currencies.find(c => c.code === targetCurrency);
  
  if (czkAmount && selectedObj) {
    // Nahradíme desetinnou čárku tečkou a převedeme vše na čísla
    const rate = Number(selectedObj.rate.replace(',', '.'));
    const unit = Number(selectedObj.unit);
    const czk = Number(czkAmount);

    // Vzorec: (CZK * jednotka) / kurz
    convertedAmount = ((czk * unit) / rate).toFixed(2); 
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Currency Converter</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonIcon slot="start" icon={earthOutline}></IonIcon>
                <IonSelect label="Language" value={language} labelPlacement="floating" onIonChange={e => setLanguage(e.detail.value)}>
                  <IonSelectOption value="cs">Czech</IonSelectOption>
                  <IonSelectOption value="en">English</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonIcon slot="start" icon={calendarOutline}></IonIcon>
                <IonLabel>Conversion Date</IonLabel>
                <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime" presentation="date" value={date} 
                    onIonChange={e => setDate((e.detail.value as string).split('T')[0])}>
                  </IonDatetime>
                </IonModal>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonIcon slot="start" icon={cashOutline}></IonIcon>
                <IonInput type="number" label="CZK:" labelPlacement="floating" value={czkAmount} onIonInput={e => setCzkAmount(e.detail.value!)}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonButton fill="clear" size="small" className="ion-margin-auto">
                  <IonIcon icon={swapVertical} slot="icon-only"></IonIcon>
                </IonButton>
              </IonItem>

              <IonItem>
                <IonIcon slot="start" icon={walletOutline}></IonIcon>
                <IonInput label={targetCurrency ? `${targetCurrency}:` : 'CUR:'} labelPlacement="floating" readonly= {true} value={convertedAmount}></IonInput>
              </IonItem>

              <IonItem>
                <IonIcon slot="start" icon={hourglassOutline}></IonIcon>
                <IonSelect label="Target Currency" labelPlacement="floating" value={targetCurrency} onIonChange={e => setTargetCurrency(e.detail.value)}>
                  {currencies.map((c) => (
                    <IonSelectOption key={c.code} value={c.code}>
                      {c.country_label} - {c.curr_label} ({c.code})
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;