
// Event that gets called once 
// the page loads for the first time.
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
var gameOver = true;
var turn = Math.floor(Math.random());



// The purpose of this function is to initialize the table 
// array with a character to indicate that the positions are
// empty.
function createBoard() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            board.push("-");
        }
    }
}


// Since the first turn to play the game is randomly selected, 
// we check if the current turn is the bot to make a move. Also
// disables the start button and sets the gameOver state to false.
function startGame(button) {
    button.disabled = true;
    gameOver = false;

    if (turn == BOT) {
        playPosition();
    }

    showCustomMessage("green", "Game started!");
}


// Resetting the game: clears the html elements, clears the array table,
// sets the array positions to empty again, re-enables the start button,
// and changes the game over state to true.
function resetGame() {

    let startBtn = document.getElementById("startGame");

    clearTableGui();

    board = [];
    createBoard();

    gameOver = true;
    startBtn.disabled = false;
}


// The purpose of this function is to play a position on the board.
// It handles both player and bot moves on the board.
function playPosition(square) {

    // Player is unable to continue selecting 
    // positions on the board if the game is over. 
    // ¯\_(ツ)_/¯ 
    if (gameOver == true) return -1;

    if (turn == PLAYER) {

        // Extract the selected row and column from the element ID.
        let coords = square.id.split("-");
        let row = parseInt(coords[0]);
        let column = parseInt(coords[1]);

        // Convert the given row and column,
        // to a position within the table array.
        let index = getBoardIndex(row, column);
        let selection = board[index];

        // Checks if the selected position is empty
        // before placing the X.
        if (selection.toString() == "-") {

            square.innerText = "X";
            board[index] = "X";

        }
        // Let's the player know that the selected position is not empty.
        else {
            showCustomMessage("yellow", "Select another position to play. This position is not available.");
            return -1;
        }
    }

    if (turn == BOT) {

        let positions = getAvailablePos(); // Multi-array of positions available. E.g [row, column].

        // In case the array is empty, it'll show a message. 
        if (positions == -1) {
            showCustomMessage("red", "There's no more playable positions. Game over.");
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
    }
}


// As previously discussed in class, this function -
// does the convertion from a row and column position to 
// a single index position within the table array.
function getBoardIndex(row, column) {
    return column + row * offset;
}


// The purpose of this function is to do the opposite
// of what "getBoardIndex()" does. 

// It retrives the row and column with a given index.
function getCoordsFromIndex(index) {
    let row = Math.floor(index / offset);
    let column = index - row * offset;
    return [row, column];
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
            highlightPositions(a, b, c);
            showWinnerScreen();
            return 1;
        }
    }

    // In case it couldn't find a winning pattern, it returns -1.
    return -1;
}


// This function's purpose is to customize the colors of the winning squares.
// In case the player wins, the pattern turns green. Otherwise it shows the pattern
// as red because you were defeated by the computer. (ง ͠❛ _⦣ ͠❛ )ง
function highlightPositions(a, b, c) {
    var box1 = document.getElementById(getCoordsFromIndex(a)[0].toString() + "-" + getCoordsFromIndex(a)[1].toString());
    var box2 = document.getElementById(getCoordsFromIndex(b)[0].toString() + "-" + getCoordsFromIndex(b)[1].toString());
    var box3 = document.getElementById(getCoordsFromIndex(c)[0].toString() + "-" + getCoordsFromIndex(c)[1].toString());

    box1.style.color = (turn == PLAYER) ? "lightgreen" : "lightcoral";
    box2.style.color = box1.style.color;
    box3.style.color = box1.style.color;

    box1.style.backgroundColor = (turn == PLAYER) ? "rgba(141, 255, 194, 0.358)" : "rgba(255, 141, 141, 0.358)";
    box2.style.backgroundColor = box1.style.backgroundColor;
    box3.style.backgroundColor = box1.style.backgroundColor;
}


// Shows a message. Text context depends on who won.
function showWinnerScreen() {
    if (turn == PLAYER) {
        showCustomMessage("green", "You won!");
    }
    else if (turn == BOT) {
        showCustomMessage("red", "You lost :(");
    }
}


// The purpose of this function is to clear the tictactoe table GUI by
// changing the text back to white, empty the squares and changing the background
// back to transparent.
function clearTableGui() {
    let board = document.getElementsByClassName('board')[0];
    let squares = board.children;

    for (let square of squares) {
        square.innerText = "";
        square.style.color = "white";
        square.style.backgroundColor = "rgba(255, 255, 255, 0)";
    }
}


// This function's purpose is to show a customized message alert using
// bootstrap's css. It also schedules a timeout event for 3 seconds that triggers -
// another function to clear the message off the screen.
function showCustomMessage(color, message) {
    alert = document.getElementsByClassName("alert")[0];

    if (color == "red") {
        alert.classList.add("alert-danger");
    }
    if (color == "green") {
        alert.classList.add("alert-success");
    }
    if (color == "yellow") {
        alert.classList.add("alert-warning");
    }

    alert.innerText = message;
    setTimeout(removeCustomMessage, 3000);
}


// Removes the message from the screen.
function removeCustomMessage() {
    alert = document.getElementsByClassName("alert")[0];
    alert.classList.remove("alert-danger");
    alert.classList.remove("alert-success");
    alert.classList.remove("alert-warning");
    alert.innerText = "";
}