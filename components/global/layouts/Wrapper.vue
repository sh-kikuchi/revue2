<script setup lang="ts">
const props = defineProps({
  maxWidth: {
    type: String,
    default: '1024px'
  }
});
</script>

<template>
  <div class="wrapper" :style="{ maxWidth: maxWidth }">
      <slot></slot>
  </div>
</template>

<style scoped>
.wrapper{
  margin: 0 auto;
  background-color: transparent;
}
</style>