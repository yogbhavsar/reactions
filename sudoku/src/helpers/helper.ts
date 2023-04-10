import { CellProps } from "../components/Cell";

const handyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export function getCellProps(initValues: number[]): CellProps[][] {
    let initCells: CellProps[][] = [];
    var rowCounter = 0, columnCounter = 0;
    let rowArray: CellProps[] = [];
    for (var counter = 0; counter < 81; counter++) {
        rowArray.push({
            rowIndex: rowCounter,
            columnIndex: columnCounter,
            value: initValues[counter],
            disabled: initValues[counter] !== 0,
            isValid: false
        } as CellProps);
        if (columnCounter === 8) {
            columnCounter = 0;
            initCells[rowCounter] = rowArray;
            rowCounter++;
            rowArray = [];
        }
        else {
            columnCounter++;
        }
    }
    console.log(initCells);
    return initCells;
}

export function validInRow(cells: CellProps[][], rowIndex: number, value: number): boolean {
    return cells[rowIndex].every(n => n.value !== value);
}

export function validInColumn(cells: CellProps[][], columnIndex: number, value: number): boolean {
    return handyArray.every(row => cells[row][columnIndex].value !== value)
}

export function validInSquare(cells: CellProps[][], rowIndex: number, columnIndex: number, value: number): boolean {
    const startingRow = getStartingRowOrColumn(rowIndex);
    const startingColumn = getStartingRowOrColumn(columnIndex);
    console.log(`startingRow: ${startingRow}, startingColumn: ${startingColumn}`);
    for (var rowCounter = startingRow; rowCounter < startingRow + 3; rowCounter++) {
        for (var columnCounter = startingColumn; columnCounter < startingColumn + 3; columnCounter++) {
            console.log(`number to consider: ${cells[rowCounter][columnCounter].value}`);
            if (cells[rowCounter][columnCounter].value === value) {
                return false;
            }
        }
    }
    return true;
}

function getStartingRowOrColumn(index: number) {
    const remainder = index % 3;
    let startingIndex;
    if (remainder === 0)
        startingIndex = index;
    else if (remainder === 1)
        startingIndex = index - 1;
    else
        startingIndex = index - 2;
    return startingIndex;
}
