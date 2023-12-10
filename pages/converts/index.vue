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
import Wrapper     from '@/components/global/layouts/Wrapper.vue';
import PageTitle   from '@/components/global/layouts/PageTitle.vue';
import Length      from '@/components/local/converts/Length.vue';
import Weigh       from '@/components/local/converts/Weigh.vue';
import Temperature from '@/components/local/converts/Temperature.vue'
import Bytes       from '@/components/local/converts/Bytes.vue';
const tab = ref(null);
</script>
<style scoped>
</style>
