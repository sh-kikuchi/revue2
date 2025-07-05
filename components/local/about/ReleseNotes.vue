<script setup>
import 'revuekitz/dist/style.css'
import { DataTable } from 'revuekitz'
import ReleaseNote from '@/assets/json/relese_note.json';

</script>
<template>
  <section id="timeLine" class="py-2">
    <h2 class="text-center pt-3 pb-3 ma-0">Relese Notes</h2>
    <div class="timeline-wrap my-2">
      <DataTable
        :headers="['Date', 'Title', 'Content']"
        :items= "ReleaseNote"
        :seach_mode=false
        steps="5"
      />
  </div>
  </section>
</template>
<style scoped>
#timeLine{
  background-color: rgba(201, 194, 176, 0.2);
}
.timeline-wrap{
  max-width: 800px;
  margin: 0 auto;
}
</style>
