// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAwAwGsuAL3HFDKuGPuEv6xN5lwOInROQw",
  authDomain: "shanghai-8a8f6.firebaseapp.com",
  databaseURL: "https://shanghai-8a8f6.firebaseio.com",
  projectId: "shanghai-8a8f6",
  storageBucket: "shanghai-8a8f6.appspot.com",
  messagingSenderId: "835638910296",
  appId: "1:835638910296:web:e5319dce123f726a16192d",
  measurementId: "G-Y6CN6RR1M4",
};

const firebaseInstance = firebase.initializeApp(firebaseConfig);

export default firebaseInstance;
