import { useState } from "react";
function App() {
    function Square({ value, onSquareClick, backgroundColor}) {
        return (
            <button 
                className="square" 
                onClick={onSquareClick}
                style={{
                    backgroundColor:backgroundColor
                }}
            >
                {value}
            </button>
        );
    }

    function Board({ xIsNext, squares, onPlay }) {
        const handleClick = (i) => {
            if (squares[i] || calculateWinner(squares)) 
                return;
            const nextSquares = [...squares];
            nextSquares[i] = xIsNext ? "X" : "O";
            onPlay(nextSquares, i);
        };

        const winner = calculateWinner(squares);
        let status = winner
            ? `Winner: ${xIsNext ? "O" : "X"}`
            : `Next player: ${xIsNext ? "X" : "O"}`;
        if( winner == 'draw' ) 
            status = 'Draw !'

        const squaresArr = squares.map((square, i) => {
            return (
                <Square 
                    value={square} 
                    onSquareClick={() => handleClick(i)} 
                    key={i}
                    backgroundColor = {winner && winner.includes(i) && '#ffb900'}
                />
            );
        });

        const boardRowArr = Array(3)
            .fill(null)
            .map((item, i) => {
                return (
                    <div className="board-row" key={'row-'+(i+1)}>
                        {squaresArr.slice(i * 3, i * 3 + 3)}
                    </div>
                );
            });

        return (
            <div>
                <div className="status">{status}</div>
                {boardRowArr}
            </div>
        );
    }

    function Game() {
        const [history, setHistory] = useState([Array(9).fill(null)]);
        const [currentMove, setCurrentMove] = useState(0);
        const [isAsc, setIsAsc] = useState(true); 
        const [locations, setLocations]  = useState([NaN]); 
        const currentSquares = history[currentMove];
        const xIsNext = currentMove % 2 === 0;

        function handlePlay(nextSquares, cellIndex) {
            const nextHistory = [
                ...history.slice(0, currentMove + 1),
                nextSquares,
            ];
            setLocations([...locations.slice(0, currentMove+1), cellIndex])
            setHistory(nextHistory);
            setCurrentMove(nextHistory.length - 1);
        }

        function jumpTo(nextMove) {
            setCurrentMove(nextMove);
        }

        function handleShortMoves() { 
            setIsAsc(!isAsc); 
        }

        const moves = history.map((square, move) => {
            
            let description;
            let stringLocation =  `(${parseInt(locations[move]/3)+1}, ${parseInt(locations[move]%3)+1})`; 
            if (move === 0) description = "Start game";
            else if (move === currentMove)
                description = `You are at move #${currentMove} ` + stringLocation;
            else description = `Go to move #${move} `+ stringLocation;
            
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        xIsNext={xIsNext}
                        squares={currentSquares}
                        onPlay={handlePlay}
                    />
                </div>
                <div className="game-info">
                    <button
                        onClick={handleShortMoves}
                    > {'sort moves'} </button>
                    <ol>{isAsc ? moves : [...moves].reverse()} </ol>
                </div>

            </div>
        );
    }

    return <Game />;
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
            return lines[i];
        }
    }
    var isDraw = squares.every((ele) => ele)
    if(isDraw) 
        return 'draw'; 

    return null;
}

export default App;
