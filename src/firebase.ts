import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_G,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN_G,
  projectId: import.meta.env.VITE_PROJECT_ID_G,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_G,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_G,
  appId: import.meta.env.VITE_APP_ID_G,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID_G,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app as default };
