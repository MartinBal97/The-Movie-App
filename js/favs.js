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

//HAGO REFERECIA A LOS DATOS DE MI BASE DE DATOS
const docRef = doc(db, "favoritos", "user1");
// DE ESA REFERENCIA OBTENGO LOS DATOS, SI NO HAY NADA QUE SEA UN ARRAY VACIO
const favoritos = await getDoc(docRef).then(
  (res) => res.data().favoritos || []
);

const contFavs = document.querySelector(".contFavs");
contFavs.innerText = favoritos.length;

const moviesContainer = document.querySelector(".moviesContainer");

favoritos.forEach((e) => {
  moviesContainer.innerHTML += `
                        <div class="pelis">
                            <img src="${e.Poster}" alt="${e.Title}">
                            <p class="estreno">${e.Year}</p>
                            <h4 class="title">${e.Title}</h4>
                            <a href="../pages/movieDetalle.html?id=${e.imdbID}" class="btnDetalle">View More</a>
                            <button class="btn-delete">Eliminar</button>                        
                        </div>`;
});

document.querySelectorAll(".btn-delete").forEach((botonDelete) => {
  botonDelete.addEventListener("click", async (event) => {
    botonDelete.parentNode.remove();
    favoritos.splice(
      favoritos.findIndex(
        (e) => e.Title === event.target.parentNode.children[2].innerText
      ),
      1
    );
    try {
      await setDoc(doc(db, "favoritos", "user1"), { favoritos });
      contFavs.innerText = favoritos.length;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
});
