const joke = document.getElementById("joke")
const btn = document.getElementById("jokeBtn")

window.addEventListener("DOMContentLoaded", getJoke)

btn.addEventListener("click", getJoke)

// Using Fetch API
// function getJoke() {
//   const options = {
//     headers: {
//       Accept: "application/json",
//     },
//   }

//   fetch("https://icanhazdadjoke.com/", options)
//     .then((response) => {
//       if (!response.ok) {
//         throw Error(response.status)
//       }
//       return response.json()
//     })
//     .then((obj) => {
//       joke.innerHTML = obj.joke
//     })
//     .catch((e) => {
//       console.error(e)
//     })
// }

// Using Async/Await
async function getJoke() {
  const options = {
    headers: {
      Accept: "application/json",
    },
  }

  const response = await fetch("https://icanhazdadjoke.com/", options)

  const data = await response.json()

  joke.innerHTML = data.joke
}
