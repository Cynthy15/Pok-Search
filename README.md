# Simple PokéSearch App

A responsive PokéSearch web application built using:

- HTML
- Tailwind CSS
- Vanilla JavaScript (ES6+)
- Fetch API
- DOM Manipulation
- Dark Mode Toggle

This project fetches real Pokémon data from the PokéAPI and displays it dynamically.

---

## Features

- Search Pokémon by name or ID
- Dark Mode toggle
- Fully responsive design
- Loading indicator
- Error handling for invalid Pokémon
- Styled with Tailwind CSS
- Uses modern JavaScript (ES6+)
- Built using DOM manipulation

---

## API Used

This project uses the public PokéAPI:

[https://pokeapi.co/](https://pokeapi.co/api/v2/pokemon)

project-folder/
│
├── index.html
├── script.js
└── README.md


---

## How It Works

1. User enters a Pokémon name or ID.
2. JavaScript sends a request to the PokéAPI.
3. Data is fetched using `fetch()`.
4. Response is converted from JSON into a JavaScript object.
5. A card is dynamically created using DOM manipulation.
6. Data (sprites, height, weight, types) is displayed.
7. Dark mode toggles using Tailwind's `dark` class.

---

## Dark Mode

Dark mode works by toggling the `dark` class on the `<html>` element:

```js
document.documentElement.classList.toggle("dark");

