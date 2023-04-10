import React, { useState } from "react";

export interface CellProps {
    rowIndex: number;
    columnIndex: number;
    value: number;
    disabled: boolean;
    isValid: boolean;
    onValueChange: (rowIndex: number, columnIndex: number, value: number) => void
}

export default function Cell(props: CellProps) {
    const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const [numberText, setNumberText] = useState(props.value === 0 ? "" : props.value.toString());

    function getClassName() {
        if (props.disabled) return "cell disabled";
        return props.isValid ? "cell valid" : "cell invalid";
    }

    function onNumberTextChange(event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, columnIndex: number) {
        console.log(`event target value: ${event.target.value}`);
            setNumberText(event.target.value);
        if (validKeys.some(k => event.target.value === k) && props.onValueChange) {
            event.preventDefault();
            event.stopPropagation();
            if (props.onValueChange) {
                const value = parseInt(event.target.value);
                console.log(`value to pass: ${value}`);
                props.onValueChange(rowIndex, columnIndex, value);
            }
        }
    }

    return (
        <input type="text" disabled={props.disabled}
            className={getClassName()}
            value={numberText}
            onChange={e => onNumberTextChange(e, props.rowIndex, props.columnIndex)}
        maxLength={1}></input>
    )
}