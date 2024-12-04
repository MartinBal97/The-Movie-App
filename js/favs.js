const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

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
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      contFavs.innerText = favoritos.length;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
});
