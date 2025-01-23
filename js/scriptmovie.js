const apiKey = "8cfd97cc";

const imdbID = localStorage.getItem("imdbID");
console.log(imdbID);
if (imdbID == null) {
  PasFilm();
} else {
  fetchMovieData(imdbID);
}

async function fetchMovieData(imdbID) {
  const apiKey = "8cfd97cc";
  const apiUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&plot=full`;

  try {
    const response = await fetch(apiUrl);
    const movie = await response.json();
    if (movie.Response === "True") {
      updateMovie(movie);
    } else {
      console.error("Movie not found:", movie.Error);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function PasFilm() {
  const divlement = document.getElementById("filmEcran");
  divlement.innerHTML = "<h1>Pas de Film selectionner</h1>";
}

function updateMovie(movie) {
  const ratingsHTML = movie.Ratings.map(
    (rating) => `<p>${rating.Source}: ${rating.Value}</p>`
  ).join("");
  const divlement = document.getElementById("filmEcran");
  divlement.innerHTML = `
    <div class="Filmplein">
      <div id="${movie.Title}" class="movie">
        <div class="movieplein"><h2 class="movie-title-plein">${movie.Title}</h2></div>
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
}
