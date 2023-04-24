var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerYellow;
let yellowScore = 0;
let redScore = 0;
let maxRound = 3;
let round = 0;
document.getElementById("game").style.display = "none";
let yellowScoreSpan = document.getElementById("yellowScore");
let redScoreSpan = document.getElementById("redScore");
let endGameWinner = document.getElementById("endGameWinner");
let rounds = document.getElementById("rounds");

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];
let redName, yellowName;

function checkBoxes() {
    redName = document.getElementById("redName").value;
    yellowName = document.getElementById("yellowName").value;
    if (redName.trim() === "" || yellowName.trim() === "") {
      alert("Please enter both player names to start the game.");
      return;
    }
    allVisible();
}
  
function allVisible() {
    document.getElementById("game").style.display = "block";
    document.getElementById("nameInputs").style.display = "none";
    redScoreSpan.textContent = redName + "'s Score: " + redScore;
    yellowScoreSpan.textContent = yellowName + "'s Score: " + yellowScore;
    winner.innerText = yellowName + "'s Turn";
    winner.style.color = "yellow";
    rounds.innerText = "Round : " + round + "/" + maxRound;
    setGame();
}

function refrash() {
    location.reload();
}

document.addEventListener("keydown", function(event) {
    if (event.code === "KeyR") {
        resetGame();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.code === "KeyB") {
        refrash();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
        checkBoxes();
    }
});

let lastPlayer;

function resetGame() {
    restart.innerHTML = "Restart";
    gameOver = false;

    if (lastPlayer === playerRed) {
        currPlayer = playerYellow;
    } else {
        currPlayer = playerRed;
    }

    lastPlayer = currPlayer;

    currColumns = [5, 5, 5, 5, 5, 5, 5];
    board = [];

    let tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].classList.remove("red-piece", "yellow-piece");
    }

    winner.innerText = currPlayer === playerRed ? redName + "'s Turn" : yellowName + "'s Turn";
    winner.style.color = currPlayer === playerRed ? "red" : "yellow";

    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    let boardEl = document.getElementById("board");
    while (boardEl.firstChild) {
        boardEl.removeChild(boardEl.firstChild);
    }

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {

            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c]; 

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        winner.innerText = yellowName + "'s Turn";
        winner.style.color = "yellow";
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        winner.innerText = redName + "'s Turn";
        winner.style.color = "red";
        currPlayer = playerRed;
    }

    r -= 1;
    currColumns[c] = r;

    checkWinner();
}

function checkWinner() {
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    round++;
    setEndWinner();
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = redName + " wins this round";
        winner.style.color = "red"; 
        redScore = redScore + 1;
        rounds.innerText = "Round : " + round + "/" + maxRound;
        redScoreSpan.textContent = `${document.getElementById("redName").value}'s Score: ${redScore}`;
    } else {
        winner.innerText = yellowName + " wins this round";
        winner.style.color = "yellow";    
        yellowScore = yellowScore + 1;
        rounds.innerText = "Round : " + round + "/" + maxRound;
        yellowScoreSpan.textContent = `${document.getElementById("yellowName").value}'s Score: ${yellowScore}`;
    }
    gameOver = true;
    const restart = document.getElementById("restart");

    restart.innerHTML = "New Round";
}

function setEndWinner() {
    setTimeout(function() {
        if (round == maxRound) {
            rounds.innerText = "Round : " + round + "/" + maxRound;
            document.getElementById("winner").style.display = "none";
            document.getElementById("restart").style.display = "none";
            var audio = new Audio('congratulations.mp3');
            console.log("yellowScore:", yellowScore);
            console.log("redScore:", redScore);
            if (yellowScore > redScore) {
                endGameWinner.innerText = yellowName + " wins this game";
                endGameWinner.style.color = "yellow";
                audio.play();
            }
            else if (yellowScore === redScore) {
                endGameWinner.innerText = "Its a draw";
                endGameWinner.style.color = "orange";
            }
            else {
                endGameWinner.innerText = redName + " wins this game";
                endGameWinner.style.color = "red"; 
                audio.play();
            }        
        }
    }, 00001);      
}

const range = document.getElementById("range");
const rangeValue = document.getElementById("rangeValue");

range.addEventListener("input", () => {
    rangeValue.innerHTML = "Maximum amount of rounds: " + range.value;
});
