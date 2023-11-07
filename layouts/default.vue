<template>
<v-app>
  <!-- Navigation Bar -->
  <NavigationBar
    :style="state.style.navigationBar"
    v-model="drawer"
    />

  <!-- Header -->
  <v-app-bar :style="state.style.header" app>

    <!-- LeftSIde -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <nuxt-link to='/' class="nuxt-link"><h2 class="ml-3">Re:vue</h2></nuxt-link>

    <!-- RightSIde -->
    <template v-slot:append>
      <div v-for="(listItem, index) in state.listItems" router exact :key="index">
        <NavListItem class="px-2" :to=listItem.to :icon=listItem.icon :linkName=listItem.linkName />
      </div>
      <v-dialog v-model="dialog" scrollable width="500">
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <v-icon class="v-icon" size="24">mdi-clipboard-check</v-icon>
            <div class="link-name">policy</div>
          </div>
        </template>
        <v-card>
          <v-card-title>Site Policy</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
          <v-list v-for="content in state.contents" :key="content">
            <v-list-item>{{ content.title }}</v-list-item>
            <v-list-item>{{ content.text }}</v-list-item>
          </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-app-bar>

  <!-- Body -->
  <v-main :style="state.style.bodyContainer">
    <v-container fluid class="pa-0">
      <!-- to page/index.vue -->
      <NuxtPage />
    </v-container>
  </v-main>

  <!-- Footer -->
  <v-footer :style="state.style.footer" app>
    <div class="mx-auto text-white">
      2021-{{ new Date().getFullYear() }}-<strong>Re:Vue</strong>
    </div>
  </v-footer>
</v-app>
</template>
<script setup>
import { reactive, ref } from 'vue'
import NavigationBar from "~~/components/private/layouts/NavigationBar";
import NavListItem   from '~~/components/public/atoms/layouts/NavListItem.vue';

const drawer = ref(false);
const dialog = ref(false);

const state = reactive({
  style: {
    navigationBar: "background-color: rgb(241, 241, 243)",
    header: " display:block; width: 100vw; height:65px; background-color: rgb(225, 231, 238)",
    bodyContainer: "background-color: rgb(183, 204, 219)",
    footer: "height:40px; background-color: rgb(62, 60, 65)"
  },
  listItems: [
    {
      to: "/about",
      icon: "mdi-information-outline",
      linkName: "About",
    },
  ],
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
.navigation-item:active {
  background-color: lightgray;
}
.v-icon {
  display: block;
  width: 24px;
  margin: 0 auto;
  color:grey;
}

.link-name {
  font-size: 8px !important;
  text-align: center;
  color:grey;
}

h2{
  color:black;
}
.nuxt-link{
  text-decoration: none;
}
</style>
