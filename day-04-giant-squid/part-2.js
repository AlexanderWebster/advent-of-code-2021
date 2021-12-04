const PubSub = require("pubsub-js");

const BOARD_SIZE = 5;

// pubsub topics
const WINNING_SCORE = "My winning score is";
const NEW_NUMBER_DRAWN = "New number drawn";
const BINGO = "BINGO!";

// helpers
const isNotNaN = (num) => !isNaN(num);
const add = (a, b) => a + b;

function Player(id, board) {
  this.id = id;
  this.board = board;
  this.token = "";

  this.playTurn = (topic, numberDrawn) => {
    if (topic == NEW_NUMBER_DRAWN) {
      for (let row = 0; row < BOARD_SIZE; ++row) {
        for (let col = 0; col < BOARD_SIZE; ++col) {
          if (this.board[row][col] == numberDrawn) {
            // Mark it off
            this.board[row][col] = NaN;

            // Check for bingo
            const bingo =
              this.board[row].filter(isNotNaN) == 0 ||
              this.board.map((row) => row[col]).filter(isNotNaN) == 0;

            if (bingo) {
                if (PubSub.countSubscriptions(NEW_NUMBER_DRAWN) == 1) {
                    PubSub.publish(
                        WINNING_SCORE,
                        this.calculateWinningScore(this.board, numberDrawn)
                      );
                      console.log("The winner is, Player", this.id);
                      PubSub.publish(BINGO, this.id);
                }
              
              PubSub.unsubscribe(this.token);
             
              break;
            }
          }
        }
      }
    }
  };

  this.calculateWinningScore = (board, numberDrawn) => {
    return (
      board
        .map(row => row.filter(isNotNaN).reduce(add, 0))
        .reduce(add, 0) * numberDrawn
    );
  };

  this.token = PubSub.subscribe(NEW_NUMBER_DRAWN, this.playTurn);
}

const setUpGame = () => {
  const fileArray = require("fs")
    .readFileSync("input", "utf-8")
    .split("\n")
    .filter(Boolean);

  let boards = [];

  for (let i = 1; i < fileArray.length; i += BOARD_SIZE) {
    let board = [];

    fileArray.slice(i, i + BOARD_SIZE).forEach(line => {
      const row = line
        .split(" ")
        .filter(string => string !== "")
        .map(string => parseInt(string));

      board.push(row);
    });

    boards.push(board);
  }

  const winningNumbers = fileArray[0]
    .split(",")
    .map(number => parseInt(number));

  return { winningNumbers, boards };
};

const playBingo = () => {
  const { winningNumbers, boards } = setUpGame();

  // set up subscriptions
  const printAllMessages = (topic, data) => console.log(topic, data);
  PubSub.subscribe(WINNING_SCORE, printAllMessages);

  // hand out boards
  boards.forEach((board, id) => new Player(id, board));

  // play
  for (number of winningNumbers) {
    if (PubSub.countSubscriptions(NEW_NUMBER_DRAWN) > 0) {
      PubSub.publish(NEW_NUMBER_DRAWN, number);
    } else {
      break;
    }
  }
};

playBingo();
