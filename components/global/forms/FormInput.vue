<template>
    <input
      :id    = "id"
      :class = "class"
      :name  = "name"
      :value = "valueName"
      :type  = "type"
      :readonly = "readonlyBool"
      :disabled = "disabledBool"
      @change="$emit('update:valueName', valueName)"
    >
</template>
<script setup>
const props = defineProps({
  valueName: {
    type: String,
    default: ''
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
})
</script>
<style scoped>
input[type="text"]{
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
