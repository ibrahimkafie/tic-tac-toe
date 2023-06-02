import { memo } from 'react';

type BoardBoxProps = {
  value: string;
};

export const BoardBox = memo(({ value }: BoardBoxProps) => {
  const colorClass = value === 'x' ? 'text-green-500' : 'text-red-500';
  const cursor = !value ? 'hover:bg-sky-200 cursor-pointer' : 'cursor-not-allowed';
  return (
    <span
      className={`flex items-center justify-center pb-7 box-border text-8xl h-full w-full font-700 select-none ${colorClass} ${cursor}`}
    >
      {value}
    </span>
  );
});

export default BoardBox;
