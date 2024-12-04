const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const contFavs = document.querySelector(".contFavs");
contFavs.innerText = favoritos.length;

const inputTextMovie = document.querySelector("#inputSearch");
const moviesContainer = document.querySelector(".moviesContainer");
const apiKey = "f22a5ed8";

const getDataApi = async (inputValue) => {
  const res = await fetch(
    `http://www.omdbapi.com/?s=${inputValue}&apikey=${apiKey}`
  );

  const movieCreated = JSON.parse(localStorage.getItem("moviesCreated")) || [];
  let newArray = await res.json().then((res) => res.Search);

  if (movieCreated != 0) {
    newArray.unshift(movieCreated);
  }

  return await newArray;
};

const getInputValue = () => inputTextMovie.value;

document.querySelector("#lupa").addEventListener("click", () => {
  if (getInputValue() === "") {
    moviesContainer.innerHTML = `<p class="alert pelis">Debes escribir algo</p>`;
  } else {
    getDataApi(getInputValue())
      .then((newArray) => {
        if (moviesContainer.children.length > 0) {
          moviesContainer.innerHTML = ``;
        }
        newArray.forEach((e) => {
          moviesContainer.innerHTML += `
                    <div class="pelis">
                        <img src="${e.Poster}" alt="${e.Title}">
                        <p class="estreno">${e.Year}</p>
                        <h4 class="title">${e.Title}</h4>
                        <a href="../pages/movieDetalle.html?id=${e.imdbID}" class="btnDetalle">View More</a>
                    </div>`;
        });
      })
      .catch(
        (_) =>
          (moviesContainer.innerHTML = `<p class="alert pelis">No se encontraron peliculas</p>`)
      );
  }
});
