const input = document.querySelector("#pokemonInput");
const button = document.querySelector("#searchBtn");
const cardContainer = document.querySelector("#pokemonCard");
const loading = document.querySelector("#loading");
const darkToggle = document.querySelector("#darkToggle");
const html = document.documentElement;
const tit = document.getElementsByClassName("title");
const toggleBtn = document.getElementById("darkToggle");
const body = document.getElementById("body");
const card = document.getElementById("cardContainer");

let darkMode = false;

toggleBtn.addEventListener("click", () => {
  darkMode = !darkMode;

  if (darkMode) {

    body.className = "min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 transition-all duration-500";

    card.className = "w-full max-w-md sm:max-w-lg bg-gray-800 text-white p-5 sm:p-8 rounded-2xl shadow-2xl transition-all duration-500";

    toggleBtn.textContent = "☀️ Light Mode";

  } else {

    body.className = "min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 transition-all duration-500";

    tit.className = "text-black ";

    toggleBtn.textContent = "🌙 Dark Mode";
  }
});


button.addEventListener("click", () => {
  const value = input.value.trim().toLowerCase();
  if (value) fetchPokemon(value);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

async function fetchPokemon(pokemon) {
  button.disabled = true;
  loading.classList.remove("hidden");
  cardContainer.innerHTML = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();
    renderPokemon(data);

  } catch (error) {
    showError(error.message);
  } finally {
    loading.classList.add("hidden");
    button.disabled = false;
  }
}


function renderPokemon(data) {
  const { name, id, height, weight, base_experience, types, sprites } = data;

  const card = document.createElement("div");
  card.className =
    "bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-lg transition duration-500";

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  const heightMeters = height / 10;
  const weightKg = weight / 10;

  const typesList = types
    .map(t => `<span class="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm">${t.type.name}</span>`)
    .join(" ");

  card.innerHTML = `
    <h2 class="text-2xl font-bold mb-4 dark:text-white">
      ${capitalizedName} (#${id})
    </h2>

    <div class="flex justify-center gap-4 mb-4 flex-wrap">
      <img src="${sprites.front_default}" class="w-24 hover:scale-110 transition">
      <img src="${sprites.back_default}" class="w-24 hover:scale-110 transition">
      <img src="${sprites.front_shiny}" class="w-24 hover:scale-110 transition">
    </div>

    <p class="dark:text-gray-200"><strong>Height:</strong> ${heightMeters} m</p>
    <p class="dark:text-gray-200"><strong>Weight:</strong> ${weightKg} kg</p>
    <p class="dark:text-gray-200"><strong>Base Experience:</strong> ${base_experience}</p>

    <div class="mt-4 flex justify-center gap-2 flex-wrap">
      ${typesList}
    </div>
  `;

  cardContainer.appendChild(card);
}

function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "text-red-600 font-semibold";
  errorDiv.textContent = message;
  cardContainer.appendChild(errorDiv);
}