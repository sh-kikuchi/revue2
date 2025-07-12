<script setup>
  import 'revuekitz/dist/style.css'
  import { PageTitle } from 'revuekitz'
import { LayoutWrapper } from 'revuekitz'
  import Pomodoro  from '@/components/local/times/Pomodoro.vue';
  import { TabPanel } from 'revuekitz';
</script>
<template>
  <PageTitle>Time</PageTitle>
  <LayoutWrapper>
    <TabPanel
      :tabs = "['pomodoro']"
      :width = 300
    >
      <template v-slot:content0>
        <div style="background-color: white;">
          <Pomodoro />
        </div>
      </template>
  </TabPanel>
  </LayoutWrapper>
</template>

<style scoped>

</style>
