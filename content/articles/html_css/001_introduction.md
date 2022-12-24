---
title: HTMLとCSS
description: テンプレート
category: HTML,CSS
createdAt: 2021-10-07
updatedAt: 2022-12-28
sortNumber: 001
path: "/articles/html_css/001_introduction"
---

<nuxt-content-wrapper>

- [1.はじめに](#1はじめに)
- [2. Webサイトの雛形を作ろう。](#2-webサイトの雛形を作ろう)
    - [■ HTML（HyperText Markup Language）とは？](#-htmlhypertext-markup-languageとは)
    - [■ CSS（Cascading Style Sheets）とは？](#-csscascading-style-sheetsとは)
    - [■ テンプレート](#-テンプレート)
- [3. おわりに](#3-おわりに)

<br>

# 1.はじめに
VScodeで、新規作成したHTMLファイルに対して、「！」＋ENTERを押せば、HTMLのコーディングに必要な雛形が出てくるので、そこまでして覚えようとしなくても良いが、ここで、ゆくゆくは考`<meta>`タグやレイアウトについての理解を深める場所にしていきたい。

<br>

# 2. Webサイトの雛形を作ろう。

### ■ HTML（HyperText Markup Language）とは？
- webページを作成するために開発されたマークアップ言語。
- HyperTextでは、ウェブページから別のウェブページにリンクをはったり（ハイパーリンク）、webページ内に画像・動画・音声などのデータファイルをリンクで埋め込むことができる。


<br>

### ■ CSS（Cascading Style Sheets）とは？
- Webページを装飾するスタイル言語。
- ウェブページがPC画面に表示される際の色・サイズ・レイアウトなどの表示スタイルのみならず、出力スタイル（印刷・出力）、再生スタイル（音声の読み上げ）など、スタイルも様々。

<br>

### ■ テンプレート
- CSS,JSの読み込み方を地味に忘れる。
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!----- css----->
  <link rel="stylesheet" href="">
  <!----- js----->
  <script type="text/javascript" src=""></script>
  <title>タイトル</title>
</head>
<body>
  <!----- header----->
  <header>ヘッダー</header>
  <!----- main ----->
  <article>
    <h1>タイトル</h1>
    <section>
      <h2>見出し</h2>
      <p>コンテンツの内容</p>
    </section>
  </article>
  <!----- footer ----->
  <footer>フッター</footer>
</body>
</html>

```

<br>

# 3. おわりに
今は中身が薄いが、これからタグについて、特に`<meta>タグ`の理解を深めていきたいと思う。(2022/12/28)


</nuxt-content-wrapper>
