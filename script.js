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
    const takeTurn = (board) => {
        let row, col;
        do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
        } while (board[row][col] !== " ");
        board[row][col] = mark;
        console.log(
            name + " placed a " + mark + " at " + row + ", " + col + "!",
        );
        printBoard(board);
    };
    const getName = () => {
        return name;
    };
    return { name, mark, takeTurn, getName };
}

const TicTacToe = () => {
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");
    let playerOnesTurn = true;

    const playTurn = () => {
        if (playerOnesTurn) {
            playerOne.takeTurn(board);
        } else {
            playerTwo.takeTurn(board);
        }
        playerOnesTurn = !playerOnesTurn;
    };

    const whoseTurn = () => {
        if (playerOnesTurn) {
            return playerOne;
        } else {
            return playerTwo;
        }
    };

    const whosePreviousTurn = () => {
        if (playerOnesTurn) {
            return playerTwo;
        } else {
            return playerOne;
        }
    };

    const playGame = () => {
        console.log("Started game of TicTacToe!");
        let turnNumber = 0;
        let running = true;
        while (running && turnNumber < 9) {
            playTurn();
            turnNumber += 1;
            if (isVictory(board)) {
                running = false;
            }
        }
        if (isVictory(board)) {
            console.log(whosePreviousTurn().getName() + " won the game!");
        } else if (turnNumber === 9) {
            console.log("The game is a tie!");
        }
    };

    return { playGame };
};

//let ticTacToe = TicTacToe();
//ticTacToe.playGame();

const squares = document.querySelectorAll(".square");
