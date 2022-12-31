---
title: ハンバーガーメニューの触り
description: 最小限の作り方から理解する。
category: JavaScript
createdAt: 2022-02-06
updatedAt: 2022-08-21
sortNumber: 10
path: "/articles/javascript/010_hamburger-menu"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. JavaScriptで書く。](#2-javascriptで書く)
    - [■ HTML](#-html)
    - [■ CSS](#-css)
      - [(解説)メニューボタン（menu-btn）をつくる](#解説メニューボタンmenu-btnをつくる)
      - [（解説）メニューの表示/非表示を制御する](#解説メニューの表示非表示を制御する)
    - [■ JavaScriptで書く](#-javascriptで書く)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
ハンバーガーメニューの作り方は調べれば、沢山出てくる訳だが、このページでは最小限の理解を深めようという試み。端的に言えば、メニュー用ボタンとメニュー内容を用意して、ボタンをクリックして内容の表示/非表示を切り替える流れとなる。

```
   │── css
   │   │── style.css
   │
   │── js
   │   │── script.js
   │
   │── index.html
```

<br>

# 2. JavaScriptで書く。
### ■ HTML
- メニューボタン（三本線）
- メニュ―内容 <br>
  
HTMLには、上記の2つの要素を用意する。
```html
<header>
    <!-- メニューボタン -->
    <div id="menu-btn">
        <div></div>
        <div></div>
        <div></div>
    </div>
    <!-- メニュー内容 -->
    <div id="menu">
      <div class="menu__item">TOP</div>
      <div class="menu__item">Sign-in</div>
    </div>
</header>
```

<br>

### ■ CSS
```css

#menu-btn{
  width: 50px;
  height: 25px;
  margin:0 0 0 auto;
  position: relative;
}
#menu-btn div {
  width: 50px;
  position: absolute;
  border-bottom: 2px solid black;
}

#menu-btn div:nth-child(1){
  top:0;
}
#menu-btn div:nth-child(2){
  top:10px;
}
#menu-btn div:nth-child(3){
  top:20px;
}

#menu{
  display: none;
}

#menu.is-active{
  display: block;
}

```

<br>

####  (解説)メニューボタン（menu-btn）をつくる
  - 親: #menu-btn 子: `div`タグ×3
  - 親: `position:relative` 子: `position:absolute`
  - positionを設定したので、親（#menu-btn）に対する子の位置を設定していく。三本線にしたいので、`:nth-child`を使って、親の中の3つの`<div>`タグ一つひとつに親の上からの位置を決める。
    ```css
    #menu-btn div:nth-child(1){
      top:0;
    }
    #menu-btn div:nth-child(2){
      top:10px;
    }
    #menu-btn div:nth-child(3){
      top:20px;
    }
    ```

<br>

#### （解説）メニューの表示/非表示を制御する
- 初期値は非表示（none）にしており、これから記述するJSで`is-active`というクラス名をメニュー内容（`#menu`）に加えることでそれを表示させることが出来る。
  ```css
  #menu{
    display: none;
  }

  #menu.is-active{
    display: block;
  }
  ```

<br>

### ■ JavaScriptで書く
ハンバーガーメニューを理解するにあたっての最小限のコードは数行で済むかと思う。やっていることは以下の通り。
- メニューボタンとメニュー内容の値を取得
- メニューボタンをクリックすると、メニュー内容にクラス`is-active`を付くように`toggle`メソッドを使う。これによってクリックした時にクラスを付けたり、消したりすることが出来る。
  ```js
  const menu_btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');

  menu_btn.onclick = function () {
    menu.classList.toggle('is-active');
  }
  ```

<br>

# 4. おわりに
今回は簡単にしくみを理解するにとどめましたが、もう少し素敵なハンバーガーメニューの作り方を整理したい。何だか今回はどちらかというとアコーディオンメニューに近いような気がする。

参考:[【コピペ可】jQuery不要！javascriptだけでハンバーガーメニューを実現](https://eclair.blog/make-hamburger-menu-with-javascript/)

</nuxt-content-wrapper>
