<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '500px'
  },
  height: {
    type: String,
    default: '200px'
  },
  color: {
    type: String,
    default: 'transparent'
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
})
const cardStyle = computed(() => {
  return `
    width: ${props.width};
    height: ${props.height}; 
    background-color: ${props.color};
    border-color: ${props.color};`;
});
</script>
<template>
  <div class="card" :style= "cardStyle">
    <h2 class="card-title">{{ props.title }}</h2>
    <h4 class="card-subtitle">{{ props.subtitle }}</h4>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.card{
  border-radius: 10px;
}
</style>
