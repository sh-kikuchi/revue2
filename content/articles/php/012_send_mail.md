---
title: メール送信
description: mb_send_mail関数を使ってみよう。
category: php
createdAt: 2021-10-28
updatedAt: 2022-05-06
sortNumber: 12
path: "/articles/php/012_send_mail"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2.  メールフォーム送信](#2--メールフォーム送信)
  - [■ メールフォーム](#-メールフォーム)
- [3. メール送信処理](#3-メール送信処理)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
メール配信はmb_send_mail関数が用意されているので、
これを活用すれば、簡単にメール実装が可能。早速、以下。

<br>

# 2.  メールフォーム送信
- 手順
	1. フォームをつくる。（name属性を指定して、POST送信）
	2. フォームの送信先を設定。（今回は送信先をsend_mail.phpとする）
	3. mb_send_mail関数を使って、送信先のメールアドレスに送信。

<br>

## ■ メールフォーム
```html
      <form action=".send_mail.php" method="POST">
        <div>
          <label for="name">お名前</label>
          <input type="text" name="name">
        </div>
        <div>
          <!--メールアドレス-->
          <label for="emall">メールアドレス</label>
          <input type="text" name="mail">
        </div>
        <div>
          <!--セレクトフォーム-->
          <label for="main">主なご用件</label>
          <div>
            <select name="option" required>
              <option value="" hidden>どのようなご用件ですか</option>
              <option value="ご質問・ご意見">ご質問・ご意見</option>
              <option value="オファー・依頼">オファー・依頼</option>
              <option value="サイトの感想">サイトの感想</option>
              <option value="その他">その他</option>
            </select>
          </div>
        </div>
        <div>
          <!--お問い合わせフォーム-->
          <label for="request-about">問い合わせ内容</label>
          <textarea name="comment" cols="60" rows="10">
          </textarea>
        </div>
        <!--送信ボタン-->
        <input type="submit" value="送信する">
      </form>
```

<br>

# 3. メール送信処理
> send_mail.php
- mb_send_mailという関数をつかってみましょう。
- 引数→mb_send_mail(宛先, 件名, メッセージ, ヘッダ)
- mb_send_mail関数はマルチバイトに対応されており、日本語での送信が可能
```php
<?php
  mb_language("Japanese");
  mb_internal_encoding("UTF-8");

  $to = '送信先のメールアドレス';
  $title = $_POST['option']."(".$_POST['name'].")";
  $message = $_POST['comment'];
  $headers =  $_POST['mail'];

  if(mb_send_mail($to, $title, $message, $headers))
  {
    echo "メール送信しました。";
  }
  else
  {
    echo "メール送信失敗しました。";
  }
 ?>
```

<br>

# 4. おわりに
今回の例は個人サイトを制作した時に実装した欠片である。<br>
参考は下記のサイトなり。<br>
https://techplay.jp/column/550

</nuxt-content-wrapper>
