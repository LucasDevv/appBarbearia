import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiuxmKja2WiUSZZ8LZx46aKapeZ5LAmuM",
  authDomain: "appbarbearia-adbc6.firebaseapp.com",
  projectId: "appbarbearia-adbc6",
  storageBucket: "appbarbearia-adbc6.firebasestorage.app",
  messagingSenderId: "799277707282",
  appId: "1:799277707282:web:def6560879440aa72368cb"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o Firestore
const db = getFirestore(app);

export { db };
