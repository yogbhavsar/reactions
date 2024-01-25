<script lang="ts">
export default {
    props: {
        rowIndex: Number,
        columnIndex: Number,
        value: Number,
        isDisabled: Boolean,
        isValid: Boolean
    },
    data() {
        return {
            stringValue: this.$props.value === 0 ? "" : this.$props.value!.toString()
        }
    },
    methods: {
        onValueChange: function(e: Event){
            var element = e.target as HTMLInputElement;
            if(!element.value){
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            const numberValue = parseInt(element.value);
            if(isNaN(numberValue)){
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if(numberValue !== 0) {
                this.stringValue = numberValue.toString();
                this.$emit('valueChanged', this.rowIndex, this.columnIndex, numberValue);
            }
            else {
                e.preventDefault();
                e.stopPropagation();
            }
        },
        onFocus: function(e: Event){
            const element = e.target as HTMLInputElement;
            if(element.value === "0"){
                element.value = "";
            }
        },
        getClassName: function(){
            //console.log(`getClassName. isValid = ${this.isValid}`);
            if(this.isDisabled) return "cell disabled";
            return this.isValid ? "cell valid" : "cell invalid";
        }
    },
    emits: ['valueChanged']
}
</script>
<template>
    <input type="text" :disabled="isDisabled" @input="onValueChange" :value="stringValue"
    maxlength="1" :className="getClassName()" />
</template>