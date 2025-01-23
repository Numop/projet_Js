const apiKey = "8cfd97cc";

async function fetchMovieData(movieTitle) {
  const apiKey = "8cfd97cc";
  const apiUrl = `http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const movie = await response.json();
    if (movie.Response === "True") {
      updateMovieRecommendation(movie);
    } else {
      console.error("Movie not found:", movie.Error);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateMovieRecommendation(movie) {
  const ratingsHTML = movie.Ratings.map(
    (rating) => `<p>${rating.Source}: ${rating.Value}</p>`
  ).join("");
  const divrecommendaction = document.getElementById("recommendations");
  const card = document.createElement("div");
  divrecommendaction.appendChild(card);
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
function addmultiMovie() {
  for (let i = 0; i < 5; i++) {
    addMovie();
  }
}

async function addMovie() {
  const alphabet = "adegiklortxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const lettre = alphabet[randomIndex];
  const apiKey = "8cfd97cc";
  const apiUrl = `http://www.omdbapi.com/?t=${lettre}&y=2024&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const movie = await response.json();
    if (movie.Response === "True") {
      updateMovieRecommendation(movie);
    } else {
      console.error("Movie not found:", movie.Error);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function chargerPage(imdbID) {
  localStorage.setItem("imdbID", imdbID);
  location.replace("movie.html");
}

document.addEventListener("DOMContentLoaded", fetchMovieData("transformers"));
document.addEventListener("DOMContentLoaded", fetchMovieData("Interstellar"));
document.addEventListener("DOMContentLoaded", fetchMovieData("Gladiator"));
document.getElementById("chargerfilm").addEventListener("click", addmultiMovie);
