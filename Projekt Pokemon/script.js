let allPokemons;
let currentPokemon;
let loadedSoloPokemon = [];
var loadedPokemons = 20;
var index = 0; 

async function loadAllPokemons() {
    let urlAllPokemons = (`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    let serverResponse = await fetch(urlAllPokemons);
    allPokemons = await serverResponse.json(); // let allPokemons war die Variable
    console.log('Loaded All Pokemons', allPokemons);
    convertAllPokemonsToCurrentPokemon(allPokemons);
}

async function convertAllPokemonsToCurrentPokemon(allPokemons) {
    for (let i = index; i < loadedPokemons; i++) { // allPokemons.count für alle Pokemons, vorerst nur 20 default und 5 extra pro Scroll
        let currentPokemonURL = (allPokemons['results'][i]['url']);
        let serverResponseSolo = await fetch(currentPokemonURL);
        currentPokemon = await serverResponseSolo.json();
        loadedSoloPokemon.push(currentPokemon);
        console.log('Loaded Solo Pokemon', currentPokemon);
        renderPokemonInfo(currentPokemon, i);
        loadMovesOfCurrentPokemon(currentPokemon, i);
        loadFirstMoveDescriptionOfCurrentPokemon(currentPokemon, i);
        loadSecondMoveDescriptionOfCurrentPokemon(currentPokemon, i);
        loadThirdMoveDescriptionOfCurrentPokemon(currentPokemon, i);
    }
}

function loadMovesOfCurrentPokemon(currentPokemon, i) {
    showMovesInTable(currentPokemon, i);
}

async function loadFirstMoveDescriptionOfCurrentPokemon(currentPokemon, i) {
    let currentPokemonMovesURL = (currentPokemon['moves'][0]['move']['url']);
    let serverResponsMoves = await fetch(currentPokemonMovesURL);
    let serverResponseFirstMovesAsJson = await serverResponsMoves.json();
    showFirstMoveDescriptionInTable(i, serverResponseFirstMovesAsJson);
}

async function loadSecondMoveDescriptionOfCurrentPokemon(currentPokemon, i) {
    let currentPokemonMovesURL = (currentPokemon['moves'][1]['move']['url']);
    let serverResponseMoves = await fetch(currentPokemonMovesURL);
    let serverResponseSecondMoveAsJson = await serverResponseMoves.json();
    showSecondMoveDescriptionInTable(i, serverResponseSecondMoveAsJson);
}

async function loadThirdMoveDescriptionOfCurrentPokemon(currentPokemon, i) {
    let currentPokemonMovesURL = (currentPokemon['moves'][2]['move']['url']);
    let serverResponseMoves = await fetch(currentPokemonMovesURL);
    let serverResponseThirdMoveAsJson = await serverResponseMoves.json();
    showThirdMoveDescriptionInTable(i, serverResponseThirdMoveAsJson);
}

function renderPokemonInfo(currentPokemon, i) {
    let pokemonsOutputContainer = document.getElementById('pokemons-output-container');

    pokemonsOutputContainer.innerHTML += templateOfrenderPokemonInfo(i);

    init(currentPokemon, i);
}

function init(currentPokemon, i) {
    showPokemonHeadline(currentPokemon, i);
    showPokemonPicture(currentPokemon, i);
    renderPokemonType(currentPokemon, i);
    changeColorByType(i);
    showStats(currentPokemon, i);
    renderAboutTable(currentPokemon, i);
    renderAbilities(currentPokemon, i);
}

function showPokemonHeadline(currentPokemon, i) {
    document.getElementById(`pokemon-headline${i}`).innerHTML = templateOfshowPokemonHeadline(currentPokemon, i);
}

function showPokemonPicture(currentPokemon, i) {
    document.getElementById(`pokemon-image${i}`).innerHTML = templateOfshowPokemonPicture(currentPokemon, i);
}

function showStats(currentPokemon, i) {
    let statsOutput = document.getElementById(`base-stats${i}`);

    for (let t = 0; t < 6; t++) {
        statsOutput.innerHTML += templateOfshowStats(currentPokemon, i, t);
        let statAmountNumber = document.getElementById(`stat-line${i}${t}`).innerHTML;
        let statPercent = Number((100 / 100 * statAmountNumber));
        document.getElementById(`stat-line${i}${t}`).style = `width:${statPercent}% !important`;
    }
}

function renderAboutTable(currentPokemon, i) {
    document.getElementById(`about${i}`).innerHTML += templateOfrenderAboutTable(currentPokemon, i);
}

function showDetails(i) {
    //document.getElementById(`pokemon-info${i}`).classList.remove('d-none');
    document.getElementById(`pokemon-info${i}`).style.transform = 'scaleY(1.0)';
    document.getElementById(`main-solo-pokemon-container${i}`).style.marginBottom = '220px';
}

function hideDetails(i) {
    document.getElementById(`pokemon-info${i}`).style.transform = 'scaleY(0.0)';
    document.getElementById(`main-solo-pokemon-container${i}`).style.marginBottom = '0px';
}

function renderPokemonType(currentPokemon, i) {
    let pokemonTypeOutput = document.getElementById(`pokemon-type${i}`);

    for (let t = 0; t < currentPokemon['types'].length; t++) {
        pokemonTypeOutput.innerHTML += `
        <div id="types${i}" class="pokemon-type d-center">${currentPokemon.types[t].type.name}</div>
        `
    }
}

function changeColorByType(i) { // Maybe more Types available, i did not check over 1000 pokemons
    checkGrass(i);
    checkWater(i);
    checkBug(i);
    checkNormal(i);
    checkPoison(i);
    checkGround(i);
    checkElectric(i);
    checkFire(i);
    checkFairy(i);
    checkFighting(i);
    checkPsychic(i);
    checkRock(i);
    checkIce(i);
    checkDragon(i);
}

function checkGrass(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'grass') {
        pokemonBackgroundColor.classList.add('bg-grass');
    }
}

function checkWater(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'water') {
        pokemonBackgroundColor.classList.add('bg-water');
    }
}

function checkBug(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'bug') {
        pokemonBackgroundColor.classList.add('bg-bug');
    }
}

function checkNormal(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'normal') {
        pokemonBackgroundColor.classList.add('bg-normal');
    }
}

function checkPoison(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'poison') {
        pokemonBackgroundColor.classList.add('bg-poison');
    }
}

function checkGround(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'ground') {
        pokemonBackgroundColor.classList.add('bg-ground');
    }
}

function checkElectric(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'electric') {
        pokemonBackgroundColor.classList.add('bg-electric');
    }
}

function checkFire(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'fire') {
        pokemonBackgroundColor.classList.add('bg-fire');
    }
}

function checkFairy(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'fairy') {
        pokemonBackgroundColor.classList.add('bg-fairy');
    }
}

function checkFighting(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'fighting') {
        pokemonBackgroundColor.classList.add('bg-fighting');
    }
}

function checkPsychic(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'psychic') {
        pokemonBackgroundColor.classList.add('bg-psychic');
    }
}

function checkRock(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'rock') {
        pokemonBackgroundColor.classList.add('bg-rock');
    }
}

function checkIce(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'ice') {
        pokemonBackgroundColor.classList.add('bg-ice');
    }
}

function checkDragon(i) {
    let pokemonType = document.getElementById(`types${i}`).innerHTML;
    let pokemonBackgroundColor = document.getElementById(`pokemon-name${i}`);
    if (pokemonType == 'dragon') {
        pokemonBackgroundColor.classList.add('bg-dragon');
    }
}

function showMovesInTable(currentPokemon, i) {
    if(currentPokemon['moves'].length > 1){
    document.getElementById(`moveOne${i}`).innerHTML += `<td>${currentPokemon['moves'][0]['move']['name']}:</td>`
    document.getElementById(`moveTwo${i}`).innerHTML += `<td>${currentPokemon['moves'][1]['move']['name']}:</td>`
    document.getElementById(`moveThird${i}`).innerHTML += `<td>${currentPokemon['moves'][2]['move']['name']}:</td>`
    }
}

function showFirstMoveDescriptionInTable(i, serverResponseFirstMovesAsJson) { // Ist mir von der Codingart nicht smart genug
    document.getElementById(`moveOne${i}`).innerHTML += templateOfShowFirstMoveDescriptionInTable(serverResponseFirstMovesAsJson);
}

function showSecondMoveDescriptionInTable(i, serverResponseSecondMoveAsJson) { // Ist mir von der Codingart nicht smart genug
    document.getElementById(`moveTwo${i}`).innerHTML += templateOfShowSecondMoveDescriptionInTable(serverResponseSecondMoveAsJson);
}

function showThirdMoveDescriptionInTable(i, serverResponseThirdMoveAsJson) { // Ist mir von der Codingart nicht smart genug
    document.getElementById(`moveThird${i}`).innerHTML += templateOfShowThirdMoveDescriptionInTable(serverResponseThirdMoveAsJson);
}

function showAboutTable(i) {
    document.getElementById(`about${i}`).classList.remove('d-none');
    document.getElementById(`base-stats${i}`).classList.add('d-none');
    document.getElementById(`moves${i}`).classList.add('d-none');
}

function showStatsTable(i) {
    document.getElementById(`about${i}`).classList.add('d-none');
    document.getElementById(`base-stats${i}`).classList.remove('d-none');
    document.getElementById(`moves${i}`).classList.add('d-none');
}

function showMovesTable(i) {
    document.getElementById(`about${i}`).classList.add('d-none');
    document.getElementById(`base-stats${i}`).classList.add('d-none');
    document.getElementById(`moves${i}`).classList.remove('d-none');
}

function renderAbilities(currentPokemon, i) {
    let abilityOutput = document.getElementById(`ability${i}`);

    for (let a = 0; a < currentPokemon['abilities'].length; a++) {
        abilityOutput.innerHTML += templateOfRenderAbilities(currentPokemon, a);
    }
}

function filterPokemon() {
    let userSearch = document.getElementById('search-field').value;
    let pokemonOutput = document.getElementById('pokemons-output-container');
    pokemonOutput.innerHTML = '';
    loadedSoloPokemon.filter(loadedSoloPokemon => String(loadedSoloPokemon['name']).startsWith(`${userSearch}`));
    let filtered = loadedSoloPokemon.filter(loadedSoloPokemon => String(loadedSoloPokemon['name']).startsWith(`${userSearch}`));
    renderSearchedPokemons(filtered);
}

function renderSearchedPokemons(filtered) {
    for (let f = 0; f < filtered.length; f++) {
        //console.log(filtered[f]);
        let filteredPokemon = filtered[f];
        renderPokemonInfo(filteredPokemon, f);
        loadFirstMoveDescriptionOfCurrentPokemon(filteredPokemon, f);
        loadSecondMoveDescriptionOfCurrentPokemon(filteredPokemon, f);
        loadThirdMoveDescriptionOfCurrentPokemon(filteredPokemon, f);
        loadMovesOfCurrentPokemon(filteredPokemon, f);
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        index = loadedPokemons;
        loadedPokemons = loadedPokemons + 5;
        convertAllPokemonsToCurrentPokemon(allPokemons);
    }
});

//######################TEMPLATES#####################################
function templateOfrenderPokemonInfo(i) {
    return `
    <div id="main-solo-pokemon-container${i}" class="main-solo-pokemon-container"> 
        <div id="pokemon-name${i}" class="pokemon-header">
            <div id="pokemon-headline${i}" class="pokemon-headline"></div>
            <div id="pokemon-type${i}" class="pokemon-type-container"></div>
            <div id="pokemon-image${i}" class="pokemon-img-container d-center"></div>
            <div class="show-more" id="show-more${i}"><img onclick="showDetails(${i})" class="show-more-img" src="img/arrow-down.png"></div>
        </div>
        <div id="pokemon-info${i}" class="pokemon-info d-center">
            <navbar class="pokemon-navbar">
                <table>
                    <tr>
                        <td onclick="showAboutTable(${i})">About</td>
                        <td onclick="showStatsTable(${i})">Base Stats</td>
                        <td onclick="showMovesTable(${i})">Moves</td>
                    </tr>
                </table>
            </navbar> 
            <table id="about${i}" class="table-info d-center d-none"></table>
        
            <table id="base-stats${i}" class="table-info d-none">

            </table>

            <table id="moves${i}" class="table-info">
            <tr class="text-uppercase" id="moveOne${i}"></tr>

            <tr class="text-uppercase" id="moveTwo${i}"></tr>

            <tr class="text-uppercase" id="moveThird${i}"></tr>
            </table>
            <div class="hide-details" id="hide-details${i}"><img onclick="hideDetails(${i})" class="hide-details-img" src="img/arrow-down.png"></div>
        </div>
    </div>
    `
}

function templateOfshowPokemonHeadline(currentPokemon, i) {
    return `
    <h1 id="pokemon-name${i}" class="pokemon-name">${currentPokemon.name}</h1>
    <div class="pokemon-number">#${currentPokemon.id}</div>
    `;
}

function templateOfshowPokemonPicture(currentPokemon, i) {
    return `
    <img class="pokemon-img" id="pokemonImg" src="${currentPokemon.sprites.other.home.front_default}">
    `
}

function templateOfshowStats(currentPokemon, i, t) {
    return `
    <tr>
        <td class="td-base-stat">${currentPokemon['stats'][t]['stat']['name']}:</td>
        <td id="stat-amount${i}" class="td-base-amount""><div class="stat-line style="width:0%" id="stat-line${i}${t}"}>${currentPokemon['stats'][t]['base_stat']}</div></td>    
    </tr>
    `;
}

function templateOfRenderAbilities(currentPokemon, a) {
    return `<td>${currentPokemon['abilities'][a]['ability']['name']}</td>`;
}

function templateOfrenderAboutTable(currentPokemon, i) {
    return `
    <tr>
        <td>Height:</td>
        <td>${currentPokemon['height']} cm</td>
    </tr>

    <tr>
        <td>Weight:</td>
        <td>${currentPokemon['weight']} lbs</td>
    </tr>

    <tr>
        <td>Base Experience:</td>
        <td>${currentPokemon['base_experience']}</td>
    </tr>

    <tr id="ability${i}">
        <td>Abilities:</td>
    </tr>

    <tr>
        <td>Number of Moves:</td>
        <td>${currentPokemon['moves'].length}</td>
    </tr>
    `;
}

function templateOfShowFirstMoveDescriptionInTable(serverResponseFirstMovesAsJson) {
    return `
    <td>${serverResponseFirstMovesAsJson['effect_entries'][0]['short_effect']}</td>
    `;
}

function templateOfShowSecondMoveDescriptionInTable(serverResponseSecondMoveAsJson) {
    return `
    <td>${serverResponseSecondMoveAsJson['effect_entries'][0]['short_effect']}</td>
    `;
}

function templateOfShowThirdMoveDescriptionInTable(serverResponseThirdMoveAsJson) {
    return `
    <td>${serverResponseThirdMoveAsJson['effect_entries'][0]['short_effect']}</td>
    `;
}
