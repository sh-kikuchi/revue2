<template>
  <div class="mx-auto mt-4 text-center">
    <div class="convert-input">
      <input type="text" v-model="mm" /> <label>mm</label>
    </div>
    <div class="convert-input">
      <input type="text" v-model="cm" /> <label>cm</label>
    </div>
    <div class="convert-input">
      <input type="text" v-model="meter" /> <label>m</label>
    </div>
    <div class="convert-input">
      <input type="text" v-model="km" /> <label>km</label>
    </div>
  </div>
</template>

<script setup>
const mm = ref(0);
const cm  = ref(0);
const meter = ref(0);
const km = ref(0);

watch(mm, (next, prev) => {
  km.value = next / 1000000
  meter.value = next / 1000
  cm.value = next / 10
  mm.value = next
});

watch(cm, (next, prev) => {
  km.value = next / 100000
  meter.value = next / 100
  cm.value = next
  mm.value = next * 10
});

watch(meter, (next, prev) => {
  km.value = next / 1000
  meter.value = next
  cm.value = next * 100
  mm.value = next * 1000
});

watch(km, (next, prev) => {
  km.value = next
  meter.value = next * 1000
  cm.value = next * 100000
  mm.value = next * 1000000
});
</script>
<style scoped>
</style>
