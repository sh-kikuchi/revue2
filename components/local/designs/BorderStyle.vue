<script setup>
  import { computed } from 'vue';
  import Row        from "@/components/global/layouts/grid/Row";
  import Column     from "@/components/global/layouts/grid/Column";
  import Wrapper    from '@/components/global/layouts/Wrapper.vue';
  import SelectField from "@/components/global/fields/SelectField.vue";

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
<template>
  <Wrapper>
    <Row>
      <Column :cols="6" :sm_cols="12">
        <h3>Border Style</h3>
        <div class="outer-border">
          <div class="border-line" :style="borderStyle"></div>
        </div>
        <div class="mt-2 mb-2 text-center">
          border-style: {{state.borderTop}} {{state.borderRight}} {{state.borderBottom}} {{state.borderLeft}};
        </div>
      </Column>
      <Column :cols="6" :sm_cols="12">
        <div>
          <label>TOP</label>
          <SelectField 
            :options="selectItems" 
            v-model:selected-item="state.borderTop" 
          />
        </div>
        <div>
          <label>Right</label>
          <SelectField 
            :options="selectItems" 
            v-model:selected-item="state.borderRight" 
          />
        </div>
        <div>
          <label>Bottom</label>
          <SelectField 
            :options="selectItems" 
            v-model:selected-item="state.borderBottom" 
          />
        </div>
        <div>
          <label>Left</label>
          <SelectField 
            :options="selectItems" 
            v-model:selected-item="state.borderLeft" 
          />
        </div>
      </Column>
    </Row>
  </Wrapper>
</template>
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
