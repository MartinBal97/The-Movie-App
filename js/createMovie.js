const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const contFavs = document.querySelector(".contFavs");
contFavs.innerText = favoritos.length;

const form = document.querySelector(".form");

localStorage.setItem("moviesCreated", JSON.stringify([]));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const infoNewMovie = {
    Title: `${e.target.title.value}`,
    Poster: `${e.target.poster.value}`,
    Year: `${e.target.year.value}`,
    Description: `${e.target.description.value}`,
    Runtime: `${e.target.runtime.value}`,
    Director: `${e.target.director.value}`,
    imdbID: `${uuid.v4()}`,
  };

  try {
    localStorage.setItem("moviesCreated", JSON.stringify(infoNewMovie));

    form.reset();

    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.innerText =
      "Movie created! Find it by its title in the search bar, it will be in the first option.";

    // Reemplazar el contenido del formulario por el mensaje
    form.innerHTML = ""; // Elimina todo el contenido del formulario
    form.appendChild(successMessage); // Agrega el mensaje
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
