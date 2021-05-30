import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDV4D6U1XL8hkmdDUOdivclRvKSJXjohik",
    authDomain: "rn-challange.firebaseapp.com",
    databaseURL: "https://rn-challange-default-rtdb.firebaseio.com",
    projectId: "rn-challange",
    storageBucket: "rn-challange.appspot.com",
    messagingSenderId: "896094746873",
    appId: "1:896094746873:web:45428dface0ba1cad54a28",
    measurementId: "G-EM8MFHWM22"
  };

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

  export default firebase;