document.querySelector(".search form").addEventListener("submit", function(event){
  event.preventDefault();

  const name = document.querySelector("input[name='name']").value;
  const year = document.querySelector("input[name='year']").value;

  fetchGames(name, year)

})

document.querySelector("form.live-submit").addEventListener("submit", function(event){
  event.preventDefault();

  // POST the game to /api/games

  formData = {
    name: document.querySelector("#game-name").value,
    year: document.querySelector("#game-year").value,
    imageUrl: document.querySelector("#game-imageUrl").value,
    link: document.querySelector("#game-link").value
  }

  fetch("/api/games", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "content-type": "application/json"
    }
  })
  .then( function(r) {
    return r.json()
  })
  .then( function(json){
    console.log("json", json)
    fetchGames()
  })
  .catch( function(e) {
    console.log("ERROR:", e)
  })
})


function fetchGames(name, year){

  document.querySelector(".games").textContent = "";

  let url = "/api/games?";
  if (name){
    url = url + `name=${name}`
  }
  if (year){
    url = url + `year=${year}`
  }

  // Fetch data from /api/games
  // fill data on page
  fetch(url)
  .then( function(r) {
    return r.json()
  })
  .then( function(json){
    const games = json.games;
    document.querySelector(".games-found").textContent = `We found ${games.length} game(s)`


    for (var i = 0; i < games.length; i++) {
      const game = games[i];

      const html = `
      <div class="game">
        <a href="${game.link}">
          <h3>${game.name}</h3>
          <img src="${game.imageUrl}" alt="${game.name} image - ${game.year}">
        </a>
        <strong>${game.year}</strong>
        <a href="/games/${game._id}/edit">Edit</a>
      </div>
      `

      document.querySelector(".games").insertAdjacentHTML('beforeend', html)
    }
  })
}

fetchGames()
