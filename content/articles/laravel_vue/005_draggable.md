---
title: ドラッグ＆ドロップでトレロ！
description: Vue-draggable-next
category: laravel_vue
createdAt: 2022-06-15
updatedAt: 2022-06-15
sortNumber: 005
path: "/articles/laravel_vue/005_draggable"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. 基本構文](#2-基本構文)
    - [■ まずはインストール](#-まずはインストール)
    - [■ 基本的な書き方](#-基本的な書き方)
- [3. Laravel×Vueでドラッグ\&ドロップ](#3-laravelvueでドラッグドロップ)
    - [■ ビュー/コンポーネント](#-ビューコンポーネント)
      - [列の並べ替え](#列の並べ替え)
      - [カードの並べ替え](#カードの並べ替え)
    - [■ ルーティング](#-ルーティング)
    - [■ コントローラー](#-コントローラー)
- [4.おわりに](#4おわりに)

<br>

# 1. はじめに
LaravelとVue.jsを学習している私が一番にやりたかったことは、ドラッグ＆ドロップができるトレロを作ってみること。tech-pitというサイトでVue.jsとVuexを使ったドラッグ＆ドロップできるトレロを、Laravelでドラッグ＆ドロップできないけど、DB連携しているトレロを作ってみたことがあって、DB連携しつつ、ドラッグ＆ドロップができるトレロが作れないかと思ったのがきっかけ。双方のフレームワークの良さや使い方を知るのに時間を有したが、満を持して2022年6月に挑戦してみた。

<br>

# 2. 基本構文
HTMLのmetaタグに` <meta name="csrf-token" content="{{ csrf_token() }}">`を加えておく。私の場合は下記のように、共通テンプレートにそれを記述した。

### ■ まずはインストール
```php
   npm install -S vuedraggable@next
```
▼ package.jsonを確認
```json
    "dependencies": {
        "vuedraggable": "^4.1.0",
    }
```

<br>

### ■ 基本的な書き方
`<draggable>`タグにv-modelで、バインドさせたい配列またはオブジェクトをセットする。
Vue2仕様のvuedraggable（前バージョン）のようにループを書かずとも、v-modelでセットした配列やオブジェクトがループするようになっている。

```js
<template>
  <draggable v-model="myArray" group="people" item-key="id">
    <template #item="{element}">
      <div>{{element.name}}</div>
    </template>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";

export default {
    components: {
        draggable
    },
}
```

<br>

# 3. Laravel×Vueでドラッグ&ドロップ
コードが長くなるので、該当部分だけを抜粋しながら、整理。

<br>

### ■ ビュー/コンポーネント

▼ resources\views\listings\index.blade.php
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

トレロ風のかんばんボードの実装に使えるコード。列とカードは「1」対「多」の関係で、1つの列につき多くのカードを有することが出来る状態とする。なので、列の数だけループさせて、列の中にあるカードの数だけループさせるという二重ループとなる。（カードの方に列の外部キーをカラムとして持っているという想定）

▼ resources\assets\js\components\App.vue（抜粋）
```vue
<template>
  <section id="kanban">
    <draggable
      tag="div"
      class="kanban-main"
      v-model="state.lists"
      item-key="id"
      @end="listSort"
    >
      <template #item="{ element }">
        <div class="list-item">
          <div class="list-title">{{ element.title }}</div>

          <draggable
            v-model="element.cards"
            item-key="index"
            group="items"
            @end="cardSort"
          >
            <template #item="{ element }">
              <div class="card-item">
                <div class="card-deadline">
                  {{ element.deadline }}
                </div>
                <div class="card-title">
                  {{ element.title }}
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
  </section>
</template>
<script>
import { reactive, onMounted } from "vue";
import draggable from "vuedraggable";
import axios from "axios";

export default {
  name: "app",
  components: {
    draggable,
  },
  props: {
    csrf: {
      type: String,
      required: true,
    },
  },
  //データ取得
  setup(props) {
    const state = reactive({
      lists: [],
    });


    //列の並べ替え
    const listSort = () => {
      //idとsortのJSONデータを生成
      const lists = {};
      lists.id = [];
      for (let i = 0; i < state.lists.length; i++) {
        lists.id.push(state.lists[i].id);
      }
      axios.post("listings/sort", lists).then((response) => {
        // console.log(response);
      });
    };

    //カードの並べ替え
    const cardSort = () => {
      const lists = {};
      lists.data = [];
      for (let i = 0; i < state.lists.length; i++) {
        if (state.lists[i].cards.length > 0) {
          for (let j = 0; j < state.lists[i].cards.length; j++) {
            lists.data.push({
              list_id: state.lists[i].id,
              card_id: state.lists[i].cards[j].id,
            });
          }
        }
      }
      axios.post("cards/sort", lists).then((response) => {
        // console.log(response);
      });
    };

    //表示
    async function main() {
      state.info = await axios
        .get("main")
        .then(function (res) {
          // console.log(res.data);
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
      ・・・
      listSort,
      cardSort,
    };
  },
};
</script>
<style>
</style>

```

<br>

カードの`<draggable>`タグにgroupを付けることで、列間のカード移動が簡単に実装できる。 `@end`はドラッグ＆ドロップし終わった後にイベントを呼び出すことができる。ここでは、列やカードが移動した時に、並べ替えの処理が動くようになっている。

<br>

#### 列の並べ替え
列の数だけループをする。列が並んでいる順番にIDをJSONデータ(風)に格納している。そのデータをコントローラーに渡している。

```js
    const listSort = () => {
      //idとsortのJSONデータを生成
      const lists = {};
      lists.id = [];
      for (let i = 0; i < state.lists.length; i++) {
        lists.id.push(state.lists[i].id);
      }
      axios.post("listings/sort", lists).then((response) => {
        console.log(response);
      });
    };
```

<br>

#### カードの並べ替え
カードも列と理屈は同じで列の並び順にループし、それぞれの列の中もカードが並んでいる順番にループする。列のIDとそれに属するカードのIDをセットでデータを作って、コントローラーに渡している。

```js
    const cardSort = () => {
      const lists = {};
      lists.data = [];
      for (let i = 0; i < state.lists.length; i++) {
        if (state.lists[i].cards.length > 0) {
          for (let j = 0; j < state.lists[i].cards.length; j++) {
            lists.data.push({
              list_id: state.lists[i].id,
              card_id: state.lists[i].cards[j].id,
            });
          }
        }
      }
      axios.post("cards/sort", lists).then((response) => {
        // console.log(response);
      });
    };
```

<br>

### ■ ルーティング
Vue.js側でデータをLaravel側に送れるようになったところで、まずはルーティング。並べ替え処理用のメソッドを用意する。

▼ routes\web.php
```php 

//リスト並べ替え処理
Route::post('listings/sort','ListingsController@sort');

//カード並べ替え処理
Route::post('cards/sort','CardsController@sort');

```

<br>

### ■ コントローラー
Vueから送られてきたデータはソート順に並んでいるので、テーブルにソート用カラムを用意するなどして、
並び順を保存する。ステータスコードを返してあげると親切。

▼ app/Http/Controllers/ListingsController.php
```php 
<?php

namespace App\Http\Controllers;

use App\Listing;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class ListingsController extends Controller
{

　　・・・

    public function sort(Request $request) {
        try {
            for($i=0;$i<count($request->id);$i++){
                $listing = Listing::find($request->id[$i]);
                $listing->sort = (string) $i;
                $listing->save();
            };
          　//ステータスコード
            $message="SUCCESS";
            $http_status = Response::HTTP_OK;

        } catch (\Exception $e) {
            $e->getMessage();
            $message="DB ERROR!";
            $http_status = Response::HTTP_INTERNAL_SERVER_ERROR;
        }

        return response()->json($message, $http_status);
    }
}
```

<br>

▼ app/Http/Controllers/CardsController.php(抜粋)
```php 
<?php

namespace App\Http\Controllers;

use App\Card;
use Illuminate\Http\Request;
use \Symfony\Component\HttpFoundation\Response;

class CardsController extends Controller
{

    ・・・

    public function sort(Request $request) {
        try {
            for($i=0; $i < count($request->data); $i++){
                $cards = Card::find($request->data[$i]['card_id']);
                $cards->listing_id = $request->data[$i]['list_id'];
                $cards->sort = (string) $i;
                $cards->save();
            }
            //ステータスコード
            $message="SUCCESS";
            $http_status = Response::HTTP_OK;
        } catch (\Exception $e) {
            $e->getMessage();
            $message="DB ERROR!";
            $http_status = Response::HTTP_INTERNAL_SERVER_ERROR;
        }

        return response()->json($message, $http_status);
    }

}

```

<br>


# 4.おわりに
今は公開していない（2022/06/15時点）Yuu’s MemoでLaravelとVue.jsを使ってトレロを作っているのを見て、自分も作ってみたいと思った（その前にLaravelだけでドラッグ＆ドロップの出来ないトレロは作っていた）。下記のサイトを参考にしつつ、`vue.draggable`の書き方がVue2と3で変わっているじゃないかという文句を言いつつ、ついに実装出来た。これはかなりの達成感があり、友人・知人に出来た!と言っては見せびらかしたとさ。

- [Draggable-vuedraggable-GitHub Pages](https://sortablejs.github.io/vue.draggable.next/#/two-lists)
- [【Vue3】vue.draggable.nextの使い方を丁寧に解説](https://shiro-changelife.com/vue3-vuedraggable-next/)
- [Vue.jsでドラッグ＆ドロップするなら「Vue.Draggable」がおすすめ](https://www.kabanoki.net/1712/)

</nuxt-content-wrapper>
