---
title: 色を変えてみよう。
description: 文字/背景/グラデーション
category: HTML,CSS
createdAt: 2021-12-29
updatedAt: 2021-12-29
sortNumber: 003
path: "/articles/html_css/003_color"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. 文字や要素の背景の色を変える。](#2-文字や要素の背景の色を変える)
    - [■ テキストの色を変更したい。](#-テキストの色を変更したい)
    - [■ 要素の色を変更したい。](#-要素の色を変更したい)
    - [■ グラデーションをつける。](#-グラデーションをつける)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
Re:Vueサイトのdesignでは、三原色の組み合わせで色が変化する様が分かる「色」にまつわるdesignのコンテンツを用意している。今回はそれについての補強材料を作成していきたい。それを通じて、作ってみたいコンテンツが出来るやもしれない。

https://sh-revue.net/design

<br>


# 2. 文字や要素の背景の色を変える。

### ■ テキストの色を変更したい。
> color: 〇〇；
■ HTML
```html
<p>テキスト</p>
```
■ CSS
```css
p{
  color: red;
}
```

↑ textというクラス名のついた文字を赤字に変更する。<br>
 ※他にもこんな使い方が出来る。

【カラー名を16進数で表記する】（短縮形も存在はする）
```css
p { 
  color: #ff0000;
}
```
参考：http://www.netyasun.com/home/color.html

<br>

【RGBで設定】
> R=赤、G=緑、B=青、それぞれに0-255の範囲で色の度合を設定する（%表記でも可）。aは色の透明度を決めることができ、0~1.0の間で設定する。
```css
p { 
  color: rgb(255,0,0);
 }
p { 
  color: rgba(255,0,0,0.8);
 }
```
<br>

### ■ 要素の色を変更したい。
> background-color:〇〇;
【HTML】
```html
<div>要素</div>
```
【CSS】
```css
div{
  background-color: red;
}
```
<br>

### ■ グラデーションをつける。
> background: linear-gradient();

<br>

【HTML】
```html
<div>要素</div>
```
【CSS】
```css
div{
  background: linear-gradient(45deg, red, blue);
}
```

グラデーションの軸を設定して、左から、右に方向に赤から青に変化する。色は2色に限らず、下記のように追加することも可能。

```css
div{
  background: linear-gradient(red, yellow, green, blue);
}
```

また、グラデーションの角度は〇〇degだけでなく、
`to top`,`to bottom`,`to left` ,`to right`というように表記も可能。下記は右下から左上に向かうグラデーション。
 ```css
 div{
    background: linear-gradient(to left top, red, blue);
 }
 ```

<br>

# 3. おわりに
グラデーションについてもVue.jsのスタイルレンダリングで表現が出来そうな気がするので、コンテンツ化しようかしら。。。

</nuxt-content-wrapper>
