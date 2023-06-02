import { GameData, Player } from "../types";

export function getCurrentPlayer(game: GameData): Player {
    if (game.currentPlayer === game.player1.name) {
        return game.player1
    } else {
        return game.player2;
    }
}