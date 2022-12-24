---
title: 余白を設定する
description: marginとpadding
category: HTML,CSS
createdAt: 2021-12-29
updatedAt: 2021-12-29
sortNumber: 7
path: "/articles/html_css/007_margin_padding"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. padding](#2-padding)
- [3. margin](#3-margin)
- [4. 配置](#4-配置)
- [5. おわりに](#5-おわりに)

<br>


# 1. はじめに
marginとpaddingの違いを理解すると共にちゃっかり、marginを使った配置方法をまとめてしまうという魂胆。

<br>

# 2. padding
> HTMLの全要素には枠線(border,初期状態は非表示)がある。その枠線の内側(要素の内部)に余白を設定する場合はpaddingを利用。
- 四辺すべてに適用
  ```css
  padding: 10px;
  ```

- 上下が5px、左右が10px
  ```css
  padding: 5px 10px;
  ```

- 上が5px、左右が10px、下が7px
  ```css
  padding: 5px 10px 7px;
  ```

# 3. margin
> HTMLの全要素には枠線(border,初期状態は非表示)がある。その枠線の外側を設定する場合はmarginを利用。
- 四辺すべてに適用
  ```css
  margin: 10px;
  ```

- 上下が5px、左右が10px
  ```css
  margin: 5px 10px;
  ```

- 上が5px、左右が10px、下が7px
  ```css
  margin: 5px 10px 7px;
  ```

# 4. 配置
---
■ 中央配置
> ブロック要素に有効。下記の設定が上手くいかない時は幅が広くなっている可能性あるので、`width`で幅を設定しておきましょう。
```css
div {
    margin: 0 auto;
}
```

■ 右寄りの配置
> ブロック要素に有効。下記の設定が上手くいかない時は幅が広くなっている可能性あるので、`width`で幅を設定しておきましょう。
```css
div {
    margin:0 0 0 auto;
}
```

<br>

# 5. おわりに
marginを使った、中央、右の配置もRe:Vueサイトのdesignで作ろうかしら。。と思う2022/06/22。

</nuxt-content-wrapper>
