# Tic-Tac-Toe Game using React

This project implements a simple Tic-Tac-Toe game using React. It includes components for the game board, individual squares, and game logic to determine the winner.

## How to Play

- Each player takes turns to click on an empty square.
- The player who succeeds in placing three of their marks (either 'X' or 'O') in a horizontal, vertical, or diagonal row wins.
- If all squares are filled and no player has won, the game ends in a draw.

## Components

### Square Component

The `Square` component represents an individual square on the game board. It displays the value ('X' or 'O') and triggers the `onSquareClick` function when clicked.

### Board Component

The `Board` component displays the game board consisting of multiple squares. It handles the game state, player turns, and determines the winner. The `handleClick` function is called when a square is clicked.

### Game Component

The `Game` component manages the overall game state. It keeps track of the game history, current move, and player turns. The `handlePlay` function is called when a move is made.

## Installation

To run the Tic-Tac-Toe game:

1. Make sure you have Node.js installed (v10+).
2. Clone this repository.
3. Navigate to the project directory in the terminal.
4. Run the following commands:

```sh
npm install
npm start
