// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJpCAKkCJSZ2qubIdIsDbL54Gd4TxE5AI",
  authDomain: "movie-app-c86af.firebaseapp.com",
  projectId: "movie-app-c86af",
  storageBucket: "movie-app-c86af.appspot.com",
  messagingSenderId: "773996011389",
  appId: "1:773996011389:web:165f06fbf54bbca24c7614"
};
const queryString = window.location.search;
const url = new URLSearchParams(queryString);
const movie = url.get("id");
const apiKey = "f22a5ed8";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

const contFavs = document.querySelector(".contFavs");


const docRef = doc(db, "favoritos", "user1");
const favoritos = await getDoc(docRef).then(res => res.data().favoritos || [] )  


// if (docSnap.exists()) {
//   console.log(docSnap.data().favoritos);
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

// const favoritos = docSnap.data().favoritos || [];
contFavs.innerText = favoritos.length;

const containerMovie = document.querySelector(".containerMovie");

fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
        const div = document.createElement("div")

        div.innerHTML = `
            <h2>${data.Title}</h2>
            <div class="movie">
                <img src="${data.Poster}" alt="${data.Title}">
                <div class="infoMovie">
                    <h3>Titulo: ${data.Title}</h3>
                    <p>Año de lanzamiento: ${data.Year}</p>
                    <p>Duración: ${data.Runtime}</p>
                    <p>Director: ${data.Director}</p>
                    <p>Descripción: ${data.Plot}</p>
                    <button class="addFav btnDetalle">Añadir a favoritos &nbsp&nbsp<img width="40px" src="../img/favorite.png" alt="corazon">
                    </button>
                </div>
            </div>`;

        containerMovie.append(div)

        document.querySelector(".addFav").addEventListener("click", async () => {
            if (!favoritos.find((e) => e.imdbID == data.imdbID)) {
                favoritos.push(data);
                try {
                    await setDoc(doc(db, "favoritos","user1"), {favoritos});
                    contFavs.innerText = favoritos.length;
                } catch (e) {
                console.error("Error adding document: ", e);
                }
                //localStorage.setItem("favoritos", JSON.stringify(favoritos));
            } else {
                alert("Ya está añadido a favoritos");
            }
        });
    });
