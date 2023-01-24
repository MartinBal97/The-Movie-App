const inputTextMovie = document.querySelector('#inputSearch')
const moviesContainer = document.querySelector('.moviesContainer')
const pAlert = document.querySelector('.alert')
const contFavs = document.querySelector('.contFavs')

const apiKey = "f22a5ed8"

const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
        
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