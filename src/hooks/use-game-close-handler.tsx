import { useEffect } from 'react';
import { GameData } from '../types';

/**
 * Custom hook to handle game close when the status changes to "close"
 */
export function useGameCloseHandler(status: GameData['status'], close: () => void) {
  useEffect(() => {
    if (status === 'close') {
      close();
    }
  }, [close, status]);
}
