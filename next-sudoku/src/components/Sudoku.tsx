import { useState, useEffect } from "react"
import SudokuService from "../services/sudokuService"
import { DifficultyLevels } from "./DifficultyLevels"
import type { CellProps } from "./CellProps";
import { Cell } from "./Cell";

export function Sudoku() {
    const sudokuService = new SudokuService()
    const [difficultyLevel, setDifficultyLevel] = useState(DifficultyLevels.Easy);
    const [puzzle, setPuzzle] = useState<CellProps[][]>([]);

    useEffect(() => {
            async function setInitialPuzzle(){
                setPuzzle(await sudokuService.getNewPuzzle(DifficultyLevels.Easy));
            }
            setInitialPuzzle();
        });

    const onDifficultyLevelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDifficultyLevel(e.target.value as DifficultyLevels);
        const newPuzzle = await sudokuService.getNewPuzzle(e.target.value as DifficultyLevels)
        setPuzzle(newPuzzle);
    }

    const handleValueChange = (rowIndex: number, colIndex: number, newValue: number | null) => {
        const updatedPuzzle = puzzle.map((row, rIndex) =>
            row.map((cell, cIndex) => {
                if (rIndex === rowIndex && cIndex === colIndex) {
                    return { ...cell, value: newValue };
                }
                return cell;
            })
        );
        updatedPuzzle[rowIndex]![colIndex]!.isValid = true; // reset validity before validation
        if(newValue == null) {
            //No need to check for validity of null value
            setPuzzle(updatedPuzzle);
        }
        if (!sudokuService.isInputValid(puzzle, rowIndex, colIndex, newValue)) {
            console.log(
            `Value ${newValue} is not valid in row ${rowIndex}, column ${colIndex}, box (${Math.floor(rowIndex / 3)}, ${Math.floor(colIndex / 3)})`,
            )
            updatedPuzzle[rowIndex]![colIndex]!.isValid = false
        }
        updatedPuzzle[rowIndex]![colIndex]!.value = newValue
        setPuzzle(updatedPuzzle)
        if (sudokuService.isPuzzleComplete(puzzle)) {
            alert('Congratulations! You have completed the puzzle!')
        }
    }

    return (
        <>
            <p>
            You know the basic Sudoku. If you see <span style={{ color: "red" }}>red</span> numbers, they are
            invalid. If you see <span style={{ color: "white" }}>white</span> numbers, they are valid.
            <span style={{ color: "var(--color-text)" }}>Default</span> numbers cannot be changed.
            </p>
            <br />
            <label htmlFor="difficulty">Difficulty Level: </label>
            <select
                id="difficulty"
                value={difficultyLevel}
                onChange={(e) => onDifficultyLevelChange(e)}
                className="difficulty-levels"
                title="This doesn't generate new puzzles as per the difficulty level. Keeping 'difficulty' here for demo purpose"
            >
                { Object.values(DifficultyLevels).map((difficulty) => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                )) }
            </select>
            <br />
            <br />
            <div className="sudoku">
                { puzzle.map((row, rowIndex) => 
                        
                            row.map((cell, cellIndex) => (
                            <Cell 
                                key={Math.random()} 
                                value={cell.value} 
                                cellKey={rowIndex + '-' + cellIndex} 
                                isValid={cell.isValid} 
                                isDefault={cell.isDefault} 
                                rowIndex={cell.rowIndex} 
                                colIndex={cell.colIndex} 
                                handleValueChange={handleValueChange}
                            />
                        ))
                    )
                }
            </div>
        </>
    )
}