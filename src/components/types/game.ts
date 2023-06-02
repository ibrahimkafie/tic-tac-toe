import { Player } from "./player";

export type GameStatus = 'open' | 'done' | 'close';

export type Game = {
    player1: Player;
    player2: Player;
    status: GameStatus;
    board: string[];
    currentPlayer: string;
    created: Date;
    currentWinner: string;
}

export type GameDocument = {
    status: 'loading' | 'error' | 'success';
    data: Game;
};

export const ACTIVE_GAME_STATUS: GameStatus = 'open';
export const GAMES_COLLECTION_NAME = 'games';