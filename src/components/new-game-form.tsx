import { FormEvent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ACTIVE_GAME_STATUS } from '../types';
import { addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useGamesCollection } from '../hooks';
import { deepCopy, generateNewGame } from '../utils';

type NewGameFormProps = {
  /**
   * A callback function triggered when the form is submitted.
   * @param playerName The name of the player starting the game..
   * @param gameId The ID of the game being started.
   */
  onSubmit: (playerName: string, gameId: string) => void;
};

/**
 * A form component for starting a new game.
 */
export const NewGameForm = ({ onSubmit }: NewGameFormProps) => {
  const gamesCollection = useGamesCollection();
  const [playerName, setPlayerName] = useState('');

  // Handles the form submission to start a new game
  const handleStartGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // get active game if exists
      const q = query(gamesCollection, where('status', '==', ACTIVE_GAME_STATUS));
      const querySnapshot = await getDocs(q);

      const exists = !querySnapshot.empty;

      if (exists) {
        // Game is exists, add player 2 to the current game:

        const game = querySnapshot.docs[0].data();
        const activeGameRef = doc(gamesCollection, querySnapshot.docs[0].id);
        const updateData = deepCopy(game);

        // update player 2 name and make sure not match with the first player name
        updateData.player2.name = game.player1.name === playerName ? `${playerName}_2` : playerName;
        await updateDoc(activeGameRef, updateData);
        onSubmit(playerName, querySnapshot.docs[0].id);
      } else {
        // Game not exist, create new game with the first player:

        const newGameData = generateNewGame(playerName);
        const newDocRef = await addDoc(gamesCollection, newGameData);
        onSubmit(playerName, newDocRef.id);
      }
    } catch (error) {
      console.error('NewGameForm - Error occurred:', error);
    }
  };

  return (
    <div className="flex flex-1 flex-col self-center justify-center space-y-4 mb-24 max-w-xl">
      <h1 className="text-6xl font-bold text-center">Tic Tac Toe Game</h1>
      <form onSubmit={handleStartGame} className="flex flex-col space-y-4">
        <TextField
          hiddenLabel
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          InputProps={{
            classes: {
              input: 'text-center',
            },
            autoFocus: true,
          }}
        />
        <Button type="submit" variant="contained" size="large" disabled={!playerName}>
          Start Game
        </Button>
      </form>
    </div>
  );
};

export default NewGameForm;
