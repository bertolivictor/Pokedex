class PokemonDetails {
    constructor() {
        this.pokemon = null;
        this.init();
    }

    init() {
        this.loadPokemonDetails();
    }

    getPokemonIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1';
    }

    async loadPokemonDetails() {
        const pokemonId = this.getPokemonIdFromUrl();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemonData = await response.json();
            this.pokemon = this.convertToPokemonDetails(pokemonData);
            this.updatePageDetails();
        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
            this.showError();
        }
    }

    convertToPokemonDetails(pokemonDetail) {
        return {
            order: pokemonDetail.id,
            name: pokemonDetail.name,
            types: pokemonDetail.types.map(typeSlot => typeSlot.type.name),
            type: pokemonDetail.types[0].type.name,
            image: pokemonDetail.sprites.other.dream_world.front_default,
            height: pokemonDetail.height / 10,
            weight: pokemonDetail.weight / 10,
            abilities: pokemonDetail.abilities.map(abilitySlot => abilitySlot.ability.name),
            stats: pokemonDetail.stats.map(statSlot => ({
                name: statSlot.stat.name,
                value: statSlot.base_stat
            }))
        };
    }

    updatePageDetails() {
        if (!this.pokemon) return;

        document.querySelector('.pokemon-title h1:first-child').textContent = 
            this.capitalizeFirstLetter(this.pokemon.name);
        document.querySelector('.pokemon-title h1:last-child').textContent = `#${this.pokemon.order}`;
        
        const pokemonImg = document.getElementById('pokemonImg');
        pokemonImg.src = this.pokemon.image;
        pokemonImg.alt = `Imagem do ${this.pokemon.name}`;

        this.updatePokemonTypes();
        this.updatePokemonInfo();
        this.updatePokemonStats();
        this.updateThemeColors();
    }

    updatePokemonTypes() {
        const typesContainer = document.querySelector('.pokemon-types');
        typesContainer.innerHTML = this.pokemon.types.map(type => 
            `<span class="type type-${type}" style="background-color: ${this.getTypeColor(type)}">${type}</span>`
        ).join('');
    }

    updatePokemonInfo() {
        const infoItems = document.querySelectorAll('.info-item');
        
        // Height
        infoItems[0].querySelector('p').textContent = `${this.pokemon.height} m`;
        
        // Weight
        infoItems[1].querySelector('p').textContent = `${this.pokemon.weight} kg`;
        
        // Abilities
        const abilitiesList = document.querySelector('.abilities-list');
        abilitiesList.innerHTML = this.pokemon.abilities.map(ability =>
            `<li>${this.capitalizeFirstLetter(ability)}</li>`
        ).join('');
    }

    updatePokemonStats() {
        const stats = this.pokemon.stats;

        const statOrder = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
        const orderedStats = statOrder.map(statName =>
            stats.find(stat => stat.name === statName)
        );

        const statItemElement = document.querySelector('.stat-item');
        statItemElement.innerHTML = `
            <p class="${this.pokemon.type}-txt">HP</p>
            <p class="${this.pokemon.type}-txt">ATK</p>
            <p class="${this.pokemon.type}-txt">DEF</p>
            <p class="${this.pokemon.type}-txt">SATK</p>
            <p class="${this.pokemon.type}-txt">SDEF</p>
            <p class="${this.pokemon.type}-txt">SPD</p>
        `;

        const statNumberElement = document.querySelector('.stat-number');
        statNumberElement.innerHTML = orderedStats.map(stat =>
            `<p class="${this.pokemon.type}-txt-lt">${stat.value}</p>`
        ).join('');

        this.updateStatBars(orderedStats);
    }

    updateStatBars(stats) {
        const statBars = document.querySelector('.stat-bars');
        statBars.innerHTML = stats.map(stat => `
            <div class="stats-bar-container ${this.pokemon.type}-bg-lt"> <!-- CORREÇÃO: Fechar aspas -->
                <div class="stats-bar ${this.pokemon.type}" style="width: ${this.calculateStatPercentage(stat.value)}%"></div> <!-- CORREÇÃO: stat-bat → stats-bar -->
            </div> <!-- CORREÇÃO: Remover div extra -->
        `).join('');
    }

    calculateStatPercentage(statValue) {
        const maxStat = 180;
        return Math.min((statValue / maxStat) * 100, 100);
    }

    updateThemeColors() {
        const mainContainer = document.querySelector('.main-container');
        mainContainer.style.backgroundColor = this.getTypeColor(this.pokemon.type);

        this.updateTextColors();
    }

    updateTextColors() {
        const statsTitle = document.querySelector('.pokemon-stats h2');
        if (statsTitle) {
            statsTitle.className = `${this.pokemon.type}-txt-lt`;
        }
    }

    getTypeColor(type) {
        const typeColors = {
            normal: '#a3a370',
            bug: '#a3b221',
            fighting: '#b63427',
            ghost: '#6d5394',
            electric: '#f1ca2f',
            flying: '#a18ae8',
            steel: '#b2b2cb',
            psychic: '#ee5583',
            poison: '#993e9a',
            fire: '#ea7b2e',
            ice: '#93d1d1',
            ground: '#dcb96b',
            water: '#668be8',
            dragon: '#713af3',
            rock: '#b19b36',
            grass: '#71c04d',
            dark: '#6c5546',
            fairy: '#f79eaa',
        };
        return typeColors[type] || '#68a090';
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    showError() {
        console.error('Não foi possível carregar os detalhes do Pokémon');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PokemonDetails();
});