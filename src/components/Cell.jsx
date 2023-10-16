import React from 'react';

const Cell = ({ cell, onClick }) => {
  const cellContent = cell.open ? (cell.hasMine ? '💥' : cell.neighborMines) : '';

  return (
    <div
      className={`cell ${cell.open ? 'open' : ''} ${cell.hasMine ? 'mine' : ''}`}
      onClick={() => onClick(cell.row, cell.col)}
    >
      {cellContent}
    </div>
  );
};

export default Cell;
