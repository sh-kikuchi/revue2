---
title: CSV出力（テーブルデータ）
description: データベース篇4
category: php
createdAt: 2021-11-14
updatedAt: 2023-07-08
sortNumber: 104
path: "/articles/php/104_db_output"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
    - [概要](#概要)
    - [前提](#前提)
- [2. DBのテーブルのデータをCSVファイルに出力](#2-dbのテーブルのデータをcsvファイルに出力)
    - [■ 全体](#-全体)
- [3. phpコマンドの実行](#3-phpコマンドの実行)
- [4. おわりに](#4-おわりに)
    - [■ セルフレビュー](#-セルフレビュー)
    - [■ 参考](#-参考)

<br>

# 1. はじめに
### 概要
ここではDBのテーブルのデータをCSVファイルとして出力する処理をつくる。それをコンソールでphpコマンドでファイルを実行することで処理を動かす。

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

# 2. DBのテーブルのデータをCSVファイルに出力
- 対象ファイル：db_csv_output.php

<br>

### ■ 全体
- ダウンロードフォルダの中にCSVファイルを用意しておく。その際に`（格納したいテーブル名）.php`とする。
  
- 下記コードの`$table_name `はテーブル名、`$table_cols`は対象のカラムをセットする。その際、CSVの列数とカラム数は一致させる。
  
- db_csv_input.phpファイル内の`$table_name`と`$table_cols` を設定しておけば、`$table_name`でdatabase＞csv＞uploads配下のテーブル名を冠したCSVファイルを呼び出すことができる。

- `fgetcsv()`によって CSVファイルの中身を読み込み、そのデータを配列で返すことができるのでそれを1行ずつループして格納していく。

```php
<?php
require_once ('database\db_connect.php');

$table_name = 'artists';
$table_cols = 'user_id, name, debut, start_date, end_date, created_at,updated_at';

$pdo = db_connect();
$f = fopen("../database/csv/uploads/" . $table_name . ".csv", "r");
$data = fgetcsv($f);

while($data = fgetcsv($f)){
    $col_arr = [];
    if(implode($data) != null){
        // 読み込んだ結果を表示します。
        array_shift($data); //remove id
        foreach($data as $col){
          array_push($col_arr, "'".$col."'");   
        }
        $col_str = implode(',', $col_arr);
        $sql = 'INSERT INTO '.$table_name.' (' . $table_cols . ') VALUES('. $col_str . ');';
        $sql = $pdo->prepare($sql);
        $sql ->execute();
    }
}
fclose($f);
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
- 1テーブルずつしかできない状態になっているので、多くのテーブルにデータ挿入したい時には不便かもしれない。

### ■ 参考
- [fgetcsv](https://www.php.net/manual/ja/function.fgetcsv.php)
- [PHP ファイルの実行](https://www.php.net/manual/ja/features.commandline.usage.php)

  

</nuxt-content-wrapper>
