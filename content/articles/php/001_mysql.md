---
title: MySQLでDB接続
description: DB操作の基本
category: php
createdAt: 2021-11-14
updatedAt: 2021-11-14
sortNumber: 1
path: "/articles/php/001_mysql"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. MySQLにおけるデータベース接続](#2-mysqlにおけるデータベース接続)
    - [■ MySQL設定](#-mysql設定)
- [3.おわりに](#3おわりに)

<br>

# 1. はじめに
PHPはデータベースの操作を得意とします。MySQLとの親和性が高く、DBのデータ表示、追加、更新、削除が出来ます。今回は`tests`というデータベース（以下、DB）を作って、その中に`comments`というテーブルを作ってみましょう。このDBを利用してコメント一覧を使っていきます。

<br>

# 2. MySQLにおけるデータベース接続

### ■ MySQL設定

1. XAMPPがあるディレクトリまで移動
    ```
    cd /xampp/mysql/bin
    ```
2. MySQLにログイン
    > mysql -u ユーザー名 -p password：←なにも入れずにEnter
	  ```
 	 mysql -u root -p
 	 ```
3. データベースを作る。
   ```
   create database tests default charset utf8;
   ```

4. テーブルをつくる。<br> 
    >例）commentsテーブル
    ```
    CREATE TABLE `comments` ( 
      `id` INT NOT NULL AUTO_INCREMENT 
      , `name` VARCHAR(50) NOT NULL 
      , `title` VARCHAR(50) NOT NULL 
      , `comment` VARCHAR(191) NOT NULL 
      , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
      , `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
      , PRIMARY KEY (`id`)) ENGINE = InnoDB;
    ```

5. テーブルにデータを入れる<br>

    ```
    INSERT INTO `comments` (`name`, `title`, `comment`, `created_at`, `updated_at`) VALUES ('JEDI', 'Force Awakens', 'May the force be with you.', current_timestamp(), current_timestamp());
    ```

<br>

# 3.おわりに
PHPに入る前にMySQLのDBの設定やテーブルの作るという準備で終わってしまいました。。が、次回はPHPと連携するにはどうすれば良いかを見ていきます。

</nuxt-content-wrapper>
