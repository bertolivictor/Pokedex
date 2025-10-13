const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToLi (pokemon) {
    return `
        <li class="card">
            <span class="number">#001</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    <li class="type">Grass</li>
                    <li class="type">Poison</li>
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
            </div>            
        </li>  
    `
}
const pokemonOl = document.getElementById ("pokemonOl")
fetch (url)
    .then ((response) => response.json())
    .then ((jsonBody) => jsonBody.results)
    .then ((pokemonsList) => {
        for (let i = 0; i < pokemonsList.length; i++) {
            const pokemon = pokemonsList[i];
            pokemonOl.innerHTML += convertPokemonToLi(pokemon)
        }
    })
    .catch ((error) => console.error(error))