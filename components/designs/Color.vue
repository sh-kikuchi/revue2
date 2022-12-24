<template>
  <Wrapper>
    <Grid aOrder=0 bOrder=1>
      <template v-slot:aSide>
        <h3>Color Palettes</h3>
        <div :style="bindStyle" class="circle"></div>
          <div>
            <hr />
            color: rgba({{ state.red[1] }},{{ state.green[1] }},{{ state.blue[1] }},{{ state.opacity[1] }});<br />
            background-color: rgba({{ state.red[1] }},{{ state.green[1] }},{{ state.blue[1] }},{{state.opacity[1]}});
          </div>
      </template>
      <template v-slot:bSide>
        <label>Red</label>
        <v-range-slider v-model="state.red" step="1" min="0" max="255"></v-range-slider>

        <label>Green</label>
        <v-range-slider v-model="state.green" step="1" min="0" max="255"></v-range-slider>

        <label>Blue</label>
        <v-range-slider v-model="state.blue" step="1" min="0" max="255"></v-range-slider>

        <label>Opacity</label>
        <v-range-slider v-model="state.opacity" step="0.1" min="0" max="1"></v-range-slider>

      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '../commons/Wrapper.vue';
import Grid from '../commons/Grid.vue';

const state = reactive({
  red: [0,0],
  green: [0,0],
  blue: [0,0],
  opacity: [1,1]
});

const bindStyle = computed(() => {
  return `background-color: rgba(${state.red[1]}, ${state.green[1]}, ${state.blue[1]}, ${state.opacity[1]})`;
});

</script>
<style>
/* color */
.circle {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 50px;
  border-radius: 50%;
}
</style>
