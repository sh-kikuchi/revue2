<script setup lang="ts">
  import { ref } from 'vue';
  const visible = ref<boolean>(false);
  const togglePopup = ()=> {
    visible.value = !visible.value;
  }
</script>
<template>
  <div class="container">
    <div @click="togglePopup" class="parent">
      <slot name="popupBtn"></slot>
    </div>
    <div v-if="visible" class="child" @click="togglePopup">
      <slot name="popupContent"></slot>
    </div>
  </div>
</template>
<style scoped>
.container {
  position: relative;
}
.parent {
  cursor: pointer;
}
.child {
  position: absolute;
  left:30px;
  top: 0%; 
  background-color: #fff;
}
</style>