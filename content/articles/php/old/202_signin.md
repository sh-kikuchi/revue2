---
title: サインイン
description: 認証機能篇2
category: php
createdAt: 2022-01-29
updatedAt: 2023-07-08
sortNumber: 202
path: "/articles/php/202_signin"
---

<nuxt-content-wrapper>


- [1. はじめに](#1-はじめに)
    - [概要](#概要)
    - [前提](#前提)
- [2. フォーム画面(pages)](#2-フォーム画面pages)
    - [■ 全体像](#-全体像)
    - [■ 処理部分でやっていること](#-処理部分でやっていること)
    - [■ ビュー部分で行っているXSS対策](#-ビュー部分で行っているxss対策)
- [3. ロジック(logics)](#3-ロジックlogics)
    - [■ 全体像](#-全体像-1)
- [3.5 . バリデーション](#35--バリデーション)
    - [■ 全体像](#-全体像-2)
    - [■ POSTデータの値を再び画面に返す処理（old値）](#-postデータの値を再び画面に返す処理old値)
- [4. モデル（DBの登録処理）](#4-モデルdbの登録処理)
- [5. おわりに](#5-おわりに)
    - [■ セルフレビュー](#-セルフレビュー)
    - [■ 参考](#-参考)

<br>

# 1. はじめに
### 概要
- サインイン実装

### 前提
- PDO連携が完了していること
- 以下のディレクトリ構成になっていること

```html
プロジェクトディレクトリ
│
│── database
│    │── db_connect.php
│   
│── logics
|    │── user_auth
|         │── signin.php
│  
│── models
|    │── UserAuth.php
│   
│── pages
|     │── user_auth
|          │── complete.php
|          │── signin_form.php
|
│── rules
|     │── UserRequest.php   
│  
│── util
|     │
|     │── trait
|     │   │── session.php
|     │
|     │── fragile.php
│
│
```

<br>

# 2. フォーム画面(pages)
### ■ 全体像 
```php
<?php
session_start();
require_once '../../models/UserAuth.php';
require_once '../../models/UserAuth.php';
$result = UserAuth::checkSign();
if($result) {
  header('Location: my_page.php');
  return;
}
$errors = isset($_SESSION['errors']) ? $_SESSION['errors'] : null;
$old    = isset($_SESSION['old']) ? $_SESSION['old'] : null;
unset($_SESSION['errors']);
unset($_SESSION['old']);
?>
<?php require('pages/layouts/header.php') ?>
<div class="wrapper">
    <?php if (isset($errors)) : ?>
      <ul>
      <?php foreach($errors as $error) {?>
        <li class="text-center" style="list-style:none;"><?php echo h($error);?></li>
      <?php }?>
      </ul>
    <?php endif; ?>
    <h2 class="text-center">Sign-in</h2>
    <section class="flex-box justify-center">
        <form action="../../logics/user_auth/signin.php" method="POST">
            <div class="flex-box justify-center">
              <label for="email" class="label">E-mail:</label>
              <input type="email" name="email" class="form-input" value="<?php if($old){echo h($old['email']);}"}"?>">
            </div>
            <div class="flex-box justify-center">
              <label for="password" class="label">Password：</label>
              <input type="password" name="password" class="form-input" value="<?php if($old){echo h($old['password']);}"}"?>">
            </div>
            <div class="flex-box justify-center my-2">
              <input type="submit" class="button primary " value="Enter"> 
            </div>
            <a href="signup_form.php" class="text-center">Click here to register as a new user.</a>
        </form>
    </section>
</div>
```

<br>

### ■ 処理部分でやっていること
- セッション開始
- ログイン状態の確認（していたら別の画面に遷移する）
- セッションにエラーが存在したらエラー表示用の変数に格納する
- セッションにOld値が存在したらOld値表示用の変数に格納する
- エラーとOld値用の変数は使ったらセッションを削除する
  
```php
<?php
session_start();
require_once '../../models/UserAuth.php';
require_once '../../models/UserAuth.php';
$result = UserAuth::checkSign();
if($result) {
  header('Location: my_page.php');
  return;
}
$errors = isset($_SESSION['errors']) ? $_SESSION['errors'] : null;
$old    = isset($_SESSION['old']) ? $_SESSION['old'] : null;
unset($_SESSION['errors']);
unset($_SESSION['old']);
?>
```

<br>

### ■ ビュー部分で行っているXSS対策
```php
echo h($old['name']);
```
↓↓
【utilディレクトリのfragile.php】

```php
function h($str){
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}
```

<br>

# 3. ロジック(logics)
### ■ 全体像
- クラスの呼び出し（モデル用とバリデーションチェック用）
- インスタンスを生成する。
- バリデーションチェック
- DB処理
- 画面遷移
  
```php
<?php
session_start();

// Load other files.
require_once 'models/UserAuth.php';
require_once 'rules/UserRequest.php';

//Set variables.
$paramPostData = $_POST;

// Create an instance
$user_auth    = new UserAuth();
$user_request = new UserRequest();

// Validate post request data
$user_request->signInValidation($paramPostData);

// Execute methods
$result = $user_auth->signin($paramPostData);

//Transitioning screen
if (!$result) {
  header('Location:/the-elephant-in-the-room/pages/user_auth/signin_form.php');
}else{
  header('Location: /the-elephant-in-the-room/pages/user_auth/my_page.php');
}
?>
```

<br>

# 3.5 . バリデーション
### ■ 全体像
- POSTデータを受け取って、項目ごとにバリデーションチェック
- エラーメッセージはそれを格納する用の配列に`array_push`する
- もしエラーがあった場合はエラーメッセージ用配列をセッションに格納する
- useされている`Session`というトレイトの中にPOSTデータをセッションに格納するメソッドを用意
```php
<?php
require_once 'util\trait\session.php';
class UserRequest{
  use Session;
  public function signInValidation($post_data){
      $err = [];
      $email         = $post_data['email'];
      $password      = $post_data['password'];
      $csrf_token    = $post_data['csrf_token'];
      if(!$email) {
        $err['email'] = 'Please fill in your email address.';
      }
      if(!$password) {
        $err['password'] = 'Please fill in your password.';
      }
      if (!isset($_SESSION['csrf_token']) || $csrf_token !== $_SESSION['csrf_token']) {
        array_push($errors,'Invalid request.');
      }
      if (count($err) > 0) {
        $_SESSION = $err;
        header('Location: /the-elephant-in-the-room/pages/user_auth/signin_form.php');
        exit();
      }
  }
}
?>
```

<br>

### ■ POSTデータの値を再び画面に返す処理（old値）
- 対象ファイル：
- ポストデータのキー（name属性）と値（value値）を取得し、セッションに格納する
```php
<?php
trait Session{
  function oldPostValue($oldPostValue){
    foreach($oldPostValue as $key => $value){
      $_SESSION['old'][$key] = $value;
    }
  }
}
?>
```

<br>

# 4. モデル（DBの登録処理）
- バリデーションチェックに問題なければ登録処理を行う
- トランザクション処理も行う
- password_hashはパスワードハッシュをつくるPHPお手製の関数
- 登録に成功したら$result変数はtrueになる

```php
<?php

require_once 'database/db_connect.php';

class UserAuth
{
  public static function signin($userData)
  {
    $result = false;
    $email    = $userData['email'];
    $password = $userData['password'];
    // retrieve users by searching email
    $user = self::getUserByEmail($email);
    if (!$user) {
      $_SESSION['msg'] = 'e-mail does not match.';
      return $result;
    }
    // password enquiry
    if (password_verify($password, $user['password'])) {
      session_regenerate_id(true);
      $_SESSION['signin_user'] = $user;
      $result = true;
      return $result;
    }
    $_SESSION['msg'] =  $password;
    return $result;
  }
}

```

<br>

# 5. おわりに

### ■ セルフレビュー
- 特になし

### ■ 参考
- [password_hash](https://www.php.net/manual/ja/function.password-hash.php)
- [htmlspecialchars](https://www.php.net/manual/ja/function.htmlspecialchars)

</nuxt-content-wrapper>
