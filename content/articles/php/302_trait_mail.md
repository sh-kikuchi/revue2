---
title: メール送信
description: 共通関数/トレイト篇
category: php
createdAt: 2022-01-29
updatedAt: 2023-07-15
sortNumber: 302
path: "/documents/ghostphp/302_trait_mail"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
    - [概要](#概要)
    - [前提](#前提)
- [2. trait](#2-trait)
    - [■ コード全体](#-コード全体)
    - [■ $\_FILESとは？](#-_filesとは)
    - [■ ファイルのアップロード時のエラーチェック ](#-ファイルのアップロード時のエラーチェック-)
    - [■ ファイルの内容チェック ](#-ファイルの内容チェック-)
    - [■ アップロード](#-アップロード)
- [3. インターフェース](#3-インターフェース)
- [4. クラス内でトレイトとインターフェースを読み出す](#4-クラス内でトレイトとインターフェースを読み出す)
- [5. トレイト内の関数を読み出す](#5-トレイト内の関数を読み出す)
- [6. おわりに](#6-おわりに)
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
│   
│── util
|    │── trait
|         │── mail.php
│  
│── interfaces
|    │── mail.php
│   
│
```

<br>

# 2. trait
### ■ コード全体
- 対象ファイル：util/trait/mail.php
- トレイト内に関数を記述する。
```php
<?php
trait Mail{
	function sendMail($post_data){
    $result =  false;
    mb_language("Japanese");
    mb_internal_encoding("UTF-8");
    //POST送信で受けとった値を変数に格納しよう
    $to      = $post_data['mail'];
    $title   = $post_data['username'].'さんからのお便り';
    $message = $post_data['comment'];
    $headers =  'From:'.$post_data['mail'];

    //mb_send_mail関数
    if(mb_send_mail($to, $title, $message, $headers))
    {
      $result = true;
      echo "メール送信しました。";
    }
    else
    {
      echo "メール送信失敗しました。";
    }
	}
}
?>
```

<br>

### ■ $_FILESとは？<br>
⇒ $_FILESはHTTP ファイルアップロード変数で、アップロードされたファイルの情報が含まれる。<br>
`$[フォームのname属性][ファイルの中身]`という形で取得が出来る。<br>
アップロード時に取得出来るデータの中身はこちら
  1. ['name'] ファイル名
  2. ['type'] ファイルのMIMEタイプ
  3. ['tmp_name']　一時保存ファイル名
  4. ['error'] アップロード時のエラーコード
  5. ['size'] ファイルサイズ（バイト単位

<br>

### ■ ファイルのアップロード時のエラーチェック <br>
- $_FILES['upfile']['error']が正常（UPLOAD_ERR_OK）でないときのエラーメッセージ（$msg）を
  任意に決めた上で、エラーだった場合は$err_msgに格納している。
```php
if($_FILES['upfile']['error'] !== UPLOAD_ERR_OK){
  $msg =[
    UPLOAD_ERR_INT_SIZE   => 'HTMLのMAX_FILE_SIZE制限を越えています',
    UPLOAD_ERR_PARTIAL    => 'ファイルの一部しかアップロードされていません',
    UPLOAD_ERR_NO_FILE    => 'ファイルはアップロードされませんでした',
    UPLOAD_ERR_NO_TMP_DIR => '一時フォルダーが存在しません',
    UPLOAD_ERR_CANT_WRITE => 'ディスクへの書き込みに失敗しました',
    UPLOAD_ERR_EXTENSION  => '拡張モジュールによってアップロードが中断されました',
  ];
  $err_msg = $msg[$_FILES['upfile']['error']];
}
```

<br>

### ■ ファイルの内容チェック <br>

- `$_FILES['upfile']['tmp_name']`はサーバー上に格納される一時ファイル
- `finfo_open`でファイルの mime タイプを取得し、その情報を`finfo_file`で返している。
- 本実装では画像かどうかの判定を行う。['image/gif','image/jpg', 'image/jpeg', 'image/png']に該当しない場合はエラーメッセージを$err_msgに格納している。

```php
else if(!in_array(finfo_file(
                   finfo_open(FILEINFO_MIME_TYPE),$_FILES['upfile']['tmp_name']),
             ['image/gif','image/jpg', 'image/jpeg', 'image/png']))
{
  //ファイル内容が画像かどうか
  $err_msg = "ファイル内容が画像ではありません";
}
```

<br>

### ■ アップロード
- `move_uploaded_file`はアップロードされたファイルを新しい位置に移動する関数。成功時はtrue、失敗時はfalseを返す。
- 第一引数で一時ファイルのパスを、第二引数で格納したい場所をセット。（どこからどこへ移動するかを決める！）

```php
else{
  $src  = $_FILES['upfile']['tmp_name']; //一時ファイルパス
  $dest = $_FILES['upfile']['name'];     //ファイル名

  /**
   * move_uploaded_file
   * @param string $src　一時ファイルパス
   * @param string [path].$dest 保存先
   */
  if(!move_uploaded_file($src,'../../../the_Elephant_in_the_Room/file_upload/doc/'.$dest)){
    $err_msg = "アップロードに失敗しました";
  }
}
```

<br>

# 3. インターフェース
- 対象ファイル：interfaces/mail.php
- traitは関数の型定義ができないため、インターフェースを使ってそれを実現する
```php
<?php

interface IMail{
  function sendMail(IMail $iMail);
}

?>
```

<br>

# 4. クラス内でトレイトとインターフェースを読み出す
- インターフェースを`implements`で読み出す
- トレイトを`use`で読み出す

```php
<?php
require_once 'util/trait/mail.php';
require_once 'interfaces/mail.php';

class UserAuth implements IMail
{
  use Mail;
}


```

<br>

# 5. トレイト内の関数を読み出す
- クラスのインスタンスを生成する（クラスにはトレイトを読み出している前提
- `インスタンス->トレイトの関数名`

```php
<?php
  //Load other files.
  require_once 'models/UserAuth.php';

  //Create an instance
  $user_auth = new UserAuth();

  /*
    Execute methods
    Return processing results as required.
  */
  $user_auth->sendMail($_POST);
?>
```

<br>


# 6. おわりに
### ■ セルフレビュー
- 特になし

### ■ 参考
- [htmlspecialchars](https://www.php.net/manual/ja/function.htmlspecialchars)
- [$_FILES](https://www.php.net/manual/ja/reserved.variables.files)
- [move_uploaded_file](https://www.php.net/manual/ja/function.move-uploaded-file)

</nuxt-content-wrapper>
