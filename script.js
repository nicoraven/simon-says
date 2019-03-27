// random number generator for 1 - 4
//Math.floor(Math.random() * 4) + 1;

// default sequence before random generation
var sequence = [0,0,0,0,0,0,0,0,0,0];
var sequenceToShow = [];
var playerSequence = [];

// to stagger displayTile timings
var offset = 0;

var round = 0;
var best = 0;
var displayRound = document.getElementById("round");
var displayBest = document.getElementById("best");

var gameOver = document.getElementById("text");
var showRound = document.getElementById("showRound");
var showBest = document.getElementById("showBest");

// show time if true
var timer = false;

// randomise tiles if true
var randomise = false;

// show extra tiles if true
var hard = false;

// hide previous steps during showSequence if true
var hideSteps = false;

// not used for now
var colourCode = {
    1: "red",
    2: "blue",
    3: "green",
    4: "yellow",
};

//number of tiles/circles in play
var tile = 4;


// sequence generator
function generateSequence (roundNumber) {
    for (i=0; i<10; i++) {
        sequence[i]= Math.floor(Math.random() * 4) + 1;
    };
    convert()
};

// convert generated sequence from number to colours
function convert(){
    for (var i = 0; i < sequence.length; i++) {
        if (sequence[i] === 1) {
            sequence[i] = "red";
            // convertedSequence.push(sequence[i])
        }
        else if (sequence[i] === 2) {
            sequence[i] = "blue";
            // convertedSequence.push(sequence[i])
        }
        else if (sequence[i] === 3) {
            sequence[i] = "green";
            // convertedSequence.push(sequence[i])
        }
        else if (sequence[i] === 4) {
            sequence[i] = "yellow";
            // convertedSequence.push(sequence[i])
        }
    }
    console.log(sequence);
    // console.log(convertedSequence)
}

// on load, ready start button
window.onload = function(){
    var start = document.getElementById("start");
    start.addEventListener('click', startGame);
    document.getElementById("reset").addEventListener('click', resetGame);
    var hardTiles = document.getElementById("hard");
    hardTiles.addEventListener('click', hardModeToggle);
};

// in hard mode, show extra tiles
function hardModeToggle(){
    hard = !hard;
}

function hardModeCheck(){
    if (hard != true) {
        console.log("hard mode is false");
    } else {
        console.log("hard mode is true");
        var extraTiles = document.getElementsByClassName("extra");
        for (var i = 0; i < extraTiles.length; i++) {
        extraTiles[i].style.visibility = "visible";
        }
    }
}

// when player clicks on start game, generate sequence, bump round counter
function startGame(){
    start.style.visibility = "hidden";
    hardModeCheck();
    generateSequence();
    listenToPlayer();
    newRound();
}

function newRound(){
    playerSequence = [];
    sequenceToShow = [];
    offset = 0;
    round++;
    console.log("round: "+ round)
    displayRound.innerText = round;
    showSequence();
}

// when next round triggers, flash lights based on sequence
function showSequence(){
    for (var i = 0; i < round; i++) {
        sequenceToShow.push(sequence[i])
    };
    sequenceToShow.map(displayTile);
}

function displayTile(value){
    var lights = document.getElementById(value);
    // console.log(lights);
    setTimeout(function(){
        lights.classList.add("bk");
    }, (500+offset));
    setTimeout(function(){
        lights.classList.remove("bk");
    }, (900+offset));
    offset += 600;
}

// add event listeners for clicks on tiles
function listenToPlayer(){
    document.getElementById("red").addEventListener('click', pushPlayerSequence);
    document.getElementById("blue").addEventListener('click', pushPlayerSequence);
    document.getElementById("green").addEventListener('click', pushPlayerSequence);
    document.getElementById("yellow").addEventListener('click', pushPlayerSequence);
};

// remove event listeners for clicks on tiles
function removePlayerListener(){
    document.getElementById("red").removeEventListener('click', pushPlayerSequence);
    document.getElementById("blue").removeEventListener('click', pushPlayerSequence);
    document.getElementById("green").removeEventListener('click', pushPlayerSequence);
    document.getElementById("yellow").removeEventListener('click', pushPlayerSequence);
};

//add clicks into playerSequence
function pushPlayerSequence(){
    playerSequence.push(event.target.id);
    console.log("player Sequence: " + playerSequence);
    checkSequence();
};

//check playerSequence matches sequence
function checkSequence(){
    //if player clicked wrong sequence
    var i = playerSequence.length
    if (playerSequence[i-1] !== sequence[i-1]) {
        console.log("wrong")
        removePlayerListener()
        gameOver.style.visibility = "visible";
        showRound.style.visibility = "hidden";
        showBest.style.visibility = "hidden";
        // alert("Wrong sequence!\nGame Over!")
        // if current round is higher than best round, update best round
        if (round > best) {
            best = round;
            displayBest.innerText = (best-1);
            // resetGame();
            return;
        }
        else {
            // resetGame();
            return;
        }
    }
    //else player has clicked correct sequence
    else {
        console.log("correct");
        // and if player completed sequence for current round
        if (playerSequence.length === round) {
            // and if the game is completed
            if (round == 10) {
                alert("game won")
                removePlayerListener()
                // displays current best round
                if (round > best) {
                    best = round;
                    displayBest.innerText = (best);
                    resetGame();
                }
                else {
                    resetGame();
                }
            }
            // else player has completed the round but not the game
            else {
            newRound();
            }
        }
    }
}

// reset game
function resetGame() {
    removePlayerListener()
    sequence = [];
    playerSequence = [];
    offset = 0;
    round = 0;
    displayRound.innerText = "___";
    start.style.visibility = "visible";
    gameOver.style.visibility = "hidden";
    showRound.style.visibility = "visible";
    showBest.style.visibility = "visible";
}