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
        <div>
          <label>TOP</label>
          <FormInputRange 
            min="0"
            max="150"
            step="1"
            width ="300"
            bgColor = "lightgrey"
            v-model:range-value="state.top" 
          />
        </div>
        <div>
          <label>LEFT</label>
          <FormInputRange 
            min="0"
            max="150"
            step="1"
            width ="300"
            bgColor = "lightgrey"
            v-model:range-value="state.left" 
          />
        </div>
      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '~~/components/public/atoms/layouts/Wrapper.vue';
import Grid from '~~/components/public/atoms/layouts/Grid.vue';
import FormInputRange from '~~/components/public/atoms/inputs/FormInputRange.vue';

const state = reactive({
  top : 0,
  left: 0,
});

const bindPosition = computed(() => {
  return `top: ${state.top}px;left: ${state.left}px;`;
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
