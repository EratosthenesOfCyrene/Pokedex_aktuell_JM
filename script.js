
let currentPokemon;
let filteredPokemons = [];  // Array, dem die herausgefilterten (mit der Suchfunktion) Pokemons hinzugepusht werden
let isFilterPokemonsExecuted = false;  // Variable zum Test, ob die Seite wenn man auf die div mit der id=background (also neben das Popup) klickt, neu geladen werden muss (indem die "start()"-Funktion ausgeführt wird).  
let isNextClicked = false;
let favourites = [];
let globalEncodedPokemonName;
let isFavouritePokemonsExecuted = false;
let isSearched = false;
let isLoading = false;
let isFavouritesClicked = false;
let pokemonArray = [];
let statsArray = [];
let aboutArray = [];
let movesArray = [];
let globalCurrentPokeImg;
let globalCurrentM;
let globalCurrentPokemonName;


async function start() {
    /*DNone('loading-screen', 'remove');*/
    await fetchList();
    showAmountOfFavourites();
}


function showHideLoadingScreen() {
    if (isLoading === true) {
        DNone('loading-screen', 'remove');
    }
    DNone('loading-screen', 'add');
}


async function fetchList() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

    let response = await fetch(url);
    pokemonList = await response.json();
    pushIntoPokemonArray(pokemonList);
}


let expectedPokemonCount = 0; // Pokemon-Zähler, um zu prüfen, ob und wann alle Pokemons geladen sind
// Hinzufügen der Pokemons zum Array "pokemonArray"
function pushIntoPokemonArray(pokemonList) {
    let results = pokemonList['results'];
    let pokemonName;

    for (let m = 0; m < 25; m++) {
        const pokemon = results[m];
        pokemonName = pokemon['name'];
        let encodedPokemonName = encodeURIComponent(pokemonName);

        pushIntoArrays(pokemonName, m, encodedPokemonName);
        expectedPokemonCount++;
    }
    checkPokemonArrayLength();
}


async function pushIntoArrays(pokemonName, m, encodedPokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    let response = await fetch(url);
    currentPokemon = await response.json();

    pushMandEcodedPokemonname(m, encodedPokemonName);
    pushAboutIntoArray(); /*rendern der Werte in den Reiter "About"*/
    pushStatsIntoArray(); /*rendern der Werte in den Reiter "Stats"*/
    pushMovesIntoArray(); /*rendern der Werte in den Reiter "Moves"*/
}


// das "Async" vor diesrer Funktion sorgt dsafür, dass dass ein Pokemon erst geladen wird, nachdem das vorangegangene Pokemon vollstaändig gelade ist (glaube ich)
async function pushMandEcodedPokemonname(m, encodedPokemonName) {
    let name = currentPokemon['name'];
    let image = /*document.getElementById('pokemon-img_front').src =*/ currentPokemon['sprites']['front_shiny'];

    pokemonArray.push({
        'm': m,
        'encoded-name': encodedPokemonName,
        'name': name,
        'pokemon-image': image,
        'pokemonInfo': aboutArray,
        'stats': statsArray,
        'moves': movesArray,
        'types': currentPokemon['types'][0]['type']['name']
    });
     // Sortieren des pokemonArray nach der 'm'-Variable aufsteigend  -  Sonst werden die Pokemons in der falschen Reihenfolge angezeigt!!!
     pokemonArray.sort((a, b) => a.m - b.m);
     console.log(pokemonArray);
}


function pushStatsIntoArray() {
    let stats = currentPokemon['stats'];

    for (let k = 0; k < stats.length; k++) {
        const stat = stats[k];

        statsArray.push({
            'stat-name': stat['stat']['name'],
            'base-stat': stat['base_stat']
        })

    }
    statsArray = [];
}


function pushAboutIntoArray() {

    aboutArray.push({
        'species-name': currentPokemon['name'],
        'height': currentPokemon['height'],
        'weight': currentPokemon['weight'],
        'abilities': currentPokemon['abilities']['1']['ability']['name'],
    })
    aboutArray = [];
}


function pushMovesIntoArray() {
    let moves = currentPokemon['moves'];

    for (let i = 0; i < 5; i++) {
        const move = moves[i];

        movesArray.push({
            'move': move['move']['name']
        })
    }
    movesArray = [];
}


// Anzeigen der Pokemonliste

function checkPokemonArrayLength() {
    if (pokemonArray.length === expectedPokemonCount) {
        loadPokemonList();
    } else {
        // Warte weiter, bis das Array die erwartete Länge erreicht hat
        setTimeout(checkPokemonArrayLength, 100); // Überprüfung alle 100 Millisekunden wiederholen
    }
}


function loadPokemonList() { 
    for (let i = 0; i < pokemonArray.length; i++) {
        let pokemon = pokemonArray[i];

        let name = pokemon['name'];
        let pokeImg = pokemon['pokemon-image'];
        let m = pokemon['m'];
        backgroundColorType = pokemon['types'];
        globalCurrentPokeImg = pokeImg;
        let move = pokemonArray[m]['moves'][0];

        showPokemonList(name, pokeImg, m, backgroundColorType, move);
    }
}


function showPokemonList(name, pokeImg, m, backgroundColorType, move) {
    document.getElementById('background-2-list').innerHTML += /*html*/`
    <span onmouseover="showDetails('${name}', '${pokeImg}', ${m}, '${backgroundColorType}')" onclick="loadPokemon('${m}, ${pokeImg}'), DNone('card', 'remove'), DNone('background', 'remove'), DNone('background-2-list', 'add'), compare()" id="list${m}" class="list"> ${name} 
        <img id="list-img${m}" src="${pokeImg}" alt="">
        <span id="move${m}" class="d-none"> ${move} </span>
    </span>
    `;

    addBackGrColorToList(backgroundColorType, m);
}


let scrollPosition = 0; // Variable zum Speichern der Scrollposition

async function loadPokemon(m) {
  scrollPosition = window.scrollY;   // Speichert die aktuelle Scrollposition, bevor das innere Fenster geöffnet wird
    let string = m;
    let mNumber = parseInt(string);
    globalCurrentM = mNumber;
    let currentPokemon = pokemonArray[mNumber];
    let name = currentPokemon['name'];
    globalCurrentPokemonName = currentPokemon['name'];

    renderPokemonInfo(currentPokemon);
    renderAbout(currentPokemon, m); /*rendern der Werte in den Reiter "About"*/
    renderStats(currentPokemon, m); /*rendern der Werte in den Reiter "Stats"*/
    renderEvolution(currentPokemon, m); /*rendern der Werte in den Reiter "Types"*/
    renderMoves(currentPokemon, m); /*rendern der Werte in den Reiter "Moves"*/
    window.scrollTo(0, 0);  // zum Anfang des neu geöfffneten Unterfensters Scrollen
}


function renderPokemonInfo(currentPokemon) {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-img_front').src = currentPokemon['pokemon-image'];

    let backgroundColorType = currentPokemon['types'];
    addBackGrColorToPokedex(backgroundColorType);
}


function renderAbout(currentPokemon, m) {
    let about = currentPokemon['pokemonInfo'][0];

    document.getElementById('about-species').innerHTML = about['species-name'];
    document.getElementById('about-height').innerHTML = about['height'];
    document.getElementById('about-weight').innerHTML = about['weight'];
    document.getElementById('about-abilities').innerHTML = about['abilities'];
}


function renderStats(currentPokemon, m) {
    document.getElementById('stats').innerHTML = ``;   // Leeeren der zuvor gerenderten Elemente falls vorhanden
    let stats = currentPokemon['stats'];

    for (let k = 0; k < stats.length; k++) {
        const stat = stats[k];

        document.getElementById('stats').innerHTML += /*html*/`
            <div class="stats-around">
                <div class="about-sub width-150"> ${stat['stat-name']} </div> 
                <div class=""> ${stat['base-stat']} </div>
            </div>
        `;
    }
}


function renderEvolution(currentPokemon, m) {
    document.getElementById('evolution').innerHTML = ``;   // Leeeren der zuvor gerenderten Elemente falls vorhanden
    let type = currentPokemon['types'];

    document.getElementById('evolution').innerHTML = /*html*/`
        <div class="about-sub"> ${type} </div>
    `;
}


function renderMoves(currentPokemon, m) {
    document.getElementById('moves').innerHTML = ``;   // Leeeren der zuvor gerenderten Elemente falls vorhanden
    let moves = currentPokemon['moves'];

    for (let i = 0; i < 5; i++) {
        const move = moves[i];

        document.getElementById('moves').innerHTML += /*html*/` 
            <div class="about-sub"> ${move['move']} </div>
        `;
    }
}


async function nextPokemon() {
    isNextClicked = true;
    globalCurrentM++; // Update currentM before calling fetchList().
    loadPokemon(globalCurrentM);
    compare();
    isNextClicked = false; // Reset isNextClicked after fetchList is done.
}


async function precededPokemon() {
    isNextClicked = true;
    globalCurrentM--; // Update currentM before calling fetchList().
    loadPokemon(globalCurrentM);
    compare();
    isNextClicked = false; // Reset isNextClicked after fetchList is done.
}


function underline(param1, param2) {
    document.getElementById(param1).classList[param2]('nav-item-onclicked');
}

function DNone(param1, param2) {
    document.getElementById(param1).classList[param2]('d-none');
}


function backGroundDNone(event) {
    /*if (event.target.id === "background") {*/
    document.getElementById('background').classList.add('d-none');
    window.scrollTo(0, scrollPosition);

    if (isFavouritesClicked === true) {
        DNone('back-to-list-of-all-pokemons', 'remove');
    }
}


function stopPropagation(event) {    // Verhindert, dass beim Klick auf das Element mit der ID "card" (und alle daraus gerenderten Elemente) die Funktion backGroundDNone ausgeführt wird und alles aus der Div "background" Gerenderte inklusive dieser Div das CSS-Attribut "d-none" verliehen bekommt.
    event.stopPropagation();
}


//    SUCHEN

// überprüfen, ob Entertaste gedrückt wurde, um Suche beim Drücken dieser Taste zu starten
function testEnter(event) {
    if (event.keyCode === 13) {  // prüfen, ob die Entertaste gedrückt wurde
        filterPokemons();
        DNone('background', 'add');
        DNone('background-2-list', 'remove');
        DNone('back-to-list-of-all-pokemons', 'add');
        isFavouritesClicked = false;
        if (isFavouritesClicked === false) {
            DNone('back-to-list-of-all-pokemons', 'add');
        }
    }
}


// Suchen in der Mobilen Ansicht
function mobileSearch() {
    filterPokemons2();
    DNone('background', 'add');
    DNone('background-2-list', 'remove');
}


function filterPokemons() {
    let search = document.getElementById('input').value;
    search = search.toLowerCase();
    let pokemonSearchList = document.getElementById('background-2-list');

    pokemonSearchList.innerHTML = ``;
    searchOriginalOrder(search);
    document.getElementById('input').value = ``;
    isFilterPokemonsExecuted = true;
}


// Suchen in der mobilen Ansicht
function filterPokemons2() {
    let search = document.getElementById('input-2').value;
    search = search.toLowerCase();
    let pokemonSearchList = document.getElementById('background-2-list');

    pokemonSearchList.innerHTML = ``;
    searchOriginalOrder(search);
    document.getElementById('input-2').value = ``;
    isFilterPokemonsExecuted = true;
}


function searchOriginalOrder(search) {
    isSearched = true;
    let matchesFound = false;
    for (let p = 0; p < pokemonArray.length; p++) {
        const pokemon = pokemonArray[p];

        let pokemonName = pokemon['name'];       
        let m = pokemon['m'];
        let type = pokemon['types'];
        let pokeImg = pokemon['pokemon-image'];

        if (pokemonName.toLocaleLowerCase().includes(search)) {
            document.getElementById('background-2-list').innerHTML += /*html*/`
        <span onclick="loadPokemon(${m}), DNone('card', 'remove'), DNone('background', 'remove'), DNone('background-2-list', 'add'), compare(),  hideBackForwardBtnsSearched()" id="search-list${m}" class="list"> ${pokemonName} 
            <img id="list-img${m}" src="${pokeImg}" alt="">
        </span>
        `;
            addBackGrColorToLoadedList(type, m);
            matchesFound = true;
            filteredPokemons.push({ name: pokemonName, 'm': m });  // die herausgefilterten Pokemons dem Array "filteredPokemons" hinzufügen
        }            
    }
    noMatches(matchesFound);
}



function noMatches(matchesFound) {
    if (matchesFound === false) {
        DNone('no-matches', 'remove');
        DNone('no-matches-btn', 'remove');
        }
}


function testIfIsFilterPokemonsExecuted() {  // prüfen, ob die Seite beim Klick neben das Popup neu geladen werden muss
    if (isFilterPokemonsExecuted == true) {
        loadPokemonList();

        for (const { name, m } of filteredPokemons) {
            const divToRemove = document.getElementById(`search-list${m}`);  // diese und v.a. folgende Zeile: Entfernen der kompletten div - nicht nur derern Inhalt
            divToRemove.remove();  // ".remove()" ist eine JS-Standartfunktion
        }
    }

    isFilterPokemonsExecuted = false;
    filteredPokemons = [];
}


function testIfIsFavouriteListExecuted() {
    if (isFavouritePokemonsExecuted == true) {

        for (const { encodedName, m } of favourites) {
            const divToRemove = document.getElementById(`search-list${m}`);  // diese und v.a. folgende Zeile: Entfernen der kompletten div - nicht nur derern Inhalt
            divToRemove.remove();  // ".remove()" ist eine JS-Standartfunktion
        }
    }
    isFavouritePokemonsExecuted = false;
    isFilterPokemonsExecuted = false;
}


// Favourites-Section:

function addToFavourites() {
    favourites.push({
        'm': globalCurrentM,
        'encodedName': globalCurrentPokemonName, 
        'globalCurrentPokeImg': pokemonArray[globalCurrentM]['pokemon-image'],
        'current-type': pokemonArray[globalCurrentM]['types']
    });
    save();
    compare();
}


let globalNumberOfFavourites;

function showAmountOfFavourites() {
    let showFavourites;
    let favouritePokemonssAsText = localStorage.getItem('favourites');
    showFavourites = JSON.parse(favouritePokemonssAsText);
    let numberOfFavourites = favourites.length;
    globalNumberOfFavourites = numberOfFavourites;
    
    document.getElementById('amount-of-favourites-div').innerHTML = `
        ${numberOfFavourites}
    `;
}


function compare() {
    let favouritePokemonssAsText = localStorage.getItem('favourites');  // Das gespeicherte Array der Favoriten durchgehen, um zu vergleichen, ob das Pokemon bereits in den gespeicherten Pokemons enthalten ist
    if (favouritePokemonssAsText) {
        favourites = JSON.parse(favouritePokemonssAsText);

        for (let r = 0; r < favourites.length; r++) {
            const favourite = favourites[r];
           
            if (favourites[r]['encodedName'] === globalCurrentPokemonName) {
                DNone('red-heart', 'remove');
                DNone('black-heart', 'add');
                return; // Beendet die Funktion, wenn der Vergleich gefunden wurde
            }
            DNone('red-heart', 'add');
            DNone('black-heart', 'remove');
            isNextClicked = false;
        }
    }
}


function loadFavouritesList() {
    let pokemonSearchList = document.getElementById('background-2-list'); /*list${m}*/
    pokemonSearchList.innerHTML = ``;
    let favouritePokemonssAsText = localStorage.getItem('favourites');

    if (favouritePokemonssAsText) {
        favourites = JSON.parse(favouritePokemonssAsText);

        // Verarbeite die geladenen Favoriten und zeige sie an
        for (let r = 0; r < favourites.length; r++) {
            const favourite = favourites[r];

            addFavouriteToList(favourite, r);
            isFavouritePokemonsExecuted = true;
            DNone('back-to-list-of-all-pokemons', 'remove');
            showNoFavouritesWindow();
        }
    }
}


function addFavouriteToList(favourite, r) {
    let favouriteName = favourite['encodedName'];
    let favouriteImg = favourite['globalCurrentPokeImg'];
    let encodedPokemonName = favouriteName;
    let m = favourite['m'];
    let type = favourite['current-type'];
    globalEncodedPokemonName = favouriteName;

    // Restlicher Code zum Hinzufügen des Favoriten zur Liste
    document.getElementById('background-2-list').innerHTML += /*html*/`
        <span id="search-list${m}" class="outer-list">
        <span onclick="loadPokemon('${m}'), DNone('card', 'remove'), DNone('background', 'remove'), DNone('background-2-list', 'add'), isFilterPokemonsExecutedFalse(), isFavouritePokemonsExecutedTrue(), compare(), DNone('back-to-list-of-all-pokemons', 'add'), hideBackForwardBtns()"  class="list-favourites">
            ${favouriteName} 
            <img id="list-img${m}" src="${favouriteImg}" alt="">
        </span>
        <div onclick="deleteFavourite(${r})" id="delete-div" class="delete-div">
            <img src="img/dustbin-icon.png" class="dustbin-icon" alt="">
        </div>
        </span>
    `;
    isFilterPokemonsExecuted = true;
    addBackGrColorToLoadedList(type, m);
    showNoFavouritesWindow();
}


// Ausblenden der Zurück-/Vorwärtsbuttons beim Ansehen der Favoriten
function hideBackForwardBtns() {
    if (isFavouritePokemonsExecuted === true) {
        document.getElementById('back-forward-div').classList.add('visibiliy-hidden');
    }
}


// Ausblenden der Zurück-/Vorwärtsbuttons beim Ansehen der Gesuchten Pokemons
function hideBackForwardBtnsSearched() {
    if (isSearched === true) {
        document.getElementById('back-forward-div').classList.add('visibiliy-hidden');
    }
}


function showBackForwardBtns() {
    document.getElementById('back-forward-div').classList.remove('visibiliy-hidden');
}


function fitGlobalEncodedPokemonName(favouriteName) {
    globalEncodedPokemonName = favouriteName;
}


function isFilterPokemonsExecutedFalse() {
    isFilterPokemonsExecuted = false;
}


function isFavouritePokemonsExecutedTrue() {
    isFavouritePokemonsExecuted = true;
    isFavouritesClicked = true;
}


function showNoFavouritesWindow() {
    if (globalNumberOfFavourites === 0) {
        DNone('no-favourites', 'remove');
    }
}


// Speichern

function save() {
    let favouritePokemonssAsText = JSON.stringify(favourites);

    localStorage.setItem('favourites', favouritePokemonssAsText);
}


function deleteFavourite(r) {
    favourites.splice(r, 1);
    save();
    loadFavouritesList();
    showAmountOfFavourites();
    showNoFavouritesWindow();
}


// Burger-Menu 

function expandBurgerMenu() {
    document.getElementById('expanded-burger-menu-around').classList.remove('d-none');
    document.getElementById('expanded-burger-menu').classList.remove('d-none');
}







