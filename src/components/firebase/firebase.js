
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
    apiKey: "AIzaSyACZ1-iIR4_I9ghssLustG9pRVVa8sQ7TM",
    authDomain: "filmyverse-5cd8e.firebaseapp.com",
    projectId: "filmyverse-5cd8e",
    storageBucket: "filmyverse-5cd8e.appspot.com",
    messagingSenderId: "357169903740",
    appId: "1:357169903740:web:0ff3a0652859a6832631f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const userRef = collection(db, "user");
export default app;