document.addEventListener("DOMContentLoaded", () => {
  const renderBtn = document.querySelector("button");
  const mainContainer = document.querySelector("main");
  const input = document.querySelector("#cr-input");
  const defaultMonster =
    "https://api.open5e.com/monsters/?desc__icontains=crab&cr=9";

  input.focus();

  function getRandomMonsterIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  async function getData(url) {
    const request = await fetch(url);
    const data = await request.json();
    return data.results;
  }

  async function renderMonster(input) {
    const results = input;

    mainContainer.innerHTML = "";

    const monsterElement = document.createElement("div");
    monsterElement.classList.add("monster-container");
    monsterElement.innerHTML = `
  <h3>${input.name}</h3>
  <p>${input.type}</p>
  <p>${input.size}</p>
  <p>${input.alignment}</p>
  <p>HP: ${input.hit_points}</p>
  <p>AC: ${input.armor_class}</p>
  <br>
  <div class="stats">
    <p>Str:${input.strength}</p>
    <p>Dex:${input.dexterity}</p>
    <p>Con:${input.constitution}</p>
    <p>Int:${input.intelligence}</p>
    <p>Wis:${input.wisdom}</p>
    <p>Cha:${input.charisma}</p>
  <br>
  
  </div>
  `;
    mainContainer.appendChild(monsterElement);
  }

  renderBtn.addEventListener("click", async () => {
    console.log("clicked");
    const url = `https://api.open5e.com/monsters/?limit=300&cr=${input.value}`;
    const data = await getData(url);
    const filteredMonsters = data.filter(
      (obj) => obj.cr.toString() === input.value.toString()
    );
    if (filteredMonsters.length > 0) {
      const randomIndex = getRandomMonsterIndex(filteredMonsters);
      const randomMonster = filteredMonsters[randomIndex];
      renderMonster(randomMonster);
    }
  });

  input.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      renderBtn.click();
    }
  });

  async function renderDefault() {
    const data = await getData(defaultMonster);
    renderMonster(data[0]);
  }

  renderDefault();
});
