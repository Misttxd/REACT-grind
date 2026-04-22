import { IonCard, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/react';
import { JSX, useEffect, useState } from 'react';

interface HistoryProps {
  bmiValue: number | null;
  bmiKategorie: string |null;
}
function History({ bmiValue, bmiKategorie }: HistoryProps) {
    const [history, setHistory] = useState<JSX.Element[]>([]); // 1. Vytvoření

    useEffect(() => {
        if (bmiValue === null || bmiKategorie === null) return;

        const novyVysledek = (
            <IonItem color='success' key={`${Date.now()}`}>
                <IonLabel>
                    <h2>BMI: <b>{bmiValue}</b></h2>
                    <h3> kategorie: {bmiKategorie}</h3>
                </IonLabel>
            </IonItem>
        )

        setHistory((predchoziHistorie) => [...predchoziHistorie, novyVysledek]); // 2. Aktualizace
    }, [bmiValue, bmiKategorie]);
    

    if(history.length >=1){
        return (
        <IonCard>
            <IonToolbar>
                <IonTitle>Historie měření</IonTitle>
                <IonList>
                    {history}
                </IonList>
            </IonToolbar>
        </IonCard>
        );
    }
}

export default History;