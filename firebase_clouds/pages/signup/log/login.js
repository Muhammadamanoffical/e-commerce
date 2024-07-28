// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn9Njr5TsztGdLOXXN56GYxbcV46DJJCg",
  authDomain: "smit-64d93.firebaseapp.com",
  projectId: "smit-64d93",
  storageBucket: "smit-64d93.appspot.com",
  messagingSenderId: "975993823274",
  appId: "1:975993823274:web:f6fdbfc1c17f2f851f6353",
  measurementId: "G-DSC9KCQ2QG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

let email = document.getElementById("email");
let password = document.getElementById("password");
let btn = document.getElementById("btnlog");

btn.addEventListener("click", async () => {
  try {
    let obj = {
      email: email.value,
      password: password.value,
    };

    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      obj.email,
      obj.password
    );
    const userId = userCredential.user.uid;

    // Retrieve user data from Firestore
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      localStorage.setItem("user", JSON.stringify(userSnapshot.data()));
      window.location.replace("../../../index.html");
    } else {
      alert("User data not found.");
    }
  } catch (error) {
    alert(error.message);
  }
});
