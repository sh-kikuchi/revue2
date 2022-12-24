---
title: 【Vue3】Markdownエディタ
description: パッケージmarkedを使う
category: vue
createdAt: 2022-09-29
updatedAt: 2022-09-29
sortNumber: 003
path: "/articles/vue/003_markdown"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. コード例](#2-コード例)
    - [■ template](#-template)
    - [■ script](#-script)
- [3. おわりに](#3-おわりに)

<!-- /code_chunk_output -->

<br>

# 1. はじめに
公式ドキュメントにMarkdownエディタという興味深いコーディングを見つけた。アプリ実装する際に参考にしたので、ここでまとめておく。なお、公式ではOptionAPIで書かれているが、ここではCompositionAPIにアレンジしてみた。下記のパッケージがインストール済みであることが前提。

※使用パッケージ
下記のものを`npm install --save 〇〇`でインストールしておいた
- "marked": "^4.1.0"
- "lodash": "^4.17.21"

<br>

# 2. コード例
例文を提示してから細かく見ていくスタイルで。

```vue
<template>
  <section>
      <textarea
        v-model="state.input"
        @input="stateUpdate"
      ></textarea>
      <div v-html="compiledMarkdown"></div>
  </section>
</template>
<script>
import { reactive, computed } from "vue";
import { marked } from "marked";
import { debounce } from "lodash";
export default {
  name: "",
  setup() {
    const state = reactive({
      input: "# hello",
    });

    const compiledMarkdown = computed(() => marked(state.input));

    //内容を編集した時のステート更新
    const stateUpdate = debounce((e) => {
      state.input = e.target.value;
    }, 3000);

    return {
      state,
      compiledMarkdown,
    };
  },
};
</script>
```

<br>

### ■ template
@input で input 要素の value が変更されたイベントを補足出来る。Vue3のドキュメントでもMarkdownの例として使われているが、`<textarea>`タグにも使えるんだという気づきを得た。ここでは`<textarea>`の中身が変わる度に`stateUpdate`というイベントを動かすようにしている。

<br>

マークダウンを表示するのは`compiledMarkdown`の部分にあたる。v-htmlを使って表示しているが、markdownを表示されるのに`marked`というありがたいパッケージがあるのでそれを利用。それは後の説明。

```vue
<template>
  <section>
      <textarea
        v-model="state.input"
        @input="stateUpdate"
      ></textarea>
      <div v-html="compiledMarkdown"></div>
  </section>
</template>
```

<br>

### ■ script
`<script>`タグ中のsetup()の中身には、テキスト内容をstate管理する処理とstateで管理しているテキストデータをmarkdownに変換する処理がある。


まず`<textarea>`を見ていく。入力に変化があると`stateUpdate`(自分で用意した関数)が走る。入力値（`e.target.value`)をstateに格納している。入力するたびに`stateUpdate`が動くため、何も対策しないと1字ごとに更新されちゃって、まとまった文章がstateで管理できない。そのような連続する呼び出しを遅らせることができるのが`denounce`である。これで入力が止まった時点state更新をすることができる。システムの処理の負荷を下げることにもなって良い。
```js
  const stateUpdate = debounce((e) => {
    state.input = e.target.value;
  }, 3000);
```

<br>

上記でstateにテキスト内容がデータバインディングされているので、その内容をマークダウン形式にする訳だが、
`compiledMarkdown`という関数を用意して、`marked`というパッケージを使うことで`marked()`でマークダウンで表示できる。computedで内容が変わるたびに最新を反映することができる。※ここで用意した関数は`v-html`で結びつけている。（`template`部分を参照）
```js
const compiledMarkdown = computed(() => marked(state.input));
```

<br>

# 3. おわりに
Vue3公式ドキュメントで「Markdownエディタ」が紹介されている。Vue3だからCompositionAPIかと思いきや「OptionAPIかい！」と思いながらCompositionAPIに書き換えてみた。パッケージを入れないかの言及もそのサイトで欲しかったなと思いつつも作業し、形になったのでうれしい限り。
- [Markdown エディタ](https://v3.ja.vuejs.org/examples/markdown.html)
- [codit](https://www.codit.work/notes/66ozk1xdscehsuxdm3i8/)
- [React, Vue.js, JavaScriptでdebounceの仕組みを理解](https://reffect.co.jp/html/javascript-debounce#Debounce)

</nuxt-content-wrapper>
