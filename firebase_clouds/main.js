
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import {
    getAuth,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

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
    measurementId: "G-DSC9KCQ2QG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  
  let uploadlink=document.getElementById("uploadlink")
  let signlink=document.getElementById("signlink")
  let loglink=document.getElementById("loglink")
  let logoutlink=document.getElementById("logoutlink")

  function init(){
    let userObj = localStorage.getItem("user");
    userObj = JSON.parse(userObj);
  
    if (userObj) {
      loglink.style.display = "none";
      signlink.style.display = "none";
      if (userObj.userType === "user") {
        uploadlink.style.display = "none";
      }
     uploadlink.className=
      "text-gray-800 hover:text-gray-600 mx-4";
      logoutlink.className =
        "text-white mx-4 inline-block bg-blue-500 p-2 rounded";
      
     
    }
  }
  init()
  logoutlink.addEventListener("click",()=>{
    signOut(auth)
    .then(() => {
      localStorage.removeItem("user");
      window.location.reload()
      init();
    })
    .catch((err) => {
      alert(err.message);
    });
  })



