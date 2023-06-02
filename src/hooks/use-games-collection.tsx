import { FirestoreDataConverter, QueryDocumentSnapshot, collection } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { GAMES_COLLECTION_NAME, GameData } from '../types';

/**
 * Custom hook to get the games collection.
 */
export function useGamesCollection() {
  const converter: FirestoreDataConverter<GameData> = {
    toFirestore: (data: GameData) => data,
    fromFirestore: (snap: QueryDocumentSnapshot<GameData>) => snap.data(),
  };

  const firestore = useFirestore();
  return collection(firestore, GAMES_COLLECTION_NAME).withConverter(converter);
}

export default useGamesCollection;
