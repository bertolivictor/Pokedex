let offset = 0;
const limit = 16;
const maxRecords = 151

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

const pokemonOl = document.getElementById("pokemonOl")
const loadMoreButton = document.getElementById("load-btn")



function convertPokemonToLi(pokemon) {
    return `
        <a href="./pokemon-stats.html" class="details-link">
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
        </a>  
    `
}
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonsList = []) => {
        pokemonOl.innerHTML += pokemonsList.map(convertPokemonToLi).join('')

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})