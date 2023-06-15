// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzn9JI8frhB6HqPtd6SpIJvGBdsj4DUTE",
  authDomain: "homely-app-5f619.firebaseapp.com",
  projectId: "homely-app-5f619",
  storageBucket: "homely-app-5f619.appspot.com",
  messagingSenderId: "34927006349",
  appId: "1:34927006349:web:50276f57c5fbe81a1488c4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore();

