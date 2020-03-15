import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import "firebase/storage";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
    
};
firebase.initializeApp(config);
const storage = firebase.storage();

firebase.firestore().settings(settings);

export default firebase;