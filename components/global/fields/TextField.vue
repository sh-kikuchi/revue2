<script setup>
import { computed } from 'vue';

  //props
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
    bindingValue: {
      type: String,
      default: ''
    },
    minlength: {
      type: [String, Number], 
    },
    maxlength: {
      type: [String, Number], 
    },
    disabledBool: {
      type: Boolean,
      default: false
    },
    readonlyBool: {
      type: Boolean,
      default: false
    }
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
  const emit = defineEmits(['update:bindingValue'])
  const updateValue = (event) => {
    emit('update:bindingValue', event.target.value)
  }
</script>

<template>
  <input type  = "text"
    :id        = "id"
    :class     = "bindingClass"
    :style     = "bindingStyle"
    :name      = "name"
    :value     = "bindingValue"
    :minlength = "minlength" 
    :maxlength = "maxlength" 
    :readonly  = "readonlyBool"
    :disabled  = "disabledBool"
    @change    = "updateValue"
  >
</template>

<style scoped>
  input[type="text"]{
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
</style>
