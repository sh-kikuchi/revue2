<template>
  <Wrapper>
    <Grid aOrder="last" bOrder="first">
      <template v-slot:aSide>
        <h3>Position</h3>
        <div class="outer-border">
          <div class="position-parent">
            <div :style="bindPosition" class="position-child"></div>
          </div>
        </div>
        <div>
          ▼ 大きい正方形のCSS <br />position: relative;<br />
          ▼ 小さい正方形のCSS position:absolute;<br />
          top : {{ state.top[1] }} px<br />
          left: {{ state.left[1] }}px <br />
        </div>
      </template>
      <template v-slot:bSide>
        <label>Top</label>
        <v-range-slider v-model="state.top" step="1" min="0" max="150"></v-range-slider>
        <label>Left</label>
        <v-range-slider v-model="state.left" step="1" min="0" max="150"></v-range-slider>
      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '../commons/Wrapper.vue';
import Grid from '../commons/Grid.vue';

const state = reactive({
  top: [0, 150],
  left: [0, 150],
});

const bindPosition = computed(() => {
  return `top: ${state.top[1]}px;left: ${state.left[1]}px;`;
});

</script>
<style>
.position-parent {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: rgb(241, 241, 243);
  margin: 10px auto;
  margin-top: 70px;
  margin-bottom: 50px;
}

.position-child {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: rgb(62, 60, 65);
}
</style>
