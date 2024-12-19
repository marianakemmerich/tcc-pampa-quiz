// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbJ5GA_0In-DXOE1Bg5NlDvRCi3ZZQfCo",
  authDomain: "tcc-pampa-quiz.firebaseapp.com",
  projectId: "tcc-pampa-quiz",
  storageBucket: "tcc-pampa-quiz.firebasestorage.app",
  messagingSenderId: "572029135650",
  appId: "1:572029135650:web:52028177722f36abc4537b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)