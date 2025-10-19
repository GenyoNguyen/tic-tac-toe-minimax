# Tic Tac Toe Increment

A real-time multiplayer Tic Tac Toe game with a twist - instead of traditional X and O markers, players increment numbers on a 5x5 grid, competing as "Odd" and "Even" players.

## Project Overview

This project consists of two main parts:
1. **Frontend**: React-based user interface
2. **Backend**: WebSocket server for real-time gameplay

Players are matched automatically when they connect to the server. The first player is assigned to the "Odd" team, and the second player to the "Even" team. Players take turns incrementing the value of squares on the grid. The goal is to create a line of five squares that are all either odd or even numbers.

## Features

- Real-time multiplayer gameplay
- 5x5 game grid
- Unique "Odd vs Even" gameplay mechanics
- Win streak tracking
- Game statistics (wins/losses) stored locally
- Automatic player matching
- Game state synchronization across clients

## Technology Stack

### Frontend
- React 18
- JavaScript (ES6+)
- CSS3
- Local storage for game statistics persistence

### Backend
- Node.js
- WebSocket (ws)
- UUID for room management

## Installation and Setup

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn

### Server Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the server
npm start
```

The WebSocket server will start on port 8080.

### Frontend Setup
```bash
# Navigate to frontend directory
cd tic-tac-toe-increment

# Install dependencies
npm install

# Start the development server
npm start
```

The React application will start on [http://localhost:3000](http://localhost:3000).

## How to Play

1. Open the game in a browser
2. Wait for an opponent to join
3. You'll be assigned as either "Odd" or "Even" player
4. Click on any square to increment its value
5. Try to create a line of 5 squares with all odd numbers (if you're "Odd") or all even numbers (if you're "Even")
6. A line can be horizontal, vertical, or diagonal
7. The first player to create a winning line wins the game
8. Use the restart button to play again

## Game Rules

- "Odd" players win by creating a line of five squares that all contain odd numbers
- "Even" players win by creating a line of five squares that all contain even numbers (and not zeros)
- Both players can increment any square on the board
- Each click increases the value of a square by 1
- Your win streak resets if you lose a game

## Project Structure

```
server/
├── index.js          # WebSocket server implementation
└── package.json      # Server dependencies

tic-tac-toe-increment/
├── public/           # Static files
├── src/
│   ├── components/
│   │   ├── Board.js  # Game board component
│   │   ├── Game.js   # Main game logic
│   │   ├── Score.js  # Score display component
│   │   └── Square.js # Individual square component
│   ├── utils/
│   │   └── localStorage.js # Local storage utility
│   ├── App.css       # Main styles
│   ├── App.js        # App component
│   └── index.js      # Entry point
└── package.json      # Frontend dependencies
```

## Deployment

### Server
The server can be deployed to any Node.js hosting service such as Heroku, Vercel, or AWS.

Remember to update the WebSocket URL in the frontend code if you deploy the server to a different address.

### Frontend
The React app can be built for production using:

```bash
cd tic-tac-toe-increment
npm run build
```

This will create a `build` directory with optimized production files that can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Future Enhancements

- Add AI opponent option
- Implement user authentication
- Add global leaderboard
- Support for custom game rules
- Add sound effects and animations
- Responsive design for mobile devices

## License

This project is open source and available under the MIT license.

## Acknowledgments

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Inspired by classic Tic Tac Toe with a unique numerical twist