import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCS1wUb3sHheKxXQTm_Sdmf4uyLB2E48h4",
    authDomain: "calichat-10613.firebaseapp.com",
    databaseURL: "https://calichat-10613.firebaseio.com",
    projectId: "calichat-10613",
    storageBucket: "calichat-10613.appspot.com",
    messagingSenderId: "303940101461",
    appId: "1:303940101461:web:2427121438c3becc50fbdc",
    measurementId: "G-GNNRVY2JKR"
  };

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth
export const db = firebase.database()