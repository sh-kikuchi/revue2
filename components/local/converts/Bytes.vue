<script setup>
import { watch } from "vue";
const byte = ref(0);
const kb = ref(0);
const mb = ref(0);
const gb = ref(0);
const tb = ref(0);

watch(byte, (next, prev) => {
  byte.value = next;
  kb.value = next / 1024;
  mb.value = next / 1024 / 1024;
  gb.value = next / 1024 / 1024 / 1024;
  tb.value = next / 1024 / 1024 / 1024 / 1024;
});

watch(kb, (next, prev) => {
  byte.value = next * 1024;
  kb.value = next;
  mb.value = next / 1024;
  gb.value = next / 1024 / 1024;
  tb.value = next / 1024 / 1024 / 1024;
});

watch(mb, (next, prev) => {
  byte.value = next * 1024 * 1024;
  kb.value = next * 1024;
  mb.value = next;
  gb.value = next / 1024;
  tb.value = next / 1024 / 1024;
});

watch(gb, (next, prev) => {
  byte.value = next * 1024 * 1024 * 1024;
  kb.value = next * 1024 * 1024;
  mb.value = next * 1024;
  gb.value = next;
  tb.value = next / 1024;
});

watch(tb, (next, prev) => {
  byte.value = next * 1024 * 1024 * 1024 * 1024;
  kb.value = next * 1024 * 1024 * 1024;
  mb.value = next * 1024 * 1024 ;
  gb.value = next * 1024;
  tb.value = next;
});
</script>
<template>
  <div class="mx-auto mt-4 text-center">
    <div class="convert-input">
      <input type="number" v-model="byte" /><label>B</label>
    </div>
    <div class="convert-input">
      <input type="number" v-model="kb" /> <label>KB</label>
    </div>
    <div class="convert-input">
      <input type="number" v-model="mb" /> <label>MB</label>
    </div>
    <div class="convert-input">
      <input type="number" v-model="gb" /> <label>GB</label>
    </div>
    <div class="convert-input">
      <input type="number" v-model="tb" /> <label>TB</label>
    </div>
  </div>
</template>
<style scoped>
</style>
