<script setup>
  import 'revuekitz/dist/style.css'
  import { PageTitle } from 'revuekitz'
  import { LayoutWrapper } from 'revuekitz'
  import String    from "@/components/local/generators/String.vue";
  import { TabPanel } from 'revuekitz'
  const tab = ref(null);
</script>
<template>
  <PageTitle>Generators</PageTitle>
  <LayoutWrapper>
  <div id="convert" class="ma-3">
    <div class="ma-3 mx-auto" max-width="800">
      <TabPanel
        :tabs = "['文字列生成']"
        :width = 300
        :count = 1
      >
        <template v-slot:content0>
          <div style="background-color: white;">
            <String />
          </div>
        </template>
      </TabPanel>
    </div>
  </div>
  </LayoutWrapper>
</template>
<style>
/* コンポーネント共通 */
.convert-input>input {
  width: 250px;
  border: 1px dashed black;
  border-radius: 5px;
  margin: 10px auto;
  padding: 5px;
}

.convert-input>label {
  display: inline-block;
  width: 50px;
}
</style>
