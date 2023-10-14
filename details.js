


function showDetails(name, pokeImg, m, backgroundColorType) {
    let move = pokemonArray[m]['moves'][0];
    console.log(move);

    document.getElementById(`move${m}`).classList.remove('d-none');
}