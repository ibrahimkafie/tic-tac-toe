import { getFirestore } from "firebase/firestore";
import "./App.css";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { Content, GameBoard, NewGameForm } from "./components";
import { useState } from "react";
import { ActiveGame } from "./components/types";

function App() {
    const firestoreInstance = getFirestore(useFirebaseApp());
    const [state, setState] = useState<ActiveGame | null>(null);

    const closeGame = () => {
        setState(null);
    }

    return (
        <FirestoreProvider sdk={firestoreInstance}>
            <Content>
                {!state ? (
                    <NewGameForm
                        onSubmit={(playerName, gameId) =>
                            setState({ playerName, gameId })
                        }
                    />
                ) : (
                    <GameBoard activeGame={state} close={closeGame} />
                )}
            </Content>
        </FirestoreProvider>
    );
}

export default App;
