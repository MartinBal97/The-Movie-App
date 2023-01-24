const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const contFavs = document.querySelector(".contFavs");

contFavs.innerText = favoritos.length;

const moviesContainer = document.querySelector('.moviesContainer')

favoritos.forEach(e => {
    moviesContainer.innerHTML += `
                        <div class="pelis">
                            <img src="${e.Poster}" alt="${e.Title}">
                            <p class="estreno">${e.Year}</p>
                            <h4 class="title">${e.Title}</h4>
                            <a href="../pages/movieDetalle.html?id=${e.imdbID}" class="btnDetalle">View More</a>
                        </div>`
});
