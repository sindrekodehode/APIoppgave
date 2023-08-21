const renderBtn = document.querySelector("button");
const baseURL = "https://api.open5e.com/v1/monsters/";
const mainContainer = document.querySelector("main");
const input = document.querySelector("#cr-input");

let monster = [];

renderBtn.addEventListener("click", () => {
  // getData(getUrl(input.value));

  renderMonster(getData(getUrl(input.value)).results[0]);
});

async function getData(url) {
  const request = await fetch(url);
  const data = await request.json();
  monster = data;
  console.log(monster.results);
  return monster;
}

// const monsterArray = monster;

// function RNG(array) {
//   return Math.floor(Math.random() * array.length);
// }

function getUrl(num) {
  const monsterURL = "https://api.open5e.com/monsters/?challenge_rating=";
  const CR = num;
  const crUrl = `${monsterURL}${CR}`;
  return crUrl;
}

async function renderMonster(input) {
  //   const renderMonster = await getMonsterByCR();

  mainContainer.innerText = input;

  //   if (navState === "main") {
  //     const pokemonList = data.results;
  //     pokemonList.forEach(async (pokemon) => {
  //       const details = await getData(pokemon.url);
  //       renderPokemonList(pokemon, details);
  //     });
  //   } else {
  //     renderPokemonDetails(data);
  //   }
}
