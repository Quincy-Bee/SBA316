console.log("JS loaded");

// DOM elements
const form = document.getElementById("pokemonForm");
const input = document.getElementById("pokemonInput");
const container = document.getElementById("pokeContainer");
const message = document.getElementById("message");
const options = document.querySelectorAll(".pokemon-option");


// Build allowed Pokémon list from your images (IMPORTANT)
const allowedPokemon = Array.from(options).map(option => option.dataset.name);


// -----------------------------
// FORM SUBMIT (typed input)
// -----------------------------
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = input.value.trim();

    // HTML + JS validation
    if (name === "") {
        message.textContent = "Please enter a Pokémon name";
        return;
    }

    // must match image options
    if (!allowedPokemon.includes(capitalize(name))) {
        message.textContent = "Invalid Pokémon. Choose from the images above.";
        return;
    }

    createPokemonCard(capitalize(name));

    input.value = "";
    message.textContent = `${capitalize(name)} added to team!`;
});


// -----------------------------
// IMAGE CLICK (preferred method)
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

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    card.innerHTML = `
        <h3>${name}</h3>
        <button class="favorite-btn">Favorite</button>
        <button class="remove-btn">Remove</button>
    `;

    container.appendChild(card);


    // -------------------------
    // FAVORITE TOGGLE
    // -------------------------
    const favBtn = card.querySelector(".favorite-btn");

    favBtn.addEventListener("click", function () {
        card.classList.toggle("favorite");
    });


    // -------------------------
    // REMOVE CARD
    // -------------------------
    const removeBtn = card.querySelector(".remove-btn");

    removeBtn.addEventListener("click", function () {
        card.remove();
        message.textContent = `${name} removed from team!`;
    });
}


// -----------------------------
// HELPER FUNCTION (format input)
// -----------------------------
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}