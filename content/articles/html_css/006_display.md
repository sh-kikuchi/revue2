---
title: 要素の表示形式を決める
description: displayの使い方
category: CSS
createdAt: 2021-11-04
updatedAt: 2021-11-04
sortNumber: 6
path: "/articles/html_css/006_display"
---

<nuxt-content-wrapper>
- [1. はじめに](#1-はじめに)
- [2.  displayとは？](#2--displayとは)
    - [■ どのような種類がある？](#-どのような種類がある)
      - [【ブロック要素】](#ブロック要素)
      - [【インライン要素】](#インライン要素)
      - [【インラインブロック】](#インラインブロック)
- [3. Flexboxを活用する](#3-flexboxを活用する)
    - [■ 要素を縦から横並びにしたい。](#-要素を縦から横並びにしたい)
      - [【HTML】](#html)
      - [【CSS】](#css)
    - [■ 子要素の折り返し](#-子要素の折り返し)
    - [■ 子要素間の間隔設定](#-子要素間の間隔設定)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
Re:Vueサイトのdesignでは、縦持ちの要素を横に並べられるコンテンツを作ってみた。それは`display:flex`を利用したものだが、displayについてはブロック要素もインライン要素も重要。

https://sh-revue.net/design

<br>

# 2.  displayとは？
> 要素の表示形式を指定するもの。

### ■ どのような種類がある？
#### 【ブロック要素】
> 前後に改行が入るので縦に要素が並ぶ。<br>
> 親要素の幅いっぱいに広がる性質を持つ。<br>
> 例：`<div>`,`<p>`

#### 【インライン要素】
> 改行されない。<br>
> 横に並ぶ。<br>
> 例：`<span>`,`<a>`

#### 【インラインブロック】
> ブロックとインラインの真ん中（？）<br>
> インライン要素ではできない幅・高さの設定が可能。<br>
> ブロック要素ではできない横並びが可能。

<br>

|         | block | inline-block |                 inline                 |
| :-----: | :---: | :----------: | :------------------------------------: |
| 幅/高さ |  〇   |      〇      |                   ×                    |
|  余白   |  〇   |      〇      | △<br><small>（左右のみ指定可）</small> |
|  配置   |  縦   |      横      |                   横                   |

<br>

★上記のような要素は下記のように表示形式を変更することが出来る。
```css
 a {
   display: block
 }
```

<br>

# 3. Flexboxを活用する

### ■ 要素を縦から横並びにしたい。
> display: flex;
---
#### 【HTML】

```html
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

#### 【CSS】
親要素に`display: flex;`を設定してあげることで、中の子要素たちが横に並んでくれる。
```css
.container {
  display: flex;
}
```

### ■ 子要素の折り返し
> 幅いっぱいに子要素が並んだ時に超えた分は折り返すかどうか、`flex-wrap`で設定しよう。折り返す場合は下記のように`wrap`の値をセットする。
```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```
※`nowrap`は初期値。子要素を折り返しせず、一行に並べる。

<br>

### ■ 子要素間の間隔設定
> `justify-content`を使って、横並びにした時の子要素の間隔を調整してみましょう。
```css
.container {
  display: flex;
  justify-content: center; 
}
```

- `flex-start` → 左揃え（初期値）
- `flex-end`   → 右揃え
- `center`     → 中央揃え
- `space-between`<br> 
  → 最初と最後の子要素を両端に配置し、残りの要素は等間隔に配置。
- `space-around`<br>
  → すべての子要素を等間隔に配置

<br>

# 4. おわりに
どのタグがブロック要素？インライン要素？みたいな理解は必要かな。`<a>タグ`のボタンづくりが練習に分かりやすいのかな・・・。なにはともあれ、Flexは便利。

</nuxt-content-wrapper>
