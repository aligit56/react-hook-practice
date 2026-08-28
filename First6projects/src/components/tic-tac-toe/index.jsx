import { useState } from 'react'
import './styles.css'

function Square({ value, onClick, isWinning }) {
  return (
    <button type="button" onClick={onClick} disabled={Boolean(value)} className={`square ${isWinning ? 'winning' : ''}`} aria-label={`Cell ${value || 'empty'}`}>
      {value}
    </button>
  )
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)

  function getWinningLine(board) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    return winningPatterns.find(([first, second, third]) => (
      board[first] && board[first] === board[second] && board[first] === board[third]
    )) || []
  }

  const winningLine = getWinningLine(squares)
  const winner = winningLine.length ? squares[winningLine[0]] : null
  const isDraw = !winner && squares.every(Boolean)
  const status = winner ? `Player ${winner} wins` : isDraw ? 'A beautiful draw' : `Player ${isXTurn ? 'X' : 'O'} to move`

  function handleClick(getCurrentSquare) {
    if (winner || squares[getCurrentSquare]) return
    const nextSquares = [...squares]
    nextSquares[getCurrentSquare] = isXTurn ? 'X' : 'O'
    setIsXTurn((current) => !current)
    setSquares(nextSquares)
  }

  function handleRestart() {
    setIsXTurn(true)
    setSquares(Array(9).fill(null))
  }

  return (
    <div className="tic-tac-toe-container">
      <header className="game-header">
        <p className="eyebrow"><span className="eyebrow-mark" /> GAME NIGHT / 01</p>
        <p className="turn-count">{squares.filter(Boolean).length} / 9 MOVES</p>
      </header>
      <section className="game-content">
        <div className="game-intro">
          <p className="section-label">TIC TAC TOE</p>
          <h1>Make your<br /><em>mark.</em></h1>
          <p className="game-description">Two players. One grid. A little strategy goes a long way.</p>
        </div>
        <div className="board-area">
          <p className={`status ${winner ? 'winner' : ''}`}>{status}</p>
          <div className="board" role="grid" aria-label="Tic-Tac-Toe board">
            {squares.map((value, index) => <Square key={index} value={value} isWinning={winningLine.includes(index)} onClick={() => handleClick(index)} />)}
          </div>
          <button type="button" className="restart-button" onClick={handleRestart}>Restart game <span aria-hidden="true">↗</span></button>
        </div>
      </section>
      <footer className="game-footer"><span>REACT HOOK PRACTICE</span><span>PLAY WITH INTENTION</span>
      </footer>
    </div>
  )
}