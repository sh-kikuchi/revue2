<script setup>
import 'revuekitz/dist/style.css'
import { GridColumn } from 'revuekitz'
import { GridRow } from 'revuekitz'
import { AccordionMenu } from 'revuekitz'

const lists = ref(
  [
    {
      title : "About",
      items : ["本画面のこと。ここではRe:Vueのトリセツをホームページ風にまとめたページとなっています。以前に個人で作ったことあるデザインをそのまま踏襲してみました。"]
    },
    {
      title : "MyApps",
      items : ["個人開発で制作したアプリを紹介するページです。個人だけでなく、ユニットを組んで作ったものもここで紹介出来ると良きだと思ってます。"]
    },
    {
      title : "Techs",
      items : ["自分がプログラミングで学習してきたことをマークダウン形式の記事に記しております。Vue.jsやLaravelなど、言語ごとに記事は分類されています。"]
    },
    {
      title : "Designs",
      items : ["Vue.jsのスタイルレンダリングによって、CSSの効果を可視化出来るようにしました。画像加工や色相、要素の配置など様々なスタイルを用意しております。"]
    }
  ],
);
const lists2 = ref(
  [
    {
      title : "Landscape",
      items : ["写真のギャラリーです。都道府県を回って、その中でお気に入りの写真を載せていきます。"]
    },
    {
    title : "Labels",
    items: ["カテゴリー別にメモを整理することが出来きます。メモの中にはタイトルと日付、メモ、リスト（ラベル）をまとめることができ、LocalStorageでの保存も可能です。"]
    },
    {
    title : "Converts",
    items : ["長さや重さ、温度など生活にも使えそうな様々な単位換算が出来ます。"]
    },
    {
    title : "Careers",
    items : ["スキルシートを作成することが出来ます。CSVのアップデート・ダウンロード機能があるので、自分の職務履歴をデータで管理できます。"]
    },
    {
    title : "Generators",
    items : ["ランダムで文字列を生成するコンテンツを用意しております。これからもっとバラエティー豊かな●●生成アプリを作っていきます。"]
    },
    {
    title : "Games",
    items : ["素朴なものが揃ったゲームセンターです。"]
    },
  ],
);


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
<template>
  <section id="contents">
    <h2 class="text-center pt-3 pb-3 ma-0">Contents</h2>
    <div class="pa-4">
      <GridRow>
         <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
          <AccordionMenu :lists = lists></AccordionMenu>
        </GridColumn>
        <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
          <div>
            <p class="text-center">← メインディッシュは4品となっております。Re:Vueプロジェクトを始めた当初からあるコンテンツです。</p>
            <img src="~/assets/images/about/vampire2.png" class="d-block mx-auto" style="width:50%">
          </div>
        </GridColumn>
      </GridRow>     
    </div>
    <div class="pa-4">
      <GridRow>
        <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
          <p class="text-center">これらは作りすぎたコンテンツたちです。→</p>
          <img src="~/assets/images/about/vampire3.png" class="d-block mx-auto" style="width:50%">
        </GridColumn>
        <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
            <AccordionMenu :lists = lists2></AccordionMenu>
        </GridColumn>
      </GridRow>
    </div>    
  </section>
</template>
<style scoped>
#contents{
  background-color: rgba(252, 242, 221, 0.2);
}
</style>
