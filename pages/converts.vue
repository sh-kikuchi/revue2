<script setup>
  import 'revuekitz/dist/style.css'
  import { PageTitle } from 'revuekitz'
  import { LayoutWrapper } from 'revuekitz'
  import Length      from '@/components/local/converts/Length.vue';
  import Weigh       from '@/components/local/converts/Weigh.vue';
  import { TabPanel }        from 'revuekitz';
  import Temperature from '@/components/local/converts/Temperature.vue'
  import Bytes       from '@/components/local/converts/Bytes.vue';
  const tab = ref(null);
</script>
<template>
  <PageTitle>Converts</PageTitle>
  <LayoutWrapper>
    <TabPanel
      :tabs = "['length','weigh','temperature','bytes']"
      :width = 300
    >
      <template v-slot:content0>
        <Length />
      </template>
      <template v-slot:content1>
        <Weigh />
      </template>
      <template v-slot:content2>
        <Temperature />
      </template>
      <template v-slot:content3>
        <Bytes />
      </template>
    </TabPanel>
  </LayoutWrapper>
</template>

<style scoped>
.contents{
  background-color: white;
}
</style>
