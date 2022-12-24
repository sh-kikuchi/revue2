---
title: 【Vue3】パンくずリスト
description: コンポーネントをつくる
category: vue
createdAt: 2022-09-28
updatedAt: 2022-09-28
sortNumber: 001
path: "/articles/vue/001_breadcrumbs"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. パンくずリストのコンポーネントを作る。](#2-パンくずリストのコンポーネントを作る)
- [3. パンくずリストのコンポーネントを読み込む。](#3-パンくずリストのコンポーネントを読み込む)
- [4. おわりに](#4-おわりに)

<!-- /code_chunk_output -->
<br>

# 1. はじめに

`Home > Middle > Here`のようなリストをパンくずリストって言うんだという体験から自分のアプリで実装した方が良いかなと思って今回まとめてみた。以下のディレクトリはあくまで参考程度に。。

```
├─components
│  └─common
│      └─BreadCrumb.vue
└─pages
    ├─index.vue
```

<br>

# 2. パンくずリストのコンポーネントを作る。
簡略化するため、CSSは省略したので、そのままコピーすると、縦にリストが並んでしまうが、イメージとしてはpropsで配列のデータを受け取り、このコンポーネント内でループすることでリスト化している。Vue-Routerを利用すれば、画面遷移のリンクを作ることが出来る。
```vue
<template>
  <div class="breadcrumb-area">
    <div class="breadcrumb-item">
      <div v-for="(v, index) in breadcrumbs" :key="index">
        <div v-if="v.path">
          <router-link :to="v.path">
            <span>{{ v.name }}</span>
          </router-link>
          <span>></span>
        </div>
        <div v-else>
          <span> {{ v.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    breadcrumbs: {
      type: [],
    },
  },
};
</script>
```
<br>

# 3. パンくずリストのコンポーネントを読み込む。
CompositionAPIなので、setupの中にstateを用意する。そこでパンくずで表示したいリストを配列で用意する。コンポーネントの方でVue-routerなどを使って画面遷移させる場合はpathも用意しておくと良い。

```vue
<template>
  <section>
    <BreadCrumb :breadcrumbs="state.breadcrumbs" />
  </section>
</template>
<script>
import { reactive } from "vue";
import BreadCrumb from "../../components/common/BreadCrumb.vue";
export default {
  name: "",
  components: { BreadCrumb },
  //データ取得
  setup() {
    const state = reactive({
      breadcrumbs: [
        {
          name: "TOP",
          path: "/",
        },
        {
          name: "Middle",
          path: "/middle",
        },
        {
          name: "Here",
        },
      ],
    });
    return {
      state,
    };
  },
};
</script>

```

<br>

# 4. おわりに
下記のURLでパンくずリストがoptionsAPIで紹介されており（投稿日2020年12月15日）、それを参考にしつつもCompositionAPIで書いてみた。

参考
- [Vue.jsでパンくずリスト(手動でページ設定)](https://qiita.com/__Rotl/items/426911809d548dfbdd1b)

</nuxt-content-wrapper>
