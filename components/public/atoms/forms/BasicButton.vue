<script setup>
const props = defineProps({
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
  margin: {
    type: Number,
    required: true,
  },
  valueName: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: "crimson",
  },
  txtColor: {
    type: String,
    default: "white",
  },
  contentPosition: {
    type: String,
    default: "center"
  },
})

const buttonStyle = computed(() => {
  return `background-color: ${props.backgroundColor}; 
    color: ${props.txtColor}; 
    margin: ${props.contentPosition === "center" ?  "0 auto": props.contentPosition === "right" ?  "0 0 0 auto" : "0 auto 0 0" };`
});
</script>


<template>
  <button :style="buttonStyle">
    {{ valueName }}
  </button>
</template>
<style scoped>
button {
  display: block;
  width: auto;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 5px 15px;
}
</style>
