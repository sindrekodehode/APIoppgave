function renderMonsterUI(input) {
  const mainContainer = document.querySelector("main");
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
      </div>
    `;

  const monsterActionsBtn = document.createElement("button");
  monsterActionsBtn.id = "monster-action-btn";
  monsterActionsBtn.textContent = "Actions";
  monsterElement.appendChild(monsterActionsBtn);

  const monsterSActionsBtn = document.createElement("button");
  monsterSActionsBtn.id = "monster-saction-btn";
  monsterSActionsBtn.textContent = "Special Abilities";
  monsterElement.appendChild(monsterSActionsBtn);

  const monsterActionsContainer = document.createElement("div");
  monsterActionsContainer.id = "monster-actions-container";
  monsterActionsContainer.classList.add("monster-actions-container");
  monsterActionsContainer.classList.add("hidden");
  monsterElement.appendChild(monsterActionsContainer);

  const monsterSActionsContainer = document.createElement("div");
  monsterSActionsContainer.id = "monster-sactions-container";
  monsterSActionsContainer.classList.add("monster-sactions-container");
  monsterSActionsContainer.classList.add("hidden");
  monsterElement.appendChild(monsterSActionsContainer);

  renderAbilities(input.actions, monsterActionsContainer, "monster-action");
  renderAbilities(
    input.special_abilities,
    monsterSActionsContainer,
    "monster-saction"
  );
  mainContainer.appendChild(monsterElement);

  // Attach event listeners for toggling visibility directly here
  monsterActionsBtn.addEventListener("click", () => {
    monsterActionsContainer.classList.toggle("hidden");
  });

  monsterSActionsBtn.addEventListener("click", () => {
    monsterSActionsContainer.classList.toggle("hidden");
  });
}

function renderAbilities(abilities, container, id) {
  if (abilities) {
    abilities.forEach((ability, i) => {
      const element = document.createElement("div");
      element.classList.add(`${id}-container-${i}`);
      element.innerHTML = `
          <h3>${ability.name}</h3>
          <p>${ability.desc}</p>
        `;
      container.appendChild(element);

      const button = document.createElement("button");
      button.textContent = "Toggle Visibility";
      element.appendChild(button);

      button.addEventListener("click", () => {
        element.classList.toggle("hidden");
      });
    });
  }
}

export { renderMonsterUI };
