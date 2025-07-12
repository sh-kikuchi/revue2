<script setup>
//import PageTitle    from "@/components/global/displays/PageTitle.vue";
import { LayoutWrapper } from 'revuekitz'
import {TabPanel,PageTitle}from "revuekitz";
import 'revuekitz/dist/style.css'
import Keyboard     from "@/components/local/sounds/Keyboard.vue";
import Beat01         from "@/components/local/sounds/beats/No01.vue";
import Beat02         from "@/components/local/sounds/beats/No02.vue";
import MusicalScale from "@/components/local/sounds/MusicalScale.vue";
</script>
<template>
  <PageTitle>Sounds</PageTitle>
  <LayoutWrapper>
    <div id="sounds">
      <TabPanel :tabs = "['keyboard','music scale','beat']">
        <template v-slot:content0>
          <div>
            <Keyboard />
          </div>
        </template>
        <template v-slot:content1>
          <div>
            <MusicalScale />
          </div>
        </template>
        <template v-slot:content2>
          <div class="beat-btn-area">
            <Beat01 class="beat-btn" />
            <Beat02 class="beat-btn" />
          </div>
        </template>
      </TabPanel>
    </div>
  </LayoutWrapper>
</template>
<style>
</style>
