<script setup lang="ts">
 import { ref, computed } from 'vue';

  //reactive data
  const selectedItem = ref<String>('');

  //props
  const props = defineProps({
    items: Array<string>,
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
    accentColor: {
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
  })

  //binding classes
  const bindingClass = computed(() => {
    return `${props.class}`;
  });

  //binding styles
  const bindingStyle = computed(() => {
    return `accent-color: ${props.accentColor}`;
  });

  //emit
  const emit = defineEmits(['update:radio'])
  const updateValue = (event: any) => {
    emit('update:radio', selectedItem.value = event.target.value)
  }

</script>
<template>
  <div 
    class="flex"
    v-for="(item, index) in items"
  >
    <input type = "radio"
      :id       = "item"
      :class    = "bindingClass"
      :style    = "bindingStyle" 
      :name     = "name[index]"
      :value    = "item"
      :disabled = "disabledBool"
      :readonly = "readonlyBool"
      v-model   = "selectedItem"
      @change   = "updateValue"
    >
    <label :for="item">{{ item }}</label>
  </div>
</template>
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
    transform: scale(1.2);
    margin: 0 10px 0 0;
  }
  input[readonly], input[disabled] {
    color: #417bbc;
    background-color: #E2E8E7;
    cursor: not-allowed;
  }
</style>
