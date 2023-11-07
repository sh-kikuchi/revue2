<template>
  <div class="mx-auto mt-4">
    <div class="text-center">
      <div class="convert-input">
        <input type="number" v-model="mg" /> <label>mg</label>
      </div>
      <div class="convert-input">
        <input type="number" v-model="gram" /> <label>g</label>
      </div>
      <div class="convert-input">
        <input type="number" v-model="kg" /> <label>kg</label>
      </div>
      <div class="convert-input">
        <input type="number" v-model="ton" /> <label>t</label>
      </div>
    </div>
  </div>
</template>
<script setup>
const mg = ref(0);
const gram = ref(0);
const kg = ref(0);
const ton = ref(0);

watch(mg, (next, prev) => {
  mg.value = next;
  gram.value = next / 1000;
  kg.value = next / 1000 / 1000;
  ton.value = next / 1000 / 1000 / 1000;
});

watch(gram, (next, prev) => {
  mg.value = next * 1000;
  gram.value = next;
  kg.value = next / 1000;
  ton.value = next / 1000 / 1000;
});

watch(kg, (next, prev) => {
  mg.value = next * 1000 * 1000;
  gram.value = next * 1000;
  kg.value = next;
  ton.value = next / 1000;
});

watch(ton, (next, prev) => {
  mg.value = next * 1000 * 1000 * 1000;
  gram.value = next * 1000 * 1000;
  kg.value = next * 1000;
  ton.value = next;
});

</script>
<style scoped>
</style>
