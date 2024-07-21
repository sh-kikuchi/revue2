<script setup>
  import Wrapper     from '@/components/global/layouts/Wrapper.vue';
  import PageTitle   from '@/components/global/displays/PageTitle.vue';
  import Length      from '@/components/local/converts/Length.vue';
  import Weigh       from '@/components/local/converts/Weigh.vue';
  import Tab         from '@/components/global/navigations/Tab';
  import Temperature from '@/components/local/converts/Temperature.vue'
  import Bytes       from '@/components/local/converts/Bytes.vue';
  const tab = ref(null);
</script>
<template>
  <PageTitle title="Converts" />
  <Wrapper>
    <Tab
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
    </Tab>
  </Wrapper>
</template>

<style scoped>
.contents{
  background-color: white;
}
</style>
