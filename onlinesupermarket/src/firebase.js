import firebase from 'firebase'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4AG_uLZqcrC9EoWC7QKS65qfi3JU04pA",
  authDomain: "onlinesupermarket-812a9.firebaseapp.com",
  projectId: "onlinesupermarket-812a9",
  storageBucket: "onlinesupermarket-812a9.appspot.com",
  messagingSenderId: "727289128055",
  appId: "1:727289128055:web:24e61de45ea4231c509272"
};

firebase.initializeApp(firebaseConfig)
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage}
