// /* eslint-disable no-unused-vars */
// import { initializeApp } from "firebase/app";
// import {
//     createUserWithEmailAndPassword,
//     getAuth,
//     signInWithEmailAndPassword,
//     signOut
// } from "firebase/auth";
// import {
//     addDoc,
//     getFirestore,
//     collection,
//     doc,
//     query,
//     where,
//     getDocs,
//     updateDoc
// } from "firebase/firestore";
// import { toast } from "react-toastify";

// // 🔹 Firebase config
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// };

// // 🔹 Initialisation Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // 🔹 Signup avec abonnement inactive
// const signup = async (name, email, password) => {
//     try {
//         const res = await createUserWithEmailAndPassword(auth, email, password);
//         const user = res.user;

//         // Création du document utilisateur dans Firestore
//         await addDoc(collection(db, "users"), {
//             uid: user.uid,
//             name,
//             authProvider: "local",
//             email,
//             subscriptionStatus: "inactive"
//         });

//         toast.success("Compte créé avec succès !");
//     } catch (err) {
//         console.error(err);
//         toast.error(err.code?.split("/")[1]?.split("-").join(" ") || "Erreur inconnue");
//     }
// };

// // 🔹 Login
// const login = async (email, password) => {
//     try {
//         await signInWithEmailAndPassword(auth, email, password);
//         toast.success("Connecté avec succès !");
//     } catch (err) {
//         console.error(err);
//         toast.error(err.code?.split("/")[1]?.split("-").join(" ") || "Erreur inconnue");
//     }
// };

// // 🔹 Logout
// const logout = async () => {
//     try {
//         await signOut(auth);
//         toast.success("Déconnecté avec succès !");
//     } catch (err) {
//         console.error(err);
//         toast.error("Erreur lors de la déconnexion");
//     }
// };

// // 🔹 Activer l'abonnement
// const activateSubscription = async (uid) => {
//     try {
//         const q = query(collection(db, "users"), where("uid", "==", uid));
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//             const userDoc = querySnapshot.docs[0];
//             await updateDoc(userDoc.ref, { subscriptionStatus: "active" });
//             toast.success("Abonnement activé !");
//         } else {
//             toast.error("Utilisateur non trouvé");
//         }
//     } catch (err) {
//         console.error("Erreur lors de l'activation de l'abonnement :", err);
//         toast.error("Impossible d'activer l'abonnement");
//     }
// };

// export { auth, db, signup, login, logout, activateSubscription };
