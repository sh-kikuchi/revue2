<template>
    <input
      type      = "range"
      :id       = "id"
      :class    = "class"
      :name     = "name"
      :style    = "bindStyle"
      :min      = "min"
      :max      = "max"
      :step     = "step"
      :readonly = "readonlyBool"
      :disabled = "disabledBool"
      v-model   = "rangeValue"
      @change   = "$emit('update:RangeValue', rangeValue)"
    >
</template>
<script setup>
const rangeValue = ref(0);
const props = defineProps({
  initValue: {
    type: Number,
    default: 0
  },
  id: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  disabledBool: {
    type: Boolean,
    default: false
  },
  readonlyBool: {
    type: Boolean,
    default: false
  },
  min: {
    type: String,
    default: '0'
  },
  max: {
    type: String,
    default: '100'
  },
  step: {
    type: String,
    default: '10'
  },
  width: {
    type: String,
    default: '300'
  },
  height: {
    type: String,
    default: '30'
  },
  bgColor: {
    type: String,
    default: 'red'
  },
})
const bindStyle = computed(() => {
  return `width            : ${props.width}px; 
          height           : ${props.height}px;
          background-color : ${props.bgColor}`
});
</script>
<style scoped>
  input[type=range] {
    -webkit-appearance:none;
    background: lightgrey;
    height:24px;
    width:240px;
    border-radius:8px;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: black;
    width: 24px; 
    height: 24px; 
    border-radius: 50%; 
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  }
  input[type=range]::-moz-range-thumb {
    background: black;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
    border: none;
  }


</style>
