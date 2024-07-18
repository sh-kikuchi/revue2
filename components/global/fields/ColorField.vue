<script setup lang="ts">
  import { ref, computed } from 'vue';

  //reactive data
  const selectedColor = ref<string>('#ffffff');

//props
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

//binding classes
const bindingClass = computed(() => {
  return `${props.class}`;
});

//emit
const emit = defineEmits(['update:selectedColor'])
const setSelectedColor = (event:any) => {
  emit('update:selectedColor', event.target.value)
}

</script>
<template>
  <input type ="color"
    :id       ="id"
    :class    ="bindingClass"  
    :name     ="name"
    v-model   ="selectedColor" 
    @change   = "setSelectedColor"
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
