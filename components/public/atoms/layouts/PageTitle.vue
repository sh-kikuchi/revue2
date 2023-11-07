<template>
  <h1 class="text-center pa-3">{{ props.title }}</h1>
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
  font-size: 45px;
  font-family: "Rock Salt", cursive;
}
</style>
