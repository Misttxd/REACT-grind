import { IonBadge, IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRange, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { camera, people } from 'ionicons/icons';
import doneSoundFile from '../../coin_sound.mp3';

import { useState } from 'react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

type ImaggaTag = {
  tag: {
    en: string;
  };
  confidence: number;
};

type ImaggaFace = {
  confidence: number;
  coordinates: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
};







const Home: React.FC = () => {

  const API_KEY = 'pero';
  const API_SECRET = 'pero';
  const authHeader = 'Basic ' + btoa(API_KEY + ':' + API_SECRET);

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [threshold, setThreshold] = useState<number>(40);
  const [tags, setTags] = useState<ImaggaTag[]>([]);
  const [faces, setFaces] = useState<ImaggaFace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisType, setAnalysisType] = useState<'tags' | 'faces' | null>(null);

  const playDoneSound = () => {
    const sound = new Audio(doneSoundFile);
    sound.currentTime = 0;
    sound.volume = 0.6;
    void sound.play().catch(() => {
      // Browsers can block autoplay in some contexts.
    });
  };

  const handleTakePhoto = async () => {
    try {
      // 1) Kamera nebo galerie (systémový Photo prompt)
      const takenPhoto = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });
      setPhoto(takenPhoto);

      if (!takenPhoto.webPath) {
        throw new Error('Fotka nemá webPath.');
      }

      setAnalysisType('tags');
      setTags([]);
      setFaces([]);
      setIsLoading(true);

      // 2) Převod na Blob + FormData
      const response = await fetch(takenPhoto.webPath);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('image', blob, 'foto.jpg');

      // 3) Přímý call na Imagga API
      const apiResponse = await fetch('https://api.imagga.com/v2/tags', {
        method: 'POST',
        headers: { Authorization: authHeader },
        body: formData
      });

      const data: { result?: { tags?: ImaggaTag[] } } = await apiResponse.json();
      let parsedTags: ImaggaTag[] = [];
      if (data.result && Array.isArray(data.result.tags)) {
        parsedTags = data.result.tags;
      }
      setTags(parsedTags);
      playDoneSound();
    } catch (err) {
      console.error('Chyba:', err);
      alert('Něco se nepovedlo. Zkontrolujte konzoli.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetectFaces = async () => {
    try {
      const takenPhoto = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });
      setPhoto(takenPhoto);

      if (!takenPhoto.webPath) {
        throw new Error('Fotka nemá webPath.');
      }

      setAnalysisType('faces');
      setTags([]);
      setFaces([]);
      setIsLoading(true);

      const response = await fetch(takenPhoto.webPath);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('image', blob, 'foto.jpg');

      const apiResponse = await fetch('https://api.imagga.com/v2/faces/detections', {
        method: 'POST',
        headers: { Authorization: authHeader },
        body: formData
      });

      const data: { result?: { faces?: ImaggaFace[] } } = await apiResponse.json();
      let parsedFaces: ImaggaFace[] = [];
      if (data.result && Array.isArray(data.result.faces)) {
        parsedFaces = data.result.faces;
      }
      setFaces(parsedFaces);
      playDoneSound();
    } catch (err) {
      console.error('Chyba:', err);
      alert('Něco se nepovedlo. Zkontrolujte konzoli.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTags = tags.filter((t) => t.confidence > threshold);
  const filteredFaces = faces.filter((f) => f.confidence > threshold);

  const getThresholdText = () => {
    if (analysisType === 'faces') {
      return (
        <>
          Zobrazit obličeje se spolehlivostí vyšší než <b>{Math.round(threshold)}</b>%.
        </>
      );
    }

    return (
      <>
        Zobrazit tagy se spolehlivostí vyšší než <b>{Math.round(threshold)}</b>%.
      </>
    );
  };

  const getLoadingText = () => {
    if (analysisType === 'faces') {
      return 'Analyzuji obličeje...';
    }

    return 'Analyzuji objekty...';
  };

  const renderResults = () => {
    if (isLoading) {
      return (
        <IonLabel>
          <IonSpinner name="crescent" /> {getLoadingText()}
        </IonLabel>
      );
    }

    if (analysisType === 'faces' && filteredFaces.length > 0) {
      return (
        <IonList>
          {filteredFaces.map((f, index) => (
            <IonItem key={`${index}-${f.confidence}`}>
              <IonLabel>
                Obličej {index + 1} (pozice: od [{Math.round(f.coordinates.xmin)}, {Math.round(f.coordinates.ymin)}] do [{Math.round(f.coordinates.xmax)}, {Math.round(f.coordinates.ymax)}])
              </IonLabel>
              <IonBadge slot="end" color="primary">{Math.round(f.confidence)} %</IonBadge>
            </IonItem>
          ))}
        </IonList>
      );
    }

    if (analysisType !== 'faces' && filteredTags.length > 0) {
      return (
        <IonList>
          {filteredTags.map((t) => (
            <IonItem key={`${t.tag.en}-${t.confidence}`}>
              <IonLabel>{t.tag.en}</IonLabel>
              <IonBadge slot="end" color="primary">{Math.round(t.confidence)} %</IonBadge>
            </IonItem>
          ))}
        </IonList>
      );
    }

    return <IonLabel>Zatím neproběhla žádná analýza nebo se nic nenašlo.</IonLabel>;
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Analyzátor fotek (API)</IonTitle>
        </IonToolbar>
      </IonHeader>



      <IonContent fullscreen>

        <IonButton expand="block" onClick={handleTakePhoto}>
          <IonIcon slot="start" icon={camera}></IonIcon>
          ROZPOZNAT OBJEKTY NA FOTCE
        </IonButton>

        <IonButton expand="block" onClick={handleDetectFaces} color={'secondary'}>
          <IonIcon slot="start" icon={people}></IonIcon>
          NAJÍT OBLIČEJE NA FOTCE
        </IonButton>

        {photo && photo.webPath && (
          <img src={photo.webPath} alt="Nahraná fotka" />
        )}

        <IonCard>
          <IonCardContent>
            <IonLabel>
              <h1><b>Výsledky analýzy</b></h1>
              {getThresholdText()}
            </IonLabel>

            <IonRange
              id="range"
              aria-label="Confidence threshold"
              min={0}
              max={100}
              value={threshold}
              onIonInput={(e) => setThreshold(Number(e.detail.value ?? 0))}
            ></IonRange>

            {renderResults()}
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage >
  );
};

export default Home;
