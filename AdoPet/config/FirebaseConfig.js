// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

//import { getFirestore, Collection, addDoc, getDocs } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "adopet-62320.firebaseapp.com",
  projectId: "adopet-62320",
  storageBucket: "adopet-62320.firebasestorage.app",
  messagingSenderId: "261943797103",
  appId: "1:261943797103:web:e2ec9f8b6f9e8157c1b49a",
  measurementId: "G-7CEXR856GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)
//const analytics = getAnalytics(app);