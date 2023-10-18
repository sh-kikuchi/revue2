---
title: 配列
description: 配列操作のいろいろ
category: JavaScript
createdAt: 2023-08-22
updatedAt: 2023-08-22
sortNumber: 012
path: "/articles/javascript/012_array"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
  - [概要](#概要)
  - [前提](#前提)
- [2. サーバーの設定（Apache）](#2-サーバーの設定apache)
- [3. ルーティング](#3-ルーティング)
- [4.おわりに](#4おわりに)

<br>

## 1. はじめに
### 概要
ここではDBのテーブルのデータをCSVファイルとして出力する処理をつくる。それをコンソールでphpコマンドでファイルを実行することで処理を動かす。

### 前提
- PDO連携が完了していること
- 以下のディレクトリ構成になっていること
  ```html
  │
  │── .htaccess
  │
  │── index.php
  │
  ```

<br>

## 2. サーバーの設定（Apache）
- .htaccess
  ```
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.php [QSA,L]
  ```

<br>

## 3. ルーティング
- プロジェクトディレクトリにindex.phpを用意
  ```php
  <?php
  preg_match('|' . dirname($_SERVER['SCRIPT_NAME']) . '/([\w%/]*)|', $_SERVER['REQUEST_URI'], $matches);
  $paths  = explode('/', $matches[1]);
  $params = explode('?', $_SERVER['REQUEST_URI']);
  // $id = isset($paths[1]) ? htmlspecialchars($paths[1]) : null;
  switch (strtolower($_SERVER['REQUEST_METHOD']) . ':' . $matches[1]) {
      case 'get:'          :  include "pages/welcome.php";                break;
      case 'get:signin'    :  include "pages/user_auth/signin_form.php";  break;
      case 'post:signin'   :  include "logics/user_auth/signin.php";      break;
      case 'get:signup'    :  include "pages/user_auth/signup_form.php";  break;
      case 'post:signup'   :  include "logics/user_auth/signup.php";      break;
      case 'post:signout'  :  include "logics/user_auth/signout.php";     break;
      default              :  echo $params[1];                            break;
  }

  ```

<br>

## 4.おわりに


参考： [生のPHPでREST APIっぽいルーティングを作る](https://qiita.com/naga3/items/030f757ed413515551db#:~:text=%E7%94%9F%E3%81%AEPHP%E3%81%A7REST%20API%E3%81%A3%E3%81%BD%E3%81%84%E3%83%AB%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E4%BD%9C%E3%82%8B%20REST%20API%E3%82%92%E4%BD%9C%E3%82%8B%E3%81%A8%E3%81%8D%E3%81%AF%E3%80%81%E9%80%9A%E5%B8%B8%E3%80%81Lumen%3A,https%3A%2F%2Flumen.laravel.com%2F%20%E3%81%AA%E3%81%A9%E3%81%AE%E3%83%9E%E3%82%A4%E3%82%AF%E3%83%AD%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%84%E3%80%81%20%E6%99%AE%E9%80%9A%E3%81%AE%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%92%E4%BD%BF%E3%81%86%E3%81%AE%E3%81%8C%E4%BE%BF%E5%88%A9%E3%81%A7%E3%81%99%E3%81%8C%E3%80%81%E4%BB%8A%E5%9B%9E%E3%81%AF%E7%94%9F%E3%81%AEPHP%E3%81%AE%E3%81%BF%E3%81%A7REST%20API%E3%81%AE%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB%E3%82%92%E4%BD%9C%E6%88%90%E3%81%97%E3%81%A6%E3%81%BF%E3%81%BE%E3%81%99%E3%80%82)


</nuxt-content-wrapper>
