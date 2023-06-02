import { useEffect } from 'react';

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
