<template>
  <div class="grid">
    <slot></slot>
  </div>
</template>
<script>
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 10px;
}
</style>