import { ACTIVE_GAME_STATUS, Game } from "../types";

export function generateNewGame(player1Name: string): Game {
    // Logic to generate a new game object
    const newGame = {
        player1: {
            name: player1Name,
            score: 0,
        },
        player2: {
            name: '',
            score: 0,
        },
        status: ACTIVE_GAME_STATUS,
        board: ["", "", "", "", "", "", "", "", ""],
        currentPlayer: player1Name,
        created: new Date(),
        currentWinner: ''
    };

    return newGame;
};