<script setup>
  const visible = ref(false);
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
  /* right:; */
  /* top: 100%; 三点リーダーの下に表示する場合 */
  /* right: 0;  三点リーダーの右側に表示する場合 */
  background-color: #fff;
}
</style>