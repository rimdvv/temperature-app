import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: 'temperature-app-a33da.firebaseapp.com',
  projectId: 'temperature-app-a33da',
  storageBucket: 'temperature-app-a33da.appspot.com',
  messagingSenderId: '523171589532',
  appId: '1:523171589532:web:44300d267582d867092c59',
  measurementId: 'G-01207Q3FY1',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
