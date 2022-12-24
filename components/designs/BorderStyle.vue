<template>
  <Wrapper>
    <Grid aOrder="last" bOrder="first">
      <template v-slot:aSide>
        <h3>Border Style</h3>
        <div class="outer-border">
          <div class="border-line" :style="borderStyle"></div>
        </div>
        <div class="mt-2 mb-2 text-center">
          border-style: {{state.borderTop}} {{state.borderRight}} {{state.borderBottom}} {{state.borderLeft}};
        </div>
      </template>
      <template v-slot:bSide>
        <v-select label="Top" v-model="state.borderTop" :items="selectItems" variant="underlined"></v-select>
        <v-select label="Right" v-model="state.borderRight" :items="selectItems" variant="underlined"></v-select>
        <v-select label="Bottom" v-model="state.borderBottom" :items="selectItems" variant="underlined"></v-select>
        <v-select label="Left" v-model="state.borderLeft" :items="selectItems" variant="underlined"></v-select>
      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '../commons/Wrapper.vue';
import Grid from '../commons/Grid.vue';

const selectItems = ref(['none', 'hidden', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset']);

const state = reactive({
  borderTop: 'solid',
  borderRight: 'solid',
  borderBottom: 'solid',
  borderLeft: 'solid',
});

const borderStyle = computed(() => {
  return ` border-style: ${state.borderTop} ${state.borderRight} ${state.borderBottom} ${state.borderLeft};`;
});

</script>
<style>
.border-line {
  border: 5px;
  width: 200px;
  height: 200px;
  color: rgb(62, 60, 65);
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 50px;
}

.outer-border {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
