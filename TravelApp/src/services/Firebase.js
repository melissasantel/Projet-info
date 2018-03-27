//Connexion à la base de données firebase
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBH5V5lF3dk3S29TP2QWmRYTLQhzjn696Q",
    authDomain: "travelapp-29172.firebaseapp.com",
    databaseURL: "https://travelapp-29172.firebaseio.com",
    projectId: "travelapp-29172",
    storageBucket: "travelapp-29172.appspot.com",
    messagingSenderId: "696090514610"
  };
  export const firebaseRef = firebase.initializeApp(config);
