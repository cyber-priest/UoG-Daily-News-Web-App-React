import {initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAntGQUIQR9nkbdRmmRjV9RCwFQ_hN92tE",
  authDomain: "uog-daily-34dfd.firebaseapp.com",
  databaseURL: "https://uog-daily-34dfd-default-rtdb.firebaseio.com",
  projectId: "uog-daily-34dfd",
  storageBucket: "uog-daily-34dfd.appspot.com",
  messagingSenderId: "179847578417",
  appId: "1:179847578417:web:47bed277bddd3507db6610",
  measurementId: "G-W48K2Z1623",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
