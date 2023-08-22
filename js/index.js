const renderBtn = document.querySelector("button");
const mainContainer = document.querySelector("main");
const input = document.querySelector("#cr-input");

function RNG(array) {
  return Math.floor(Math.random() * array.length);
}

function getUrl(cr) {
  let filterUrl = `https://api.open5e.com/monsters/?limit=300&cr=${cr}`;
  return filterUrl;
}

async function getData(url) {
  const request = await fetch(url);
  const data = await request.json();
  let filteredMonster = data.results.filter(
    (obj) => obj.cr.toString() === input.value
  );
  return filteredMonster;
}

async function renderMonster(input) {
  const results = input;

  mainContainer.innerHTML = "";

  const monsterElement = document.createElement("div");
  monsterElement.textContent = input.name;
  mainContainer.appendChild(monsterElement);
}

renderBtn.addEventListener("click", async () => {
  console.log("clicked");
  let url = getUrl(input.value);
  const data = await getData(url);
  let randomEntryNumber = RNG(data);
  renderMonster(data[randomEntryNumber]);
});

input.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    renderBtn.click();
  }
});
