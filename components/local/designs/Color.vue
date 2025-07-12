<script setup>
  import { computed,reactive } from 'vue';
  import 'revuekitz/dist/style.css';
  import { RangeField } from 'revuekitz'
  import { GridColumn } from 'revuekitz'
  import { GridRow } from 'revuekitz'
  import { LayoutWrapper } from 'revuekitz'

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
<template>
  <LayoutWrapper>
    <GridRow>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <h3>Color Palettes</h3>
        <div :style="bindStyle" class="circle"></div>
          <div>
            <hr />
            color: rgba({{ state.red }},{{ state.green }},{{ state.blue }},{{ state.opacity }});<br />
            background-color: rgba({{ state.red }},{{ state.green }},{{ state.blue }},{{state.opacity }});
          </div>
      </GridColumn>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <div>
          <label>Red</label>
          <RangeField 
            min="0"
            max="255"
            step="1"
            width ="300"
            bgColor = "red"
            v-model="state.red" 
          />
        </div>
        <div>
          <label>Green</label>
          <RangeField 
            min="0"
            max="255"
            step="1"
            width ="300"
            bgColor = "green"
            v-model="state.green" 
          />
        </div>
        <div>
          <label>Blue</label>
          <RangeField 
            min="0"
            max="255"
            step="1"
            width ="300"
            bgColor = "blue"
            v-model="state.blue" 
          />
        </div>
        <div>
          <label>Opacity</label>
          <RangeField 
            min="0"
            max="1"
            step="0.1"
            width ="300"
            bgColor = "lightgrey"
            v-model="state.opacity" 
          />
        </div>
      </GridColumn>
    </GridRow>
  </LayoutWrapper>
</template>
<style>
/* color */
.circle {
  width: 200px;
  height: 200px;
  margin: 0 auto;

  border-radius: 50%;
}
</style>
