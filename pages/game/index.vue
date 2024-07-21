<template>
  <PageTitle title="games" />
  <Wrapper>
      <div id="convert" class="ma-3">
        <div class="mt-2 text-center"></div>
        <div class="pa-3 mx-auto" max-width="800">
          <div style="background-color: white; padding: 10px;">
            <SlotMachine />
          </div>
        </div>
      </div>
  </Wrapper>
</template>
<script setup>
import PageTitle   from "@/components/global/displays/PageTitle.vue";
import SlotMachine from "@/components/local/games/slot/SlotMachine.vue";
</script>
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
