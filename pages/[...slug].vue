
<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <div>
    <!--Nuxt-content3 -->
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<style scoped>
.title{
  text-align: center;
  max-width:800px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: white;
}
</style>
