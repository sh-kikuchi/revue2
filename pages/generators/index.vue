<template>
  <PageTitle title="Generators" />
  <Wrapper>
  <div id="convert" class="ma-3">
    <v-card class="ma-3 mx-auto" max-width="800">
      <v-tabs v-model="tab" >
        <v-tab value="string">文字列生成</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="string">
            <String />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
  </Wrapper>
</template>
<script setup>
import Wrapper from "../../components/commons/Wrapper.vue";
import PageTitle from "../../components/commons/PageTitle.vue";
import String from "../../components/generators/String.vue";
const tab = ref(null);
</script>
<style >
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
