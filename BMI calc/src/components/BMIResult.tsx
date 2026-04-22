import { IonCard, IonCardContent, IonLabel, IonRange } from '@ionic/react';

interface BMIResultProps {
  bmiValue: number | null;
  onResult: (value: string | null) => void; // Callback prop – funkce kam pošleme číslo
}

function BMIResult({ bmiValue, onResult }: BMIResultProps) {
  if (bmiValue === null) {
    return (
      <IonCard color="light">
        <IonCardContent className="bmi-center">
          <h1 >Výsledek BMI</h1>
          <IonLabel color="medium">čeká se na zadání hodnot...</IonLabel>
        </IonCardContent>
      </IonCard>
    );
  }

  let category = '';
  let color = 'success';

  if (bmiValue < 18.5) {
    category = 'Podváha';
    
    color = 'warning';
  } else if (bmiValue <= 24.9) {
    category = 'Normální váha';
    onResult(category);
    color = 'success';
  } else if (bmiValue <= 29.9) {
    category = 'Nadváha';
    onResult(category);
    color = 'warning';
  } else {
    category = 'Obezita';
    onResult(category);
    color = 'danger';
  }

  let rangeValue = bmiValue;
  if (rangeValue < 15) rangeValue = 15;
  if (rangeValue > 40) rangeValue = 40;

  return (
    <IonCard>
      <IonCardContent className="bmi-center">
        <h1 style={{ marginBottom: 8 }}>
          <IonLabel color={color}>Vypočtené BMI: {bmiValue}</IonLabel>
        </h1>

        <h2 style={{ marginTop: 0 }}>
          Kategorie: <strong>{category}</strong>
        </h2>

        <IonRange min={15} max={40} value={rangeValue} disabled />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span>{'<'} 18.5 Podváha</span>
          <span>18.5 - 25 Normální</span>
          <span>25 - 30 Nadváha</span>
          <span>{'>'} 30 Obezita</span>
        </div>
      </IonCardContent>
    </IonCard>
  );
}

export default BMIResult;