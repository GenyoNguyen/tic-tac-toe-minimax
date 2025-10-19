import React, { useState, useEffect } from "react";
import Board from "./Board";
import { useRef } from "react";
import Score from "./Score";
import { getItem, setItem } from "../utils/localStorage";


function Game() {
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [player, setPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [gameStats, setGameStats] = useState(() => {
    const item = getItem("gameStats");
    return item || { wins: 0, losses: 0 };
  });
  const [winstreak, setWinstreak] = useState(() => {
    const item = getItem("winstreak");
    return item || 0;
  });
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'join'
      }));
    };

    ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);

      switch (type) {
        case 'start':
          console.log('data: ', data);
          setPlayer(data.player);
          setSquares(data.squares);
          setWinner(null);
          break;
        case 'update':
          setSquares((prevSquares) => {
            const newSquares = [...prevSquares];
            newSquares[data.square] = data.value;
            return newSquares;
          });
          break;
        case 'game_over':
          setWinner(data.winner);
          break;
        case 'disconnect':
          setPlayer(null);
          setSquares(Array(25).fill(null));
          break;
        default:
          console.log(squares);
          break;
      }
    }

    return () => {
      ws.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    setItem("gameStats", gameStats);
  }, [gameStats])

  useEffect(() => {
    setItem("winstreak", winstreak);
  }, [winstreak]);

  useEffect(() => {
    if (!winner) return;

    setGameStats((prev) => {

      if (winner === player) return { ...prev, wins: prev.wins + 1 }
      if (winner !== player) return { ...prev, losses: prev.losses + 1 }

      return prev
    })

    setWinstreak((prev) => {
      if (winner === player) return prev + 1
      if (winner !== player) return 0
    })
  }, [winner])


  //Handle player
  const handleClick = (i) => {
    console.log(player);
    console.log(winner);
    if (winner || !player) {
      return;
    }

    wsRef.current.send(JSON.stringify({
      type: 'increment',
      data: {
        square: i
      }
    }))
  };

  //Restart game
  const handleRestart = () => {
    wsRef.current.send(JSON.stringify({
      type: 'restart'
    }))
  };

  return (
    <div className="main">
      <h2 className="title">Tic Tac Toe Increment</h2>
      <div>
        Winstreak: {winstreak}
      </div>
      <div className="score">
        <Score {...gameStats} />
      </div>
      <div className="game">
        <span>{player ? `You are ${player}` : 'Please wait for the opponent'}</span>
        <Board squares={squares} handleClick={handleClick} />
        {/* <span className="player">Next player is: { isPlayable ? player : player === 'X' ? 'O' : 'X' }</span> */}
        <span className="player">{winner ? `${winner === player ? 'You win!' : 'Opponent wins!'}` : ''} </span>
      </div>
      <button disabled={!player || !winner} onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
