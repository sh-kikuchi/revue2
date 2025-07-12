<script setup>
  import { computed, ref } from 'vue';
  import 'revuekitz/dist/style.css';
  import { RadioField } from 'revuekitz'
  import { GridColumn } from 'revuekitz'
  import { GridRow } from 'revuekitz'
  import { LayoutWrapper } from 'revuekitz'

  const display = ref(["block","flex"]);
  const juctifyContent = ref(["center", "space-between", "space-around"]);
  const alignItems =ref( ["start", "center", "end"]);
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
  <LayoutWrapper>
    <GridRow>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
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
      </GridColumn>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <div>display:</div>
        <div>
          <RadioField
            :items = display
            v-model="state.display" 
          /> 
        </div>
        <div>justify-content:</div>
        <RadioField 
          :items = juctifyContent
          v-model="state.flex" 
          accentColor="red"
        /> 
        <div>align-items:</div>
        <RadioField 
          :items = alignItems
          v-model="state.flex2" 
        /> 
      </GridColumn>
    </GridRow>
  </LayoutWrapper>
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

/**Revuekitzでも直す */
.revuekitz-radio-field>div{
  width: 150px;
  display: flex;
  align-items: middle;
  padding-bottom: 10px;
}

/**Revuekitzでも直す */
label{
  margin-top: 0;
}
</style>
