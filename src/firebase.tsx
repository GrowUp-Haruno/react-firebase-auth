import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase} from 'firebase/database';

import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app) 

// 認証の永続性: session
// 現在のセッションまたはタブでのみ状態が維持され、ユーザーが認証を受けたタブやウィンドウを閉じるとクリアされることを示します。
setPersistence(auth, browserSessionPersistence);

export const avatarStorageUrl =
  'https://firebasestorage.googleapis.com/v0/b/react-auth-74a37.appspot.com/o/avatar%2F';
