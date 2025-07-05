---
title: CSVファイルからDBのテーブルへのデータ挿入
description: データベース篇3
category: php
createdAt: 2021-11-14
updatedAt: 2023-07-08
sortNumber: 103
path: "/documents/ghostphp/103_db_input"
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
ここではCSVファイルからDBのテーブルへのデータ挿入やっていく。コンソールでphpコマンドでファイルを実行することで処理を動かす。

### 前提
- PDO連携が完了していること
- 以下のディレクトリ構成になっていること
```html
│
│── database
│   │── csv
│   │   │──downloads
│   │   │──uploads
│   │
│   │── db_connect.php
│   │── db_csv_input.php
│   │── db_csv_output.php
```

<br>

# 2. CSVファイルからDBのテーブルへのデータ挿入
- 対象ファイル：db_csv_input.php

<br>

### ■ 全体
- ダウンロードフォルダの中にCSVファイルを用意しておく。その際に`（格納したいテーブル名）.php`とする。

- 下記コードの`$table_name`はテーブル名をセットする。
 
- `table_name`で指定したテーブルを全件取得し、ループさせながらカンマ区切りにデータを成形していく。それを`fopen`というファイルポインタを使って指定したパスのファイルに書き込んでいく。
  
- database＞csv＞downloads配下でテーブル名を冠したCSVファイルが格納される。

```php
<?php
  require_once ('database\db_connect.php');
    try{
        $table_name = 'artists';
        $filepath = 'csv/downloads/'. $table_name .'.csv';
        $fp = fopen($filepath, 'w');
        $pdo = db_connect();
        $sql = 'SELECT * FROM '. $table_name;
        $sql = $pdo->prepare($sql);
        $sql ->execute();
        foreach ($sql as $key => $row) {
            $output = '';
            $row_tmp = '"';
            $row_tmp .= implode('","', $row);
            $row_tmp .= '"' . "\n";
            $output .= $row_tmp;
            fwrite($fp, $output);
        }
        fclose($fp);
        exit;
    }catch (PDOException $e) {
      print "[ERROR] {{$e->getMessage()}}\n";
      die();
    }
?>
```

<br>

# 3. phpコマンドの実行
- コマンドプロンプトを開き、`database`配下で以下のコマンドを実行
```php
php db_csv_input.php
```

<br>

# 4. おわりに
### ■ セルフレビュー
- 1テーブルずつしかダウンロードできない。

### ■ 参考
- [fopen](https://www.php.net/manual/ja/function.fopen.php)
- [fwrite](https://www.php.net/manual/ja/function.fopen.php)
- [fclose](https://www.php.net/manual/ja/function.fclose.php)

  

</nuxt-content-wrapper>
