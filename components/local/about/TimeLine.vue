<template>
  <section id="timeLine" class="py-2">
    <h2 class="text-center pt-3 pb-3">Relese Notes</h2>
    <div class="timeline-wrap my-2">
      <DataTable
        :items= "ReleaseNote"
        :seach_mode=false
      />
  </div>
  </section>
</template>
<script setup>
import DataTable   from '@/components/global/tables/DataTable.vue';
import ReleaseNote from '@/assets/json/relese_note.json';
</script>
<style scoped>
#timeLine{
  background-color: rgba(201, 194, 176, 0.2);
}

.timeline-wrap{
  max-width: 800px;
  margin: 0 auto;
}
</style>
