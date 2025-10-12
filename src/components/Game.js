import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner } from "../utils/gameLogic";
import Score from "./Score";
import { getItem, setItem } from "../utils/localStorage";
import { getBestMove } from "../utils/gameLogic";


function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState("easy");
  const [gameStats, setGameStats] = useState(() => {
    const item = getItem("gameStats");
    return item || { wins: 0, draws: 0, losses: 0 };
  });
  const [metrics, setMetrics] = useState({ thinkTime: 0, posNum: 0 });

  const [winstreak, setWinstreak] = useState(() => {
    const item = getItem("winstreak");
    return item || 0;
  })

  useEffect(() => {
    setItem("gameStats", gameStats);
  }, [gameStats])

  useEffect(() => {
    setItem("winstreak", winstreak);
  }, [winstreak]);

  useEffect(() => {
    if (!winner) return;

    setGameStats((prev) => {

      if (winner === 'X') return { ...prev, wins: prev.wins + 1 }
      if (winner === 'O') return { ...prev, losses: prev.losses + 1 }
      if (winner === 'Draw') return { ...prev, draws: prev.draws + 1 }

      return prev
    })

    setWinstreak((prev) => {
      if (winner === 'X') return prev + 1
      if (winner === 'O' || winner === 'Draw') return 0
    })
  }, [winner])

  useEffect(() => {
    if (!xIsNext) {
      const { move: bestMove, thinkTime, posNum } = getBestMove(squares, gameMode);  // find best index
      if (bestMove !== null) {
        const newBoard = [...squares];
        newBoard[bestMove] = "O";
        setSquares(newBoard);
        setXIsNext(!xIsNext);
      }
      console.log(thinkTime);
      setMetrics({ thinkTime, posNum });
    }
  }, [xIsNext]);

  //Declaring a Winner
  useEffect(() => {
    const winner = calculateWinner(squares);
    setWinner(winner);
  }, [squares]);

  // Handle player
  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }

    squares[i] = 'X';
    setXIsNext(!xIsNext);
    setSquares([...squares]);
  };

  // Restart game
  const handleRestart = () => {
    setWinner(null);
    setXIsNext(true);
    setSquares(Array(9).fill(null));
    setMetrics({ thinkTime: 0, posNum: 0 });
  };

  // Change difficulty
  const handleModeChange = (mode) => {
    setGameMode(mode);
    setWinner(null);
    setXIsNext(true);
    setSquares(Array(9).fill(null));
    setMetrics({ thinkTime: 0, posNum: 0 });
  }

  return (
    <div className="main">
      <h1 className="title">Tic Tac Toe</h1>
      <div>
        <div>Bot think time: {metrics.thinkTime}</div>
        <div>Number of positions evaluated: {metrics.posNum}</div>
      </div>
      <div>
        Winstreak: {winstreak}
      </div>
      <div className="game-modes">
        <button
          onClick={() => handleModeChange("easy")}
          className={`mode-btn ${gameMode === "easy" ? "active" : ""}`}
          disabled={gameMode === "easy"}
        >
          Easy
        </button>
        <button
          onClick={() => handleModeChange("hard")}
          className={`mode-btn ${gameMode === "hard" ? "active" : ""}`}
          disabled={gameMode === "hard"}
        >
          Hard
        </button>
      </div>
      <div className="score">
        <Score {...gameStats} />
      </div>
      <div className="game">
        <Board squares={squares} handleClick={handleClick} />
        <span className="player">{winner ? `${winner === 'X' ? 'You win!' : (winner === 'O' ? 'Bot wins' : winner)}` : `${xIsNext ? "Your" : "Bot's"} turn`} </span>
      </div>
      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
