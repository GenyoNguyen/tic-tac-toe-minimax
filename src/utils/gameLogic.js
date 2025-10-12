import { minimax, random } from "./ai";

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  if (!squares.includes(null)) {
    return 'Draw';
  }

  return null;
};


const getBestMove = (board, gameMode) => {
  let bestScore = -Infinity;
  let move = null;
  let startTime = performance.now();
  let posNum = 0;
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {          // only consider empty cells
      const newBoard = [...board];
      newBoard[i] = "O";      // simulate AI move
      const { score, posNum: num } = gameMode === 'hard' ? minimax(newBoard, 0, false, 1) : random(); // next turn is player
      posNum += num;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  let endTime = performance.now();
  console.log(bestScore);

  return { move, thinkTime: endTime - startTime, posNum }; // return the best index for AI to play
};

export { calculateWinner, getBestMove };