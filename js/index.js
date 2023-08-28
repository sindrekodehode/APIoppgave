import { renderMonsterUI } from "./rendermonster.js";
import { getData } from "./api-tasks.js";

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

  async function renderDefault() {
    try {
      const data = await getData(defaultMonster);
      renderMonsterUI(data[0]);
    } catch (error) {
      console.error("An error occurred during default rendering:", error);
    }
  }

  input.focus();

  renderBtn.addEventListener("click", async () => {
    const url = `https://api.open5e.com/monsters/?limit=300&cr=${input.value}`;
    try {
      const data = await getData(url);
      const filteredMonsters = data.filter(
        (obj) => obj.cr.toString() === input.value.toString()
      );
      if (filteredMonsters.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredMonsters.length);
        const randomMonster = filteredMonsters[randomIndex];
        renderMonsterUI(randomMonster);
      } else {
        mainContainer.textContent = "No monsters found for the given CR value.";
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  input.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderBtn.click();
    }
  });

  renderDefault();
});
