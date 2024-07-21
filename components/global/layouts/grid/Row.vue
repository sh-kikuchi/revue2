<template>
  <div class="grid">
    <slot></slot>
  </div>
</template>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 10px;
}
</style>