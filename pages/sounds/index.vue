<template>
  <PageTitle title="Sounds" />
  <Wrapper>
    <div id="sounds">
      <Tab
        :width= 350
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
import PageTitle    from "@/components/public/atoms/layouts/PageTitle.vue";
import Wrapper      from "@/components/public/atoms/layouts/Wrapper.vue";
import Tab          from "@/components/public/atoms/layouts/Tab.vue";
import Keyboard     from "@/components/private/sounds/Keyboard.vue";
import Beat         from "@/components/private/sounds/Beat.vue";
import MusicalScale from "@/components/private/sounds/MusicalScale.vue";
</script>
<style>
</style>
