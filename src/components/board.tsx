import React from "react";

type BoardProps = {
    onClick: (row: number, col: number) => void;
};

export const Board = ({ onClick }: BoardProps) => {
    
    // handle make move click event
    const makeMove = (row: number, col: number) => {
        onClick(row, col);
    };

    return (
        <div>
            {[0, 1, 2].map((row) => (
                <div key={row} className="xo-row">
                    {[0, 1, 2].map((col) => (
                        <div
                            key={col}
                            className="xo-cell"
                            onClick={() => makeMove(row, col)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
