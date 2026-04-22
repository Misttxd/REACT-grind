// src/components/MyCard.tsx

import { IonCard, IonCardContent, IonButton, IonToolbar, IonTitle, IonInput } from '@ionic/react';
import { useState } from 'react';

interface MyCardProps {
    calcText: string;
    resetText: string;
    onResult: (value: number | null) => void; // Callback prop – funkce kam pošleme číslo
}

function MyCard({ calcText, resetText, onResult }: MyCardProps) {

    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');

    // Lze zapsat i jako arrow function: const handleCalc = () => {
    function handleCalc() {
        const vaha = Number(weight.replace(',', '.'));
        const vyska = Number(height.replace(',', '.'));

        if (vaha <= 0 || vyska <= 0) {
            onResult(null);
            return;
        }

        const bmi = vaha / ((vyska / 100) * (vyska / 100));

        onResult(Number(bmi.toFixed(1)));

    }

    // Lze zapsat i jako arrow function: const handleReset = () => {
    function handleReset() {
        setWeight('');
        setHeight('');
        onResult(null);
    }

    return (
        <IonCard>
            <IonToolbar>
                <IonTitle>BMI Kalkulačka</IonTitle>
            </IonToolbar>

            <IonCardContent>
                <IonInput label="Váha (kg)" labelPlacement="floating" value={weight} onIonInput={(e) => setWeight(e.detail.value ?? '')} type='number'></IonInput>
            </IonCardContent>

            <IonCardContent>
                <IonInput label="Výška (cm)" labelPlacement="floating" value={height} onIonInput={(e) => setHeight(e.detail.value ?? '')} type='number'></IonInput>
            </IonCardContent>

            <IonCardContent>

                <IonButton expand="block" onClick={handleCalc}>{calcText}</IonButton>
                <IonButton expand="block" onClick={handleReset} fill="outline">{resetText}</IonButton>
            </IonCardContent>
        </IonCard >
    );
};

export default MyCard;