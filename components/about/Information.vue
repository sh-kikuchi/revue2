<template>
  <section id="Information"  class="py-4">
    <h2 class="text-center  mb-3">Information</h2>
    <div class="colStyle">
      <v-list v-for="content in state.contents" :key="content">
        <v-list-item>{{ content.title }}</v-list-item>
        <v-list-item>{{ content.text }}</v-list-item>
      </v-list>
    </div>
  </section>
</template>
<script setup>
const state = reactive({
  contents: [
    {
      title: "免責事項",
      text: "  当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。"
    },
    {
      title: "著作権について",
      text: "当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。"
    },
    {
      title: "プライバシーポリシー",
      text: " re:vue（以下、「当サイト」と言います。）では、以下に定めるプライバシーポリシーに従って、個人情報を安全かつ適切に取り扱うことを宣言いたします。ただし、現時点で個人情報を取得するようなことはありません。"
    },
    {
      title: "個人情報の定義",
      text: " 本プライバシーポリシーにおいて、個人情報とは生存する個人に関する情報であって、氏名、メールアドレス等、特定の個人を識別することができるものをいいます。"
    },
    {
      title: "アクセス解析ツールについて",
      text: " 当サイトは、Googleが提供するアクセス解析ツール「Googleアナリティクス」を利用しています。Googleアナリティクスは、Cookieを使用することで利用者のトラフィックデータを収集しています。利用者はブラウザの設定でCookie（クッキー）を無効にすることで、トラフィックデータの収集を拒否することができます。なお、トラフィックデータから利用者個人を特定することはできません。詳しくはGoogleアナリティクス利用規約(https://marketingplatform.google.com/about/analytics/terms/jp/) をご確認ください。（Cookieとは、利用者のサイト閲覧履歴を利用者のコンピュータにデータとして保存しておく仕組みのこと）"
    },
    {
      title: "本ポリシーの変更",
      text: " 当サイトは、法令の制定、改正等により、本ポリシーを適宜見直し、予告なく変更する場合があります。本ポリシーの変更は、変更後の本ポリシーが当サイトに掲載された時点、またはその他の方法により変更後の本ポリシーが閲覧可能となった時点で有効になります。"
    },
  ]
});
</script>
<style scoped>
#Information {
  background-color: rgba(110, 110, 110, 0.2);
}
.colStyle{
  max-width: 800px;
  height: 500px;
  margin: 0 auto;
  overflow-y: scroll;
}
</style>
