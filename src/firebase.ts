import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Production Firebase configuration for solarcareer-a1106
const firebaseConfig = {
  apiKey: 'AIzaSyBslJZB5r-ZjswWeYj3CyWxHpCYIZqsK9I',
  authDomain: 'solarcareer-a1106.firebaseapp.com',
  projectId: 'solarcareer-a1106',
  storageBucket: 'solarcareer-a1106.firebasestorage.app',
  messagingSenderId: '793049419872',
  appId: '1:793049419872:web:40a28bc5ef015421a6f305'
};

// Use environment variables if they're set and not empty (for local development)
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY.trim() !== '' 
    ? import.meta.env.VITE_FIREBASE_API_KEY 
    : firebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN && import.meta.env.VITE_FIREBASE_AUTH_DOMAIN.trim() !== '' 
    ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN 
    : firebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID && import.meta.env.VITE_FIREBASE_PROJECT_ID.trim() !== '' 
    ? import.meta.env.VITE_FIREBASE_PROJECT_ID 
    : firebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET && import.meta.env.VITE_FIREBASE_STORAGE_BUCKET.trim() !== '' 
    ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET 
    : firebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID && import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID.trim() !== '' 
    ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID 
    : firebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID && import.meta.env.VITE_FIREBASE_APP_ID.trim() !== '' 
    ? import.meta.env.VITE_FIREBASE_APP_ID 
    : firebaseConfig.appId
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;