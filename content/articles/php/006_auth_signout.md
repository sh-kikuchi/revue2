---
title: サインアウト
description: 最後はセッションぶった切り
category: php
createdAt: 2022-01-29
updatedAt: 2022-01-29
sortNumber: 6
path: "/articles/php/006_auth_signout"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. サインインチェック](#2-サインインチェック)
- [3. サインアウト用のボタン](#3-サインアウト用のボタン)
    - [サインイン処理(userAuth.php)](#サインイン処理userauthphp)
    - [signout.php](#signoutphp)
- [おわりに](#おわりに)

<br>

# 1. はじめに
最後にサインアウトを実装します。サインアウト用のボタンを今回は`loginTest.php`に用意し、押されたら`signout.php`へ行きます。その中で、サインアウト機能のロジック部分が書かれている`userAuth.php`を呼び出します。そんな流れで見ていきましょう。

```
プロジェクトディレクトリ
│
│── auth ←新規作成して下さい。
│   │── controller
│   │   │── signin.php
│   │   │── signout.php  ←【今回、ココ】
│   │   │── userAuth.php ←【続、ココ】
│   │
│   │── view
│       │── register.php 
│       │── signTest.php ←【今回、ココ】
│       │── signin.php
│       │── signup.php
│
│── database
│   │── db_connect.php
│
│── fragile
│   │── index.php
│
```

<br>


# 2. サインインチェック
サインイン中の画面ではページごとに以下の処理があると良いです。
- セッション
- サインインチェック
- サインインしていなければ、サインインのフォームに自動的に遷移しておく。 <br>

以下、サンプルです（signTest.phpとする）
```php
<?php
session_start();
require_once '../controller/userAuth.php';
require_once '../../fragile/index.php';

//　ログインしているか判定し、していなかったら新規登録画面へ返す
$result = UserAuth::checkSign();

if (!$result) {
  $_SESSION['signin_err'] = 'ユーザを登録してログインしてください！';
  header('Location: signup_form.php');
  return;
}

$signin_user = $_SESSION['signin_user'];
?>
```

<br>

# 3. サインアウト用のボタン
サインアウトをする場合、どこかのページにログアウト用に送信ボタンを設けます（POST送信）
```html
<form action="../controller/signout.php" method="POST">
<input type="submit" name="logout" value="ログアウト">
</form>
```

<br>

### サインイン処理(userAuth.php)
<hr>
サインアウトをする時はセッションを切ってからサインイン画面にでも戻ればOKかと思います。

```php
  public static function logout()
  {
    $_SESSION = array();
    session_destroy();

    //ログイン画面に戻る
    header('Location: ../view/signin_form.php');
  }
```

<br>

### signout.php
<hr>
- セッション
- ログインチェック
- ログアウト（userAuth.phpの処理）<br>
  
上記の実装を行います。
```php
<?php
session_start();
require_once '../controller/userAuth.php';

if (!$logout = filter_input(INPUT_POST, 'logout')) {
  exit('不正なリクエストです。');
}

//　ログインしているか判定し、セッションが切れていたらログインしてくださいとメッセージを出す。
$result = UserAuth::checkSign();

if (!$result) {
  exit('セッションが切れました。サインインして下さい');
}

// ログアウトする
UserAuth::logout();
?>
```

<br>

# おわりに
あー疲れた(´-ω-`)。ログインの仕組みが少し理解できるようになった気がしています。Laravelさんをいじってばかりだと見えにくい部分、それをこれからもネイティブで確認することは良きかもです。

</nuxt-content-wrapper>
