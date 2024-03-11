<template>
  <a href="#" class="avatar">
    <div class="avatar-aspect-ratio"></div>
    <img alt="" :src="props.imgFile">
  </a>
</template>

<script setup>

const props = defineProps({
  imgFile: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.avatar {
  position: relative;
  display: inline-block;
}

.avatar-aspect-ratio {
  width: 100%;
  padding-bottom: 100%;
}

.avatar img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 100%; /* 追加 */
  max-height: 100%; /* 追加 */
  width: auto; /* 追加 */
  height: auto; /* 追加 */
  border-radius: 50%;
}
</style>