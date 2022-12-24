<template>
  <PageTitle title="Designs" />
  <Wrapper>
    <v-card>
      <v-tabs v-model="tab" bg-color="dark">
        <v-tab value="images">Images</v-tab>
        <v-tab value="colors">Colors</v-tab>
        <v-tab value="borders">Borders</v-tab>
        <v-tab value="layouts">Layouts</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="images">
            <ImageEdit />
          </v-window-item>
          <v-window-item value="colors">
            <Color />
          </v-window-item>
          <v-window-item value="borders">
            <BorderStyle />
            <Triangle />
          </v-window-item>
          <v-window-item value="layouts">
            <Position />
            <FlexBox />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </Wrapper>
</template>
<script setup>
import Wrapper from '~~/components/commons/Wrapper.vue';
import PageTitle from '~~/components/commons/PageTitle.vue';
import ImageEdit from '~~/components/designs/ImageEdit.vue';
import Color from '~~/components/designs/Color.vue';
import Grid from '../../components/commons/Grid.vue'
import BorderStyle from '~~/components/designs/BorderStyle.vue';
import Triangle from '~~/components/designs/Triangle.vue';
import Position from '~~/components/designs/Position.vue';
import FlexBox from '~~/components/designs/FlexBox.vue';
const tab = ref(null);

</script>
<style scoped>
</style>
