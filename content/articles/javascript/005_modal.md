---
title: モーダル画面を作ろう。
description: js/jQuery
category: javascript
createdAt: 2021-10-28
updatedAt: 2022-08-21
sortNumber: 5
path: "/articles/javascript/005_modal"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2.  JavaScript](#2--javascript)
- [3. jQuery](#3-jquery)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
良く使う？（自分の個人開発だけかも）機能としてモーダルが或る。クリックしたらひょっこっと出てくる小さな画面。そのシンプルな実装のまとめ。

<br>

# 2.  JavaScript
```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <a href="#" class="modal-btn">MODAL OPEN</a>
    <div class="overlay"></div>
    <div class="modal">
      <div class="close">×</div>
      <h2>Modal DEMO</h2>
      <p>Hello, world</p>
    </div> 

  <script>
  const btn = document.querySelector('.modal-btn');
  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.close');
  const overlay = document.querySelector('.overlay');

  btn.addEventListener('click', function(e){
    e.preventDefault();
    modal.classList.add('active');
    overlay.classList.add('active');
  });

  closeBtn.addEventListener('click', function(){
    modal.classList.remove('active');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', function() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
  });

  </script>
  </body>
  </html>
  <style>
  .modal-btn {
    display: inline-block;
    text-decoration: none;
    padding: 10px 20px;
    background: aquamarine;
    border-radius: 5px;
    color: #000;
    margin: 20px;
    transition: 0.3s;
  }
  .modal-btn:hover {
    opacity: .8;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);  
    opacity: 0;
    visibility: hidden;
    transition: .3s;
  }
  .overlay.active {
    opacity: 1;
    visibility: visible;
  }
  .modal {
    max-width: 500px;
    width: 86%;
    padding: 15px 20px;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
    transition: .3s;
  }
  .modal.active {
    opacity: 1;
    visibility: visible;
  }
  .modal .close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    font-size: 20px;
  }
  .modal h2 {
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  .modal p {
    font-size: 13px;
  }

  </style>
```

<br>

# 3. jQuery
```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <a class="modal-open" href="">MODAL OPEN</a>
    <div class="modal js-modal">
        <div class="modal_bg modal-close"></div>
        <div class="modal_content">
            <p>MODAL DEMO</p>
            <a class="modal-close" href="">Close</a>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
      $(function () {
          $('.modal-open').on('click', function () {
              $('.js-modal').fadeIn();
              return false;
          });
          $('.modal-close').on('click', function () {
              $('.js-modal').fadeOut();
              return false;
          });
      });  
    </script>
  </body>
  </html>
  <style>
  .modal{
      display: none;
      height: 100vh;
      position: fixed;
      top: 0;
      width: 100%;
  }
  .modal_bg{
      background: rgba(0,0,0,0.8);
      height: 100vh;
      position: absolute;
      width: 100%;
  }
  .modal_content{
      background: #fff;
      left: 50%;
      padding: 40px;
      position: absolute;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 60%;
  }
  </style>
```

<br>

# 4. おわりに
値をモーダルに持たせたい時は`getElementById`とかdata属性とかを活用すれば実現しそう。ということを今後時間があればまとめようかなと。あと記憶力。（2022年1月15日）

<br>

</nuxt-content-wrapper>
