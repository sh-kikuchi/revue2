<script setup>
  import Wrapper   from "@/components/global/layouts/Wrapper.vue";
  import PageTitle from "@/components/global/layouts/PageTitle.vue";
  import String    from "@/components/local/generators/String.vue";
  import Tab         from '@/components/global/lists/Tab.vue'
  const tab = ref(null);
</script>
<template>
  <PageTitle title="Generators" />
  <Wrapper>
  <div id="convert" class="ma-3">
    <div class="ma-3 mx-auto" max-width="800">
      <Tab
        :tabs = "['文字列生成']"
        :width = 300
        :count = 1
      >
        <template v-slot:content0>
          <div style="background-color: white;">
            <String />
          </div>
        </template>
      </Tab>
    </div>
  </div>
  </Wrapper>
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
