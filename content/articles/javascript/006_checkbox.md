---
title: チェックボックスの全選択と全削除
description: jQueryの利用
category: JavaScript
createdAt: 2022-01-14
updatedAt: 2022-08-21
sortNumber: 6
path: "/articles/javascript/006_checkbox"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. htmlの編集](#2-htmlの編集)
- [2. JavaScriptの編集](#2-javascriptの編集)
- [3.おわりに](#3おわりに)

<br>

# 1. はじめに
jQueryを使って、チェックボックスの全選択と全解除をする。ディレクトリは下記のようにつくってみた。
```
│── js
│   │── script.js
│
│── index.html  
│  
```

<br>

# 2. htmlの編集
- 忘れずに`<script>`タグを追加しましょう。
  ```html
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="./js/script.js"></script>
  ```

- 全選択用、個々の選択肢用にチェックボックスを用意します。全選択をチェックしたら、選択肢もチェックが付くようにします。解除の時		も同様です。ボタンを押した時に配列の形で値を出します。
  ```html
  <!-- 全選択 -->
  <label><input type="checkbox" id="check_all" name="check_all">すべて</label>

  <!-- 選択肢 -->
  <div id="items">
    <label><input type="checkbox" name="items" value="A" class="item">選択肢A</label>
    <label><input type="checkbox" name="items" value="B" class="item">選択肢B</label>
    <label><input type="checkbox" name="items" value="C" class="item">選択肢C</label>
  </div>

  <!-- ボタン -->
  <input type="button" value="配列" id="get_values">
  ```

<br>

# 2. JavaScriptの編集
```js
$(function () {
  // チェックボックスの全選択・解除
  $('#check_all').on('change', function () {
    // 「選択肢」のチェック状態を切替える
    $('.item').prop('checked', $(this).is(':checked'));
  });

  $('.item').on('change', function () {
    // 「全選択」のチェック状態を切替える
    if ($('#items :checked').length == $('#items :input').length) {
      $('#check_all').prop('checked', true);
    } else {
      $('#check_all').prop('checked', false);
    }
  });

  // チェックした値を配列で取得
  $('#get_values').on('click', function () {

    var vals = $('input[name="items"]:checked').map(function () {
      return $(this).val();
    }).get();

    console.log(vals);
  });
});
```
- 全選択をチェックした時、選択肢のチェック状態を切り替えます。選択肢は共通のクラス名として「item」をつけています。
  ```js
    $('#check_all').on('change', function () {
      // 「選択肢」のチェック状態を切替える
      $('.item').prop('checked', $(this).is(':checked'));
    });
  ```

- 今度は個々の選択肢から見て、選択肢の全てチェック付けた時に全選択のチェックボックスにもチェックを付けましょう。（逆も然り）
  ```js
  $('.item').on('change', function () {
    // 「全選択」のチェック状態を切替える
    if ($('#items :checked').length == $('#items :input').length) {
      $('#check_all').prop('checked', true);
    } else {
      $('#check_all').prop('checked', false);
    }
  });

- チェックした値を`map()`メソッドで取得してみましょう。`map()`は特定の要素に対して呼び出し、その結果から新たな配列を生成するメソッドです。ここではボタンを押下した時に、「items」というname属性のついた要素（`<input>`タグ）の中からチェックが付いたものを抽出して配列を生成します。
  ```js
  // チェックした値を配列で取得
  $('#get_values').on('click', function () {

    var vals = $('input[name="items"]:checked').map(function () {
      return $(this).val();
    }).get();

    console.log(vals);
  });
  ```

<br>

# 3.おわりに
チェックボックスの全選択・全解除はWebで良く見られる。都道府県のリストを地方別にまとめる時なんかにも使ったりしそう（他人事のように言っているけど、某現場でやった）。

</nuxt-content-wrapper>
