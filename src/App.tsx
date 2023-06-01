import { getFirestore } from "firebase/firestore";
import "./App.css";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { Content, GamesList, NewGameForm } from "./components";

function App() {
    const firestoreInstance = getFirestore(useFirebaseApp());

    return (
        <FirestoreProvider sdk={firestoreInstance}>
            <Content>
                <NewGameForm />
            </Content>
        </FirestoreProvider>
    );
}

export default App;
