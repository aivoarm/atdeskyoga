import React, { useRef, useState } from 'react';
import {IonIcon, IonAvatar, IonItemSliding, IonAlert, IonItem, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Time } from './Time';
import { Session } from '../models/Session';
import { play, star, share, cloudDownload } from 'ionicons/icons';

interface SessionListItemProps {
  session: Session;
  listType: "all" | "favorites";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavorite: boolean;
}

const SessionListItem: React.FC<SessionListItemProps> = ({ isFavorite, onAddFavorite, onRemoveFavorite, onShowAlert, session, listType }) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)
  
  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const removeFavoriteSession = () => {
    onAddFavorite(session.id);
    onShowAlert('Favorite already added', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(session.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriteSession = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteSession();
    } else {
      // remember this session as a user favorite
      onAddFavorite(session.id);
      onShowAlert('Favorite Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };

  return (
    <IonItemSliding ref={ionItemSlidingRef} class={'track-' + session.tracks[0].toLowerCase()}>
      <IonItem routerLink={`/tabs/schedule/${session.id}`}>
        <IonLabel>
        <IonAvatar>
           <img src={process.env.PUBLIC_URL + session.image}/>
           </IonAvatar> 
        </IonLabel>
        <IonIcon slot="start" color="primary" size="medium" icon={play}></IonIcon>
        <div>
        <p>

          {session.name}  </p>
          </div>

      </IonItem>
      <IonItemOptions>
        {listType === "favorites" ?
          <IonItemOption color="danger" onClick={() => removeFavoriteSession()}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favorite" onClick={addFavoriteSession}>
            Favorite
          </IonItemOption>
        }
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default React.memo(SessionListItem);