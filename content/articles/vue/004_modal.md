---
title: 【Vue3】モーダル
description: CompositionAPI版。
category: vue
createdAt: 2022-11-07
updatedAt: 2022-12-25
sortNumber: 004
path: "/articles/vue/004_modal"
---


<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. モーダルを表示する画面（ボタン）](#2-モーダルを表示する画面ボタン)
- [3. モーダル本体](#3-モーダル本体)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
Vue3（CompositionAPI）でモーダルを作成してみる。極力シンプルなコーディングを心がけ、拡張性高いものを作ってみたいという試みでもある。

<br>

# 2. モーダルを表示する画面（ボタン）
```vue
<template>
  <div>
    <a class="js-modal-open" @click="showTestModal"> モーダルを開く</a>
  </div>
  <TestModal :isVisible="state.testModalVisible" @close="closeTestModal" />
</template>
<script>
import { reactive } from "vue";
import TestModal from "../../components/kanban/modals/TestModal.vue";
export default {
  components: {
    TestModal,
  },
  setup(props) {
    const state = reactive({
      testModalVisible: false,
    });
    const showTestModal = () => {
      state.testModalVisible = true;
    };
    const closeTestModal = () => {
      state.testModalVisible = false;
    };
    return {
      state,
      showTestModal,
      closeTestModal,
    };
  },
};
</script>
<style scoped>
</style>

```

<br>

# 3. モーダル本体
```vue
<template>
  <div class="modal" id="list-modal" v-show="isVisible" @click="close"></div>
  <div class="modal-content" v-show="isVisible">
    <div class="create-form">
      <h3 class="modal-title">モーダル</h3>
      <p class="modal-close-btn" @click="close">閉じる</p>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  props: {
    isVisible: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
  setup() {
    const state = reactive({
      message: "TEST",
    });
    return {
      state,
    };
  },
};
</script>
<style scoped></style>
```

<br>

# 4. おわりに
モーダルを表示させるには、画面側でモーダルの表示/非表示を制御すればよく、シンプルな実装が出来る。またVue.jsを学習するという観点に立つとpropsとemitを使うことで親子コンポーネント間の変数のやり取りが学べるという点、良い教材にもなりそうだ。

</nuxt-content-wrapper>
