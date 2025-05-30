// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgD0rf9kqJR8-yZN3pZOXye1sq4Kvifuk",
  authDomain: "auth1-63ca4.firebaseapp.com",
  projectId: "auth1-63ca4",
  storageBucket: "auth1-63ca4.firebasestorage.app",
  messagingSenderId: "1098571200377",
  appId: "1:1098571200377:web:8eb9bd6cc3b8df825b21a8",
  measurementId: "G-SJ3C0WEPLE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);
 export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();