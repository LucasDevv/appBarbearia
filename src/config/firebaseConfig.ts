import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhlUavaS6kMcuceE7ZMZJsgvhcwTn0gcs",
  authDomain: "appbarbearia-a5f60.firebaseapp.com",
  projectId: "appbarbearia-a5f60",
  storageBucket: "appbarbearia-a5f60.firebasestorage.app",
  messagingSenderId: "1096811207787",
  appId: "1:1096811207787:web:cd30b8c408d0150306652e"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o Firestore
const db = getFirestore(app);

export { db };
