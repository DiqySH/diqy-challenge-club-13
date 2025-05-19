import { useState } from "react";

function Square({ value, onSquareClick }) {
    function X() {
        return (
            <img src="/src/assets/x.svg" alt="" />
        )
    }
    function Y() {
        return (
            <img src="/src/assets/o.svg" alt="" />
        )
    }
    let content = null;
    if (value === "X") {
        content = <X />;
    }
    else if (value === "O") {
        content = <Y />;
    }
    return <button className='square w-20 h-20 border-1 border-solid border-[#CDCDCD] grid place-items-center cursor-pointer' onClick={onSquareClick}>{content}</button>
}

function Board() {
    function X() {
        return (
            <img src="/src/assets/x.svg" alt="" className="max-w-10"/>
        )
    }
    function Y() {
        return (
            <img src="/src/assets/o.svg" alt="" className="max-w-10"/>
        )
    }
    const [xIsNext, setXIsNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null));
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        const nextSquares = squares.slice()
        if (xIsNext) {
            nextSquares[i] = "X"
        } else {
            nextSquares[i] = "O"
        }
        setSquares(nextSquares)
        setXIsNext(!xIsNext)
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = (
        <div className="status border-2 border-solid border-[#30BDD1] min-w-[230px] p-5 rounded-full grid place-items-center bg-white font-semibold status h-20">
            <p className="flex gap-4 justify-center items-center">{winner === "X" ? <X /> : <Y />} Wins!</p>
        </div>
        )
    } else {
        status = (
        <div className="status border-2 border-solid border-[#30BDD1] min-w-[230px] p-5 rounded-full grid place-items-center bg-white font-semibold status h-20">
            <p className="flex gap-4 justify-center items-center">{xIsNext ? <X /> : <Y />} Next</p>
        </div>)
    }
  return (
    <>
        <div className="game-board w-fit p-2.5 rounded-[1rem]" style={{boxShadow: "0px 10px 20px 0px #0000001A"}}>
            <div className="board-row flex">
                <Square value={squares[0]} onSquareClick={() => {handleClick(0)}}/>
                <Square value={squares[1]} onSquareClick={() => {handleClick(1)}}/>
                <Square value={squares[2]} onSquareClick={() => {handleClick(2)}}/>
            </div>
            <div className="board-row flex">
                <Square value={squares[3]} onSquareClick={() => {handleClick(3)}}/>
                <Square value={squares[4]} onSquareClick={() => {handleClick(4)}}/>
                <Square value={squares[5]} onSquareClick={() => {handleClick(5)}}/>
            </div>
            <div className="board-row flex">
                <Square value={squares[6]} onSquareClick={() => {handleClick(6)}}/>
                <Square value={squares[7]} onSquareClick={() => {handleClick(7)}}/>
                <Square value={squares[8]} onSquareClick={() => {handleClick(8)}}/>
            </div>
        </div>
        {status}
    </>
  )
}

export default function Game() {
    return (
        <div className="game grid place-items-center gap-10">
                <Board/>
        </div>
    )
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
        [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}