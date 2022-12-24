---
title: 枠線の使い方
description: 枠線の設定から図形まで
category: HTML,CSS
createdAt: 2021-12-29
updatedAt: 2021-12-29
sortNumber: 004
path: "/articles/html_css/004_boader"
---

<nuxt-content-wrapper>
- [1. はじめに](#1-はじめに)
- [2. border](#2-border)
- [3. 【図形】三角形を作ってみよう](#3-図形三角形を作ってみよう)
    - [■ HTML](#-html)
    - [■ CSS](#-css)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
Re:Vueサイトのdesignでは、ボーダーの種類と三角形の作り方を目で確認出来るコンテンツがある。ここでは、その時の振り返りもかけて整理していこう。

https://sh-revue.net/design

<br>


# 2. border
> border: 幅 種類 色 ;
---
■ HTML
```html
<div>要素</div>
```
■ CSS
```css
div{
  border: 1px solid black;
}
```
<br>

※色々な種類がある。お試しを
- none;
- hidden;
- dotted;
- dashed;
- solid;
- double;
- groove;
- ridge;
- inset;
- outset

因みにborderの種類は`border-style`で設定することができる。
> border-style: ここに値を１~４つセット;

- 値が1つ→上下左右
- 値が2つ→上下は1つ目、左右は2つ目
- 値が3つ→上は1つ目、左右が2つ目、下が3つ目
- 値が4つ→上から時計回りに適用。

例はこちら（値4つセット）↓
```css
border-style: solid dashed groove dotted;
```

<br>

# 3. 【図形】三角形を作ってみよう
CSSで三角形を作ってみよう。といっても、下記のコードだけで出来る。

### ■ HTML
```html
<div class="triangle"></div>
```

### ■ CSS
```css
.triangle{
  width: 0px;
  border-color: tomato; //ここは好きな色♪
  border-right: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-left: 50px solid transparent; 
}
```

<br>

# 4. おわりに
ただの枠線だけでなく図形を作れるので、色々応用は出来そうである。三角形は向きを変えると、スライドボタンみたいなものになるし。。

</nuxt-content-wrapper>
