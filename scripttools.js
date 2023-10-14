




function addBackGrColorToList(backgroundColorType, m) {
    if (backgroundColorType == 'normal') {
        document.getElementById(`list${m}`).classList.add('bg-normal');
    } if (backgroundColorType == 'ice') {
        document.getElementById(`list${m}`).classList.add('bg-ice');
    } if (backgroundColorType == 'electric') {
        document.getElementById(`list${m}`).classList.add('bg-electric');
    } if (backgroundColorType == 'dragon') {
        document.getElementById(`list${m}`).classList.add('bg-dragon');
    } if (backgroundColorType == 'water') {
        document.getElementById(`list${m}`).classList.add('bg-water');
    } if (backgroundColorType == 'psychic') {
        document.getElementById(`list${m}`).classList.add('bg-psychic');
    } if (backgroundColorType == 'bug') {
        document.getElementById(`list${m}`).classList.add('bg-bug');
    } if (backgroundColorType == 'grass') {
        document.getElementById(`list${m}`).classList.add('bg-grass');
    } if (backgroundColorType == 'fire') {
        document.getElementById(`list${m}`).classList.add('bg-fire');
    } if (backgroundColorType == 'rock') {
        document.getElementById(`list${m}`).classList.add('bg-rock');
    } if (backgroundColorType == 'poison') {
        document.getElementById(`list${m}`).classList.add('bg-poison');
    } if (backgroundColorType == 'fighting') {
        document.getElementById(`list${m}`).classList.add('bg-fighting');
    } if (backgroundColorType == 'ground') {
        document.getElementById(`list${m}`).classList.add('bg-ground');
    } if (backgroundColorType == 'fairy') {
        document.getElementById(`list${m}`).classList.add('bg-fairy');
    }
}


function addBackGrColorToPokedex(backgroundColorType) {
    removePokedexColor();

    if (backgroundColorType == 'normal') {
        document.getElementById('pokedex').classList.add('bg-normal');
    } if (backgroundColorType == 'ice') {
        document.getElementById('pokedex').classList.add('bg-ice');
    } if (backgroundColorType == 'electric') {
        document.getElementById('pokedex').classList.add('bg-electric');
    } if (backgroundColorType == 'dragon') {
        document.getElementById('pokedex').classList.add('bg-dragon');
    } if (backgroundColorType == 'water') {
        document.getElementById('pokedex').classList.add('bg-water');
    } if (backgroundColorType == 'psychic') {
        document.getElementById('pokedex').classList.add('bg-ppsychic');
    } if (backgroundColorType == 'bug') {
        document.getElementById('pokedex').classList.add('bg-bug');
    } if (backgroundColorType == 'grass') {
        document.getElementById('pokedex').classList.add('bg-grass');
    } if (backgroundColorType == 'fire') {
        document.getElementById('pokedex').classList.add('bg-fire');
    } if (backgroundColorType == 'rock') {
        document.getElementById('pokedex').classList.add('bg-rock');
    } if (backgroundColorType == 'poison') {
        document.getElementById('pokedex').classList.add('bg-poison');
    } if (backgroundColorType == 'fighting') {
        document.getElementById('pokedex').classList.add('bg-fighting');
    } if (backgroundColorType == 'ground') {
        document.getElementById('pokedex').classList.add('bg-ground');
    } if (backgroundColorType == 'fairy') {
        document.getElementById('pokedex').classList.add('bg-fairy');
    }
}


function removePokedexColor() {  // bereits in das Element mit der ID "pokedex" gerenderte CSS Background-Color-Attribute löschen, um Platz für neue CSS Background-Color-Attribute zu schaffen
    document.getElementById('pokedex').classList.remove('bg-normal');
    document.getElementById('pokedex').classList.remove('bg-ice');
    document.getElementById('pokedex').classList.remove('bg-electric');
    document.getElementById('pokedex').classList.remove('bg-dragon');
    document.getElementById('pokedex').classList.remove('bg-water');
    document.getElementById('pokedex').classList.remove('bg-ppsychic');
    document.getElementById('pokedex').classList.remove('bg-bug');
    document.getElementById('pokedex').classList.remove('bg-grass');
    document.getElementById('pokedex').classList.remove('bg-fire');
    document.getElementById('pokedex').classList.remove('bg-rock');
    document.getElementById('pokedex').classList.remove('bg-poison');
    document.getElementById('pokedex').classList.remove('bg-fighting');
    document.getElementById('pokedex').classList.remove('bg-ground');
    document.getElementById('pokedex').classList.remove('bg-fairy');
}


function addBackGrColorToLoadedList(type, m) {   // HintergrundFarbe den Pokemons der Liste der gesuchten Pokemons hinzufügen
    let backgroundColorType = type;

    if (backgroundColorType == 'normal') {
        document.getElementById(`search-list${m}`).classList.add('bg-normal');
    } if (backgroundColorType == 'ice') {
        document.getElementById(`search-list${m}`).classList.add('bg-ice');
    } if (backgroundColorType == 'electric') {
        document.getElementById(`search-list${m}`).classList.add('bg-electric');
    } if (backgroundColorType == 'dragon') {
        document.getElementById(`search-list${m}`).classList.add('bg-dragon');
    } if (backgroundColorType == 'water') {
        document.getElementById(`search-list${m}`).classList.add('bg-water');
    } if (backgroundColorType == 'psychic') {
        document.getElementById(`search-list${m}`).classList.add('bg-psychic');
    } if (backgroundColorType == 'bug') {
        document.getElementById(`search-list${m}`).classList.add('bg-bug');
    } if (backgroundColorType == 'grass') {
        document.getElementById(`search-list${m}`).classList.add('bg-grass');
    } if (backgroundColorType == 'fire') {
        document.getElementById(`search-list${m}`).classList.add('bg-fire');
    } if (backgroundColorType == 'rock') {
        document.getElementById(`search-list${m}`).classList.add('bg-rock');
    } if (backgroundColorType == 'poison') {
        document.getElementById(`search-list${m}`).classList.add('bg-poison');
    } if (backgroundColorType == 'fighting') {
        document.getElementById(`search-list${m}`).classList.add('bg-fighting');
    } if (backgroundColorType == 'ground') {
        document.getElementById(`search-list${m}`).classList.add('bg-ground');
    } if (backgroundColorType == 'fairy') {
        document.getElementById(`search-list${m}`).classList.add('bg-fairy');
    }
}