import BoardBox from './board-box';
import { GameData } from '../types';

type BoardProps = {
  /**
   * The game data containing the current state of the game.
   */
  game: GameData;

  /**
   * A boolean indicating whether the board is disabled or not.
   * When the board is disabled, the user cannot interact with it.
   */
  disabled: boolean;

  /**
   * A function to update the game state when a box is clicked.
   * It receives the index of the box that was clicked.
   */
  update: (boxIndex: number) => void;
};

/**
 * Renders the game board component.
 */
export const Board = ({ update, game, disabled }: BoardProps) => {
  // Handle make move click event
  const makeMove = (row: number, col: number) => {
    const boxIndex = getValueIndex(row, col);

    if (!disabled && !game.board[boxIndex]) {
      // update empty box only
      update(boxIndex);
    }
  };

  // Calculate the index of a value in the game board array based on the given row and column
  const getValueIndex = (row: number, col: number) => {
    // Define the number of columns on the game board
    const numberOfColumns = 3;
    return row * numberOfColumns + col;
  };

  return (
    <div className="flex flex-col space-y-5 flex-1 justify-center items-center">
      <div
        className={`grid grid-rows-3 w-[500px] h-[490px] bg-gray-200 ${
          disabled ? 'pointer-events-none' : ''
        }`}
      >
        {[0, 1, 2].map((row) => (
          <div key={row} className="grid grid-cols-3">
            {[0, 1, 2].map((col) => (
              <div
                key={col}
                className="flex border-solid border-2 border-teal-300"
                onClick={() => makeMove(row, col)}
              >
                <BoardBox value={game.board[getValueIndex(row, col)]} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <span className="text-center">
        Current player
        <h3>{game.currentPlayer}</h3>
      </span>
    </div>
  );
};

export default Board;
