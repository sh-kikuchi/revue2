---
title: サインアウト
description: 認証機能篇3
category: php
createdAt: 2022-01-29
updatedAt: 2023-07-08
sortNumber: 203
path: "/documents/ghostphp/203_signout"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
    - [概要](#概要)
    - [前提](#前提)
- [2. フォーム画面(pages)](#2-フォーム画面pages)
    - [■ 全体像](#-全体像)
- [3. ロジック(logics)](#3-ロジックlogics)
    - [■ 全体像](#-全体像-1)
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
|         │── signout.php
│  
│── models
|    │── UserAuth.php
│   
│── pages
|     │── my_page.php
|
│── rules
|     │── UserRequest.php   
│  
│
```

<br>

# 2. フォーム画面(pages)
### ■ 全体像 
- 対象ファイル：my_page.php
```php
<div>
    <h4 class="text-center">signout</h4>
    <div class="flex-box justify-center">
        <form action="../../logics/user_auth/signout.php" method="POST">
            <input type="submit" name="signout" class="button primary my-2" value="signout">
        </form>
    </div>
</div>
```

<br>

# 3. ロジック(logics)
### ■ 全体像
- クラスの呼び出し（モデル用とバリデーションチェック用）
- インスタンスを生成する。
- DB処理
  
```php
<?php
<?php
session_start();

// Load other files.
require_once 'models/UserAuth.php';

// Set variables
$logout = filter_input(INPUT_POST, 'logout');

// Create an instance
$user_auth    = new UserAuth();

// Execute methods
$user_auth->signout();

?>
```

<br>

# 4. モデル（DBの登録処理）
```php
<?php

require_once 'database/db_connect.php';

class UserAuth
{
  public static function signout(){
    session_destroy();
    //Back to Sign-in Page.
    header('Location: /the-elephant-in-the-room/pages/user_auth/signin_form.php');
  }
}

```

<br>

# 5. おわりに
### ■ セルフレビュー
- 特になし

### ■ 参考
- [htmlspecialchars](https://www.php.net/manual/ja/function.htmlspecialchars)

</nuxt-content-wrapper>
