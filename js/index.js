document.addEventListener("DOMContentLoaded", () => {
  const renderBtn = document.querySelector("#input-btn");
  const mainContainer = document.querySelector("main");
  const input = document.querySelector("#cr-input");
  const defaultMonster =
    "https://api.open5e.com/monsters/?desc__icontains=crab&cr=9";
  const toTopBtn = document.querySelector("#to-top-btn");

  toTopBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });

  input.focus();

  // Randomly pick a number of the array to pick a monster
  function getRandomMonsterIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  // Getting data from API
  async function getData(url) {
    try {
      const request = await fetch(url);
      const data = await request.json();
      return data.results;
    } catch (error) {
      console.error("An error occurred during data fetching:", error);
      return [];
    }
  }

  async function renderMonster(input) {
    const results = input;
    // adding monster stat html
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
  <button id="monster-action-btn">Actions</button>
  <button id="monster-saction-btn">Special Abilities</button>
  `;

    // Adding monster ability html
    const monsterActions = document.createElement("div");
    monsterActions.id = "monster-actions-container";
    monsterActions.classList.add("monster-actions-container");
    monsterActions.classList.add("hidden");

    monsterElement.appendChild(monsterActions);
    if (input.actions) {
      input.actions.forEach((input, i) => {
        const monsterActionElement = document.createElement("div");
        monsterActionElement.classList.add(`monster-action-container-${i}`);

        monsterActionElement.innerHTML = `
      <h3>${input.name}</h3>
      <p>${input.desc}</p>
      `;
        monsterActions.appendChild(monsterActionElement);
      });
    }

    const monsterSActions = document.createElement("div");
    monsterSActions.id = "monster-sactions-container";
    monsterSActions.classList.add("monster-sactions-container");
    monsterSActions.classList.add("hidden");

    console.log();
    monsterElement.appendChild(monsterSActions);
    if (input.special_abilities) {
      input.special_abilities.forEach((input, i) => {
        const monsterSActionElement = document.createElement("div");
        monsterSActionElement.classList.add(`monster-saction-container-${i}`);

        monsterSActionElement.innerHTML = `
      <h3>${input.name}</h3>
      <p>${input.desc}</p>
      `;

        monsterSActions.appendChild(monsterSActionElement);
      });
    }

    let monsterActionBtnClicked = true;
    let monsterSActionBtnClicked = true;

    mainContainer.appendChild(monsterElement);

    // Adding eventlistener to buttons to hide/show monster abilities

    mainContainer.addEventListener("click", (event) => {
      const target = event.target;
      console.log("clicked");
      if (target.id === "monster-action-btn") {
        const monsterActionContainer = target
          .closest(".monster-container")
          .querySelector(".monster-actions-container");
        if (monsterActionBtnClicked) {
          monsterActionContainer.classList.toggle("hidden");
        }
        monsterActionBtnClicked = !monsterActionBtnClicked;
      } else if (target.id === "monster-saction-btn") {
        const monsterSActionContainer = target
          .closest(".monster-container")
          .querySelector(".monster-sactions-container");
        if (monsterSActionBtnClicked) {
          monsterSActionContainer.classList.toggle("hidden");
        }
        monsterSActionBtnClicked = !monsterSActionBtnClicked;
      }
    });
  }

  // Main renderbutton functionality
  renderBtn.addEventListener("click", async () => {
    console.log("clicked");
    const url = `https://api.open5e.com/monsters/?limit=300&cr=${input.value}`;
    try {
      const data = await getData(url);
      const filteredMonsters = data.filter(
        (obj) => obj.cr.toString() === input.value.toString()
      );
      if (filteredMonsters.length > 0) {
        const randomIndex = getRandomMonsterIndex(filteredMonsters);
        const randomMonster = filteredMonsters[randomIndex];
        renderMonster(randomMonster);
      } else {
        mainContainer.textContent = "No monsters found for the given CR value.";
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
  // Adding enter key as a click
  input.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      renderBtn.click();
    }
  });

  // Rendering default monster for the page
  async function renderDefault() {
    try {
      const data = await getData(defaultMonster);
      renderMonster(data[0]);
    } catch (error) {
      console.error("An error occurred during default rendering:", error);
    }
  }

  renderDefault();
});
