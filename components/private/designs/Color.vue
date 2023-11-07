<template>
  <Wrapper>
    <Grid aOrder=0 bOrder=1>
      <template v-slot:aSide>
        <h3>Color Palettes</h3>
        <div :style="bindStyle" class="circle"></div>
          <div>
            <hr />
            color: rgba({{ state.red }},{{ state.green }},{{ state.blue }},{{ state.opacity }});<br />
            background-color: rgba({{ state.red }},{{ state.green }},{{ state.blue }},{{state.opacity }});
          </div>
      </template>
      <template v-slot:bSide>
        <div>
          <label>Red</label>
          <FormInputRange 
            min="0"
            max="255"
            step="1"
            width ="300"
            bgColor = "red"
            v-model:range-value="state.red" 
          />
        </div>
        <div>
          <label>Green</label>
          <FormInputRange 
            min="0"
            max="255"
            step="1"
            width ="300"
            bgColor = "green"
            v-model:range-value="state.green" 
          />
        </div>
        <div>
          <label>Blue</label>
          <FormInputRange 
            min="0"
            max="255"
            step="1"
            width ="300"
            bgColor = "blue"
            v-model:range-value="state.blue" 
          />
        </div>
        <div>
          <label>Opacity</label>
          <FormInputRange 
            min="0"
            max="1"
            step="0.1"
            width ="300"
            bgColor = "lightgrey"
            v-model:range-value="state.opacity" 
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
  red: 100,
  green: 100,
  blue: 100,
  opacity: 1
});

const bindStyle = computed(() => {
  return `
    background-color: rgba(${state.red}, ${state.green}, ${state.blue}, ${state.opacity})
  `;
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
