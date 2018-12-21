import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDpQvJHdDCErpGERDYX89w9BDphCS8x01o",
    authDomain: "react-225015.firebaseapp.com",
    databaseURL: "https://react-225015.firebaseio.com",
    projectId: "youtube-react-225015",
    storageBucket: "",
    messagingSenderId: "19291353010"
  };
  firebase.initializeApp(config);
  export const db = firebase.database();