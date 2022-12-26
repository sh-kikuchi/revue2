---
title: bladeファイルにコンポーネント追加する
description: ちゃっかりCompositionAPIを導入
category: laravel_vue
createdAt: 2021-06-13
updatedAt: 2021-06-13
sortNumber: 002
path: "/articles/laravel_vue/002_vue3_setting"
---
<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. CompositionAPIを使うために](#2-compositionapiを使うために)
- [3.コンポーネント追加のイメージ](#3コンポーネント追加のイメージ)
    - [■ ルーティング](#-ルーティング)
    - [■ コントローラー](#-コントローラー)
    - [■ ビュー](#-ビュー)
    - [■ コンポーネントの呼び込み部分](#-コンポーネントの呼び込み部分)
    - [■ コンポーネント](#-コンポーネント)
- [4.おわりに](#4おわりに)

<br>

# 1. はじめに
●●.blade.phpにコンポーネントを追加するという形でVue.jsを取り入れてみる。しかもVue.jsはCompositionAPIで書くこととする。ここでは、CompositionAPIの書き方自体の言及はしないが、その環境の整え方についてまとめておく。

<br>

# 2. CompositionAPIを使うために
> ▼resources/assets/js/app.js
```js
require('./bootstrap');

import { createApp } from 'vue'
import App from './components/App.vue'

createApp({
  components: {
    App
  }
}).mount('#app')

```

<br>

# 3.コンポーネント追加のイメージ

### ■ ルーティング
▼ views/listings/vue
```
Route::get('/','ListingsController@index');
```

<br>

### ■ コントローラー
▼ app\Http\Controllers\ListingsController.php
```php
    public function index(){
         return view('listings.index');
    }
```

<br>

### ■ ビュー
▼ resources\views\listings\index.blade.php）
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

### ■ コンポーネントの呼び込み部分
※Vue3をインストール時に自動で作成される`App.vue`のコンポーネントを使用<br>
▼ resources\assets\js\components\App.vue
```js
    <div id="app">
        <App></App>
    </div>
```
※ 下記コードの書く場所は本記事より良い場所があるかもしれない。` @extends('layouts.login')`が
位置する共通のビューテンプレート部分に記述しても上手くVue.jsが読み込めなかったため、
index.blade.php内に記述した。
```js
<script src="{{ asset('js/app.js') }}" defer="defer"></script>
```

<br>

### ■ コンポーネント
> ここでは便宜上、簡単なコードサンプルを乗せるのみにとどめる。
▼ resources\assets\js\components\App.vue
```vue
<template>
    <div class="container">
        <div>
            <div>{{ message }}</div>
            <div class="card">
                <div class="card-header">Laravel×Vue.js</div>
                <div class="card-body">
                    using CompositionAPI
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { ref } from "vue";
    export default {
        setup() {
            const message = ref("Hello Vue 3");

            return {
              message
            };
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
```

<br>

# 4.おわりに
Laravelのバージョンがやや古くとも[Laravel8でVue 3を使う](https://reffect.co.jp/laravel/laravel8-vue3)が参考になる。もし、LaravelにVue.jsをインストールした後に軽く動作確認をしたい場合は参考になるだろう。

</nuxt-content-wrapper>
