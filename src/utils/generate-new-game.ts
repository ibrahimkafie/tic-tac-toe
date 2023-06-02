import { ACTIVE_GAME_STATUS, GameData } from "../types";

export function generateNewGame(player1Name: string): GameData {
    // Logic to generate a new game object
    return {
        player1: {
            name: player1Name,
            marker: 'x',
            score: 0,
        },
        player2: {
            name: '',
            marker: 'o',
            score: 0,
        },
        status: ACTIVE_GAME_STATUS,
        board: ["", "", "", "", "", "", "", "", ""],
        currentPlayer: player1Name,
        created: new Date(),
        currentWinner: ''
    };
};