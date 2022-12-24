---
title: 変数と定数
description: console.log、let、const
category: JavaScript
createdAt: 2021-11-06
updatedAt: 2022-08-21
sortNumber: 1
path: "/articles/javascript/001_introduction"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. まずはコンソールを出してみよう](#2-まずはコンソールを出してみよう)
- [3.  変数と定数](#3--変数と定数)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
「JavaScriptは動的にコンテンツを更新したり、マルチメディアを管理したりなどが出来るスクリプト言語である。」（[JavaScript - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/JavaScript)）らしい。これが端的で良いと思ったりするけど、本屋に行くとJavaコーナーに誤って置かれる存在でもある（赤羽でも見た）。

<br>

# 2. まずはコンソールを出してみよう
- windows：「Google Chromeの設定」->「その他のツール」->「デベロッパーツール」（F12で一発）
- 「デベロッパーツール」内にあるconsoleをクリックすれば、プログラムが書けるスペースが出現。
- 試しに書いてみよう。
    ```js 
     console.log(123);
    　console.log(1+2+3);
      console.log("文字列");
      console.log("1"+"2"+"3");
    ```

<br>

- console.logでWebコンソール（Web開発に使用する開発ツール）に任意の値を出力することが出来る。
- 値は数値や文字列だけではなく、変数や計算式など、いろいろ。
- 文字列を出力する場合は""（ダブルクォーテーション）を忘れずに。
<br> ⇒ 例として`console.log(1+2+3);`と`console.log("1"+"2"+"3");`を比較すると、前者は値それぞれが数字なので足し算で「6」が結果として出力される。後者は値それぞれが文字なので、文字をくっつけているだけ。なので「123」が結果として出力される。

- 演算子には「+」の他に「-」（引き算）、「*」（掛け算）、「/」(割り算)、「%」（剰余）がある。いろいろ計算してみよう。

<br>

# 3.  変数と定数
■ 変数とは？
- 値や文字列を入れる箱のようなもの。
- 「let 変数名 = 値」（右辺の値を左辺の変数に入れるイメージ）
- 繰り返し値を使えるし、更新することが出来るのがメリット

    ```js
    //テスト結果を例に
    let japanese = 67;
    let math = 89;
    let english = 72;

    console.log(japanese);
    console.log(math);
    console.log(english);
    ```

- 上記でテスト結果に不備があったとしましょう。数学（math）の点数が計算ミスで91点になりました。letで変数を設定した後に値を更新する時はletはいらない。

    ```js
    let math = 89;
    math = 91;

    console.log(math);
    ```

<br>

■ 定数とは？
- 値や文字列を入れる箱のようなもの。これは変数と同じ。
- 「const 変数名 = 値」
- 変数と違うところは値が更新されない。
- どのような時に定数を使う？
  >- サイトURLや表示ミスが許されないテキスト情報を扱う場合
  >-  重要且つ不変な値（上書き防止）

<br>

- 下記はNGシーン♪（試しに）
    ```js
    const math = 89;　//定数を定義
    math = 91;       //更新できない！！

    console.log(math);　//エラー発生
    ```
    ⇒エラー：`Uncaught SyntaxError: Identifier 'math' has already been declared`

<br>

# 4. おわりに
`console.log`は変数・定数の中身を確認したり、処理の経過をマークすることで呼び出したい関数（メソッド）が呼び出せているかを確認したり出来るのでやはり重宝する。constとletはやったから、letとvarの違いに少し踏み込んでみようか。ちらっと聞くけど、ほぼ同じ性質じゃないかと思っていて実感がわいていない。



</nuxt-content-wrapper>
