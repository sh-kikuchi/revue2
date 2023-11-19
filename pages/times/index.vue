<template>
  <PageTitle title="Time" />
  <Wrapper>
    <v-card>
      <v-tabs v-model="tab" bg-color="dark">
        <v-tab value="Pomodoro">Pomodoro</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="Pomodoro">
            <Pomodoro />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </Wrapper>
</template>
<script setup>
import Wrapper   from '@/components/public/atoms/layouts/Wrapper.vue';
import PageTitle from '@/components/public/atoms/layouts/PageTitle.vue';
import Pomodoro  from '@/components/private/times/Pomodoro.vue';
const tab = ref(null);

</script>
<style scoped>

</style>
