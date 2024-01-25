<script lang="ts">
import {getCellProps, isCellValid } from '../helpers/helper';
import Cell from './Cell.vue';

const initCells: number[] = [
    0, 0, 3, 0, 5, 0, 4, 0, 0,
    0, 0, 0, 0, 0, 0, 6, 0, 3,
    0, 4, 0, 0, 1, 0, 0, 9, 0,
    0, 0, 9, 0, 0, 2, 0, 6, 8,
    0, 3, 0, 0, 0, 6, 0, 0, 0,
    0, 7, 0, 0, 0, 8, 0, 5, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 0, 0, 5, 0, 4, 0,
    0, 9, 0, 0, 7, 0, 0, 8, 0
];
export default {
    data() {
        return {
            initCells: [
                0, 0, 3, 0, 5, 0, 4, 0, 0,
                0, 0, 0, 0, 0, 0, 6, 0, 3,
                0, 4, 0, 0, 1, 0, 0, 9, 0,
                0, 0, 9, 0, 0, 2, 0, 6, 8,
                0, 3, 0, 0, 0, 6, 0, 0, 0,
                0, 7, 0, 0, 0, 8, 0, 5, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0,
                2, 0, 0, 0, 0, 5, 0, 4, 0,
                0, 9, 0, 0, 7, 0, 0, 8, 0
            ],
            cells: getCellProps(initCells)
        };
    },
    components: { Cell },
    methods: {
        getRowIndex: function(cellCounter: number){
            if(cellCounter === 0) return 0;
            return Math.floor(cellCounter / 9);
        },
        getColumnIndex: function(cellCounter: number){
            if(cellCounter === 0) return 0;
            return cellCounter % 9;
        },
        onCellValueChanged: function(rowIndex: number, columnIndex: number, value: number){
            //console.log('onCellValueChanged');
            const cellCounter = rowIndex * 9 + columnIndex;
            //console.log(`cell value changed. cellCounter = ${cellCounter}, value = ${value}`);
            this.initCells[cellCounter] = value;
            this.cells = getCellProps(this.initCells);
        },
        isValid: function(rowIndex: number, columnIndex: number, value: number): boolean{
            //console.log(`isValid. rowIndex: ${rowIndex}, columnIndex: ${columnIndex}, value=${value}`);
            return isCellValid(initCells, rowIndex, columnIndex, value);
        }
    }
}
</script>
<template>
    <component v-for="(row, rowi) in cells" :key="rowi">
        <Cell v-for="({rowIndex, columnIndex, value, isDisabled, isValid}, cellCounter) in row" 
            :key="rowi * 9 + cellCounter"
            :rowIndex="rowIndex" 
            :columnIndex="columnIndex"
            :value="value"
            :isDisabled="isDisabled"
            :isValid="isValid"
            :onValueChanged="onCellValueChanged"
            ></Cell>
    </component> 
</template>