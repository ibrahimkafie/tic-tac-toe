import { useEffect } from 'react';
import { GameData } from '../types';

export function useGameCloseHandler(status: GameData['status'], close: () => void) {
  useEffect(() => {
    if (status === 'close') {
      close();
    }
  }, [close, status]);
}
