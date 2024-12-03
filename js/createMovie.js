// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJpCAKkCJSZ2qubIdIsDbL54Gd4TxE5AI",
  authDomain: "movie-app-c86af.firebaseapp.com",
  projectId: "movie-app-c86af",
  storageBucket: "movie-app-c86af.appspot.com",
  messagingSenderId: "773996011389",
  appId: "1:773996011389:web:165f06fbf54bbca24c7614",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
/******************************************************/

const docRef = doc(db, "favoritos", "user1");
const favoritos = await getDoc(docRef).then((res) => res.data().favoritos);
const contFavs = document.querySelector(".contFavs");
contFavs.innerText = favoritos.length;

const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const infoNewMovie = {
    Title: `${e.target.title.value}`,
    Poster: `${e.target.poster.value}`,
    Year: `${e.target.year.value}`,
    Description: `${e.target.description.value}`,
    Runtime: `${e.target.runtime.value}`,
    Director: `${e.target.director.value}`,
    imdbID: `${uuid.v4()}`,
  };

  try {
    await setDoc(
      doc(db, "Movies Created", `${e.target.title.value}`),
      infoNewMovie
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
