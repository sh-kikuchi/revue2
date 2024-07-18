<script setup lang="ts">
import { computed } from 'vue';
const props =  defineProps({
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
  type: {
    type: String as () => ('button' | 'reset' | 'submit'),
    default: 'button'
  },
  style: {
    type: String,
    default: '' 
  },
})

//binding classes
const bindingClass = computed(() => {
  return `${props.class} button button-shadow`;
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

<style scoped>
.button {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 3px 0px var(--shadow-color, rgba(0, 0, 0, 0.3));
}

.button:hover {
  transform: translateY(2px);
  box-shadow: 0px 0px 0px var(--shadow-color, rgba(0, 0, 0));
}
</style>
