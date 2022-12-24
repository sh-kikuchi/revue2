<template>
  <div class="mx-auto mt-4" width="500px">
    <div class="text-center">
      <div class="convert-input">
        <input type="text" v-model="celsius" /> <label>℃</label>
      </div>
      <div class="convert-input">
        <input type="text" v-model="fahrenheit" /> <label>℉</label>
      </div>
    </div>
  </div>
</template>
<script setup>

const celsius = ref(0);
const fahrenheit = ref(32);

watch(celsius, (next, prev) => {
  celsius.value = Math.round(next * 100) / 100;
  fahrenheit.value = Math.round((next * 1.8 + 32) * 100) / 100;
});

watch(fahrenheit, (next, prev) => {
  celsius.value = Math.round(((next - 32) / 1.8) * 100) / 100;
  fahrenheit.value = Math.round(next * 100) / 100;
});

</script>
<style scoped>
</style>
