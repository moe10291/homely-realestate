// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDll9n_bh-F1uXveAdsShRHpNbG3i2AlNc",
  authDomain: "realtor-clone-react-c07c0.firebaseapp.com",
  projectId: "realtor-clone-react-c07c0",
  storageBucket: "realtor-clone-react-c07c0.appspot.com",
  messagingSenderId: "248932376708",
  appId: "1:248932376708:web:63a81a82c031ffae7c62d1",
  measurementId: "G-LZH9L9Q4CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore();