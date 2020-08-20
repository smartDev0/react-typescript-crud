import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyAw7X76jNvsCH0RHoYiBa6u7fG9EvZ4PA0",
    authDomain: "profile-api-v1.firebaseapp.com",
    databaseURL: "https://profile-api-v1.firebaseio.com",
    projectId: "profile-api-v1",
    storageBucket: "profile-api-v1.appspot.com",
    // messagingSenderId: "176623431882",
    // appId: "1:176623431882:web:aa5f7117152e645ea2c433"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.database();
export const firestore = firebase.firestore();
