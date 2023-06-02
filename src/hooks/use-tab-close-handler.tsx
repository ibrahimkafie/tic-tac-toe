import { useEffect } from 'react';

/**
 * Custom hook to handle updating game state to "close" when the user closes the tab
 */
export function useTabCloseHandler(closeGame: () => void) {
  useEffect(() => {
    const cleanup = () => {
      closeGame();
    };

    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [closeGame]);
}
