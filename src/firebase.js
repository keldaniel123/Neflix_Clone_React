// firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection
} from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsu3SZs-LgfTK8uNAM_UVmV72lVmm7Jpc",
  authDomain: "netflix-clone-fdc70.firebaseapp.com",
  projectId: "netflix-clone-fdc70",
  storageBucket: "netflix-clone-fdc70.appspot.com",
  messagingSenderId: "709776065863",
  appId: "1:709776065863:web:7efd0801cf1004bb80f862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 Set auth persistence to stay logged in
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Persistence error:", error);
});

// 🔧 Signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// 🔐 Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// 🚪 Logout function
const logout = async () => {
  signOut(auth);
};

// ✅ Export everything you need
export { auth, db, login, signup, logout };
