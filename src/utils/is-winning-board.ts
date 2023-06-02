import { GameData } from "../types";

// Define the winning combinations
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

export function isWinningBoard(board: GameData['board']) {

    // Check if any winning combination is present on the board
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            return true; // Found a winning combination
        }
    }

    return false; // No winning combination found
}