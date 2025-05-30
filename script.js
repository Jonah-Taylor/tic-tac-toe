const squares = document.querySelectorAll(".square");
const victory = document.querySelector(".victory");

function printBoard(board) {
    console.log(board.map((row) => row.join(" | ")).join("\n---------\n"));
}

function isVictory(board) {
    for (let i = 0; i < 3; i++) {
        // rows
        if (
            board[i][0] !== " " &&
            board[i][0] === board[i][1] &&
            board[i][1] === board[i][2]
        ) {
            return true;
        }
        // cols
        if (
            board[0][i] !== " " &&
            board[0][i] === board[1][i] &&
            board[1][i] == board[2][i]
        ) {
            return true;
        }
    }
    //diagonials
    if (
        board[0][0] !== " " &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]
    ) {
        return true;
    }
    if (
        board[0][2] !== " " &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]
    ) {
        return true;
    }
    return false;
}

function createPlayer(name, mark) {
    return { name, mark };
}

const TicTacToe = () => {
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    const playerOne = createPlayer("Player X", "X");
    const playerTwo = createPlayer("Player O", "O");
    let playerOnesTurn = true;
    let turns = 0;

    const reset = () => {
        board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
        turns = 0;
        playerOnesTurn = true;
    };

    const mark = (row, col) => {
        let m = whoseTurn().mark;
        board[row][col] = m;
        return m;
    };

    const whoseTurn = () => {
        if (playerOnesTurn) {
            return playerOne;
        } else {
            return playerTwo;
        }
    };

    const locEmpty = (row, col) => {
        return board[row][col] === " ";
    };

    const whosePreviousTurn = () => {
        if (playerOnesTurn) {
            return playerTwo;
        } else {
            return playerOne;
        }
    };

    const endTurn = () => {
        turns += 1;
        playerOnesTurn = !playerOnesTurn;
        if (isVictory(board) || turns === 9) {
            return true;
        }
        return false;
    };

    const endGameMessage = () => {
        if (isVictory(board)) {
            return (
                whosePreviousTurn().name +
                " won the game! Hit the spacebar to restart!"
            );
        } else {
            return "The game is a tie! Hit the spacebar to restart!";
        }
    };

    return { locEmpty, mark, endTurn, endGameMessage, reset };
};

let ticTacToe = TicTacToe();
let gameEnded = false;
let games = 0;

squares.forEach((el, index) => {
    let row = Math.floor(index / 3);
    let col = index % 3;
    el.addEventListener("click", () => {
        if (ticTacToe.locEmpty(row, col) && !gameEnded) {
            el.innerText = ticTacToe.mark(row, col);
            gameEnded = ticTacToe.endTurn();
            if (gameEnded) {
                victory.innerText = ticTacToe.endGameMessage();
                games += 1;
            }
        }
    });
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        squares.forEach((el) => {
            el.innerText = "";
        });
        ticTacToe.reset();
        victory.innerText = "You've played " + games + " games!";
        gameEnded = false;
    }
});
