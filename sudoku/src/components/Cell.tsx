import React, { useState } from "react";

export interface BaseCellProps {
    rowIndex: number;
    columnIndex: number;
    value: number;
}

export interface CellProps extends BaseCellProps {
    disabled: boolean;
    isValid: boolean;
    onValueChange: (value: number) => void;
    onFocus: (cellProps: BaseCellProps) => void;
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
                props.onValueChange(value);
            }
        }
    }

    function onFocusEvent(event: React.FocusEvent<HTMLInputElement>) {
        props.onFocus({ rowIndex: props.rowIndex, columnIndex: props.columnIndex, value: props.value });
    }

    return (
        <input type="text" disabled={props.disabled}
            className={getClassName()}
            value={numberText}
            onChange={e => onNumberTextChange(e, props.rowIndex, props.columnIndex)}
            maxLength={1}
            onFocus={onFocusEvent}></input>
    )
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   