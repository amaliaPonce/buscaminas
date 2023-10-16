import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: this.initializeBoard(props.rows, props.cols, props.mines),
      gameOver: false,
      gameWon: false,
    };

    this.handleRestartGame = this.handleRestartGame.bind(this);
  }

  initializeBoard(rows, cols, mines) {
    const cells = [];

    for (let row = 0; row < rows; row++) {
      const rowCells = [];
      for (let col = 0; col < cols; col++) {
        const cell = {
          row,
          col,
          open: false,
          hasMine: false,
          neighborMines: 0,
        };
        rowCells.push(cell);
      }
      cells.push(rowCells);
    }

    for (let i = 0; i < mines; i++) {
      let randomRow, randomCol;
      do {
        randomRow = Math.floor(Math.random() * rows);
        randomCol = Math.floor(Math.random() * cols);
      } while (cells[randomRow][randomCol].hasMine);

      cells[randomRow][randomCol].hasMine = true;
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = cells[row][col];
        if (!cell.hasMine) {
          cell.neighborMines = this.countNeighborMines(cells, row, col);
        }
      }
    }

    return cells;
  }

  countNeighborMines(cells, row, col) {
    const numRows = cells.length;
    const numCols = cells[0].length;
    let count = 0;

    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const newRow = row + r;
        const newCol = col + c;

        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
          if (cells[newRow][newCol].hasMine) {
            count++;
          }
        }
      }
    }

    return count;
  }

  handleCellClick(row, col) {
    if (this.state.gameOver || this.state.gameWon) {
      return;
    }

    const cells = [...this.state.cells];
    const currentCell = cells[row][col];

    if (currentCell.open) {
      return;
    }

    if (currentCell.hasMine) {
      cells.forEach(rowCells => {
        rowCells.forEach(cell => {
          if (cell.hasMine) {
            cell.open = true;
          }
        });
      });

      this.setState({ cells, gameOver: true });
    } else {
      currentCell.open = true;
      this.setState({ cells });

      const remainingCells = cells.flat().filter(cell => !cell.open && !cell.hasMine);
      if (remainingCells.length === 0) {
        this.setState({ gameWon: true }); // Marcamos el juego como ganado
      }
    }
  }

  handleRestartGame() {
    const cells = this.initializeBoard(this.props.rows, this.props.cols, this.props.mines);
    this.setState({ cells, gameOver: false, gameWon: false }); // Reiniciamos el estado del juego
  }

  render() {
    return (
      <div className="board">
        {this.state.cells.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                cell={cell}
                onClick={() => this.handleCellClick(cell.row, cell.col)}
              />
            ))}
          </div>
        ))}
        {this.state.gameOver && (
          <div className="game-over">
            <h2>¡Game Over!</h2>
            <button onClick={this.handleRestartGame}>Volver a Jugar</button>
          </div>
        )}
        {this.state.gameWon && (
          <div className="game-over">
            <h2>¡Ganaste!</h2>
            <button onClick={this.handleRestartGame}>Volver a Jugar</button>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
