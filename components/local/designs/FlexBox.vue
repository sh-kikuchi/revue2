<script setup>
  import { computed } from 'vue';
  import Row        from "@/components/global/layouts/grid/Row";
  import Column     from "@/components/global/layouts/grid/Column";
  import Wrapper from '@/components/global/layouts/Wrapper.vue';
  import RadioField from "@/components/global/fields/RadioField.vue"

  const display = ["block","flex"];
  const juctifyContent = ["center", "space-between", "space-around"];
  const alignItems = ["start", "center", "end"];
  const state = reactive({
    display: 'block',
    flex: 'center',
    flex2: 'start'
  });

  const bindDisplay = computed(() => {
    return `display: ${state.display}; justify-content: ${state.flex}; align-items:  ${state.flex2}`;
  });
</script>
<template>
  <Wrapper>
    <Row>
      <Column :cols="6" :sm_cols="12">
        <h3>Flex Box</h3>
          <div class="mx-auto flex align-center">
            <div class="flex-parent mx-auto" :style="bindDisplay">
              <div class="flex-child"></div>
              <div class="flex-child"></div>
              <div class="flex-child"></div>
            </div>
          </div>

        <div class="mt-2 mb-2 text-center">
          display: {{state.display}}; <br>
          justify-content: {{state.flex}}; <br>
          align-items: {{state.flex2}}; <br>
        </div>
      </Column>
      <Column :cols="6" :sm_cols="12">
        <div>display:</div>
        <RadioField 
          :items = display
          v-model:radio="state.display" 
        /> 
        <div>justify-content:</div>
        <RadioField 
          :items = juctifyContent
          v-model:radio="state.flex" 
        /> 
        <div>align-items:</div>
        <RadioField 
          :items = alignItems
          v-model:radio="state.flex2" 
        /> 
      </Column>
    </Row>
  </Wrapper>
</template>
<style>
.flex-parent {
  width: 190px;
  height: 190px;
  background: rgb(241, 241, 243);
  border: 1px solid rgb(241, 241, 243);
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 50px;
}

.flex-child {
  width: 50px;
  height: 50px;
  padding: 0;
  background-color: rgb(62, 60, 65);
}

.flex-child:nth-child(odd) {
  background-color: gray;
}
</style>
