<script setup>
import 'revuekitz/dist/style.css'
import { PageTitle } from 'revuekitz'
import { LayoutWrapper } from 'revuekitz'
import ImageEdit   from '@/components/local/designs/ImageEdit.vue';
import Color       from '@/components/local/designs/Color.vue';
import BorderStyle from '@/components/local/designs/BorderStyle.vue';
import Triangle    from '@/components/local/designs/Triangle.vue';
import Position    from '@/components/local/designs/Position.vue';
import FlexBox     from '@/components/local/designs/FlexBox.vue';
import { TabPanel } from 'revuekitz'
</script>
<template>
  <PageTitle>Designs</PageTitle>
  <LayoutWrapper>
    <TabPanel
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
    </TabPanel>
  </LayoutWrapper>
</template>

