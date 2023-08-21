const renderBtn = document.querySelector("button");
const baseURL = "https://api.open5e.com/monsters/?challenge_rating=1";
const mainContainer = document.querySelector("main");
const input = document.querySelector("#cr-input");

let monster = [];

renderBtn.addEventListener("click", async () => {
  const data = await getData(baseURL);
  renderMonster(data[0]);
});

async function getData(url) {
  const request = await fetch(url);
  const data = await request.json();
  monster = data.results;
  let filteredMonster = monster.filter(
    (obj) => obj.cr.toString() === input.value
  );
  return filteredMonster;
}

function RNG(array) {
  return Math.floor(Math.random() * array.length);
}

// function getUrl(num) {
//   const monsterURL = "https://api.open5e.com/monsters/?challenge_rating=";
//   const CR = num;
//   const crUrl = `${monsterURL}${CR}`;
//   return crUrl;
// }

async function renderMonster(input) {
  const renderMonster = await getData(baseURL);
  const results = input;

  mainContainer.innerHTML = "";

  const monsterElement = document.createElement("div");
  monsterElement.textContent = input.name;
  mainContainer.appendChild(monsterElement);
}
