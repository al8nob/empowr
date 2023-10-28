// Import the functions you need from the SDKs you need

// is the function that is used every time you want to a new application in firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// examples:
/*
  - whenever you want to use a service from firebase, you have to import the service
  like the previous line above. 

  - then export it inside a variable to be able to use it everywhere inside of our project.

 */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtDiYcign9QXWlLmqWPnYOxQ4qtUBeymY",
  authDomain: "sigmaauth-ad8ca.firebaseapp.com",
  projectId: "sigmaauth-ad8ca",
  storageBucket: "sigmaauth-ad8ca.appspot.com",
  messagingSenderId: "1047483399707",
  appId: "1:1047483399707:web:ab2ab1ef7790fa520182be",
};

// Initialize Firebase
// this variable contains a lot of information
// and it will connect your project with all the different firebase services
// such as: authentication - realtime database - firestore database etc...
// also they provide us with authentication
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
