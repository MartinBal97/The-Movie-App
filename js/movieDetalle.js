// Busco los parametros que estan en la url
const url = new URLSearchParams(window.location.search);
const movie = url.get("id");
const apiKey = "f22a5ed8";

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const contFavs = document.querySelector(".contFavs");
contFavs.innerText = favoritos.length;

const containerMovie = document.querySelector(".containerMovie");

if (movie.length < 12) {
  fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      const div = document.createElement("div");

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

      containerMovie.append(div);

      if (favoritos.find((e) => e.imdbID == data.imdbID)) {
        document.querySelector(".addFav").innerText = ` Added!`;
      }

      document.querySelector(".addFav").addEventListener("click", async () => {
        if (!favoritos.find((e) => e.imdbID == data.imdbID)) {
          favoritos.push(data);
          try {
            contFavs.innerText = favoritos.length;
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          document.querySelector(".addFav").innerText = ` Added!`;
          localStorage.setItem("favoritos", JSON.stringify(favoritos));
        } else {
          alert("Ya está añadido a favoritos");
        }
      });
    });
} else {
  let dc = JSON.parse(localStorage.getItem("moviesCreated")) || {};

  const div = document.createElement("div");

  div.innerHTML = `
            <h2>${dc.Title}</h2>
            <div class="movie">
                <img src="${dc.Poster}" alt="${dc.Title}">
                <div class="infoMovie">
                    <h3>Title: ${dc.Title}</h3>
                    <p>Year: ${dc.Year}</p>
                    <p>Runtime: ${dc.Runtime}</p>
                    <p>Director: ${dc.Director}</p>
                    <p>Description: ${dc.Description}</p>
                    <button class="addFav btnDetalle">Add to favs &nbsp&nbsp<img width="40px" src="../img/favorite.png" alt="corazon">
                    </button>
                </div>
            </div>`;

  containerMovie.append(div);

  if (favoritos.find((e) => e.imdbID == dc.imdbID)) {
    document.querySelector(".addFav").innerText = ` Added!`;
  }

  document.querySelector(".addFav").addEventListener("click", async () => {
    if (!favoritos.find((e) => e.imdbID == dc.imdbID)) {
      try {
        favoritos.push(dc);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        contFavs.innerText = favoritos.length;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      document.querySelector(".addFav").innerText = ` Added!`;
    } else {
      alert("Ya está añadido a favoritos");
    }
  });
}
