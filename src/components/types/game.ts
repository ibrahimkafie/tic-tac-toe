import { Player } from "./player";

export type GameStatus = 'pending' | 'complete';

export type Game = {
    player1: Player;
    player2: Player;
    status: GameStatus;
    board: string[][];
    currentPlayer: string;
}