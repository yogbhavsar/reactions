export interface CellProps {
  cellKey: string //To erase the last state of the cell after reset, ensure this is unique always
  value: number | null
  isValid: boolean
  isDefault: boolean
  rowIndex: number
  colIndex: number
  handleValueChange: (rowIndex: number, colIndex: number, newValue: number | null) => void
}
