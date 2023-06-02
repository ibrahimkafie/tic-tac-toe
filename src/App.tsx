import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { Content, Game, NewGameForm } from './components';
import { useState } from 'react';
import { ActiveGame } from './types';

/**
 * The root component of the application.
 */
function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const [state, setState] = useState<ActiveGame | null>(null);

  // Closes the game and resets the state.
  const closeGame = () => {
    setState(null);
  };

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Content>
        {!state ? (
          <NewGameForm onSubmit={(playerName, gameId) => setState({ playerName, gameId })} />
        ) : (
          <Game activeGame={state} close={closeGame} />
        )}
      </Content>
    </FirestoreProvider>
  );
}

export default App;
