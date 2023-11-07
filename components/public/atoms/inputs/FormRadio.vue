<template>
  <div 
    class="flex"
    v-for="(item, index) in items"
  >
    <input
      type      = "radio"
      :id       = "item"
      :class    = "class"
      :name     = "name[index]"
      :value    = "item"
      :disabled = "disabledBool"
      :readonly = "readonlyBool"
      v-model   = "radioBtn"
      @change    = "$emit('update:selectedInput', radioBtn)"
    >
    <label :for="item">{{ item }}</label>
</div>
</template>
<script setup>
const radioBtn = ref();
const props = defineProps({
  items: Array,
  id: {
    type: String,
    default: 'radio'
  },
  class: {
    type: String,
    default: 'red'
  },
  name: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'radio'
  },
  disabledBool: {
    type: Boolean,
    default: false
  },
  readonlyBool: {
    type: Boolean,
    default: false
  },
})
</script>
<style scoped>
.flex{
  display: flex;
}
input{
  display: inline;
  margin-top: 5px;
  margin-right: 5px;
  margin-left: 10px;
  margin-bottom: 5px;
}
label{
  display: inline;
}
input[type= "radio"]{
  transform: scale(1.5);
  margin: 0 15px 0 20px;
}
.red{
  accent-color: red;
}

input[readonly], input[disabled] {
  color: #417bbc;
  background-color: #E2E8E7;
  cursor: not-allowed;
}
</style>
