import { Player } from '../types';

type PlayerDetailsProps = {
  /**
   * The player object containing player details.
   */
  player: Player;
  /**
   * The name of the current player.
   */
  currentPlayer: string;
};

/**
 * PlayerDetails component displays the details of a player, including their marker, name, and score.
 */
export const PlayerDetails = ({ player, currentPlayer }: PlayerDetailsProps) => {
  const colorClass = player.marker === 'x' ? 'text-green-500' : 'text-red-500';
  const activeClass = currentPlayer === player.name ? 'bg-teal-100' : '';
  return (
    <div
      className={`flex flex-col justify-center items-center w-80 pb-60 ${colorClass} ${activeClass}`}
    >
      <span className="text-9xl text-center">{player.marker.toUpperCase()}</span>
      <h3 className="text-4xl text-center">{player.name}</h3>
      <div className="w-28 p-3 text-4xl text-center bg-gray-400 text-black">{player.score}</div>
    </div>
  );
};

export default PlayerDetails;
