<script setup>
const props =  defineProps({
  id: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  style: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
})

//binding classes
const bindingClass = computed(() => {
  return `${props.class} revuekiz-basic-button`;
});

//binding styles
const bindingStyle = computed(() => {
  return `${props.style}`;
});

</script>
<template>
  <button 
    :id    = "props.id"
    :class = "bindingClass"
    :style = "bindingStyle"
    :name  = "props.name"
    :type  = "props.type"
  >
    <slot></slot>
  </button>
</template>
<style>
.revuekiz-basic-button {
  max-width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  margin: 10px 20px 10px 0;
  font-weight: 600;
  text-align: center;
  line-height: 25px;
  border-radius: 5px;
  border-style: none;
}

</style>
