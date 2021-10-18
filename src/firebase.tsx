// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const signInArgs: [Auth, string, string] = [auth, 'a', 'a'];
const { auth,email,password } = {auth:auth,email:'',password:''};
const signIn = signInWithEmailAndPassword(signInArgs.auth,);
