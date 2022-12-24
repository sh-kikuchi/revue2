<template>
  <div v-if="loading" class="loading">
    <div class="loading__loader">
      <img src="~@/assets/images/logo/s_logo.png" />
      <div class="loading_text">Loading</div>
    </div>
  </div>
</template>
<script setup>
const loading = ref(false);
const start = () => {
  loading.value = true;
}
const finish = () => {
  loading.value = false;
}
</script>
<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  transition: all 1.2s ease;
  background: rgba(255, 255, 255, 0.7);
  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
  }
}
.loading img {
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  animation: spin 2s linear infinite;
}
.loading_text {
  text-align: center;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
