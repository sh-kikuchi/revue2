<script setup>
  import { computed } from 'vue';
  
  // props
  const props = defineProps({
    id: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: ''
    },
    style: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    money: {
      type: [String, Number], 
      default: ''
    },
    min: {
      type: [String, Number], 
    },
    max: {
      type: [String, Number], 
    },
    disabledBool: {
      type: Boolean,
      default: false
    },
    readonlyBool: {
      type: Boolean,
      default: false
    },
    commaBool: {
      type: Boolean,
      default: true
    },
  })

  //binding classes
  const bindingClass = computed(() => {
    return `${props.class}`;
  });

  //binding styles
  const bindingStyle = computed(() => {
    return `${props.style}`;
  });

  //emit
  const emit = defineEmits(['update:money'])
  const updateValue = (event) => {
    let returnValue = formatNumberToMoney(event.target.value);
    emit('update:money', returnValue);
  }

  //methods
  const formatNumberToMoney = (targetValue) => {
    let formattedValue =  targetValue;

    if(Number(formattedValue)){
      formattedValue = Number(formattedValue).toLocaleString();
    }

    return formattedValue ? formattedValue.toLocaleString() : formattedValue;
  }
</script>
<template>
    <input type  = "text"
      :id        = "id"
      :class     = "bindingClass"
      :style     = "bindingStyle"
      :name      = "name"
      :value     = "formatNumberToMoney(money)"
      :min       = "min" 
      :max       = "max" 
      :readonly  = "readonlyBool"
      :disabled  = "disabledBool"
      @change    = "updateValue"
    />
</template>
<style scoped>
input{
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid grey;
  background-color: whitesmoke;
  padding: 5px;
}
input[readonly], input[disabled] {
	color: #417bbc;
	background-color: #E2E8E7;
	cursor: not-allowed;
}
/* Chrome, Safari, Edge */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
