window.onload = () => {
    createBoard();
}

const PLAYER = 0;
const BOT = 1;

var rows = 3;
var columns = 3;
var offset = 3; //Numero de columnas.

var board = [];

var turn = Math.round(Math.random());


function createBoard() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            board.push("-");
        }
    }

    if (turn == BOT) {
        playBotPosition();
    }
}


function selectPosition(square) {
    if (turn == PLAYER) {
        let coords = square.id.split("-");
        let row = parseInt(coords[0]);
        let column = parseInt(coords[1]);

        let index = getBoardIndex(row, column);
        let selection = board[index];

        if (selection.toString() == "-") {

            square.innerText = "X";
            board[index] = "X";

            turn = BOT;

            let winner = checkForWinner();

            if (winner == -1) {
                playBotPosition();
            }
        }
        else {
            alert("Select another position to play. This position is not available.");
        }
    }
}


function getBoardIndex(row, column) {
    return column + row * offset;
}


function playBotPosition() {

    let availablePositions = getPositionAvailable();

    if (availablePositions == -1) {
        alert("There's no more playable positions. Game over.");
    }
    else {
        let randomIndex = Math.floor(Math.random() * availablePositions.length);
        let selectedBotPosition = availablePositions[randomIndex];

        let row = selectedBotPosition[0];
        let column = selectedBotPosition[1];
        let index = getBoardIndex(row, column);

        board[index] = "O";

        let square = document.getElementById(row.toString() + "-" + column.toString());
        square.innerText = "O";

        let winner = checkForWinner();

        if (winner == -1) {
            turn = PLAYER;
        }
    }
}


function getPositionAvailable() {
    let positions = [];
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            let index = getBoardIndex(row, column);
            if (board[index] == "-") {
                positions.push([row, column]);
            }
        }
    }

    if (positions.length < 1) {
        return -1;
    }
    else {
        return positions;
    }
}


function checkForWinner() {
    //Horizontal Check
    for (let row = 0; row < rows; row++) {
        let column = 0;
        if (board[getBoardIndex(row, column)] == board[getBoardIndex(row, column + 1)] && board[getBoardIndex(row, column + 1)] == board[getBoardIndex(row, column + 2)]) {
            let symbol = board[getBoardIndex(row, column)];
            if (symbol == "X") {
                highlightPositions("horizontal", row, column);
                return 1;
            }
            if (symbol == "O") {
                highlightPositions("horizontal", row, column);
                return 1;
            }
        }
    }
    //Vertical Check
    for (let column = 0; column < columns; column++) {
        let row = 0;
        if (board[getBoardIndex(row, column)] == board[getBoardIndex(row + 1, column)] && board[getBoardIndex(row + 1, column)] == board[getBoardIndex(row + 2, column)]) {
            let symbol = board[getBoardIndex(row, column)];
            if (symbol == "X") {
                highlightPositions("vertical", row, column);
                return 1;
            }
            if (symbol == "O") {
                highlightPositions("vertical", row, column);
                return 1;
            }
        }
    }
    
    if (board[getBoardIndex(0,0)] == board[getBoardIndex(1,1)] && board[getBoardIndex(1,1)] == board[getBoardIndex(2,2)]) {
        let symbol = board[getBoardIndex(0, 0)];
        if (symbol == "X") {
            highlightPositions("diagonal1", 0, 0);
            return 1;
        }
        if (symbol == "O") {
            highlightPositions("diagonal1", 0, 0);
            return 1;
        }
    }
    if (board[getBoardIndex(2,0)] == board[getBoardIndex(1,1)] && board[getBoardIndex(1,1)] == board[getBoardIndex(0,2)]) {
        let symbol = board[getBoardIndex(2, 0)];
        if (symbol == "X") {
            highlightPositions("diagonal2", 2, 0);
            return 1;
        }
        if (symbol == "O") {
            highlightPositions("diagonal2", 2, 0);
            return 1;
        }
    }

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

