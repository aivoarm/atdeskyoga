import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

interface AboutPopoverProps {
  dismiss: () => void;
};

const AboutPopover: React.FC<AboutPopoverProps> = ({dismiss}) => {

  const close = (url: string) => {
    window.open(url, '_blank');
    dismiss();
  };

  return (
    <IonList>
      <IonItem button onClick={() => close('#')}>
        <IonLabel>Learn </IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('#')}>
        <IonLabel>Documentation</IonLabel>
      </IonItem>
      
      <IonItem button onClick={() => close('#')}>
        <IonLabel>GitHub Repo</IonLabel>
      </IonItem>
      <IonItem button onClick={dismiss}>
        <IonLabel>Support</IonLabel>
      </IonItem>
    </IonList >
  )
}

export default AboutPopover;