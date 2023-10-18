<template>
    <input
      type      = "number"
      :id       = "id"
      :class    = "class"
      :name     = "name"
      :style    = "bindStyle"
      :readonly = "readonlyBool"
      :disabled = "disabledBool"
      v-model   = "number"
      @change   = "$emit('update:Number', number)"
    >
</template>
<script setup>
const number = ref(0);
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
  width: {
    type: String,
    default: '300'
  },
  height: {
    type: String,
    default: '30'
  },
})
const bindStyle = computed(() => {
  return `width            : ${props.width}px; 
          height           : ${props.height}px;
        `
});
</script>
<style scoped>
input[type="number"]{
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
