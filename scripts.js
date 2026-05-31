

const form = document.getElementById("pokemonForm");
const input = document.getElementById("pokemonInput");
const container = document.getElementById("pokeContainer");
const message = document.getElementById("message");
const options = document.querySelectorAll(".pokemon-option");


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = input.value.trim();

    if (name === "") {
        message.textContent = "Please enter a Pokémon name";
        return;
    }

    createPokemonCard(name);

    input.value = "";
    message.textContent = `${name} added to team!`;
});



options.forEach(option => {
    option.addEventListener("click", function () {
        const name = option.dataset.name;

        createPokemonCard(name);

        message.textContent = `${name} added to team!`;
    });
});



function createPokemonCard(name) {

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
}