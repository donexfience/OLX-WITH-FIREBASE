import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER,
//   appId: import.meta.env.VITE_REACT_APP_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyBxynorWuGRvM4yxGq-yrzR4R9SL26T6z0",
  authDomain: "olx-clone-133a9.firebaseapp.com",
  projectId: "olx-clone-133a9",
  storageBucket: "olx-clone-133a9.appspot.com",
  messagingSenderId: "887179167374",
  appId: "1:887179167374:web:86247f365d1f5a9babebdf",
  measurementId: "G-W7D9EQ94GL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
