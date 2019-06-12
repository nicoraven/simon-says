// random number generator for 1 - 4
//Math.floor(Math.random() * 4) + 1;

var colourOrder = [];

var baseColour = ["red", "blue", "green", "yellow"]
var hardModeColour = ["red", "blue", "green", "yellow", "purple", "peach", "brown", "olive"]

var defaultBaseOrder = ["baseOne", "baseTwo", "baseThree", "baseFour"];
var hardModeOrder = ["baseOne", "baseTwo", "baseThree", "baseFour", "extraOne", "extraTwo", "extraThree", "extraFour"];


// default sequence before random generation
var sequence = [0,0,0,0,0,0,0,0,0,0];
var convertedSequence = [];
var sequenceToShow = [];
var playerSequence = [];
var tilesInPlay = [];

// to stagger displayTile timings
var offset = 0;

var round = 0;
var best = 0;
var displayRound = document.getElementById("round");
var displayBest = document.getElementById("best");

var gameOver = document.getElementById("text");
var showRound = document.getElementById("showRound");
var showBest = document.getElementById("showBest");

var extraTiles = document.getElementsByClassName("extra");

// show time if true
var timer = false;

// randomise tiles if true
var randomise = false;

// show extra tiles if true
var hard = false;
var hardButton = document.getElementById("hard");

// hide previous steps during showSequence if true
var hideSteps = false;

// not used for now
var colourCode = {
    "one": "red",
    "two": "blue",
    "three": "green",
    "four": "yellow",
    "five": "purple",
    "six": "peach",
    "seven": "brown",
    "eight": "olive",
};

// number of tiles/circles in play
var tile = 4;

// this function randomises order of elements in an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// sequence generator
function generateSequence (roundNumber) {
    if (hard != true) {
        // normal mode
        for (i=0; i<10; i++) {
        sequence[i]= Math.floor(Math.random() * 4) + 1;
        };
    }
    else {
        // hard mode
        for (i=0; i<10; i++) {
            sequence[i]= Math.floor(Math.random() * 8) + 1;
        };
    };
    convert();
};

// convert generated sequence from number to colours
function convert(tile){
    convertedSequence = sequence;
    if (hard != true) {
        // convert sequence for normal mode
        for (var i = 0; i < convertedSequence.length; i++) {
            if (convertedSequence[i] === 1) {
                convertedSequence[i] = "red";
            }
            else if (convertedSequence[i] === 2) {
                convertedSequence[i] = "blue";
            }
            else if (convertedSequence[i] === 3) {
                convertedSequence[i] = "green";
            }
            else if (convertedSequence[i] === 4) {
                convertedSequence[i] = "yellow";
            }
        }
    }
    else {
        // convert sequence for hard mode
        for (var i = 0; i < convertedSequence.length; i++) {
            if (convertedSequence[i] === 1) {
                convertedSequence[i] = "red";
            }
            else if (convertedSequence[i] === 2) {
                convertedSequence[i] = "blue";
            }
            else if (convertedSequence[i] === 3) {
                convertedSequence[i] = "green";
            }
            else if (convertedSequence[i] === 4) {
                convertedSequence[i] = "yellow";
            }
            else if (convertedSequence[i] === 5) {
                convertedSequence[i] = "purple";
            }
            else if (convertedSequence[i] === 6) {
                convertedSequence[i] = "peach";
            }
            else if (convertedSequence[i] === 7) {
                convertedSequence[i] = "brown";
            }
            else if (convertedSequence[i] === 8) {
                convertedSequence[i] = "olive";
            }
        }
    };
    console.log(convertedSequence);
}

// on load, ready start button
window.onload = function(){
    var start = document.getElementById("start");
    start.addEventListener('click', startGame);
    document.getElementById("reset").addEventListener('click', resetGame);
    hardButton.addEventListener('click', hardModeToggle);
};

// toggles hard mode on/off
function hardModeToggle(){
    hard = !hard;
    if (hard != true) {
        // normal mode
        hardButton.style.backgroundColor = "#FFF9FB"
        }
    else {
        // hard mode
        hardButton.style.backgroundColor = "#60B27B"
    };
}

// in hard mode, show extra tiles
function hardModeShow(){
    if (hard != true) {
        console.log("hard mode is false");
        for (var i = 0; i < extraTiles.length; i++) {
            extraTiles[i].style.visibility = "hidden";
        }
    } else {
        console.log("hard mode is true");
        for (var i = 0; i < extraTiles.length; i++) {
            extraTiles[i].style.visibility = "visible";
        }
    }
}

// assigns colours to tiles
function assignTile(){
    if (hard != true) {
        colourOrder = baseColour;
        shuffleArray(colourOrder);
        tilesInPlay = document.getElementsByClassName("base");
    } else {
        colourOrder = hardModeColour;
        shuffleArray(colourOrder);
        tilesInPlay = document.getElementsByClassName("tile");
    }
    for (var i = 0; i < colourOrder.length; i++) {
            tilesInPlay[i].id = colourOrder[i];
        }
}

// when player clicks on start game, generate sequence, bump round counter
function startGame(){
    start.style.visibility = "hidden";
    hardModeShow();
    generateSequence();
    assignTile();
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
    if (hard != true) {
        for (var i = 0; i < round; i++) {
            sequenceToShow.push(convertedSequence[i])
        };
        sequenceToShow.map(displayTile);
    }
    else {
        displayHardMode();
    }
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

function displayHardMode(){
    // only show newest sequence each round
    var i = (round-1);
    var lights = document.getElementById(convertedSequence[i]);
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
    if (hard != true) {
        document.getElementById("red").addEventListener('click', pushPlayerSequence);
        document.getElementById("blue").addEventListener('click', pushPlayerSequence);
        document.getElementById("green").addEventListener('click', pushPlayerSequence);
        document.getElementById("yellow").addEventListener('click', pushPlayerSequence);
    }
    else {
        document.getElementById("red").addEventListener('click', pushPlayerSequence);
        document.getElementById("blue").addEventListener('click', pushPlayerSequence);
        document.getElementById("green").addEventListener('click', pushPlayerSequence);
        document.getElementById("yellow").addEventListener('click', pushPlayerSequence);
        document.getElementById("purple").addEventListener('click', pushPlayerSequence);
        document.getElementById("peach").addEventListener('click', pushPlayerSequence);
        document.getElementById("brown").addEventListener('click', pushPlayerSequence);
        document.getElementById("olive").addEventListener('click', pushPlayerSequence);
    }
};

// remove event listeners for clicks on tiles
function removePlayerListener(){
    if (hard != true) {
        document.getElementById("red").removeEventListener('click', pushPlayerSequence);
        document.getElementById("blue").removeEventListener('click', pushPlayerSequence);
        document.getElementById("green").removeEventListener('click', pushPlayerSequence);
        document.getElementById("yellow").removeEventListener('click', pushPlayerSequence);
    }
    else {
        document.getElementById("red").removeEventListener('click', pushPlayerSequence);
        document.getElementById("blue").removeEventListener('click', pushPlayerSequence);
        document.getElementById("green").removeEventListener('click', pushPlayerSequence);
        document.getElementById("yellow").removeEventListener('click', pushPlayerSequence);
        document.getElementById("purple").removeEventListener('click', pushPlayerSequence);
        document.getElementById("peach").removeEventListener('click', pushPlayerSequence);
        document.getElementById("brown").removeEventListener('click', pushPlayerSequence);
        document.getElementById("olive").removeEventListener('click', pushPlayerSequence);
    }
};

//add clicks into playerSequence
function pushPlayerSequence(){
    // if game is running = true, do this
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
    colourOrder = [];
    convertedSequence = [];
    sequenceToShow = [];
    playerSequence = [];
    tilesInPlay = [];
    offset = 0;
    round = 0;
    displayRound.innerText = "";
    start.style.visibility = "visible";
    gameOver.style.visibility = "hidden";
    showRound.style.visibility = "visible";
    showBest.style.visibility = "visible";
}

// script for accordion menu
var acc = document.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");

        // Toggle between hiding and showing the active panel
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        }
        else {
            panel.style.display = "block";
        }
    });
}

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}