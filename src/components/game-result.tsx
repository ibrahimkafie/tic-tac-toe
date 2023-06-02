import Button from '@mui/material/Button';

type GameResultProps = {
  currentWinner: string;
  resetGame: () => void;
  closeGame: () => void;
};

export const GameResult = ({ currentWinner, resetGame, closeGame }: GameResultProps) => {
  return (
    <div className="m-auto w-1/2 flex flex-col justify-center items-center space-y-8 p-16 bg-teal-50">
      <h2 className="text-5xl font-normal text-teal-700">
        <span className="font-extrabold mr-1">{currentWinner}</span> takes the game!
      </h2>
      <div className="flex space-x-8">
        <Button variant="outlined" onClick={resetGame}>
          Start new game
        </Button>
        <Button variant="outlined" onClick={closeGame}>
          Close the game
        </Button>
      </div>
    </div>
  );
};

export default GameResult;
