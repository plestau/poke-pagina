// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdybKe5wQhiI6Q1SUz8ixZNgyZnHhNsPk",
  authDomain: "poke-app-b8a37.firebaseapp.com",
  projectId: "poke-app-b8a37",
  storageBucket: "poke-app-b8a37.appspot.com",
  messagingSenderId: "228379111138",
  appId: "1:228379111138:web:2059b65178ce5b0d3f38bb",
  measurementId: "G-8Q9YMJXLCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}