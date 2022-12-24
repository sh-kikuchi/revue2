<template>
  <v-row no-gutters>
    <v-col v-for="(app,i) in state.apps" :key="i"  cols="12" md="6">
      <PrivateCard :images="app.images" :sub_title="app.sub_title" :main_title="app.main_title" :explain="app.explain" :skills="app.skills" :url="app.url" :period="app.period"/>
    </v-col>
  </v-row>
</template>
<script setup>
import PrivateCard from './PrivateCard.vue';
import toolboxImage1 from '@/assets/images/myApps/toolbox/toolboxImage1.png'
import toolboxImage2 from '@/assets/images/myApps/toolbox/toolboxImage2.png'
import toolboxImage3 from '@/assets/images/myApps/toolbox/toolboxImage3.png'
import toolboxImage4 from '@/assets/images/myApps/toolbox/toolboxImage4.png'
import smalltalkImage1 from '@/assets/images/myApps/smalltalk/smalltalkImage1.png'
import smalltalkImage2 from '@/assets/images/myApps/smalltalk/smalltalkImage2.png'
import smalltalkImage3 from '@/assets/images/myApps/smalltalk/smalltalkImage3.png'
import smalltalkImage4 from '@/assets/images/myApps/smalltalk/smalltalkImage4.png'
import bookstockImege1 from '@/assets/images/myApps/bookstock/bookstockImege1.png'
import bookstockImege2 from '@/assets/images/myApps/bookstock/bookstockImege2.png'
import bookstockImege3 from '@/assets/images/myApps/bookstock/bookstockImege3.png'
import bookstockImege4 from '@/assets/images/myApps/bookstock/bookstockImege4.png'

const state = reactive({
  apps: [
    {
      sub_title: "Portfolio",
      main_title: "toolbox",
      period: "2021-4-2022.11",
      explain: "お道具箱のようなマルチアプリ（かんばんボード/ブックメモ/Wiki)　 テストアカウント：【email】test@test.com 【password】testtest",
      skills: ["HTML", "CSS", "Vue3", "MySQL", "Laravel(5.5→9)"],
      images: [toolboxImage1, toolboxImage2, toolboxImage3, toolboxImage4],
      url: "https://sk-kanban.herokuapp.com/#/",
    },
    {
      sub_title: "Legacy",
      main_title: "Smalltalk",
      period: "2021-4-2022.11",
      explain: "チャンネル毎に「お茶の間」トークslackライクなアプリ",
      skills: ["HTML", "CSS", "JavaScript", "Bootstrap4", "Laravel(6→9)", "MySQL"],
      images: [smalltalkImage1, smalltalkImage2, smalltalkImage3, smalltalkImage4],
      url: "https://github.com/sh-kikuchi/toolbox-smalltalk",
    },
    {
      sub_title: "Legacy",
      main_title: "Bookstock",
      period: "2021.6-2022.11",
      explain: "テーマごとに纏めるブックメモアプリ。",
      skills: ["HTML", "CSS", "JavaScript", "Bootstrap4", "Laravel(8→9)", "MySQL"],
      images: [bookstockImege1, bookstockImege2, bookstockImege3, bookstockImege4],
      url: "https://github.com/sh-kikuchi/toolbox-bookstock",
    },
  ]
}


)





</script>
<style>

</style>
