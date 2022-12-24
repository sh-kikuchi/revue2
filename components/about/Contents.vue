<template>
  <section id="contents">
    <h2 class="text-center pt-3 pb-3">Contents</h2>
        <Grid aOrder="first" bOrder="last">
          <template v-slot:aSide>
            <v-expansion-panels variant="popout">
              <v-expansion-panel v-for="content in state.contents" :key="content">
                <v-expansion-panel-title>{{ content.title }}</v-expansion-panel-title>
                <v-expansion-panel-text>{{ content.text }}</v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
          <template v-slot:bSide >
            <div >
              <p class="text-center">← メインディッシュは4品となっております。Re:Vueプロジェクトを始めた当初からあるコンテンツです。</p>
              <img src="~/assets/images/about/vampire2.png" class="d-block mx-auto" style="width:50%">
            </div>
          </template>
        </Grid>
        <Grid aOrder="first" bOrder="last">
          <template v-slot:aSide>
            <p class="text-center">これらは作りすぎたコンテンツたちです。→</p>
            <img src="~/assets/images/about/vampire3.png" class="d-block mx-auto" style="width:50%">
          </template>
          <template v-slot:bSide>
            <v-expansion-panels variant="popout">
              <v-expansion-panel v-for="content2 in state.contents2" :key="content2">
                <v-expansion-panel-title>{{ content2.title }}</v-expansion-panel-title>
                <v-expansion-panel-text>{{ content2.text }}</v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </Grid>
  </section>
</template>
<script setup>
import Grid from "~~/components/commons/Grid.vue";

const state = reactive({
  contents: [
    {
    title : "About",
    text : "本画面のこと。ここではRe:Vueのトリセツをホームページ風にまとめたページとなっています。以前に個人で作ったことあるデザインをそのまま踏襲してみました。"
    },
    {
    title : "MyApps",
    text : "個人開発で制作したアプリを紹介するページです。個人だけでなく、ユニットを組んで作ったものもここで紹介出来ると良きだと思ってます。"
    },
    {
    title : "Techs",
    text : "自分がプログラミングで学習してきたことをマークダウン形式の記事に記しております。Vue.jsやLaravelなど、言語ごとに記事は分類されています。"
    },
    {
    title : "Designs",
    text : "Vue.jsのスタイルレンダリングによって、CSSの効果を可視化出来るようにしました。画像加工や色相、要素の配置など様々なスタイルを用意しております。"
    }
  ],
  contents2: [
    {
    title : "Landscape",
    text : "写真のギャラリーです。都道府県を回って、その中でお気に入りの写真を載せていきます。"
    },
    {
    title : "Labels",
      text: "カテゴリー別にメモを整理することが出来きます。メモの中にはタイトルと日付、メモ、リスト（ラベル）をまとめることができ、LocalStorageでの保存も可能です。"
    },
    {
    title : "Converts",
    text : "長さや重さ、温度など生活にも使えそうな様々な単位換算が出来ます。"
    },
    {
    title : "Careers",
    text : "スキルシートを作成することが出来ます。CSVのアップデート・ダウンロード機能があるので、自分の職務履歴をデータで管理できます。"
    },
    {
    title : "Generators",
    text : "ランダムで文字列を生成するコンテンツを用意しております。これからもっとバラエティー豊かな●●生成アプリを作っていきます。"
    },
    {
    title : "Games",
    text : "素朴なものが揃ったゲームセンターです。"
    },
  ]
})

</script>
<style scoped>
#contents{
  background-color: rgba(252, 242, 221, 0.2);
}
</style>
