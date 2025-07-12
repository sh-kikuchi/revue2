<script setup>
  import { computed } from 'vue';
  import 'revuekitz/dist/style.css';
  import { RangeField } from 'revuekitz';
  import { GridColumn } from 'revuekitz'
  import { GridRow } from 'revuekitz'
  import { LayoutWrapper } from 'revuekitz';

  const state = reactive({
    top : 0,
    left: 0,
  });

  const bindPosition = computed(() => {
    return `top: ${state.top}px;left: ${state.left}px;`;
  });
</script>
<template>
  <LayoutWrapper>
    <GridRow>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <h3>Position</h3>
          <div class="position-parent">
            <div :style="bindPosition" class="position-child"></div>
          </div>
        <div class="flex justify-center">
          <div>
            ▼ 大きい正方形のCSS <br />position: relative;<br />
            ▼ 小さい正方形のCSS position:absolute;<br />
            top : {{ state.top[1] }} px<br />
            left: {{ state.left[1] }}px <br />
          </div>
        </div>
      </GridColumn>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <div>
          <label>TOP</label>
          <RangeField 
            min="0"
            max="150"
            step="1"
            width ="300"
            bgColor = "lightgrey"
            v-model="state.top" 
          />
        </div>
        <div>
          <label>LEFT</label>
          <RangeField 
            min="0"
            max="150"
            step="1"
            width ="300"
            bgColor = "lightgrey"
            v-model="state.left" 
          />
        </div>
      </GridColumn>
    </GridRow>
  </LayoutWrapper>
</template>
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
