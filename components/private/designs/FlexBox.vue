<template>
  <Wrapper>
    <Grid aOrder="last" bOrder="first">
      <template v-slot:aSide>
        <h3>Flex Box</h3>
        <div class="outer-border">
          <div class="mx-auto d-flex align-center">
            <div class="flex-parent mx-auto" :style="bindDisplay">
              <div class="flex-child"></div>
              <div class="flex-child"></div>
              <div class="flex-child"></div>
            </div>
          </div>
        </div>
        <div class="mt-2 mb-2 text-center">
          display: {{state.display}}; <br>
          justify-content: {{state.flex}}; <br>
          align-items: {{state.flex2}}; <br>
        </div>
      </template>
      <template v-slot:bSide>
        <div>display:</div>
        <FormRadio 
          :items = display
          v-model:selected-input="state.display" 
        /> 
        <div>justify-content:</div>
        <FormRadio 
          :items = juctifyContent
          v-model:selected-input="state.flex" 
        /> 
        <div>align-items:</div>
        <FormRadio 
          :items = alignItems
          v-model:selected-input="state.flex2" 
        /> 
      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '@/components/public/atoms/layouts/Wrapper.vue';
import Grid from '@/components/public/atoms/layouts/Grid.vue';
import FormRadio from "@/components/public/atoms/forms/FormRadio.vue"

const display = ["block","flex"];
const juctifyContent = ["center", "space-between", "space-around"];
const alignItems = ["start", "center", "end"];
const state = reactive({
  display: 'block',
  flex: 'center',
  flex2: 'start'
});

const bindDisplay = computed(() => {
  return `display: ${state.display}; justify-content: ${state.flex}; align-items:  ${state.flex2}`;
});

</script>
<style>
.flex-parent {
  width: 190px;
  height: 190px;
  background: rgb(241, 241, 243);
  border: 1px solid rgb(241, 241, 243);
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 50px;
}

.flex-child {
  width: 50px;
  height: 50px;
  padding: 0;
  background-color: rgb(62, 60, 65);
}

.flex-child:nth-child(odd) {
  background-color: gray;
}
</style>
