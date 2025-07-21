import React, { useState } from 'react';
import Board from './components/Board';
import Confetti from './components/Confetti';

// Helper function to determine the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],             // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo ? winnerInfo.winner : null;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center font-sans p-4 relative overflow-hidden">
      {/* This is where the confetti is conditionally rendered */}
      {winner && <Confetti />}
      
      <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-white/10 relative z-20">
        <h1 className="text-4xl font-bold text-white text-center mb-6">Tic-Tac-Toe</h1>
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay} 
          winnerInfo={winnerInfo}
        />
        <div className="mt-6 text-center">
          <button 
            onClick={handleRestart}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Restart Game
          </button>
        </div>
      </div>
       <p className="text-center text-gray-500 mt-8 text-sm relative z-20">Built by Harsh</p>
    </div>
  );
}