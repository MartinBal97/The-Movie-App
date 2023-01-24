const queryString = window.location.search;
const url = new URLSearchParams(queryString);
const movie = url.get("id");
const apiKey = "f22a5ed8";
const contFavs = document.querySelector(".contFavs");

const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
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

        document.querySelector(".addFav").addEventListener("click", () => {
            if (!favoritos.find((e) => e.imdbID == data.imdbID)) {
                favoritos.push(data);
                contFavs.innerText = favoritos.length;
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
            } else {
                alert("Ya está añadido a favoritos");
            }
        });
    });
