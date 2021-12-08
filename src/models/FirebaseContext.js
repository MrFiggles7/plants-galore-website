import firebase from "firebase/compat";


const firebaseConfig = {
    apiKey: "AIzaSyCPDWDq2QCnpyhV0Zz8Vi0ApMsEVunzwIY",
    authDomain: "plants-galore-cb50e.firebaseapp.com",
    databaseURL: "https://plants-galore-cb50e-default-rtdb.firebaseio.com",
    projectId: "plants-galore-cb50e",
    storageBucket: "plants-galore-cb50e.appspot.com",
    messagingSenderId: "791923168388",
    appId: "1:791923168388:web:b7760c1a342fab14091ed1",
    measurementId: "G-Z0GKF5V1HM"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storageRef = firebase.storage().ref();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        return firebase.auth().currentUser;
        // ...
    } else {
        // User is signed out
        // ...
        return undefined
    }
});

export {db, storageRef};





