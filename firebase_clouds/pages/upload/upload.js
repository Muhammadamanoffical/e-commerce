// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
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

// Initialize Firebase (make sure you've included the Firebase SDK in your HTML)
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

// Assuming you have an input field with ID "productImage"
const productImage = document.getElementById("productImage");

// Assuming you have other input fields with IDs "productCategory," "productPrice," and "productName"
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productName = document.getElementById("productName");

const btn = document.getElementById("btn");
const prog = document.getElementById("pro");

btn.addEventListener("click", async () => {
  // Add product data to Firestore

  const docRef = await addDoc(collection(db, "product"), {
    productCategory: productCategory.value,
    productPrice: productPrice.value,
    productName: productName.value,
  });
  console.log("Document written with ID: ", docRef.id);

  let images = new Promise((resolve, reject) => {
    const file = productImage.files[0]; // Get the selected file
    const randomNum = Math.random().toString().slice(2);

    const storageRef = ref(storage, `images/${randomNum}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress (if needed)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        prog.value = progress;
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error uploading file: ", error);
        // Show user-friendly error message (e.g., display it on the page)
        reject(error);
      },
      () => {
        // Handle successful upload
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            // Display the image URL or use it as needed
            resolve(downloadURL);
            window.location.replace("../../index.html")
          })
          .catch((error) => {
            console.error("Error getting download URL: ", error);
            // Show user-friendly error message (e.g., display it on the page)
            reject(error);
          });
      }
    );
  });
  
});
