import { addDoc, query, where, limit } from "firebase/firestore";
import { useState } from "react";
import { useGamesCollection } from "../hooks";
import { GameStatus } from "./types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFirestoreDocDataOnce } from "reactfire";

export const NewGameForm = () => {
    const [playerName, setPlayerName] = useState("");
    const gamesCollection = useGamesCollection();

    const currentGameState: GameStatus = "pending";

    const handleStartGame = async (e: any) => {
        e.preventDefault();

        const currentGame = await useFirestoreDocDataOnce(
            gamesCollection,
            where("status", "==", currentGameState),
            limit(1)
        );

        if (currentGame) {
            console.log("currentGame: ", currentGame);
        } else {
            // Create a new game session document in Firestore
            await addDoc(gamesCollection, {
                playerName,
                status: "pending",
            });
        }

        // Clear form inputs
        setPlayerName("");
    };

    return (
        <div className="flex flex-col space-y-4 justify-center h-3/4">
            <h1 className="text-6xl font-bold">Tic Tac Toe Game</h1>
            <form
                onSubmit={handleStartGame}
                className="flex flex-col space-y-4"
            >
                <TextField
                    hiddenLabel
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    InputProps={{
                        classes: {
                            input: "text-center",
                        },
                    }}
                />
                <Button variant="contained" size="large" disabled={!playerName}>
                    Start Game
                </Button>
            </form>
        </div>
    );
};

export default NewGameForm;
