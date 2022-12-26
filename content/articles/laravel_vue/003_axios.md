---
title: DBのデータを表示させる
description: HTTP通信をする
category: laravel_vue
createdAt: 2021-06-14
updatedAt: 2021-06-14
sortNumber: 003
path: "/articles/laravel_vue/003_axios"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. web.phpとapi.php](#2-webphpとapiphp)
- [3. Axiosでデータを表示させる](#3-axiosでデータを表示させる)
    - [■ ルーティング](#-ルーティング)
    - [■ コントローラー](#-コントローラー)
    - [■ ビュー](#-ビュー)
    - [■ コンポーネント](#-コンポーネント)
- [4.おわりに](#4おわりに)

<br>

# 1. はじめに
DBに格納されているデータを表示させるのにAxiosのHTTP通信を使ってみたい。データバインディングしておくことで、データに何かしらの変更が加えられた場合にDBに変更点を反映させることができる状態にしようと思ったのがきっかけ。さて、出来るのでしょうか。

<br>

# 2. web.phpとapi.php
[公式ドキュメント](https://readouble.com/laravel/9.x/ja/routing.html)にあるように、ルーティングには、セッション状態やCSRF保護などの機能を提供するwebミドルウェアグループが割り当てられている【web.php】と、基本的にWEB APIを作成する時に用いる【api.php】の2種類が存在する。<br><br>

Laravelのみでの実装であれば【web.php】、フロントは別言語（認証もフロント側）で、API用にLaravelを使う場合は【api.php】を使えば良いが、今回の想定はbladeファイルにコンポーネントを追加する実装方法。認証周りをwebミドルウェアに依拠しているため、簡単にはapi.phpでのルーティングが出来ない（という自分の認識）。ただ、web.phpでもaxiosによるHTTP通信は可能なので、【今回はweb.phpでルーティング】する。

<br>
▼ config/auth.php

```
    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],
```

<br>

# 3. Axiosでデータを表示させる
<div>今回の実装の流れ</div>

-  VueファイルでAxiosでマウント時にget通信する。
-  コントローラー側で、DB処理。その結果をreturnで変数を渡してあげる。
- APIレスポンスから取得されるデータはVue.jsのsetup関数のstate.listsの中に格納するようにしている。

<br>

### ■ ルーティング
▼ web.php
```php
<?php

Auth::routes();

//画面表示
Route::get('/','ListingsController@index');

//DBのデータを表示する機能
Route::get('main','ListingsController@main');
```

<br>

### ■ コントローラー
▼ app\Http\Controllers\ListingsController.php
```php
class ListingsController extends Controller
{
    //認証はwebのミドルウェア
    public function __construct(){
        $this->middleware('auth');
    }

    //画面表示
    public function index(){
         return view('listings.index');
    }

    //データ表示（axiosで通信）
    public function main(){
        $listings = Listing::with(['cards'=>function($query){
            $query->orderBy('sort','ASC');
        }])->where('user_id',Auth::user()->id)->orderBy('sort','ASC')->get();

         return $listings;
    }
}

```
※因みにapi.phpにルーティングを書いて、上記のコントローラーの処理を動かしたいと思っても、Authが使えなかった。

<br>

### ■ ビュー
▼ resources\views\listings\index.blade.php
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

### ■ コンポーネント
▼ resources\assets\js\components\App.vue
```vue
<template>
  <section id="kanban">
    {{ state.lists }}
  </section>
</template>
<script>
import { reactive, onMounted } from "vue";
export default {
  name: "app",
  //データ取得
  setup() {
    const state = reactive({
      lists: [],
    });

    //データ表示機能（AxiosによるHTTP通信）
    async function main() {
       await axios
        .get("main")
        .then(function (res) {
          state.lists = res.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    //mount
    onMounted(() => {
      main();
    });

    return {
      state,
      main,
    };
  },
};
</script>
<style>
</style>

```

<br>

# 4.おわりに
LaravelとVue.jsで実装する時には、LaravelをBladeファイルベースとするか、それともAPIのみの実装にするかという観点での設計検討がかなり重要だということが良く分かった。認証周りがルーティングに影響することも実装を通して、肌感覚で認知出来たのは経験として大きい。下記は主に参考にしたもの。

- [Laravel9.x 公式ドキュメント:ルーティング](https://readouble.com/laravel/9.x/ja/routing.html)
- [Laravel×Vue.jsでaxiosを使ってAPI通信を行う方法](https://migisanblog.com/laravel-vue-axios-api/#vue-js%E3%81%A7axios%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6http%E9%80%9A%E4%BF%A1)
- [vue.jsのcreatedとmountedの違いを目で見て理解](https://reffect.co.jp/vue/vue-js-created-mounted-diffrence#createdmounted)

</nuxt-content-wrapper>
