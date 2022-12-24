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
        <v-radio-group  v-model="state.display">
          <v-radio label="block" value="block"></v-radio>
          <v-radio label="flex" value="flex"></v-radio>
        </v-radio-group>
        <div>justify-content:</div>
        <v-radio-group  v-model="state.flex">
          <v-radio label="center" value="center"></v-radio>
          <v-radio label="space-between" value="space-between"></v-radio>
          <v-radio label="space-around" value="space-around"></v-radio>
        </v-radio-group>
        <div>align-items:</div>
        <v-radio-group  v-model="state.flex2">
          <v-radio label="start" value="start"></v-radio>
          <v-radio label="center" value="center"></v-radio>
          <v-radio label="end" value="end"></v-radio>
        </v-radio-group>
      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '../commons/Wrapper.vue';
import Grid from '../commons/Grid.vue';

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
