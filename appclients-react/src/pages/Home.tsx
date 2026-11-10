import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Link to="/clients" className="btn btn-primary mb-3">Clientes</Link>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
