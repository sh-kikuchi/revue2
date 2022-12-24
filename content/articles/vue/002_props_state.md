---
title: 【Vue3】propsの値を子コンポーネントでリアクティブにする（？）
description: computedでstateを管理する
category: vue
createdAt: 2022-09-28
updatedAt: 2022-09-28
sortNumber: 002
path: "/articles/vue/002_props_state"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. propsで値を子コンポーネントへ](#2-propsで値を子コンポーネントへ)
- [3. computedの出番です（子コンポーネント）](#3-computedの出番です子コンポーネント)
- [4. おわりに](#4-おわりに)

<!-- /code_chunk_output -->

<br>

# 1. はじめに
今回はpropsで受け取った値をstateに突っ込んで、リアクティブな状態にしてみたい。これは更新画面を作る時に調べてみたことで子コンポーネントのpropsで受け取った値に対する変更を親に反映する方法もあるのだが、子コンポーネントだけでリアクティブに使えればよかったので、その前提で本記事をまとめてみた。

<br>

# 2. propsで値を子コンポーネントへ
親コンポーネントのサンプル。ここはただ子コンポーネントにpropsで値を送るよ～ってだけ。
```vue
<template>
  <section>
    <test-update
      :testTitle="state.testTitle"
    ></test-update>
  </section>
</template>
<script>
import { reactive } from "vue";
//▼ ここ適当だけど、コンポーネントを読み込む
import testUpdate from "../../components/testUpdate.vue"; 

export default {
  name: "",
  components: {
    testUpdate,
  },
  //データ取得
  setup() {
    const state = reactive({
      testTitle: "test",
    });

    return {
      state,
    };
  },
};
</script>

```

<br>

# 3. computedの出番です（子コンポーネント）
computedのgetでまず、propsの値を受け取って、stateにデータをsetしている。stateで管理することでリアクティブな状態にしている。以下のコードではValueという変数にinputの更新された値が入ってくる感じ。
```vue
<template>
  <div class="test-content">
      <div class="test-title">
        <label>テストタイトル</label>
        <input
          type="text"
          v-model="editTestTitle"
        />
      </div>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
export default {
  props: {
    testTitle: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const state = reactive({
      test_title: "",
    });
    const editTestTitle = computed({
      get() {
        return props.testTitle;
      },
      set(value) {
        return (state.test_title = value);
      },
    });
    return {
      state,
      editTestTitle,
    };
  },
};
</script>
```

<br>

# 4. おわりに
今回はpropsの値をstateに入れ替えてリアクティブな状態にするという形をやってみた。propsの値を書き換えること自体はあまり推奨されないみたいだが、子コンポーネントのpropsで受け取った値に対する変更を親に反映する方法はあるみたい（下記URL）。自分がやりたかったことは編集画面にpropsで値を渡して、その値をリアクティブにしてサーバーサイド側で更新処理を走らせたいということだったので、上記のやり方をしてみた。以下のURLはcomputedの使い方がとても参考になった。

参考
- [[Vue3] propsで受け取った値をv-modelにセットする](https://wonwon-eater.com/vue-v-model/)

</nuxt-content-wrapper>
