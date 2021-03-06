import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonList, IonItem, IonLabel } from '@ionic/react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { starOutline, star, share, pause } from 'ionicons/icons';
import './SessionDetail.scss';
//import { Time } from '../components/Time';
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions';
import { Session } from '../models/Session';
import { Speaker } from '../models/Speaker';
import PlayerControls from '../components/PlayerControls';
import { Link } from 'react-router-dom';


//import { preloadSimple } from '../providers/smart-audio';
//import { NativeAudio, NativeAudioOriginal } from '@ionic-native/native-audio';
var Sound = require('react-sound').default;

interface OwnProps extends RouteComponentProps {
  speaker?: Speaker;
};


interface StateProps {
  session?: Session;
  favoriteSessions: number[]
};

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type SessionDetailProps = OwnProps & StateProps & DispatchProps;



const SessionDetail: React.FC<SessionDetailProps> = ({ session, addFavorite, removeFavorite, favoriteSessions }) => {

  if (!session) {
    return <div>Session not found</div>
  }

  
  const isFavorite = favoriteSessions.indexOf(session.id) > -1;
  
  const toggleFavorite = () => { 
    isFavorite ? removeFavorite(session.id) : addFavorite(session.id);
  };



  const shareSession = () => { };

  const sessionClick = (text: string) => { 
    if (text=="add to calendar")  { 
    return true
    }
  };

    
  return (
    
    
    <IonPage id="session-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/schedule"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">

            <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ?
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              }
            </IonButton>
              <IonButton onClick={() => shareSession}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
     
        <div className="ion-padding">
          <h1>{session.name}</h1>
          {session.tracks.map(track => (
            <span key={track} className={`session-track-${track.toLowerCase()}`}>{track}</span>
          ))}

          <p>{session.description}</p>

          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/schedule"  icon={pause}></IonBackButton>
          </IonButtons>

         
          <Sound 
                  
                  url={process.env.PUBLIC_URL + session.audio}
                  playStatus={Sound.status.PLAYING}
                // playFromPosition={300 /* in milliseconds */}
              
    
            />         
          <IonText color="medium">
            <br />
            Sounc Playing
          </IonText>
        </div>
        <IonList>
          
         
          <IonItem onClick={() => sessionClick('add to calendar')} button>
            <IonLabel color="primary"> <a href="/assets/invite.ics" >Add to Calendar</a></IonLabel>
            <IonIcon slot="end" color="primary" size="medium" icon={star}></IonIcon>
          </IonItem>
          
     
          <IonItem onClick={() => sessionClick('leave feedback')} button>
            <IonLabel color="primary">Leave Feedback</IonLabel>
          </IonItem>
        </IonList>
        <img src={process.env.PUBLIC_URL + session.image} alt="image" />

      </IonContent>

      
    </IonPage>
  );
};


export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    session: selectors.getSession(state, OwnProps),
    favoriteSessions: state.data.favorites
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite
  },
  component: withRouter(SessionDetail),
  
})