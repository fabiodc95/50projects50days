// API Constants
const API_KEY = "ea1dac810883ef884568d201b9b4d909"
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + API_KEY + "&page=1"
const IMG_PATH_500 = "https://image.tmdb.org/t/p/w500"
const IMG_PATH_ORIGINAL = "https://image.tmdb.org/t/p/original"
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query="
const SINGLE_MOVIE_URL = "https://api.themoviedb.org/3/movie/"

// UI Constants
const main = document.getElementById("main")
const singleMain = document.getElementById("single-movie-container")
// const form = document.getElementById("form")
const searchBox = document.querySelector("search-box")
// const search = document.getElementById("search")

// Start the App
// console.log(window.location)
if (window.location.pathname === "/index.html") getMovies(API_URL)
else if (window.location.pathname === "/movie.html") getSingleMovie()

// Custom Version using Web Component
if (searchBox) {
  searchBox.addEventListener("search", () => {
    let query = event.detail
    if (query && query !== "") getMovies(SEARCH_URL + query)
    else window.location.reload()
  })

  searchBox.addEventListener("reset", () => {
    if (event.detail === null) getMovies(API_URL)
  })
}

async function getMovies(url) {
  const response = await fetch(url)
  const data = await response.json()

  showMovies(data.results)
}

async function getSingleMovie() {
  // Get the movie id from URL params
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString);
  const movie_id = urlParams.get("movie_id")
  // Fetch movie data from themoviedb api
  const response = await fetch(SINGLE_MOVIE_URL + movie_id + "?api_key=" + API_KEY)
  const data = await response.json()
  // Show data in the UI
  showSingleMovie(data)
}

function showMovies(movies) {
  main.innerHTML = ""

  movies.forEach((movie) => {
    let { id, title, poster_path, overview, vote_average } = movie
    poster_path = poster_path ? IMG_PATH_500 + poster_path : "images/placeholder-300x450.png"

    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")
    movieEl.innerHTML = `<img src="${poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${Math.round(vote_average * 10) / 10}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
        <a href="movie.html?movie_id=${id}">Show detail</a>
      </div>`

    main.appendChild(movieEl)
  })
}

function showSingleMovie(movie) {
  singleMain.innerHTML = ""
  let { title, backdrop_path, overview, vote_average } = movie
  backdrop_path = backdrop_path ? IMG_PATH_ORIGINAL + backdrop_path : "images/placeholder-1072x603.png"

  const movieEl = document.createElement("div")
  movieEl.classList.add("movie")
  movieEl.innerHTML = `
  <div class="movie-head">
  <h1 class="movie-title">${title}</h1>
  <span class="${getClassByRate(vote_average)}">${Math.round(vote_average * 10) / 10}</span>
  </div>
  <img src="${backdrop_path}" alt="${title}">
  <p class="movie-description">${overview}</p>`

  singleMain.appendChild(movieEl)
}

function getClassByRate(rate) {
  if (rate >= 8) {
    return "green"
  } else if (rate >= 5) {
    return "orange"
  } else {
    return "red"
  }
}
