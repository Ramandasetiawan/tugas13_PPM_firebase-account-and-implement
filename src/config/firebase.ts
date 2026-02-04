import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; // Uncomment if auth is needed later

const firebaseConfig = {
  apiKey: "AIzaSyAK-j67EOKLtsTN_XNLlX70c0mW5Q3bEhc",
  authDomain: "resep-makan-c0d04.firebaseapp.com",
  projectId: "resep-makan-c0d04",
  storageBucket: "resep-makan-c0d04.firebasestorage.app",
  messagingSenderId: "684846564868",
  appId: "1:684846564868:web:d195176cf152fb52ba5751"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

export { db };

