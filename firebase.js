// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGy2SwmIXU7Quig7uHes6cTYZbmv9U2ho",
  authDomain: "you-tutorial.firebaseapp.com",
  projectId: "you-tutorial",
  storageBucket: "you-tutorial.appspot.com",
  messagingSenderId: "399563092975",
  appId: "1:399563092975:web:808cb5c807b7529431fc1a",
  measurementId: "G-SK22BX15WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {app,db}