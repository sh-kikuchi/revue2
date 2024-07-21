<script setup lang="ts">
const props = defineProps({
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
  disabledBool: {
    type: Boolean,
    default: false
  },
  readonlyBool: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: null
  },
  minlength: {
    type: Number,
    default: 0
  },
  rows: {
    type: Number,
    default: 5
  },
  cols: {
    type: Number,
    default: 30
  },
  valueName: {
    type: String,
    default: ''
  },
})
const emit = defineEmits(['update:valueName'])

const updateValue = (event:any) => {
  emit('update:valueName', event.target.value)
}
</script>
<template>
  <textarea
    :id        = "id"
    :class     = "class"
    :name      = "name"
    :value     = "valueName"
    :disabled  = "disabledBool"
    :readonly  = "readonlyBool"
    :maxlength = "maxlength"
    :minlength = "minlength"
    :rows="rows"
    :cols="cols"
    @input="updateValue"
  ></textarea>
</template>
<style scoped>
  textarea{
  padding: 2px;
  background-color: whitesmoke;
  }
  textarea[readonly], textarea[disabled] {
    color: #417bbc;
    background-color: #E2E8E7;
    cursor: not-allowed;
  }
</style>
