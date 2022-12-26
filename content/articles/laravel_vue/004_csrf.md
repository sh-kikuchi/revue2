---
title: VueコンポーネントからLaravelのControllerにPOST送信
description: FormのCSRF Tokenの扱い方
category: laravel_vue
createdAt: 2021-06-14
updatedAt: 2021-06-14
sortNumber: 004
path: "/articles/laravel_vue/004_csrf"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. HTMLのmetaタグ](#2-htmlのmetaタグ)
- [3. blade上でcsrf tokenを取得するには？](#3-blade上でcsrf-tokenを取得するには)
    - [■ コンポーネント](#-コンポーネント)
- [4.おわりに](#4おわりに)

<br>

# 1. はじめに
Laravel単体での実装でフォームを使う時にCSRFは下記のように、フォームタグの中に@csrfを入れるだけで済む。ただし、Vue.jsのコンポーネントの中で@csrf Bladeディレクティブを使用することが出来ないため、一工夫が必要になることが実装に中に分かったので、今回はそれをまとめてみます。
```php
<form>
    @csrf
</form>
```

<br>

# 2. HTMLのmetaタグ
HTMLのmetaタグに` <meta name="csrf-token" content="{{ csrf_token() }}">`を加えておく。私の場合は下記のように、共通テンプレートにそれを記述した。

▼ resources/views/layouts/app.blade.php
```php
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
```

<br>

# 3. blade上でcsrf tokenを取得するには？
本記事より前の記事では、コンポーネント追加のコードは`<App></App>`だったが、propsを使って、
bladeファイル上でcsrf tokenを取得するロジックを作ることができる。

▼ 【変更前】resources\views\listings\index.blade.php
```php 

   @extends('layouts.login')
    @section('content')
    <div id="app">
        <App></App>
    </div>
    //resources/assets/js/app.jsで書いたVueの設定を読み込む
    <script src="{{ asset('js/app.js') }}" defer="defer"></script>
    @endsection
```

<br>

▼ 【変更後】resources\views\listings\index.blade.php
```php 

   @extends('layouts.login')
    @section('content')
    <div id="app">
       <App :csrf="{{json_encode(csrf_token())}}"></App>
    </div>
    //resources/assets/js/app.jsで書いたVueの設定を読み込む
    <script src="{{ asset('js/app.js') }}" defer="defer"></script>
    @endsection
```

<br>

### ■ コンポーネント
 `@csrf`のかわりに`<input hidden name="_token" :value="csrf" />`を追加する形となる。

▼ resources\assets\js\components\App.vue
```vue
<template>
    <form>
        <input hidden name="_token" :value=" props.csrf" />
    </form>
</template>
<script>
import { reactive, onMounted } from "vue";

export default {
  name: "app",
  props: {
    csrf: {
      type: String,
      required: true,
    },
  },
  //データ取得
  setup() {
    const state = reactive({
      lists: [],
    });
  };
};
</script>
<style>
</style>

```

<br>

# 4.おわりに
下記のものを参考にしたものの、断片的で実装するのに時間はかかったような気はする。
やっぱりVue.jsのSPAとLaravel（API側）の実装の方がスマートな気はする。とはいえ、今回目指すのは、既存（もう本番で動かしているような）のLaravelアプリにコンポーネントを加えることだから、その中でベストプラクティスを探せればOKとしよう。

- [Larave9.x CSRF保護](https://readouble.com/laravel/9.x/ja/csrf.html)
- [Larave + Vue で普通にFormを使う際のCSRF Token処理](https://qiita.com/U-T/items/2a0fc3d9f9b02ede777a)
- [Laravel CSRF Token in Vue](https://laracasts.com/discuss/channels/vue/laravel-csrf-token-in-vue)


</nuxt-content-wrapper>
