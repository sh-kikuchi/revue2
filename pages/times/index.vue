<script setup>
  import Wrapper   from '@/components/global/layouts/Wrapper.vue';
  import PageTitle from '@/components/global/displays/PageTitle.vue';
  import Pomodoro  from '@/components/local/times/Pomodoro.vue';
  import Tab       from '@/components/global/navigations/Tab.vue'
</script>
<template>
  <PageTitle title="Time" />
  <Wrapper>
    <Tab
      :tabs = "['pomodoro']"
      :width = 300
    >
      <template v-slot:content0>
        <div style="background-color: white;">
          <Pomodoro />
        </div>
      </template>
  </Tab>
  </Wrapper>
</template>

<style scoped>

</style>
