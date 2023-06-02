import { Player } from './types';

type PlayerDetailsProps = {
  value: 'X' | 'O';
  player: Player;
  currentPlayer: string;
};

export const PlayerDetails = ({ value, player, currentPlayer }: PlayerDetailsProps) => {
  const colorClass = value === 'X' ? 'text-green-500' : 'text-red-500';
  const activeClass = currentPlayer === player.name ? 'bg-teal-100' : '';
  return (
    <div className={`flex flex-col justify-center items-center w-80 pb-60 ${colorClass} ${activeClass}`}>
      <span className="text-9xl text-center">{value}</span>
      <h3 className="text-4xl text-center">{player.name}</h3>
      <div className="w-28 p-3 text-4xl text-center bg-gray-400 text-black">{player.score}</div>
    </div>
  );
};

export default PlayerDetails;
