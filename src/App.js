import { useState } from "react";
function App() {
    function Square({ value, onSquareClick }) {
        return (
            <button className="square" onClick={onSquareClick}>
                {value}
            </button>
        );
    }

    function Board() {
        const [squares, setSqueres] = useState(Array(9).fill(null));
        const [xIsNext, setXIsNext] = useState(true);
        const handlerClick = (i) => {
            if (squares[i] || calculateWinner(squares)) return;
            const nextSquares = [...squares];
            nextSquares[i] = xIsNext ? "X" : "O";
            setSqueres(nextSquares);
            setXIsNext(!xIsNext);
        };

        const winner = calculateWinner(squares);
        let status = winner
            ? `Winner: ${winner}`
            : `Next player: ${xIsNext ? "X" : "O"}`;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    <Square
                        value={squares[0]}
                        onSquareClick={() => handlerClick(0)}
                    />
                    <Square
                        value={squares[1]}
                        onSquareClick={() => handlerClick(1)}
                    />
                    <Square
                        value={squares[2]}
                        onSquareClick={() => handlerClick(2)}
                    />
                </div>
                <div className="board-row">
                    <Square
                        value={squares[3]}
                        onSquareClick={() => handlerClick(3)}
                    />
                    <Square
                        value={squares[4]}
                        onSquareClick={() => handlerClick(4)}
                    />
                    <Square
                        value={squares[5]}
                        onSquareClick={() => handlerClick(5)}
                    />
                </div>
                <div className="board-row">
                    <Square
                        value={squares[6]}
                        onSquareClick={() => handlerClick(6)}
                    />
                    <Square
                        value={squares[7]}
                        onSquareClick={() => handlerClick(7)}
                    />
                    <Square
                        value={squares[8]}
                        onSquareClick={() => handlerClick(8)}
                    />
                </div>
            </div>
        );
    }

    return <Board />;
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

export default App;
