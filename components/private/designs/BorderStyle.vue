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
        <div>
          <label>TOP</label>
          <FormSelect 
            :options="selectItems" 
            v-model:selected-item="state.borderTop" 
          />
        </div>
        <div>
          <label>Right</label>
          <FormSelect 
            :options="selectItems" 
            v-model:selected-item="state.borderRight" 
          />
        </div>
        <div>
          <label>Bottom</label>
          <FormSelect 
            :options="selectItems" 
            v-model:selected-item="state.borderBottom" 
          />
        </div>
        <div>
          <label>Left</label>
          <FormSelect 
            :options="selectItems" 
            v-model:selected-item="state.borderLeft" 
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
import FormSelect from "~~/components/public/atoms/inputs/FormSelect.vue";

const selectItems = ref([
    { text: 'none',   value: 'none' },
    { text: 'hidden',   value: 'hidden' },
    { text: 'solid', value: 'solid' },
    { text: 'dotted', value: 'dotted' },
    { text: 'dashed', value: 'dashed' },
    { text: 'double', value: 'double' },
    { text: 'groove', value: 'groove' },
    { text: 'ridge', value: 'ridge' },
    { text: 'inset', value: 'inset' },
    { text: 'outset', value: 'outset' },
]);


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
