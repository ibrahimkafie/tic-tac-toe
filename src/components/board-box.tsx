import { memo } from 'react';

type BoardBoxProps = {
  /**
   * The box value ('x' | 'o')
   */
  value: string;
};

/**
 * BoardBox component represents an individual box in the game board.
 */
export const BoardBox = memo(({ value }: BoardBoxProps) => {
  // Determine the color class based on the box value
  const colorClass = value === 'x' ? 'text-green-500' : 'text-red-500';

  // Determine the cursor style based on the box value
  const cursor = !value ? 'hover:bg-sky-200 cursor-pointer' : 'cursor-not-allowed';

  return (
    <span
      className={`flex items-center justify-center pb-7 box-border text-8xl h-full w-full font-700 select-none ${colorClass} ${cursor}`}
    >
      {value?.toUpperCase()}
    </span>
  );
});

export default BoardBox;
