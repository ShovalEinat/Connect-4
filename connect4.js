var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;
let yellowScore = 0;
let redScore = 0;
let yellowScoreSpan = document.getElementById("yellowScore");
let redScoreSpan = document.getElementById("redScore");

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

window.onload = function() {
    setGame();
}

function resetGame() {
    restart.innerHTML = "Restart";
    gameOver = false;
    currPlayer = playerRed;
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    board = [];

    let tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].classList.remove("red-piece", "yellow-piece");
    }

    winner.innerText = "Red Turn";
    winner.style.color = "red";

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
    winner.innerText = "Red Turn";
    winner.style.color = "red";
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
        winner.innerText = "Yellow Turn";
        winner.style.color = "yellow";
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        winner.innerText = "Red Turn";
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
    let winner = document.getElementById("winner");
    var audio = new Audio('congratulations.mp3');
    audio.play();
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
        winner.style.color = "red";
        redScore = redScore + 1;
        redScoreSpan.textContent = redScore;                            
    } else {
        winner.innerText = "Yellow Wins";
        winner.style.color = "yellow";     
        yellowScore = yellowScore + 1;
        yellowScoreSpan.textContent = yellowScore;                       
    }
    gameOver = true;
    const restart = document.getElementById("restart");

    restart.innerHTML = "New Game";
}
