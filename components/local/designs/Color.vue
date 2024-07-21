<script setup>
  import { computed,reactive } from 'vue';
  import Row        from "@/components/global/layouts/grid/Row";
  import Column     from "@/components/global/layouts/grid/Column";
  import RangeField from '@/components/global/fields/RangeField.vue';
  import Wrapper from '@/components/global/layouts/Wrapper.vue';

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
  <Wrapper>
    <Row>
      <Column :cols="6" :sm_cols="12">
        <h3>Color Palettes</h3>
        <div :style="bindStyle" class="circle"></div>
          <div>
            <hr />
            color: rgba({{ state.red }},{{ state.green }},{{ state.blue }},{{ state.opacity }});<br />
            background-color: rgba({{ state.red }},{{ state.green }},{{ state.blue }},{{state.opacity }});
          </div>
      </Column>
      <Column  :cols="6" :sm_cols="12">
        <div>
          <label>Red</label>
          <RangeField 
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
          <RangeField 
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
          <RangeField 
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
          <RangeField 
            min="0"
            max="1"
            step="0.1"
            width ="300"
            bgColor = "lightgrey"
            v-model:range-value="state.opacity" 
          />
        </div>
      </Column>
    </Row>
  </Wrapper>
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
