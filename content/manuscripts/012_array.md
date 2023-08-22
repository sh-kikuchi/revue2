---
title: 配列
description: 配列操作のいろいろ
category: JavaScript
createdAt: 2023-08-22
updatedAt: 2023-08-22
sortNumber: 012
path: "/articles/javascript/012_array"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2.配列の操作](#2配列の操作)
  - [■ push](#-push)
  - [■ unshift](#-unshift)
  - [■ splice](#-splice)
  - [■ pop](#-pop)
- [4.おわりに](#4おわりに)

<br>

## 1. はじめに
Vue.jsでドラッグ＆ドロップを実装した時はライブラリに頼ったが、その時からVanillaで書くと難しいのかなというのが疑問であった。最近（2022/11/07時点）、Reactでドラッグ＆ドロップの実装をやる機会があったので、次いでに調べてみたらJSのDataTransferオブジェクトを利用すれば、思ったより簡単に出来た。今回はそのまとめ。

<br>

## 2.配列の操作

### ■ push
配列の末尾に要素を追加する 

```js
  let array = [1, 2, 3];
  console.log(array.push(4));     //=> 4
  console.log(array.push(5, 6));  //=> 6
  console.log(array);     
```

### ■ unshift
配列の先頭に要素を追加する 

```js
  let array = [1, 2, 3];
  console.log(array.unshift(4));     //=> 4
  console.log(array.unshift(5, 6));  //=> 6
  console.log(array);          
```

### ■ splice
配列の中間位置に要素を追加する

```js
  let array = [1, 2, 3, 4, 5];
  array.splice(2, 0, 'x', 'Y', 'Z');
  console.log(array);  //=> [ 1, 2, 'x', 'Y', 'Z', 3, 4, 5 ]
```

### ■ pop
末尾から要素を取り出して、元の配列から削除

```js
  let array = [];
  array.push(1);
  array.push(2);
  array.push(3);
  console.log(array.pop());  //=> 3
  console.log(array.pop());  //=> 2
  console.log(array.pop());  //=> 1
  console.log(array.pop());  //=> undefined
```


## 4.おわりに
ドロップした段階でドロップ元と先をinnerHTMLで入れ替えるのだが、Reactでこれを実装しようとしたらinnerHTMLが使えなかった。クロスサイトスクリプティングかなんかで使うことが推奨されておらず、状態管理を利用して入れ替えるということをした（体験談）。バニラJSでもinnerHTMLを使わない方法を探してみても良いかもしれない。

</nuxt-content-wrapper>
