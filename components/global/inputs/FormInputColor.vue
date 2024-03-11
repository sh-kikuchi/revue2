<script setup>
const selectedColor = ref('#ffffff');
const props = defineProps({
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
  selectedColor: {
    type: String,
    default: '#ffffff'
  },
})
</script>
<template>
  <input
    type="color"
    :id ="id"
    :class="class"  
    :name="name"
    v-model="selectedColor" 
    @change = "$emit('update:selectedColor', selectedColor)"
    list
  />
</template>
<style scoped>
input[type='color']{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 75px;
  height: 50px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
input[type='color']::-webkit-color-swatch{
 border-radius: 50%;
 border: none;
}
</style>
