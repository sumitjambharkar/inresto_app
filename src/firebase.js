import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBvIhDh5cAK9OigL7tcVNXh4Djyco1BAlg",
    authDomain: "marriage-38829.firebaseapp.com",
    projectId: "marriage-38829",
    storageBucket: "marriage-38829.appspot.com",
    messagingSenderId: "284800161620",
    appId: "1:284800161620:web:62ed38cdf2b61af2ae1ac1",
    measurementId: "G-N4M1746M45"
};

// Initialize Firebase
const firebaseApp  = firebase.initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth = firebase.auth()
const db = firebaseApp.firestore()
export {auth , db ,storage}