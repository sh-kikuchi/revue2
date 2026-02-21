<script setup>
import Information from '@/assets/json/about/information.json';
</script>
<template>
  <section id="Information"  class="py-4">
    <h2 class="text-center  pt-3 ma-0">Information</h2>
    <div class="colStyle">
      <div v-for="content in Information" :key="content">
        <div class="ma-3">
          <h4>{{ content.title }}</h4>
          <p>{{ content.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
#Information {
  background-color: rgba(110, 110, 110, 0.2);
}
.colStyle{
  max-width: 800px;
  max-height: 450px;
  word-break: break-all;
  margin: 15px auto;
  overflow-y: scroll;
  background-color: whitesmoke;
  font-size: 11px;
}
</style>
