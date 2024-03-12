<template>
  <h1 class="text-center">{{ props.title }}</h1>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
})
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Allura&family=Anton&family=Rock+Salt&family=Teko:wght@500&display=swap");
h1{
  margin: 0;
  font-size: 35px;
  font-family: "Rock Salt", cursive;
}
</style>
