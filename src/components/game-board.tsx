import { useFirestore, useFirestoreDocData } from 'reactfire';
import { ActiveGame, GAMES_COLLECTION_NAME, Game } from './types';
import Board from './board';
import { doc, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import { generateNewGame, isGameBlocked, isWinningBoard } from './utils';
import PlayerDetails from './player-details';
import GameResult from './game-result';
import WaitingMessage from './waiting-message';

type GameBoardProps = {
  activeGame: ActiveGame;
  close: () => void;
};
export const GameBoard = ({ activeGame, close }: GameBoardProps) => {
  const activeGameRef = doc(useFirestore(), GAMES_COLLECTION_NAME, activeGame.gameId);

  const { status, data: game } = useFirestoreDocData(activeGameRef);

  const updateBoardBox = async (boxIndex: number) => {
    try {
      const isPlayerOne = game.currentPlayer === game.player1.name;

      const updateData = { ...game };

      // update board box value
      updateData.board[boxIndex] = isPlayerOne ? 'x' : 'o';

      // check if current board win
      const isWin = isWinningBoard(updateData.board);

      if (isWin) {
        if (isPlayerOne) {
          updateData.player1.score += 1;
          updateData.currentWinner = updateData.player1.name;
        } else {
          updateData.player2.score += 1;
          updateData.currentWinner = updateData.player2.name;
        }

        updateData.status = 'done';
      } else if (isGameBlocked(updateData.board)) {
        updateData.currentWinner = 'No one';
        updateData.status = 'done';
      } else {
        // update current player
        updateData.currentPlayer = isPlayerOne ? updateData.player2.name : updateData.player1.name;
      }

      // update remote doc
      await updateDoc(activeGameRef, updateData);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const resetGame = async () => {
    try {
      const newGame = generateNewGame(activeGame.playerName);
      const updateData = {
        ...game,
        board: newGame.board,
        status: 'open',
      };
      await updateDoc(activeGameRef, updateData);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const closeGame = async () => {
    try {
      const updateData = { ...game, status: 'close' };
      await updateDoc(activeGameRef, updateData);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  if (game?.status === 'close') {
    close();
  }

  // when loading data from server or waiting for all players to join
  if (status === 'loading' || !game?.player2.name) {
    return <WaitingMessage />;
  }

  // when player win or game block
  if (game?.status === 'done') {
    return (
      <GameResult currentWinner={game.currentWinner} resetGame={resetGame} closeGame={closeGame} />
    );
  }

  // start the game when all good
  return (
    <>
      <div className="flex items-start justify-between h-20 px-20 py-5 box-border">
        <h1 className="text-3xl font-bold self-start !m-0">Tic Tac Toe Game</h1>

        <div className="space-x-6">
          <Button variant="contained" size="small" onClick={resetGame}>
            Reset the game
          </Button>

          <Button variant="contained" size="small" color="error" onClick={closeGame}>
            Close the game
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <PlayerDetails value="X" player={game.player1} currentPlayer={game.currentPlayer} />

        <Board
          game={game as Game}
          update={updateBoardBox}
          disabled={game.currentPlayer !== activeGame.playerName}
        />

        <PlayerDetails value="O" player={game.player2} currentPlayer={game.currentPlayer} />
      </div>
    </>
  );
};

export default GameBoard;
