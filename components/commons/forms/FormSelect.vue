<template>
  <div class="select-area cp_sl01">
    <select
      :id ="id"
      :class="class"  
      :name="selectName"
      v-model="selectedItem" 
      @change = "$emit('update:selectedItem', selectedItem)"
    >
      <option disabled :value="init">{{ initText }}</option>
      <option 
        v-for="option in options" 
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<script setup>
const selectedItem = ref('A')
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
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
</script>
<style scoped>
.select-area {
  overflow: hidden;
  width: 300px;
  margin: 10px 0;
  text-align: center;
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
.select-area.cp_sl01::before {
  position: absolute;
  top: 0.8em;
  right: 0.8em;
  width: 0;
  height: 0;
  padding: 0;
  content: '';
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid black;
  pointer-events: none;
}
.select-area.cp_sl01 select {
  padding: 8px 38px 8px 8px;
  color: black;
}
</style>
