<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useFetch("/api/content/page", {
  key: route.path,
  query: { path: route.path },
});
const NuxtContentWrapper = resolveComponent("NuxtContentWrapper");
</script>

<template>
  <div>
    <!--Ox Content -->
    <component :is="page.wrapped ? NuxtContentWrapper : 'div'" v-if="page">
      <template v-for="(block, i) in page.blocks" :key="i">
        <component :is="block.component" v-if="'component' in block" v-bind="block.props" />
        <div v-else v-html="block.html" />
      </template>
    </component>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  max-width: 800px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: white;
}
</style>
