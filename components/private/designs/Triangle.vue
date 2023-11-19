<template>
  <Wrapper>
    <Grid aOrder="1" bOrder="0">
      <template v-slot:aSide>
        <h3>Color Palettes</h3>
        <div :style="bindBorder" class="triangle"></div>
        <hr />
        width: 0px; <br />
        border: 1px solid transparent; <br />
        border-left   : {{ state.border1 }}px solid transparent;<br />
        border-right  : {{ state.border2 }}px solid transparent;<br />
        border-bottom : {{ state.border3 }}px solid darkslategray;<br />
      </template>
      <template v-slot:bSide>
        <div>
          <label>Left</label>
          <FormInputRange 
            min                 = "0"
            max                 = "100"
            step                = "1"
            width               = "300"
            bgColor             = "lightgrey"
            v-model:range-value = "state.border1" 
          />
        </div>
        <div>
          <label>Right</label>
          <FormInputRange 
            min                 = "0"
            max                 = "100"
            step                = "1"
            width               = "300"
            bgColor             = "lightgrey"
            v-model:range-value = "state.border2" 
          />
        </div>
        <div>
          <label>Bottom</label>
          <FormInputRange 
            min                 = "0"
            max                 = "100"
            step                = "1"
            width               = "300"
            bgColor             = "lightgrey"
            v-model:range-value = "state.border3" 
          />
        </div>
        <div>
          <label>Rotate</label>
          <FormInputRange 
            min                 = "-180"
            max                 = "180"
            step                = "1"
            width               = "300"
            bgColor             = "lightgrey"
            v-model:range-value = "state.rotate" 
          />
        </div>
      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '@/components/public/atoms/layouts/Wrapper.vue';
import Grid from '@/components/public/atoms/layouts/Grid.vue';
import FormInputRange from '@/components/public/atoms/forms/FormInputRange.vue';
const state = reactive({
  border1: 100,
  border2: 100,
  border3: 150,
  rotate:  0
});
const bindBorder = computed(() => {
  return `
    border-left: ${state.border1}px solid transparent;
    border-right: ${state.border2}px solid transparent;
    border-bottom: ${state.border3}px solid darkslategray;
    transform: rotate(${state.rotate}deg);
  `;
});
</script>
<style>
.triangle {
  width: 0px;
  border-width: 30px;
  border: 1px solid transparent;
  margin: 10px auto;
  margin-top: 80px;
  margin-bottom: 50px;
  vertical-align: middle;
}
.code-space {
  font-size: 12px;
  background-color: rgb(225, 231, 238);
  padding: 5px;
  margin-top: 10px;
}
</style>
