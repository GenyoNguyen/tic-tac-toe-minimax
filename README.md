# Tic-Tac-Toe Game

A modern, responsive Tic-Tac-Toe game built with React that features multiple difficulty levels, game statistics tracking, and a sleek user interface.

## Features

- **Multiple Difficulty Levels**: Play against the AI in easy, medium, or hard mode
- **Smart AI**: Implements the minimax algorithm for unbeatable gameplay in hard mode
- **Game Statistics**: Tracks wins, losses, draws, and current win streak
- **Local Storage**: Saves your game statistics between sessions
- **Responsive Design**: Play on any device with a responsive layout
- **Performance Metrics**: View AI "thinking time" and positions evaluated

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## How to Play

1. Select a difficulty level: Easy or Hard
2. You play as X, and the AI plays as O
3. Click on any empty square to make your move
4. The game will announce the winner or a draw
5. Click "Restart" to play again

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   │   ├── Board.js     # Game board component
│   │   ├── Game.js      # Main game logic
│   │   ├── Score.js     # Game statistics display
│   │   └── Square.js    # Individual square component
│   ├── utils/       # Utility functions
│   │   ├── ai.js         # AI algorithms
│   │   ├── gameLogic.js  # Game state calculation
│   │   └── localStorage.js # Local storage management
│   ├── App.js       # Root component
│   └── index.js     # Application entry point
```

## Technical Implementation

### AI Algorithm

The game implements the minimax algorithm for the hard difficulty level, providing a challenging and unbeatable opponent. The AI evaluates potential moves to find the optimal play.

### State Management

The game uses React's useState and useEffect hooks for state management, keeping track of:
- Current board state
- Player turns
- Game statistics (wins/losses/draws)
- Win streaks
- AI performance metrics

### Local Storage

Game statistics and win streaks are persisted to the browser's local storage, allowing players to maintain their records between sessions.


