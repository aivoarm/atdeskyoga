import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover } from '@ionic/react';
import './About.scss';
import { play, calendar, pin, more } from 'ionicons/icons';
import AboutPopover from '../components/AboutPopover';

interface AboutProps { }

const About: React.FC<AboutProps> = () => {

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState();

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };
  const conferenceDate = '2047-05-17';

  const divStyle = {
    margin: "0 auto",
    maxWidth: "100%",
    width: "640px"
  };

const iframeStyle = {
    margin: "0 auto",
    maxWidth: "100%",
    width: "100%",
    height: "300px",
    border: "1px solid #cfcfcf"
  };

const riddleID = "chat";
const riddleUrl = "https://club.toprepostme.com/" + riddleID + "?wide=1";

  return (
    <IonPage id="about-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
          <IonButtons slot="end">
            <IonButton icon-only onClick={presentPopover}>
              <IonIcon slot="icon-only" icon={more}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <h4 className="ion-padding-start"> At Desk Yoga</h4>

        
        <p className="ion-padding-start ion-padding-end">
        An application that can help you stay connected to your yoga teacher, follow her audio commands and do exercises according to your guru's instructions.
                      </p>
       
              
      </IonContent>
      
      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <AboutPopover dismiss={() => setShowPopover(false)} /> 
      </IonPopover>
    </IonPage>
  );
};

export default React.memo(About);