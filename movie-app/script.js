// API Constants
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ea1dac810883ef884568d201b9b4d909&page=1"
const IMG_PATH = "https://image.tmdb.org/t/p/w500"
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=ea1dac810883ef884568d201b9b4d909&query="
const API_KEY = "ea1dac810883ef884568d201b9b4d909"

// UI Constants
const main = document.getElementById("main")
// const form = document.getElementById("form")
const searchBox = document.querySelector("search-box")
// const search = document.getElementById("search")

// Start the App
getMovies(API_URL)

// Custom Version using Web Component
searchBox.addEventListener("search", () => {
  let query = event.detail
  if (query && query !== "") getMovies(SEARCH_URL + query)
  else window.location.reload()
})

searchBox.addEventListener("reset", () => {
  if (event.detail === null) getMovies(API_URL)
})

async function getMovies(url) {
  const response = await fetch(url)
  const data = await response.json()

  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ""

  movies.forEach((movie) => {
    const { id, title, poster_path, overview, vote_average } = movie

    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")
    movieEl.setAttribute("id", id)
    movieEl.innerHTML = `<img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>`

    main.appendChild(movieEl)
  })
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
