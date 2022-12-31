---
title: フォームの入力チェックをしよう。
description: addEventListenerを使って入力に不備がないかチェックする処理を書いてみましょう。
category: JavaScript
createdAt: 2022-01-15
updatedAt: 2022-08-21
sortNumber: 7
path: "/articles/javascript/007_form-check"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. まずはフォームを作ろう。](#2-まずはフォームを作ろう)
- [3. JavaScriptの実装](#3-javascriptの実装)
    - [■ フォームの送信をした時にイベントを呼び出す。](#-フォームの送信をした時にイベントを呼び出す)
    - [■ フォームから値を取得](#-フォームから値を取得)
    - [■ 空チェック](#-空チェック)
    - [■ 値の空チェック以外にも条件を追加。](#-値の空チェック以外にも条件を追加)
- [4.おわりに](#4おわりに)

<br>

# 1. はじめに
自分のサイトでコンタクト用にフォームを作成した。そのフォームの各項目の入力に不備がないかのチェックをフロントエンドの部分でやってみたいと思い、実装してみた。本記事では簡単に下記のディレクトリを想定して進めて行きたい。
```
  │── js
   │   │── script.js
   │
   │── index.html
```

<br>

# 2. まずはフォームを作ろう。
- `contactForm`をidとしてフォームを作る。
- フォームの構成
  1. お名前 (id = name)
  2. メールアドレス (id = mail)
  3. ご用件 (id = option)
  4. お問い合わせ内容  (id = comment)
```html
      <form id="contactForm">
        <!-- <form action="./send_mail.php" method="POST"> -->
        <div class="form-group">
          <!--お名前-->
          <label class="contact-text" for="name">お名前</label>
          <input type="text" id="name" name="name" placeholder="名前を入力してください" class="form-name">
        </div>
        <div class="form-group">
          <!--メールアドレス-->
          <label class="contact-text" for="emall">メールアドレス</label>
          <input type="text" id="mail" name="mail" placeholder="メールアドレスを入力してください" class="form-mail">
        </div>
        <div class="form-group">
          <!--セレクトフォーム-->
          <label class="contact-text" for="main">主なご用件</label>
          <div class="form-group-select">
            <select id="option" name="option">
              <option value="">どのようなご用件ですか</option>
              <option value="ご質問・ご意見">ご質問・ご意見</option>
              <option value="オファー・依頼">オファー・依頼</option>
              <option value="サイトの感想">サイトの感想</option>
              <option value="その他">その他</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <!--お問い合わせフォーム-->
          <label class="contact-text" for="request-about">問い合わせ内容</label>
          <textarea id="comment" name="comment" id="request-about" cols="60" rows="10" placeholder="ここに記入して下さい"></textarea>
        </div>
        <!--送信ボタン-->
        <input class="send-button" type="submit" value="送信する">
      </form>
```

<br>

# 3. JavaScriptの実装
↓まずは全体
```js
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  //値を取得
  const name = document.getElementById('name').value;
  const mail = document.getElementById('mail').value;
  const option = document.getElementById('option').value;
  const comment = document.getElementById('comment').value;

  //空チェック用配列
  const formArray = [name, mail, option, comment];

  //メールアドレスの正規表現
  const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

  // 空チェック
  for (let i = 0; i < formArray.length; i++) {
    if (formArray[i] === "") {
      switch (i) {
        case 0:
          alert("名前を入力して下さい");
          break;
        case 1:
          alert("メールアドレスを入力して下さい");
          break;
        case 2:
          alert("ご用件を選択して下さい");
          break;
        case 3:
          alert("問い合わせ内容を入力してください");
          break;
      }
      return false;
    }
  }

  // 名前の文字数制限
  if (name.length > 25) {
    alert('名前は25文字以上で入力してください。')
    return false;
  }

  // メールアドレスの形式チェック
  if (!regex.test(mail)) {
    alert('メールアドレスの形式が不正です')
    return false;
  }

  // コメントの文字数制限
  if (comment.length > 200) {
    alert('コメントは200文字以内で入力してください。')
    return false;
  }
});

```
<br>

### ■ フォームの送信をした時にイベントを呼び出す。
> `contactForm`というid名を持ったフォームがsubmitされた時に同時にイベントを呼び出す。ここでエラーチェックの処理を書いていく。
```js
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
};
```
<br>

### ■ フォームから値を取得
> `document.getElementById('id名').value`でフォームの各項目の値を取得している。現在の文書(document)にある特定のIDに紐づいているタグの値を取得しているという理解で良きかな。取得した値は定数に格納している。
```js
  const name = document.getElementById('name').value;
  const mail = document.getElementById('mail').value;
  const option = document.getElementById('option').value;
  const comment = document.getElementById('comment').value;
```

<br>

### ■ 空チェック
> フォームの各値を配列に突っ込んじゃおう。これを使って、ループを回して値が空かどうかを一気に確認している。
```js
  //空チェック用配列
  const formArray = [name, mail, option, comment];
```
> ループと条件文
- 配列の要素の数だけ回す。
- 項目ごとに空をチェックする。
- 空の時はアラートを出す。
- 複数項目が未入力だった場合<br>→ 一番上の空項目のアラートだけ出す。(そのためにループの中に`return false`を入れて処理を一回にしている。)
```js
  // 空チェック
  for (let i = 0; i < formArray.length; i++) {
    if (formArray[i] === "") {
      switch (i) {
        case 0:
          alert("名前を入力して下さい");
          break;
        case 1:
          alert("メールアドレスを入力して下さい");
          break;
        case 2:
          alert("ご用件を選択して下さい");
          break;
        case 3:
          alert("問い合わせ内容を入力してください");
          break;
      }
      return false;
    }
  }
```

<br>

### ■ 値の空チェック以外にも条件を追加。
> 本記事は名前とコメントに文字制限、そしてメールアドレスの形式のチェックを実装してみます。ここではメールアドレスの形式チェックをピックアップ。

- まずはメールアドレスの正規表現
  ```
    //メールアドレスの正規表現
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  ```

- `test`メソッドを使ってメールアドレスの形式が正しいかどうかのチェックが可能です。例えば下記のようなジャッジが出来る。これに関しては[Let'sプログラミング](https://www.javadrive.jp/regex-basic/sample/index13.html)を参考にした。

  ```
  regex.test('hoge@example.com');
  --> true
  regex.test('yamada.tarou@example.com');
  --> true
  regex.test('suzuki.example.com');
  --> false // ローカル部分がない
  regex.test('kudou#jirou@examle.com');
  --> false // ローカル部分で使用できない文字種
  ```

- 本記事で実装しているメールアドレスのエラーチェックだが、
  「正規表現でない」場合はアラートを出るようにした。
  ```js
    if (!regex.test(mail)) {
      alert('メールアドレスの形式が不正です')
      return false;
    }
  ```

<br>

# 4.おわりに
ヴァリデーションチェックはサーバーサイドで少なくともやってほしいが、ユーザービリティとかを考えるとフロントエンドでもチェックがあったの方が、ユーザーに親切かも。alert出しているだけだけど、そもそも入力が出来ていないと送信ボタンが非活性にならないとか、入力しながら足りていない要素を指摘してあげたり出来ると優しい気はする。

</nuxt-content-wrapper>
