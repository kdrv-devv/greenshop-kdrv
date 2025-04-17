import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDvZr2bQLmksvHvGA-o-eHSb9lBn86qBCc",
  authDomain: "n14-green-shop.firebaseapp.com",
  projectId: "n14-green-shop",
  storageBucket: "n14-green-shop.firebasestorage.app",
  messagingSenderId: "527443507122",
  appId: "1:527443507122:web:338ec96b1dbaf6e72d56ab",
  measurementId: "G-QLSNV5YVJS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
export { signInWithGoogle };
