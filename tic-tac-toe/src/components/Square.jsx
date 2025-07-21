import React from 'react';

function Square({ value, onSquareClick, isWinning }) {
  const textColor = value === 'X' ? 'text-blue-500' : 'text-pink-500';
  const winningClass = isWinning ? 'bg-green-500/30' : 'bg-gray-800/50';

  return (
    <button
      className={`flex items-center justify-center w-24 h-24 m-1 rounded-lg shadow-lg transition-transform transform hover:scale-[1.03] active:scale-95 ${winningClass}`}
      onClick={onSquareClick}
    >
      <span className={`text-5xl font-bold ${textColor}`}>{value}</span>
    </button>
  );
}

export default Square;