const apiKey = "8cfd97cc";

function updateCard(card, movie) {
  const ratingsHTML = movie.Ratings.map(
    (rating) => `<p>${rating.Source}: ${rating.Value}</p>`
  ).join("");
  card.innerHTML = `
    <div class="Film">
      <div id="${movie.Title}" class="movie">
        <h2 class="movie-title">${movie.Title}</h2>
        <div style="display: flex; align-items: flex-start;">
          <img src="${movie.Poster}" class="movie-img-left" alt="${movie.Title}">
          <div style="margin: 20px;">
            <p>${movie.Plot}</p>
            <p>${movie.Genre}</p>
            <p>${movie.Actors}</p>
            <div">
              <h3>Ratings:</h3>
              ${ratingsHTML}
            </div>
          </div>
        </div>
      </div>
    </div>`;

  document
    .getElementById(`${movie.Title}`)
    .addEventListener("click", function () {
      chargerPage(movie.imdbID);
    });
}
function chargerPage(imdbID) {
  localStorage.setItem("imdbID", imdbID);
  location.replace("movie.html");
}
async function fetchData(title) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`
    );
    const data = await response.json();
    return data.Response === "True" ? data : null;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données pour ${title}:`,
      error
    );
    return null;
  }
}

async function Search() {
  const title = document.getElementById("Rechercher-acceuille").value;
  if (title != "") {
    const container = document.getElementById("listefilm");
    container.innerHTML = "";

    const card = document.createElement("div");
    container.appendChild(card);

    const movieData = await fetchData(title);
    if (movieData) {
      updateCard(card, movieData);
    } else {
      card.innerHTML = `<h5 class="movie-title">Film non trouvé : ${title}</h5>`;
    }
  }
}

document.getElementById("Rechercher-bouton").addEventListener("click", Search);
