import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-19e87.firebaseapp.com",
  projectId: "realestate-19e87",
  storageBucket: "realestate-19e87.appspot.com",
  messagingSenderId: "332527467785",
  appId: "1:332527467785:web:eae4dc1b67246d925767d8"
};

export const app = initializeApp(firebaseConfig);