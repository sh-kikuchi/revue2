<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';

  //reactive data
  const isChecked = ref<boolean>(false);
  const checkedItem = ref<string>('');
  
  //props
  const props = defineProps({
    item: String,
    id: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: 'red'
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'neko'
    },
    type: {
      type: String,
      default: 'text'
    },
    accentColor: {
      type: String,
      default: ''
    },
    isChecked : {
      type: Boolean,
      default: false
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
  const emit = defineEmits(['update:checked'])
  const updateValue = (event:any) => {
    isChecked.value ? isChecked.value = false :  isChecked.value = true;
    emit('update:checked', isChecked.value ? checkedItem.value= event.target.value : '')
  }

  // mouted
  onMounted(() => {
    isChecked.value = props.isChecked;

    emit('update:checked', isChecked.value ?  props.item : '')
  });

</script>
<template>
  <div class="flex">
    <input type  = "checkbox"
      :id        = "id"
      :class     = "bindingClass"
      :style     = "bindingStyle" 
      :name      = "name"
      :value     = "item"
      :disabled  = "disabledBool"
      :readonly  = "readonlyBool"
      v-model    = "isChecked"
      @input     = "updateValue"
    ><label>{{ label }}</label>
  </div>
</template>
<style scoped>
  .flex{
    display: flex;
  }
  label{
    display: inline;
  }
  input{
  border-bottom: 1px solid grey;
  background-color: whitesmoke;
  padding: 5px;
  }
  input[readonly], input[disabled] {
  color: #417bbc;
  background-color: #E2E8E7;
  cursor: not-allowed;
  }
  input[type= "checkbox"]{
    transform: scale(1.2);
    margin: 0 10px 0 0;
  }
  .red{
    accent-color: red;
  }
</style>
