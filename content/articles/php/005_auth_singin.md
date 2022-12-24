---
title: サインイン
description: セッション・バリデーション付
category: php
createdAt: 2022-01-29
updatedAt: 2022-01-29
sortNumber: 5
path: "/articles/php/005_auth_singin"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. まずはフォームから（signin\_form.php）](#2-まずはフォームからsignin_formphp)
    - [■ PHPの処理部分](#-phpの処理部分)
    - [■ フォームの部分](#-フォームの部分)
- [3. ユーザー認証（userAuth.php）](#3-ユーザー認証userauthphp)
    - [■ サインイン処理](#-サインイン処理)
    - [■ emailからユーザを取得](#-emailからユーザを取得)
- [4. signin.php](#4-signinphp)
- [5.おわりに](#5おわりに)

<br>

# 1. はじめに
Laravelのユーザーの私は、ログイン実装はLaravel/uiに頼ってばかり。
ネイティブで作るとどれほど大変なのだろうとか、ログインってそもそもどのように
実装するのだろうとかを感じるようになったので、やってみました。今後、認証の実装をするにあたり、下記のようなディレクトリを想定して話を進めてまいります。

```
プロジェクトディレクトリ
│
│── auth ←新規作成して下さい。
│   │── controller
│   │   │── signin.php   ←【今回、ココ】
│   │   │── signout.php
│   │   │── userAuth.php ←【続、ココ】
│   │
│   │── view
│       │── register.php 
│       │── signTest.php 
│       │── signin.php  ←【今回、ココ】
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

# 2. まずはフォームから（signin_form.php）

### ■ PHPの処理部分
- セッション
- ログインチェック
```php
<?php
session_start();
require_once '../controller/userAuth.php';

$result = UserAuth::checkSign();
if($result) {
  header('Location: signTest.php');
  return;
}

$err = $_SESSION;

$_SESSION = array();
session_destroy();
?>
```

<br>

### ■ フォームの部分
```html
    <?php if (isset($err['msg'])) : ?>
        <p><?php echo $err['msg']; ?></p>
    <?php endif; ?>
<section id="signin">
    <form action="../controller/signin.php" method="POST">
        <div>
          <label for="email">メールアドレス：</label>
          <input type="email" name="email">
          <?php if (isset($err['email'])) : ?>
              <p><?php echo $err['email']; ?></p>
          <?php endif; ?>
        </div>
        <div>
          <label for="password">パスワード：</label>
          <input type="password" name="password">
          <?php if (isset($err['password'])) : ?>
              <p><?php echo $err['password']; ?></p>
          <?php endif; ?>
          </div>
        <div>
          <input type="submit" value="ログイン">
        </div>
    </form>
    <a href="signup_form.php">新規登録はこちら</a>
</section>
```

<br>

<br>

# 3. ユーザー認証（userAuth.php）
- サインイン機能
- メールアドレスチェック <br>

メールアドレスチェックもサインイン機能の処理の一つで、
一つの関数で処理が長すぎると可読性が損なわれるのでシングルカットしておきます。

```php
<?php

//DB連携用ファイルの読み出し
require_once '../../database/db_connect.php';

class UserAuth
{

 //ここに処理を加えて下さい

}
```

<br>

### ■ サインイン処理
関数loginにしちゃったけど（2022年冬）。ここでは【メールアドレスが登録済みかどうか】と【パスワードが一致しているか】の確認を行うための処理を書きました。`$result`がfalseの場合はエラーを返します。
```php
  public static function signin($email, $password)
  {
    // 結果
    $result = false;
    // ユーザをemailから検索して取得
    $user = self::getUserByEmail($email);

    if (!$user) {
      $_SESSION['msg'] = 'emailが一致しません。';
      return $result;
    }

    //　パスワードの照会
    if (password_verify($password, $user['password'])) {
      //ログイン成功
      session_regenerate_id(true);
      $_SESSION['signin_user'] = $user;
      $result = true;
      return $result;
    }

    $_SESSION['msg'] = 'パスワードが一致しません。';
    return $result;
  }
```
### ■ emailからユーザを取得
`signin.php`で入力されたメールアドレスがusersテーブルにあるかどうかを確認します。
```php
  public static function getUserByEmail($email)
  {
    $sql = 'SELECT * FROM users WHERE email = ?';

    // emailを配列に入れる
    $arr = [];
    $arr[] = $email;

    try {
      $stmt = connect()->prepare($sql);
      $stmt->execute($arr);
      // SQLの結果を返す
      $user = $stmt->fetch();
      return $user;
    } catch(\Exception $e) {
      return false;
    }
  }
```

<br>

# 4. signin.php
- セッション
- バリデーション
- ログイン処理（UserAuth.php）<br>

`signin_form.php`で送信されたらまず、このファイルに飛びます。バリデーションのチェックを行い、NGの場合はエラーと共に`signin_form.php`へ帰っていただきます。OKの場合は任意のファイルへ案内してあげて下さい。

```php
<?php
session_start();
require_once '../controller/userAuth.php';

// エラーメッセージ
$err = [];

// バリデーション
if(!$email = filter_input(INPUT_POST, 'email')) {
  $err['email'] = 'メールアドレスを記入してください。';
}
if(!$password = filter_input(INPUT_POST, 'password')) {
  $err['password'] = 'パスワードを記入してください。';
}

if (count($err) > 0) {
  // エラーがあった場合は戻す
  $_SESSION = $err;
  header('Location: signin_form.php');
  return;
}
// ログイン成功時の処理
$result = UserAuth::signin($email, $password);
header('Location: signTest.php');
// ログイン失敗時の処理
if (!$result) {
  header('Location: signin_form.php');
  return;
}
?>
```

<br>

# 5.おわりに
サインアップとサインインの機能が終わったので山場を越えたって感じですね。
次回が認証シリーズ、最後にサインアップでこれまでのセッションを自ら斬ってみましょう。


</nuxt-content-wrapper>
