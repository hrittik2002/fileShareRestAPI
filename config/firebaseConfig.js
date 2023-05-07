import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyC2IRLtxANEFGU03YQBHU8C7YdSBXTfrg4",
  authDomain: "filesharefilestorage.firebaseapp.com",
  projectId: "filesharefilestorage",
  storageBucket: "filesharefilestorage.appspot.com",
  messagingSenderId: "434547239897",
  appId: "1:434547239897:web:4f70df02e8702112a407c8",
  measurementId: "G-HMR5X5WE6V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };