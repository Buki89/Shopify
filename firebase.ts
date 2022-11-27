import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAUXHVqNtmAash1z5lPu2ViWApJ_4JnUAo",
  authDomain: "shopify-445c0.firebaseapp.com",
  databaseURL:
    "https://shopify-445c0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shopify-445c0",
  storageBucket: "shopify-445c0.appspot.com",
  messagingSenderId: "88317280158",
  appId: "1:88317280158:web:3d8cd169532a9672a9a08f",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const database = getDatabase(firebaseApp);
