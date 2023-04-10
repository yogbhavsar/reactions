import { useState } from 'react';
import './App.css';
import Cell, { BaseCellProps, CellProps } from './components/Cell';
import { getCellProps, validInColumn, validInRow, validInSquare } from './helpers/helper'

function App() {

  function setCurrentCell(baseCellProps: BaseCellProps) {
    currentCell = baseCellProps;
  }

  function validateCell(cells: CellProps[][], cellProps: CellProps, rowIndex: number, columnIndex: number, value: number): CellProps {
    if (cellProps.rowIndex !== rowIndex || cellProps.columnIndex !== columnIndex)
      return cellProps;
    cellProps.isValid = validInRow(cells, rowIndex, value)
      && validInColumn(cells, columnIndex, value)
      && validInSquare(cells, rowIndex, columnIndex, value);
    cellProps.value = value;
    return cellProps!;
  }

  function onCellValueChange(rowIndex: number, columnIndex: number, value: number): void {
    console.log('in cell value changed');
    var newCells = cells.map((row) => {
      return row.map((cell) => validateCell(cells, cell, rowIndex, columnIndex, value))
    });
    setCells(newCells);
    setIsComplete(newCells.every(row => row.every(c => c.value !== 0 && c.isValid)));
  }

  function onValueChange(value: number) {
    var newCells = cells.map((row) => {
      return row.map((cell) => validateCell(cells, cell, currentCell.rowIndex, currentCell.columnIndex, value))
    });
    setCells(newCells);
    setIsComplete(newCells.every(row => row.every(c => c.value !== 0 && c.isValid)));
  }

  var initValues = [
    0, 0, 3, 0, 5, 0, 4, 0, 0,
    0, 0, 0, 0, 0, 0, 6, 0, 3,
    0, 4, 0, 0, 1, 0, 0, 9, 0,
    0, 0, 9, 0, 0, 2, 0, 6, 8,
    0, 3, 0, 0, 0, 6, 0, 0, 0,
    0, 7, 0, 0, 0, 8, 0, 5, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 0, 0, 5, 0, 4, 0,
    0, 9, 0, 0, 7, 0, 0, 8, 0
  ]

  let initCells: CellProps[][] = getCellProps(initValues);

  const [cells, setCells] = useState(initCells);
  const [isComplete, setIsComplete] = useState(false);
  let currentCell: BaseCellProps = { rowIndex: 0, columnIndex: 0, value: cells[0][0].value };

  return (
    <div className="App">
      <header className="App-header">
        Sudoku
      </header>
      <div className="gridContainer">
        {
          cells.map((row, rowIndex) => {
            return row.map((cell, columnIndex) =>
              <Cell {...cell} key={`${rowIndex}${columnIndex}`}
                onValueChange={onCellValueChange}
                onFocus={setCurrentCell}
                onValueChangeV2={onValueChange}></Cell>)
          })
        }
      </div>
      {isComplete && <h1>Congrats! Hit Reload to launch the new game</h1>}
    </div>
  );
}

export default App;
