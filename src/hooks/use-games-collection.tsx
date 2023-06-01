import { collection } from "firebase/firestore";
import { useFirestore } from "reactfire";

// Custom hook to get the games collection
export const useGamesCollection = () => {
    const firestore = useFirestore();
    return collection(firestore, "games");
};

export default useGamesCollection;
