// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tubeguruji-startups.firebaseapp.com",
  projectId: "tubeguruji-startups",
  storageBucket: "tubeguruji-startups.appspot.com",
  messagingSenderId: "706430327770",
  appId: "1:706430327770:web:c759ed4eb9fa216ead3ee3",
  measurementId: "G-FX4Z29G8TB",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app,'petadopt')
export const storage=getStorage(app);
// const analytics = getAnalytics(app);