---
title: サインアップ
description: セッション・バリデーション付
category: php
createdAt: 2022-01-29
updatedAt: 2022-03-19
sortNumber: 4
path: "/articles/php/004_auth_signup"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2.  テーブルをつくる。](#2--テーブルをつくる)
- [3. フォームづくり（signup\_form.php）](#3-フォームづくりsignup_formphp)
    - [■ PHPの処理部分](#-phpの処理部分)
    - [■ フォームの部分](#-フォームの部分)
- [4. ユーザー認証（userAuth.php）](#4-ユーザー認証userauthphp)
    - [■ 登録処理](#-登録処理)
    - [■ サインチェック](#-サインチェック)
- [5. 登録できましたよ～という画面(register.php)](#5-登録できましたよという画面registerphp)
    - [■ PHPの処理部分](#-phpの処理部分-1)
    - [■ 画面の部分](#-画面の部分)
- [5. おわりに](#5-おわりに)

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
│   │   │── signin.php
│   │   │── signout.php
│   │   │── userAuth.php ←【今回、ココ】
│   │
│   │── view
│       │── register.php ←【今回、ココ】
│       │── signTest.php 
│       │── signin.php
│       │── signup.php  ←【今回、ココ】
│
│── database
│   │── db_connect.php
│
│── fragile
│   │── index.php
│
```

<br>

# 2.  テーブルをつくる。<br> 
    > usersテーブル
    ```
    CREATE TABLE `users` ( 
      `id` INT NOT NULL AUTO_INCREMENT 
      , `name` VARCHAR(255) NOT NULL 
      , `email` VARCHAR(20) NOT NULL 
      , `password` VARCHAR(255) NOT NULL 
      , PRIMARY KEY (`id`));
    ```

# 3. フォームづくり（signup_form.php）

### ■ PHPの処理部分
- セッション
- セキュリティ
- 登録処理
- ログインチェック
- バリデーション <br>

上記の処理をファイルの上部に`<?php ?>`の中に書いていきます。
といってもこれらの機能を全部そこに書くのではなく、機能ごとにファイルを用意して読み込みます。
```php
<?php
session_start();

require_once '../../fragile/index.php';
require_once '../controller/userAuth.php';

$result = UserAuth::checkSign();
if($result) {
  header('Location: signTest.php');
  return;
}

$signin_err = isset($_SESSION['signin_err']) ? $_SESSION['signin_err'] : null;
unset($_SESSION['signin_err']);
?>
```

<br>

### ■ フォームの部分
```html
<?php if (isset($signin_err)) : ?>
    <p><?php echo $signin_err; ?></p>
<?php endif; ?>
<section id="signup">
    <form action="register.php" method="POST">
        <div>
          <label for="name">ユーザ名：</label>
          <input type="text" name="name">
      </div>
        <div>
          <label for="email">メールアドレス：</label>
          <input type="email" name="email">
      </div>
      <div>
          <label for="password">パスワード：</label>
          <input type="password" name="password">
      </div>
      <div>
          <label for="password_conf">パスワード確認：</label>
          <input type="password" name="password_conf">
      </div>
        <input type="hidden" name="csrf_token" value="<?php echo h(setToken()); ?>">
      <div>
          <input type="submit" value="新規登録">
      </div>
    </form>
    <a href="./signin_form.php">サインインはこちら</a>
</section>
```

<br>

# 4. ユーザー認証（userAuth.php）
このファイルに`UserAuth`というクラスを作ってその中に下記の機能を加えていきます。
- ユーザー登録（関数名：register）
- 
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

### ■ 登録処理
> Insert文を使ってユーザーの情報を入れます。
```php
  public static function register($userData)
  {
    $result = false;

    $sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    // ユーザデータを配列に入れる
    $arr = [];
    $arr[] = $userData['name'];
    $arr[] = $userData['email'];
    $arr[] = password_hash($userData['password'], PASSWORD_DEFAULT);

    try {
      $stmt = connect()->prepare($sql);
      $result = $stmt->execute($arr);
      return $result;
    } catch(\Exception $e) {
      echo $e; // エラーを出力
      error_log($e, 3, '../error.log'); //ログを出力
      return $result;
    }
  }
```
<br>

### ■ サインチェック
> 個々のユーザーに対して一意のIDを持たせることで複数ページにまたがってユーザーの情報を維持することが出来ます。ページごとに`session_start();`を用意しているので、そこでセッションがスタートし、`$_SESSION`変数に情報を格納することが出来ます。ログインチェックの機能ではセッションにログインユーザが入っているか否か（true or false）を判断します。
```php
  public static function checkSign()
  {
    $result = false;

    if (isset($_SESSION['signin_user']) && $_SESSION['signin_user']['id'] > 0) {
      return $result = true;
    }

    return $result;
  }
```
参考: [PHPのマニュアル:セッションについて](https://www.php.net/manual/ja/session.examples.basic.php)

<br>

# 5. 登録できましたよ～という画面(register.php)
### ■ PHPの処理部分
- セッション
- バリデーション <br>
 IF文で条件に合うかをチェックし、エラーの数だけ`$err`という配列に、エラー文を格納していきます。登録フォームで送ったCSRF対策用のトークンはセッションのデータと一致するかのチェックで使い終わったら、`unset($_SESSION['csrf_token']);`でリセットしておきます。
- [filter_inputについて](https://www.php.net/manual/ja/function.filter-input.php)

```php
<?php
session_start();
require_once '../controller/userAuth.php';

// エラーメッセージ
$err = [];

$token = filter_input(INPUT_POST, 'csrf_token');
//トークンがない、もしくは一致しない場合、処理を中止
if (!isset($_SESSION['csrf_token']) ││ $token !== $_SESSION['csrf_token']) {
  exit('不正なリクエスト');
}

unset($_SESSION['csrf_token']);

// バリデーション
if(!$name = filter_input(INPUT_POST, 'name')) {
  $err[] = 'ユーザ名を記入してください。';
}
if(!$email = filter_input(INPUT_POST, 'email')) {
  $err[] = 'メールアドレスを記入してください。';
}
$password = filter_input(INPUT_POST, 'password');
// 正規表現
if (!preg_match("/\A[a-z\d]{8,100}+\z/i",$password)) {
  $err[] = 'パスワードは英数字8文字以上100文字以下にしてください。';
}
$password_conf = filter_input(INPUT_POST, 'password_conf');
if ($password !== $password_conf) {
  $err[] = '確認用パスワードと異なっています。';
}

if (count($err) === 0) {
  // ユーザを登録する処理
  $hasCreated = UserAuth::register($_POST);

  if(!$hasCreated) {
    $err[] = '登録に失敗しました';
  }
}
?>
```

<br>

### ■ 画面の部分
signin_form.phpで入力した値のバリデーションチェックがなされ、問題なければ「ユーザー登録が完了しました。」と出て、NGの場合はエラー内容が表示出来るようにしてあります。
```php
<?php if (count($err) > 0) : ?>
  <?php foreach($err as $e) : ?>
    <p><?php echo $e ?></p>
  <?php endforeach ?>
<?php else : ?>
  <p>ユーザ登録が完了しました。</p>
<?php endif ?>
<a href="./signup_form.php">戻る</a>
```

<br>

# 5. おわりに
ページ間のセッションやバリデーションの基礎を見つつ、サインアップの実装をして参りました。入力フォームに制限（バリデーション）を加えることもクロスサイトスクリプティング（XSS）攻撃の対策になるので重要です。次、サインイン実装。


</nuxt-content-wrapper>
