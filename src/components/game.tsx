import { useFirestoreDocData } from 'reactfire';
import { doc, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import { ActiveGame, GameData } from '../types';
import { Board, PlayerDetails, GameResult, WaitingMessage } from '../components';
import {
  deepCopy,
  generateNewGame,
  getCurrentPlayer,
  isGameBlocked,
  isWinningBoard,
} from '../utils';
import { useGameCloseHandler, useGamesCollection, useTabCloseHandler } from '../hooks';
import { useCallback } from 'react';

type GameProps = {
  /**
   * The active game data
   */
  activeGame: ActiveGame;

  /**
   * Callback to close the game
   */
  close: () => void;
};

/**
 * Renders the Tic Tac Toe game component.
 */
export const Game = ({ activeGame, close }: GameProps) => {
  const gamesCollection = useGamesCollection();
  const activeGameRef = doc(gamesCollection, activeGame.gameId);

  // Retrieve the game data from Firestore and subscribe to real-time updates
  const { status, data: game } = useFirestoreDocData(activeGameRef);

  // Update the game data in Firestore
  const updateGame = useCallback(
    async (updatedData: GameData) => {
      try {
        await updateDoc(activeGameRef, updatedData);
      } catch (error) {
        console.error('Game - Error updating document:', error);
      }
    },
    [activeGameRef]
  );

  // Update the value of a board box
  const updateBoardBox = async (boxIndex: number) => {
    const currentPlayer = getCurrentPlayer(game);

    // create a deep copy of the game to avoid mutation
    const updateData = deepCopy(game);

    // update board box value
    updateData.board[boxIndex] = currentPlayer.marker;

    // check if the current player has won
    const hasPlayerWon = isWinningBoard(updateData.board);

    if (hasPlayerWon) {
      // game is won by the current player
      updateData[currentPlayer.marker === 'x' ? 'player1' : 'player2'].score += 1;
      updateData.currentWinner = currentPlayer.name;
      updateData.status = 'won';
    } else if (isGameBlocked(updateData.board)) {
      // game is blocked, no one wins
      updateData.currentWinner = 'No one';
      updateData.status = 'blocked';
    } else {
      // switch the game to the next player and update the current player's name
      updateData.currentPlayer =
        updateData[currentPlayer.marker === 'x' ? 'player2' : 'player1'].name;
    }

    updateGame(updateData);
  };

  // Reset the game to its initial state
  const resetGame = async () => {
    const newGame = generateNewGame(activeGame.playerName);

    // keep players data to track the score
    const updateData: GameData = {
      ...newGame,
      player1: game.player1,
      player2: game.player2,
    };
    updateGame(updateData);
  };

  // Close the game
  const closeGame = useCallback(async () => {
    const updateData: GameData = { ...game, status: 'close' };
    updateGame(updateData);
  }, [game, updateGame]);

  // To handle game close when the status changes to "close"
  useGameCloseHandler(game?.status, close);

  // To handle updating game state to "close" when the user closes the tab
  useTabCloseHandler(closeGame);

  // Render a waiting message when loading data from the server or waiting for all players to join
  if (status === 'loading' || !game?.player2.name) {
    return <WaitingMessage />;
  }

  // Render the game result component when the game is done (either a player has won or the game is blocked)
  if (['blocked', 'won'].includes(game?.status)) {
    return (
      <GameResult currentWinner={game.currentWinner} resetGame={resetGame} closeGame={closeGame} />
    );
  }

  // Render the game board component when all conditions are met
  return (
    <>
      <div className="flex items-start justify-between h-20 px-20 py-5 box-border">
        <h1 className="text-3xl font-bold self-start !m-0">Tic Tac Toe Game</h1>

        <div className="space-x-6">
          <Button variant="contained" size="small" onClick={resetGame}>
            Reset game
          </Button>

          <Button variant="contained" size="small" color="error" onClick={closeGame}>
            Close game
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <PlayerDetails player={game.player1} currentPlayer={game.currentPlayer} />

        <Board
          game={game as GameData}
          update={updateBoardBox}
          disabled={game.currentPlayer !== activeGame.playerName}
        />

        <PlayerDetails player={game.player2} currentPlayer={game.currentPlayer} />
      </div>
    </>
  );
};

export default Game;
