import { collection } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { GAMES_COLLECTION_NAME } from "../components/types";

// Custom hook to get the games collection
export const useGamesCollection = () => {
    const firestore = useFirestore();
    return collection(firestore, GAMES_COLLECTION_NAME);
};

export default useGamesCollection;
