const input = document.querySelector("#pokemonInput");
const button = document.querySelector("#searchBtn");
const cardContainer = document.querySelector("#pokemonCard");
const loading = document.querySelector("#loading");
const darkToggle = document.querySelector("#darkToggle");
const html = document.documentElement;

// Dark Mode Toggle
darkToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
});

// Event Listener
button.addEventListener("click", () => {
  const value = input.value.trim().toLowerCase();
  if (value) {
    fetchPokemon(value);
  }
});

// Async Fetch Function
async function fetchPokemon(pokemon) {

  button.disabled = true;
  loading.classList.remove("hidden");
  cardContainer.innerHTML = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pokémon not found");
      } else {
        throw new Error("Network response was not ok");
      }
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

// Render Pokémon
function renderPokemon(data) {

  const { name, id, height, weight, base_experience, types, sprites } = data;

  const card = document.createElement("div");
  card.classList.add(
    "bg-gray-100", "dark:bg-gray-700", "p-6", "rounded-xl", "shadow-lg", "animate-fadeIn", "transition","duration-500"
  );

  // Capitalize name
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  // Convert height (decimeters to meters)
  const heightMeters = height / 10;

  // Convert weight (hectograms to kg)
  const weightKg = weight / 10;

  // Types list using map()
  const typesList = types
    .map(type => `<span class="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm">${type.type.name}</span>`)
    .join(" ");

  card.innerHTML = `
    <h2 class="text-2xl font-bold mb-4 dark:text-white">
      ${capitalizedName} (#${id})
    </h2>

    <div class="flex justify-center gap-4 mb-4">
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

// Error Display
function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("text-red-600", "font-semibold");
  errorDiv.textContent = message;
  cardContainer.appendChild(errorDiv);
}

const btn = document.getElementById("darkToggle");
const card = document.querySelector("#cardContainer");

btn.addEventListener("click", () => {
  card.classList.toggle("dark");
});
