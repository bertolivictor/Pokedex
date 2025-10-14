const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToLi(pokemon) {
    return `
        <li class="card ${pokemon.type}">
            <span class="number">#${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>            
        </li>  
    `
}
const pokemonOl = document.getElementById("pokemonOl")

pokeApi.getPokemons().then((pokemonsList = []) => {

    pokemonOl.innerHTML = pokemonsList.map(convertPokemonToLi).join('')

})