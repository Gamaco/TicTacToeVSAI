
window.onload = () => {
    createBoard();
}


// Variables
const PLAYER = 0;
const BOT = 1;

var rows = 3;
var columns = 3;
var offset = 3; //Amount of rows represented in the array.

var board = [];
var gameOver = false;
var turn = Math.floor(Math.random());



// The purpose of this function is to initialize the table 
// array with a character to indicate that the positions are
// empty.

// Since the first turn to play the game is randomly selected, 
// we also check if the current turn is the bot to make a move.
function createBoard() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            board.push("-");
        }
    }

    if (turn == BOT) {
        playPosition();
    }
}


// The purpose of this function is to play a position on the board.
// It handles both player and bot moves on the board.
function playPosition(square) {

// Player is unable to continue selecting 
// positions on the board if the game is over.  ¯\_(ツ)_/¯ 
if (gameOver == true) return -1;

    if (turn == PLAYER) {
        let coords = square.id.split("-");
        let row = parseInt(coords[0]);
        let column = parseInt(coords[1]);

        let index = getBoardIndex(row, column);
        let selection = board[index];

        if (selection.toString() == "-") {

            square.innerText = "X";
            board[index] = "X";

        }
        else {
            alert("Select another position to play. This position is not available.");
        }
    }

    if (turn == BOT) {
        
        let positions = getAvailablePos(); // Multi-array of positions available. E.g [row, column].

        // In case the array is empty, it'll show a message. 
        if (positions == -1) {
            alert("There's no more playable positions. Game over.");
            gameOver = true;
        }
        else {
            // Selects a random position from the options available.
            let randomIndex = Math.floor(Math.random() * positions.length);
            let selectedBotPosition = positions[randomIndex];

            // These row and column vars are being used to get the element ID,
            // in order to change the visuals of the game board: X and O
            let row = selectedBotPosition[0];
            let column = selectedBotPosition[1];

            // The index is being used to change the value within the table array itself.
            let index = getBoardIndex(row, column);

            board[index] = "O";

            // Display the selected position. 
            let square = document.getElementById(row.toString() + "-" + column.toString());
            square.innerText = "O";
        }
    }

    gameOverCheck();
}



// This function verifies if the game is over by checking if there's a winner.
// Otherwise, it changes the player's corresponding turn.
function gameOverCheck() {
    if (checkForWinner() == -1) {
        if (turn == PLAYER) {
            turn = BOT;
            playPosition();
        }
        else {
            turn = PLAYER;
        }
    }
    else {
        gameOver = true;
        let winner = (turn == PLAYER) ? "You" : "Bot (AI)";
        alert(winner + " Won! Game over.");
    }
}


// As previously discussed in class, this function -
// does the convertion from a row and column position to 
// a single index position within the table array.
function getBoardIndex(row, column) {
    return column + row * offset;
}


// Returns a multi-dimensional array of 
// available positions, each array contains 
// the row and column of each available position.
// In case there's no position available, it returns -1.
function getAvailablePos() {
    let positions = [];
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            let index = getBoardIndex(row, column);
            if (board[index] == "-") {
                positions.push([row, column]);
            }
        }
    }
    return (positions.length < 1) ? -1 : positions;
}


// This function returns 1 if there's a winning pattern, 
// and -1 if there's no winning pattern found.
function checkForWinner() {
    let winningPatterns = [
        // Rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonal left to right
        [0, 4, 8],
        // Diagonal right to left
        [2, 4, 6]
    ];

    for (let arr of winningPatterns) {

        // Current array in the loop.
        let [a, b, c] = arr;

        // Checks if all the positions' values are the same and returns 1.
        if (board[a] != "-" && board[a] == board[b] && board[a] == board[c]) {
            return 1;
        }
    }

    // In case it couldn't find a winning pattern, it returns -1.
    return -1;
}


function highlightPositions(direction, row, column) {
    if (direction == "horizontal") {
        var box1 = document.getElementById(row.toString() + "-" + column.toString());
        var box2 = document.getElementById((row).toString() + "-" + (column + 1).toString());
        var box3 = document.getElementById((row).toString() + "-" + (column + 2).toString());

    }
    else if (direction == "vertical") {
        var box1 = document.getElementById(row.toString() + "-" + column.toString());
        var box2 = document.getElementById((row + 1).toString() + "-" + column.toString());
        var box3 = document.getElementById((row + 2).toString() + "-" + column.toString());
    }
    else if (direction == "diagonal1") {
        var box1 = document.getElementById(row.toString() + "-" + column.toString());
        var box2 = document.getElementById((row + 1).toString() + "-" + (column + 1).toString());
        var box3 = document.getElementById((row + 2).toString() + "-" + (column + 2).toString());
    }
    else {
        var box1 = document.getElementById(row.toString() + "-" + column.toString());
        var box2 = document.getElementById((row - 1).toString() + "-" + (column + 1).toString());
        var box3 = document.getElementById((row - 2).toString() + "-" + (column + 2).toString());
    }

    box1.style.color = "lightgreen";
    box2.style.color = "lightgreen";
    box3.style.color = "lightgreen";

    box1.style.backgroundColor = "rgba(141, 255, 194, 0.358)";
    box2.style.backgroundColor = "rgba(141, 255, 194, 0.358)";
    box3.style.backgroundColor = "rgba(141, 255, 194, 0.358)";
}

