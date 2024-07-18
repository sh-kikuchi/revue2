<script setup>
import Wrapper     from '@/components/global/layouts/Wrapper.vue';
import PageTitle   from '@/components/global/displays/PageTitle.vue';
import ImageEdit   from '@/components/local/designs/ImageEdit.vue';
import Color       from '@/components/local/designs/Color.vue';
import BorderStyle from '@/components/local/designs/BorderStyle.vue';
import Triangle    from '@/components/local/designs/Triangle.vue';
import Position    from '@/components/local/designs/Position.vue';
import FlexBox     from '@/components/local/designs/FlexBox.vue';
import Tab         from '@/components/global/navigations/Tab.vue'
</script>
<template>
  <PageTitle title="Designs" />
  <Wrapper>
    <Tab
      :tabs = "['Images','Colors','Borders','Layouts']"
      :width = 300
    >
      <template v-slot:content0>
        <ImageEdit />
      </template>
      <template v-slot:content1>
        <Color />
      </template>
      <template v-slot:content2>
        <BorderStyle />
        <Triangle />
      </template>
      <template v-slot:content3>
        <Position />
        <FlexBox />
      </template>
    </Tab>
  </Wrapper>
</template>

