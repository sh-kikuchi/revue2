<template>
  <PageTitle title="Converts" />
  <Wrapper>
    <v-card>
      <v-tabs v-model="tab" bg-color="dark">
        <v-tab value="length">長さ</v-tab>
        <v-tab value="weigh">重さ</v-tab>
        <v-tab value="temperature">温度</v-tab>
        <v-tab value="bytes">バイト数</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="length">
            <Length />
          </v-window-item>
          <v-window-item value="weigh">
            <Weigh />
          </v-window-item>
          <v-window-item value="temperature">
            <Temperature />
          </v-window-item>
          <v-window-item value="bytes">
            <Bytes />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </Wrapper>
</template>
<script setup>
import Wrapper from '~~/components/commons/Wrapper.vue';
import PageTitle from '~~/components/commons/PageTitle.vue';
import Length from '~~/components/converts/Length.vue';
import Weigh from '~~/components/converts/Weigh.vue';
import Temperature from '../../components/converts/Temperature.vue'
import Bytes from '~~/components/converts/Bytes.vue';
const tab = ref(null);
</script>
<style scoped>
</style>
