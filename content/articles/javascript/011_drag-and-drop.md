---
title: ドラッグアンドドロップ
description: DataTransfer
category: JavaScript
createdAt: 2022-11-07
updatedAt: 2022-11-07
sortNumber: 011
path: "/articles/javascript/011_drag-and-drop"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. 全体のコード](#2-全体のコード)
- [3.Javascript](#3javascript)
  - [■ ドラッグ開始](#-ドラッグ開始)
  - [■ ドラッグ途中](#-ドラッグ途中)
  - [■ ドロップ](#-ドロップ)
- [4.おわりに](#4おわりに)

<br>

## 1. はじめに
Vue.jsでドラッグ＆ドロップを実装した時はライブラリに頼ったが、その時からVanillaで書くと難しいのかなというのが疑問であった。最近（2022/11/07時点）、Reactでドラッグ＆ドロップの実装をやる機会があったので、次いでに調べてみたらJSのDataTransferオブジェクトを利用すれば、思ったより簡単に出来た。今回はそのまとめ。

## 2. 全体のコード

<details><summary>全体コードはこちら</summary><div>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>dnd_demo_js</title>
</head>
<body>
  <h2>Drag and Drop Demo (javascript)</h2>
  <ul id="dataList" class="data-list">
    <li draggable="true" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dropped(event)">Laravel</li>
    <li draggable="true" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dropped(event)">Vue.js</li>
    <li draggable="true" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dropped(event)">Flutter</li>
    <li draggable="true" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dropped(event)">Nuxt.js</li>
    <li draggable="true" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dropped(event)">PHP</li>
  </ul>
  <button onclick="getData()">データ取得</button>
  <div id="dataShow"></div>
  <script type="text/javascript">
    let target;

    //ドラッグ開始
    function dragStart(element) {
      target = element.target;
      element.dataTransfer.setData("text/plain", element.target.innerHTML);
      element.dataTransfer.effectAllowed = "move";
    }

    //ドラッグ中
    function dragOver(element) {
      element.preventDefault();
      element.dataTransfer.dropEffect = "move";
    }

    //ドロップ
    function dropped(element) {
      element.preventDefault();
      element.stopPropagation();
      target.innerHTML = element.target.innerHTML;
      element.target.innerHTML = element.dataTransfer.getData("text/plain");
    }

    //並び順を表示する
    function getData() {
      const dataShow = document.getElementById('dataShow');
      const Tags = document.getElementById("dataList");
      let setData = document.getElementById("setData");
      for (let i = 0; i < Tags.children.length; i++) {
        i === 0?setData = Tags.children[i].textContent:setData += "," + Tags.children[i].textContent;
      }
      //Divタグに描画する
      dataShow.innerHTML = setData;
    }
  </script>
</body>
</html>
<style>
  h2 {
    text-align: center;
  }

  ul {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  li {
    list-style-type: none;
    padding: 5px;
    margin: 2px;
    width: 100px;
    background-color: #dff8ff;
    border: 2px solid #00a7d5;
    border-radius: 15px;
  }

  button {
    display: block;
    width: 100px;
    margin: 0 auto;
    padding: 5px;
    color: white;
    background-color: gray;
  }

  div {
    margin-top: 20px;
    text-align: center;
  }
</style>
```
</div></details>


## 3.Javascript

### ■ ドラッグ開始

ドラッグ＆ドロップ開始時にドラッグされているドロップ元のデータを、DataTransferオブジェクトのsetDataを利用して取得している。ドロップ元のデータはHTML要素の中身を取得することが出来るinnerHTMLを使用している。
<br>
`DataTransfer.effectAllowed`プロパティはラッグ操作で許可される効果を指定することができ、ここではドロップ先へ移動することを許可している。

```js
    function dragStart(element) {
      target = element.target;
      element.dataTransfer.setData("text/plain", element.target.innerHTML);
      element.dataTransfer.effectAllowed = "move";
    }
```

### ■ ドラッグ途中
`element.preventDefault()`はイベントに対するデフォルトの動作をキャンセルする働きがある。

```js
    function dragOver(element) {
      element.preventDefault();
      element.dataTransfer.dropEffect = "move";
    }
```

### ■ ドロップ
stopPropagation メソッドを使用すると、親要素へのイベントの伝搬を止めることができるらしい（よくわからない）。ここでドロップ元（`element.dataTransfer.getData("text/plain")`)とドロップ先の要素（` element.target.innerHTML`）を交換している。

```js
    function dropped(element) {
      element.preventDefault();
      element.stopPropagation();
      target.innerHTML = element.target.innerHTML;
      element.target.innerHTML = element.dataTransfer.getData("text/plain");
    }
```


## 4.おわりに
ドロップした段階でドロップ元と先をinnerHTMLで入れ替えるのだが、Reactでこれを実装しようとしたらinnerHTMLが使えなかった。クロスサイトスクリプティングかなんかで使うことが推奨されておらず、状態管理を利用して入れ替えるということをした（体験談）。バニラJSでもinnerHTMLを使わない方法を探してみても良いかもしれない。

</nuxt-content-wrapper>
