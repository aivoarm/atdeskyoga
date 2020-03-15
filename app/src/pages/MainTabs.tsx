import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { hammer, play, calendar, contacts, map, informationCircle } from 'ionicons/icons';
import SchedulePage from './SchedulePage';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import SessionDetail from './SessionDetail';
import MapView from './MapView';
import About from './About';
import SpeakerItem from '../components/SpeakerItem';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        {/* 
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.        
        */}
        <Route path="/tabs/schedule" render={() => <SchedulePage />} exact={true} />
        <Route path="/tabs/schedule/:id" component={SessionDetail} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
        <Route path="/tabs/speakers" render={() => <SpeakerList />} exact={true} />
        <Route path="/tabs/speakers/:id" component={SpeakerDetail} exact={true} />
        <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />

      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/tabs/schedule">
          <IonIcon icon={play} />
          <IonLabel>Sessions</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/speakers">
          <IonIcon icon={contacts} />
          <IonLabel>Gurus</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tutorial" href="/tutorial">
          <IonIcon icon={hammer} />
          <IonLabel>Tutorial</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={informationCircle} />
          <IonLabel>About</IonLabel>
        </IonTabButton>



      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;