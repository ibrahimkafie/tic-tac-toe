import { Player } from "./player";

export type GameStatus = 'open' | 'blocked' | 'won' | 'close';

export type GameData = {
    player1: Player;
    player2: Player;
    status: GameStatus;
    board: string[];
    currentPlayer: string;
    created: Date;
    currentWinner: string;
}

export const ACTIVE_GAME_STATUS: GameStatus = 'open';
export const GAMES_COLLECTION_NAME = 'games';