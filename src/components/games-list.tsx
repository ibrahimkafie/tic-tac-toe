import { query, orderBy } from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { useGamesCollection } from '../hooks';

// TODO: use this later to display the previous games result
export const GamesList = () => {
  const gamesCollection = useGamesCollection();

  const gamesQuery = query(gamesCollection, orderBy('created', 'asc'));
  const { status, data: games } = useFirestoreCollectionData(gamesQuery, {
    idField: 'id',
  });

  if (status === 'loading') {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {(games || []).map((game) => (
        <div key={game.created.toString()}>{JSON.stringify(game, null, 4)}</div>
      ))}
    </div>
  );
};

export default GamesList;
