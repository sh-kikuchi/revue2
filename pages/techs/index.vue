<script setup>
import { reactive } from 'vue';
import Wrapper   from "@/components/global/layouts/Wrapper.vue";
import PageTitle from "@/components/global/displays/PageTitle.vue";

const state = reactive({
  langsData: [
    {
      id: 1,
      name: "HTML/CSS",
      link: "/techs/",
      summery: "マークアップ言語とデザインを学ぶ",
      params: "html_css"
    },
    {
      id: 2,
      name: "JavaScript",
      link: "/techs/JavaScript",
      summery: "JavaScriptとjQueryを知る",
      params: "javascript"
    },
    {
      id: 3,
      name: "Vue.js",
      link: "/techs/vue",
      summery: "はじめて自主的に触ったフレームワーク",
      params: "vue"
    },
    {
      id: 4,
      name: "Nuxt.js",
      link: "/techs/nuxt",
      summery: "ただでさえ、Vueの時点で既にFWなのに",
      params: "nuxt"
    },
    {
      id: 5,
      name: "PHP/MySQL",
      link: "/techs/php",
      summery: "我流フレームワークを作ってみる",
      params: "php",
    },
    {
      id: 6,
      name: "Laravel",
      link: "/techs/laravel",
      summery: "個人開発での実装経験まとめ",
      params: "laravel",
    },
    {
      id: 7,
      name: "Laravel×Vue",
      link: "/techs/vue_laravel",
      summery: "Vue.jsとLaravelの夢の共演",
      params: "laravel_vue",
    },
    {
      id: 8,
      name: "Flutter",
      link: "/techs/flutter",
      summery: "Dash、好きなキャラ。",
      params: "flutter",
    },
    {
      id: 9,
      name: "Express.js",
      link: "/techs/express",
      summery: "JSのサーバーサイド",
      params: "express",
    },
    {
      id: 99,
      name: "闇鍋",
      link: "/articles/yaminabe",
      summery: "カテゴライズ出来ぬ者たち",
      params: "darkpot",
    },
  ],
});
</script>
<template>
  <PageTitle title="Tech articles" />
  <Wrapper>
    <!-- langs配列からリストを表示 ...（2）-->
    <div>
      <div link v-for="lang in state.langsData" v-bind:key="lang.id" tag="div" class="lang-list pa-1">
        <nuxt-link v-bind:to="{ path: 'techs/' + lang.params, params: { lang: lang.params } }" class="nuxt-link">
          <h4 class="pl-2 ma-0">{{ lang.name}}</h4>
          <div class="pl-4">{{ lang.summery }}</div>
        </nuxt-link>
      </div>
    </div>
  </Wrapper>
</template>
<style scoped>
.techs-articles {
  max-width: 820px;
  margin: 0 auto;
}

.navigation {
  color: black;
  text-decoration: none;
}

.navigation:hover {
  color: darkslategray;
}

.nuxt-link {
  max-width: 820px;
  color: black;
  text-decoration: none;
}

.lang-list:nth-child(even) {
  background-color: rgb(241, 241, 243);
}

.lang-list:nth-child(odd) {
  background-color: rgb(225, 231, 238);
}
</style>
