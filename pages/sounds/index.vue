<template>
  <PageTitle title="Sounds" />
  <Wrapper>
    <div id="sounds">
      <Tab
        :tabs = "['keyboard','music scale','beat']"
      >
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
          <div>
            <Beat />
          </div>
        </template>
      </Tab>
    </div>
  </Wrapper>
</template>
<script setup>
import PageTitle from "~~/components/commons/PageTitle.vue";
import Wrapper from "~~/components/commons/Wrapper.vue";
import Tab from "~~/components/commons/Tab.vue";
import Keyboard from "~~/components/sounds/Keyboard.vue";
import Beat from "~~/components/sounds/Beat.vue";
import MusicalScale from "~~/components/sounds/MusicalScale.vue";
import PlayBtn from "~~/components/sounds/PlayBtn.vue";
import Sequence from "~~/components/sounds/Sequence.vue";
</script>
<style>
</style>
