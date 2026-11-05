<script setup>
import "revuekitz/dist/style.css";
import { PageTitle } from "revuekitz";
import { LayoutWrapper } from "revuekitz";
import ImageEdit from "@/components/local/designs/ImageEdit.vue";
import Color from "@/components/local/designs/Color.vue";
import BorderStyle from "@/components/local/designs/BorderStyle.vue";
import Triangle from "@/components/local/designs/Triangle.vue";
import Position from "@/components/local/designs/Position.vue";
import FlexBox from "@/components/local/designs/FlexBox.vue";
import { TabPanel } from "revuekitz";
</script>
<template>
  <PageTitle>Designs</PageTitle>
  <LayoutWrapper>
    <TabPanel :tabs="['Images', 'Colors', 'Borders', 'Layouts']" :width="300">
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
<style>
/* ラベルの文字幅に関係なく入力欄の左端を揃える */
.design-controls {
  --label-width: 72px;
  max-width: 420px;
  padding-top: 20px;
}

.design-controls--radio {
  --label-width: 124px;
}

.design-controls--wide {
  --label-width: 204px;
  max-width: none;
}

.design-control {
  display: grid;
  grid-template-columns: var(--label-width) minmax(0, 1fr);
  align-items: center;
  column-gap: 12px;
  min-height: 36px;
  margin-bottom: 8px;
}

.design-control--top {
  align-items: start;
}

.design-control > label {
  margin: 0;
}

.design-control > input[type="range"],
.design-control > input[type="number"],
.design-control > select.revuekitz-select-field {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
}

.design-control > input[type="number"],
.design-control > select.revuekitz-select-field {
  padding: 6px 8px;
  font: inherit;
}

.design-control input[type="color"] {
  flex-shrink: 0;
  justify-self: start;
  margin: 0;
  padding: 0;
}

.design-control input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

/* 長いラベルは狭い画面では入力欄の上に置く */
@media screen and (max-width: 480px) {
  .design-controls--wide .design-control {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 4px;
  }
}
</style>
