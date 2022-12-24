<template>
  <Wrapper>
    <Grid aOrder="1" bOrder="0">
      <template v-slot:aSide>
        <h3>Color Palettes</h3>
        <div :style="bindBorder" class="triangle"></div>
        <hr />
        width: 0px; <br />
        border: 1px solid transparent; <br />
        border-left :{{ state.border1[1] }}px solid transparent;<br />
        border-right : {{ state.border2[1] }}px solid transparent;<br />
        border-bottom: {{ state.border3[1] }}px solid darkslategray;<br />
      </template>
      <template v-slot:bSide>
        <label>Left</label>
        <v-range-slider v-model="state.border1" step="1" min="0" max="100"></v-range-slider>

        <label>Right</label>
        <v-range-slider v-model="state.border2" step="1" min="0" max="100"></v-range-slider>

        <label>Bottom</label>
        <v-range-slider v-model="state.border3" step="1" min="0" max="100"></v-range-slider>

        <label>Rotate</label>
        <v-range-slider v-model="state.rotate" step="1" min="-180" max="180"></v-range-slider>
      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '../commons/Wrapper.vue';
import Grid from '../commons/Grid.vue';

const state = reactive({
  border1: [0,100],
  border2: [0,100],
  border3: [0,150],
  rotate: [-180,180]
});

const bindBorder = computed(() => {
  return `  border-left: ${state.border1[1]}px solid transparent;
            border-right: ${state.border2[1]}px solid transparent;
            border-bottom: ${state.border3[1]}px solid darkslategray;
            transform: rotate(${state.rotate[1]}deg);`;
});

</script>
<style>
/* Triangle */
.triangle {
  width: 0px;
  border-width: 30px;
  border: 1px solid transparent;
  margin: 10px auto;
  margin-top: 80px;
  margin-bottom: 50px;
  vertical-align: middle;
}

/* コードスペース */
.code-space {
  font-size: 12px;
  background-color: rgb(225, 231, 238);
  padding: 5px;
  margin-top: 10px;
}
</style>
