---
title: テーブル作成
description: データベース篇2
category: php
createdAt: 2021-11-14
updatedAt: 2023-07-08
sortNumber: 102
path: "/documents/ghostphp/102_migration"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
    - [概要](#概要)
    - [前提](#前提)
- [2. CSVファイルからDBのテーブルへのデータ挿入](#2-csvファイルからdbのテーブルへのデータ挿入)
    - [■ 全体](#-全体)
- [3. phpコマンドの実行](#3-phpコマンドの実行)
- [4. おわりに](#4-おわりに)
    - [■ セルフレビュー](#-セルフレビュー)
    - [■ 参考](#-参考)

<br>

# 1. はじめに
### 概要
PHPコマンドでCREATE文を実行し、テーブルを作成する。

### 前提
- PDO連携が完了していること


```html
│
│── database
│   │
│   │── migrations
│   │   │──202306031130_create_users.php
│   │
│   │── db_connect.php
```

<br>

# 2. CSVファイルからDBのテーブルへのデータ挿入
- 対象ファイル：202306031130_create_users.php

<br>

### ■ 全体
```php
<?php
    require_once ('database\db_connect.php');
    try {
        $pdo = db_connect();
        // usersテーブルを作成するためのSQL文を変数$sqlに代入する
        $sql = 'CREATE TABLE if not exists users (
          id  int(11) NOT NULL,
          name varchar(255) NOT NULL,
          email varchar(20) NOT NULL,
          password  varchar(255) NOT NULL
        )';
        // SQL文を実行する
        $pdo->query($sql);
    } catch (PDOException $e) {
        exit($e->getMessage());
    }
 ?>

```

<br>

# 3. phpコマンドの実行
- コマンドプロンプトを開き、`database/migrations`配下で以下のコマンドを実行
```php
php 202306031130_create_users.php
```

<br>

# 4. おわりに
### ■ セルフレビュー
- 処理結果をコマンドプロンプト上に表示するのが良いかと思う。

### ■ 参考
- [PHP ファイルの実行](https://www.php.net/manual/ja/features.commandline.usage.php)

</nuxt-content-wrapper>
