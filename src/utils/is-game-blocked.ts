import { GameData } from "../types";

export function isGameBlocked(board: GameData['board']) {
    // Check if there are any empty positions on the board
    for (const position of board) {
        if (position === "") {
            return false; // There is at least one empty position, game is not blocked
        }
    }

    return true; // All positions are filled, game is blocked
}