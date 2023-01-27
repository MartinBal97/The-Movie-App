// Busco los parametros que estan en la url 
const url = new URLSearchParams(window.location.search);
const movie = url.get("id");
const apiKey = "f22a5ed8";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc, getDocs,query, collection,where} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
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

//HAGO REFERECIA A LOS DATOS DE MI BASE DE DATOS
const docRef = doc(db, "favoritos", "user1");
// DE ESA REFERENCIA OBTENGO LOS DATOS, SI NO HAY NADA QUE SEA UN ARRAY VACIO
let favoritos = await getDoc(docRef).then(res => res.data().favoritos)  

const contFavs = document.querySelector(".contFavs");
contFavs.innerText = favoritos.length;

const containerMovie = document.querySelector(".containerMovie");

if (movie.length < 12) {
    fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
            const div = document.createElement("div")
    
            div.innerHTML = `
                <h2>${data.Title}</h2>
                <div class="movie">
                    <img src="${data.Poster}" alt="${data.Title}">
                    <div class="infoMovie">
                        <h3>Title: ${data.Title}</h3>
                        <p>Year: ${data.Year}</p>
                        <p>Runtime: ${data.Runtime}</p>
                        <p>Director: ${data.Director}</p>
                        <p>Description: ${data.Plot}</p>
                        <button class="addFav btnDetalle">Add to favs  &nbsp&nbsp<img width="40px" src="../img/favorite.png" alt="corazon">
                        </button>
                    </div>
                </div>`;
    
            containerMovie.append(div)
    
            if (favoritos.find((e) => e.imdbID == data.imdbID)) {
                document.querySelector(".addFav").innerText= ` Added!`
            }

            document.querySelector(".addFav").addEventListener("click", async () => {
                if (!favoritos.find((e) => e.imdbID == data.imdbID)) {
                    favoritos.push(data);
                    try {
                        await setDoc(doc(db, "favoritos","user1"), {favoritos});
                        contFavs.innerText = favoritos.length;
                    } catch (e) {
                    console.error("Error adding document: ", e);
                    }
                    document.querySelector(".addFav").innerText= ` Added!`
                    //localStorage.setItem("favoritos", JSON.stringify(favoritos));
                } else {
                    alert("Ya está añadido a favoritos");
                }
            });
        });
} else {

    const q = query(collection(db, "Movies Created"), where("imdbID", "==", movie));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((dc) => {
        const div = document.createElement("div")
    
        div.innerHTML = `
            <h2>${dc.data().Title}</h2>
            <div class="movie">
                <img src="${dc.data().Poster}" alt="${dc.data().Title}">
                <div class="infoMovie">
                    <h3>Title: ${dc.data().Title}</h3>
                    <p>Year: ${dc.data().Year}</p>
                    <p>Runtime: ${dc.data().Runtime}</p>
                    <p>Director: ${dc.data().Director}</p>
                    <p>Description: ${dc.data().Description}</p>
                    <button class="addFav btnDetalle">Add to favs &nbsp&nbsp<img width="40px" src="../img/favorite.png" alt="corazon">
                    </button>
                </div>
            </div>`;

        containerMovie.append(div)

        
        if (favoritos.find((e) => e.imdbID == dc.data().imdbID)) {
            document.querySelector(".addFav").innerText= ` Added!`
        }
        
        document.querySelector(".addFav").addEventListener("click", async () => {
            if (!favoritos.find((e) => e.imdbID == dc.data().imdbID)) {
                console.log(dc.data());
                favoritos.push(dc.data());
                console.log(favoritos)
                try {
                    await setDoc(doc(db, "favoritos","user1"), {favoritos});
                    contFavs.innerText = favoritos.length;
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
                document.querySelector(".addFav").innerText= ` Added!`
            } else {
                alert("Ya está añadido a favoritos");
            }
        });
    });
}
