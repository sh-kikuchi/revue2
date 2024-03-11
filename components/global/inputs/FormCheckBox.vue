<script setup>
  const isChecked = ref(false);
  const props = defineProps({
  valueName: String,
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
<template>
  <input
    type  = "checkbox"
    :id    = "id"
    :class = "class"
    :name  = "name"
    :value = "valueName"
    :disabled = "disabledBool"
    :readonly = "readonlyBool"
    v-model = "isChecked"
    @input="$emit('update:checked', isChecked === false ? valueName : '')"
  ><label>{{ label }}</label>
</template>
<style scoped>
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
  transform: scale(2);
  margin: 0 15px 0 20px;
}
.red{
  accent-color: red;
}


</style>
