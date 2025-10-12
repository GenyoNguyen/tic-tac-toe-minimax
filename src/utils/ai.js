import { calculateWinner } from "./gameLogic";

const minimax = (board, depth, isMaximizing, posNum) => {
  const winner = calculateWinner(board);
  if (winner === "O") return { score: 10 - depth, posNum };
  if (winner === "X") return { score: -10 + depth, posNum };
  if (winner === "Draw") return { score: 0, posNum };

  if (isMaximizing) { // AI turn
    let maxEval = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        posNum += 1;
        const newBoard = [...board];
        newBoard[i] = "O";
        const { score: evalScore, posNum: num } = minimax(newBoard, depth + 1, false, posNum);
        posNum += num;
        maxEval = Math.max(maxEval, evalScore);
      }
    }
    return { score: maxEval, posNum };
  } else { // Player turn
    let minEval = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        posNum += 1;
        const newBoard = [...board];
        newBoard[i] = "X";
        const { score: evalScore, posNum: num } = minimax(newBoard, depth + 1, true, posNum);
        posNum += num;
        minEval = Math.min(minEval, evalScore);
      }
    }
    return { score: minEval, posNum };
  }
};

const random = () => {
  return { score: Math.random(), posNum: 0 };
}

export { minimax, random };