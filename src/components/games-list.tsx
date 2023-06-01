import { query, orderBy } from "firebase/firestore";
import { useFirestoreCollectionData } from "reactfire";
import { useGamesCollection } from "../hooks";

export const GamesList = () => {
    const gamesCollection = useGamesCollection();

    const gamesQuery = query(gamesCollection, orderBy("status", "asc"));
    const { status, data: games } = useFirestoreCollectionData(gamesQuery, {
        idField: "id",
    });

    if (status === "loading") {
        return <h3>Loading...</h3>;
    }

    return (
        <div>
            {(games || []).map((game) => (
                <div key={game.id}>
                    {game.playerName} -- {game.status}
                </div>
            ))}
        </div>
    );
};

export default GamesList;
