// DOM elements
const form = document.getElementById("pokemonForm");
const input = document.getElementById("pokemonInput");
const container = document.getElementById("pokeContainer");
const message = document.getElementById("message");
const options = document.querySelectorAll(".pokemon-option");

// TEAM LIMIT
const MAX_TEAM_SIZE = 4;

// Build allowed Pokémon list from images
const allowedPokemon = Array.from(options).map(option => option.dataset.name);

// -----------------------------
// FORM SUBMIT
// -----------------------------
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = input.value.trim();

    if (name === "") {
        message.textContent = "Please enter a Pokémon name";
        return;
    }

    const formattedName = capitalize(name);

    if (!allowedPokemon.includes(formattedName)) {
        message.textContent = "Invalid Pokémon. Choose from the images above.";
        return;
    }

    createPokemonCard(formattedName);

    input.value = "";
    message.textContent = `${formattedName} added to team!`;
});


// -----------------------------
// IMAGE CLICK
// -----------------------------
options.forEach(option => {
    option.addEventListener("click", function () {
        const name = option.dataset.name;

        createPokemonCard(name);

        message.textContent = `${name} added to team!`;
    });
});


// -----------------------------
// CREATE POKÉMON CARD
// -----------------------------
function createPokemonCard(name) {

    if (container.children.length >= MAX_TEAM_SIZE) {
        message.textContent = "Team is full! Max 4 Pokémon allowed.";
        return false; // ❌ failed
    }

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    card.innerHTML = `
        <h3>${name}</h3>
        <button class="favorite-btn">Favorite</button>
        <button class="remove-btn">Remove</button>
    `;

    container.appendChild(card);

    const favBtn = card.querySelector(".favorite-btn");
    favBtn.addEventListener("click", function () {
        card.classList.toggle("favorite");
    });

    const removeBtn = card.querySelector(".remove-btn");
    removeBtn.addEventListener("click", function () {
        card.remove();
        message.textContent = `${name} removed from team!`;
    });

    return true;
}


// -----------------------------
// HELPER FUNCTION
// -----------------------------
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}