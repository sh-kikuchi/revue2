<template>
    <PageTitle title="What's Re:Vue?" />
  <Wrapper>
    <v-row align-content="center"  tag="div" class="pa-3 mb-3">
      <v-col  class="mt-5">
        <v-layout style="height:25px;">
            <v-system-bar color="blue-grey" dark>
              <v-spacer></v-spacer>
              <v-icon>mdi-window-minimize</v-icon>
              <v-icon>mdi-window-maximize</v-icon>
              <v-icon>mdi-close</v-icon>
            </v-system-bar>
        </v-layout>
        <v-card class="mx-auto background">
        <FirstView />
        <About />
        <Contents />
        <TimeLine />
        <Profile />
        <Information />
        </v-card>
      </v-col>
    </v-row>
  </Wrapper>
</template>
<script setup>
import Wrapper from '~~/components/commons/Wrapper.vue';
import PageTitle from '~~/components/commons/PageTitle.vue';
import Grid from '~~/components/commons/Grid.vue';
import FirstView from '~~/components/about/FirstView.vue';
import About from '~~/components/about/About.vue';
import Profile from '~~/components/about/Profile.vue';
import Contents from '~~/components/about/Contents.vue';
import TimeLine from '~~/components/about/TimeLine.vue';
import Information from '~~/components/about/Information.vue';
import { ref } from 'vue';
const dialog = ref(false);
</script>
<style scoped>
.background{
  background-image: url("@/assets/images/about/bg.gif");

}

#contact-wrapper {
  background-color: rgba(110,
      110,
      110, 0.2);
}
</style>
