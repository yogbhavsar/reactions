import { useState } from "react";
import type { CellProps } from "./CellProps";

export function Cell(props: CellProps) {
  const [localValue, setLocalValue] = useState(props.value);
  const borderedIndices: Array<number> = [2,5,8];
  const getClassName = () => {
    let className = "cell";
    if (!props.isDefault && !props.isValid) {
      className += " cell--invalid";
    }
    if (borderedIndices.includes(props.colIndex)) {
      className += " cell--extra-right-border";
    }
    if (borderedIndices.includes(props.rowIndex)) {
      className += " cell--extra-bottom-border";
    }
    if(props.rowIndex === 0) {
      className += " cell--extra-top-border";
    }
    if(props.colIndex === 0) {
      className += " cell--extra-left-border";
    }
    return className;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '') {
      setLocalValue(null);
      props.handleValueChange(props.rowIndex, props.colIndex, null);
    } else if (isNaN(Number(newValue)) || Number(newValue) < 1 || Number(newValue) > 9) {
      //ignore
    } else {
      setLocalValue(Number(newValue));
      props.handleValueChange(props.rowIndex, props.colIndex, Number(newValue));
    }
  }

  return (
    <>
    { props.isDefault && (
      <div className={getClassName()}>
      { props.value }
      </div>
      )
    }
    { !props.isDefault && (
      <input
        type="text"
        value={localValue == null ? '' : localValue.toString()}
        onChange={handleInputChange}
        className={"cell-input " + getClassName()}
        maxLength="1"
      />
    )}
    </>
  )
}