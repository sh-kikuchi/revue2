<script setup>
  import { computed } from 'vue';
  import Row        from "@/components/global/layouts/grid/Row";
  import Column     from "@/components/global/layouts/grid/Column";
  import Wrapper from '@/components/global/layouts/Wrapper.vue';
  import RangeField from '@/components/global/fields/RangeField.vue';
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
<template>
  <Wrapper>
    <Row>
      <Column :cols="6" :sm_cols="12">
        <h3>Color Palettes</h3>
        <div :style="bindBorder" class="triangle"></div>
        <hr />
        width: 0px; <br />
        border: 1px solid transparent; <br />
        border-left   : {{ state.border1 }}px solid transparent;<br />
        border-right  : {{ state.border2 }}px solid transparent;<br />
        border-bottom : {{ state.border3 }}px solid darkslategray;<br />
      </Column>
      <Column :cols="6" :sm_cols="12">
        <div>
          <label>Left</label>
          <RangeField 
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
          <RangeField 
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
          <RangeField 
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
          <RangeField 
            min                 = "-180"
            max                 = "180"
            step                = "1"
            width               = "300"
            bgColor             = "lightgrey"
            v-model:range-value = "state.rotate" 
          />
        </div>
      </Column>
    </Row>
  </Wrapper>
</template>
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
