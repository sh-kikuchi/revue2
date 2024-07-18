<script setup>
  import { ref, computed } from 'vue';
  const selectedItem = ref<String>('A');

  const props = defineProps({
    items: Array,
    id: {
      type: String,
      default: 'radio'
    },
    class: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    initText: {
      type: String,
      default: '選択してください'
    },
    selectedItem: {
      type: String,
      default: 'A'
    },
    options:{
      type: Array,
      default:[
        { text: 'One',   value: 'A' },
        { text: 'Two',   value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  })

  //binding classes
  const bindingClass = computed(() => {
    return `${props.class}`;
  });

  //emit
  const emit = defineEmits(['update:selectedItem'])
  const updateValue = (event) => {
    emit('update:selectedItem', selectedItem.value = event.target.value)
  }
</script>
<template>
  <div class="select-area cp_sl01">
    <select
      :id     ="id"
      :class  ="bindingClass"  
      :name   ="name"
      v-model ="selectedItem" 
      @change = "updateValue"
    >
      <option disabled :value="initText">{{ initText }}</option>
      <option 
        v-for="option in options" 
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<style scoped>
  .select-area {
    display: inline;
    margin: 10px 0;
    text-align: left;
  }
  .select-area select {
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;

  }
  .select-area select::-ms-expand {
      display: none;
  }
  .select-area.cp_sl01 {
    position: relative;
    border-radius: 2px;
    border: 2px solid whitesmoke;
    border-radius: 5px;
    background: whitesmoke;
  }

</style>
