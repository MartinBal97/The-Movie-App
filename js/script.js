// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)


const docRef = doc(db, "favoritos", "user1");
const favoritos = await getDoc(docRef).then(res => res.data().favoritos || [] )  


// if (docSnap.exists()) {
//   console.log(docSnap.data().favoritos);
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

// const favoritos = docSnap.data().favoritos || [];
const contFavs = document.querySelector(".contFavs");


const inputTextMovie = document.querySelector('#inputSearch')
const moviesContainer = document.querySelector('.moviesContainer')
const apiKey = "f22a5ed8"


contFavs.innerText = favoritos.length

//Se realiza fetch a la api pasando como parametro el valor del input
const getDataApi = async (inputValue) => {
    const res = await fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=${apiKey}`)
    return await res.json()
}

//Obteniendo valor del unput
const getInputValue = () => inputTextMovie.value;

document.querySelector("#lupa").addEventListener('click', () => {
    if (getInputValue() == "") {
        moviesContainer.innerHTML = `<p class="alert pelis">Debes escribir algo</p>`;
    } else {
        getDataApi(getInputValue()).then(data => {
            if (moviesContainer.children.length > 0) {
                moviesContainer.innerHTML = ``
            }
            (data.Search).forEach((e) => {
                moviesContainer.innerHTML += `
                    <div class="pelis">
                        <img src="${e.Poster}" alt="${e.Title}">
                        <p class="estreno">${e.Year}</p>
                        <h4 class="title">${e.Title}</h4>
                        <a href="../pages/movieDetalle.html?id=${e.imdbID}" class="btnDetalle">View More</a>
                    </div>`
            });
        }) .catch(error => moviesContainer.innerHTML = `<p class="alert pelis">No se encontraron peliculas</p>`)
    }
})