<script setup>
import 'revuekitz/dist/style.css'
import { PageTitle } from 'revuekitz'
import SlotMachine from "@/components/local/games/slot/SlotMachine.vue";
</script>
<template>
  <PageTitle>games</PageTitle>
  <LayoutWrapper>
      <div id="convert" class="ma-3">
        <div class="mt-2 text-center"></div>
        <div class="pa-3 mx-auto" max-width="800">
          <div style="background-color: white; padding: 10px;">
            <SlotMachine />
          </div>
        </div>
      </div>
  </LayoutWrapper>
</template>
<style >
/* コンポーネント共通 */
.convert-input>input {
  width: 250px;
  border: 1px dashed black;
  border-radius: 5px;
  margin: 10px auto;
  padding: 5px;
}

.convert-input>label {
  display: inline-block;
  width: 50px;
}
</style>
