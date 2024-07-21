<template>
  <div v-for="(app,i) in state.apps" :key="i">
    <div class="card-content">
      <PrivateCard
        :sub_title="app.sub_title" 
        :main_title="app.main_title" 
        :explain="app.explain" 
        :skills="app.skills" 
        :url="app.url" 
        :period="app.period"
        :btn="app.btn"
      />
    </div>
  </div>
</template>
<script setup>
import PrivateCard from './PrivateCard.vue';

const state = reactive({
  apps: [
    {
      sub_title: "Portfolio",
      main_title: "toolbox",
      period: "2021-4-(工事中)",
      explain: "お道具箱のようなマルチアプリ（かんばんボード/ブックメモ/Wiki)　 テストアカウント：【email】test@test.com 【password】testtest",
      skills: ["HTML", "CSS", "Vue3", "MySQL", "Laravel(5.5→10)"],
      url: "https://sk-kanban.herokuapp.com/#/",
      btn: "link"
    },
    {
      sub_title: "Portfolio",
      main_title: "Diary...",
      period: "2023-7-26-現在",
      explain: "日記アプリ。一日の気分を天気に例えて、振り返ってみるもの。",
      skills: ["Flutter", "SQLite"],
      url: "https://play.google.com/store/apps/details?id=com.revue.diary&pli=1",
      btn: "link"
    },
    {
      sub_title: "Portfolio",
      main_title: "the elephant in the room",
      period: "2023-7-26-現在",
      explain: "私の推しのディレクトリで構成された「なんちゃって」PHPフレームワーク。オブジェクト指向の勉強も兼ねている。",
      skills: ["PHP"],
      url: "https://github.com/sh-kikuchi/the-elephant-in-the-room",
      btn: "git"
    },
    {
      sub_title: "Portfolio",
      main_title: "cosmos (@141hcutw)",
      period: "2023-2-現在",
      explain: "NASA-APIを使って作成したLINEBot。現段階では、日付を入力するとその日の宇宙の記事（写真付）を見ることができる（英語）",
      skills: ["Ruby on Rails"],
      url: "https://github.com/sh-kikuchi/cosmos",
      btn: "git"
    },
    {
      sub_title: "Portfolio",
      main_title: "Fish-Cuisine-Market",
      period: "2022-9-現在",
      explain: "おさかな定食を記録する図鑑（食事記録）。働いていた豊洲にちなんで「魚」をテーマにしたアプリを作成。",
      skills: ["React", "Express", "PostgreSQL"],
      url: "https://github.com/sh-kikuchi/Fish-Cuisine-Market",
      btn: "git"
    },
]})
</script>
<style scoped>
.card-content{
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: whitesmoke;
}
</style>
