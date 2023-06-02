import BoardBox from './board-box';
import { Game } from './types';

type BoardProps = {
  game: Game;
  disabled: boolean;
  update: (boxIndex: number) => void;
};

export const Board = ({ update, game, disabled }: BoardProps) => {
  // handle make move click event
  const makeMove = (row: number, col: number) => {
    const boxIndex = getValueIndex(row, col);

    if (!disabled && !game.board[boxIndex]) {
      // update empty box only
      update(boxIndex);
    }
  };

  const getValueIndex = (row: number, col: number) => {
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
