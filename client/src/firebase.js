// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-19e87.firebaseapp.com",
  projectId: "realestate-19e87",
  storageBucket: "realestate-19e87.appspot.com",
  messagingSenderId: "332527467785",
  appId: "1:332527467785:web:eae4dc1b67246d925767d8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);