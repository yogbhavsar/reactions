import type { CellProps } from "@/components/models/cell-props";

export function getCellProps(initValues: number[]): CellProps[][] {
    const initCells: CellProps[][] = [];
    let rowCounter = 0, columnCounter = 0;
    let rowArray: CellProps[] = [];
    for (let counter = 0; counter < 81; counter++) {
        const cellProp = {
            rowIndex: rowCounter,
            columnIndex: columnCounter,
            value: initValues[counter],
            isDisabled: initValues[counter] !== 0,
            isValid: false
        } as CellProps;
        rowArray.push(cellProp);
        //console.log(`cellProp: ${cellProp}`);
        if (columnCounter === 8) {
            columnCounter = 0;
            initCells[rowCounter] = rowArray;
            console.log(`rowArray: ${rowArray}`);
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

export function isCellValid(cells: number[], rowIndex: number, columnIndex: number, value: number): boolean{
    return value !== 0 
        && validInRow(cells, rowIndex, value)
        && validInColumn(cells, columnIndex, value);
}

function validInRow(cells: number[], rowIndex: number, value: number): boolean {
    return cells.slice(rowIndex, 9).every(n => n !== value);
}

function validInColumn(cells: number[], columnIndex: number, value: number){
    const columnArray: number[] = [];
    const handyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    handyArray.forEach((element, index) => {
        let cellIndex = index * 9 + columnIndex;
        if(cellIndex > 72) cellIndex = 72;
        columnArray.push(cells[cellIndex]);
    });
    console.log(`columnArray = ${columnArray}`);
    return columnArray.every(n => n !== value);
}