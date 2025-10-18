import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARiMqpj0LQvnqPTCEw4PHX743yX1cuVj4",
    authDomain: "react-netflix-clone-79aa4.firebaseapp.com",
    projectId: "react-netflix-clone-79aa4",
    storageBucket: "react-netflix-clone-79aa4.firebasestorage.app",
    messagingSenderId: "217308668257",
    appId: "1:217308668257:web:910dbff79d79d3e4222520",
    measurementId: "G-52J4218J45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    }
    catch (err) {
        console.log(err);
        alert(err);
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
        console.log(err);
        alert(err);
    }
}

const logout = () => {
    signOut(auth);
}

export {  auth, db, signup, login, logout };
