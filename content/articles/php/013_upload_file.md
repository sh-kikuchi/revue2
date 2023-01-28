---
title: 画像のアップロード
description: $_FILESとmove_uploaded_file
category: php
createdAt: 2022-05-06
updatedAt: 2022-05-06
sortNumber: 13
path: "/articles/php/013_upload_file"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ビューの作成](#2-ビューの作成)
- [3.  アップロード処理](#3--アップロード処理)
    - [■ $\_FILESとは？](#-_filesとは)
    - [■ 今回の実装を小分けに見てみる](#-今回の実装を小分けに見てみる)
      - [【ファイルのアップロード時のエラーチェック】 ](#ファイルのアップロード時のエラーチェック-)
      - [【ファイルのアップロード時のエラーチェック】 ](#ファイルのアップロード時のエラーチェック--1)
      - [【ファイルの内容チェック】 ](#ファイルの内容チェック-)
      - [【アップロード】 ](#アップロード-)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
今回は画像をアップロードしてみようと。グローバル変数の$_FILESを使えば、簡単に出来そうなので折角GW（2年ぶり）だし、やってみようと思った次第（2022年５月）。アップロードされたファイルは一時ファイルとしてサーバーに格納され、いくつかのエラーチェックやファイルチェックを経て、指定場所に格納するという手順を踏む。

```
プロジェクトディレクトリ
│
│── file_upload←新規作成して下さい。
│   │── controller
│   │   │── upload.php ←【今回、ココ】
│   │
│   │── view
│       │── upload.php ←【今回、ココ】
```

<br>

# 2. ビューの作成
- `enctype="multipart/form-data"`をお忘れなくですわ。
- `"max_file_size"（name名は任意）のinput(hidden)`は`"upfile"（name名は任意）のinput`の前に置く。<br>
  = PHP で取得可能なファイルの最大サイズを規定（バイト数で指定）
```html
<div class="container">
    <form method ="POST" action="../controller/upload.php" enctype="multipart/form-data">
        <label for="upfile">ファイルパス：</label>
        <input type="hidden" name="max_file_size" value="1000000">
        <input id="upload" type="file" name="upfile" size="40">
        <input type="submit" value="アップロード">
    </form>
</div>
```

<br>

# 3.  アップロード処理

```php
<?php

if($_FILES['upfile']['error'] !== UPLOAD_ERR_OK){
  //アップロード処理の成否
  $msg =[
    UPLOAD_ERR_INT_SIZE   => 'HTMLのMAX_FILE_SIZE制限を越えています',
    UPLOAD_ERR_PARTIAL    => 'ファイルの一部しかアップロードされていません',
    UPLOAD_ERR_NO_FILE    => 'ファイルはアップロードされませんでした',
    UPLOAD_ERR_NO_TMP_DIR => '一時フォルダーが存在しません',
    UPLOAD_ERR_CANT_WRITE => 'ディスクへの書き込みに失敗しました',
    UPLOAD_ERR_EXTENSION  => '拡張モジュールによってアップロードが中断されました',
  ];
  $err_msg = $msg[$_FILES['upfile']['error']];
}else if(!in_array(strtolower(pathinfo($_FILES['upfile']['name'])['extension']),
  ['gif','jpg', 'jpeg', 'png']))
  //拡張子の確認
{
  $err_msg = "画像以外のファイルはアップロードできません";
}else if(!in_array(finfo_file(
                   finfo_open(FILEINFO_MIME_TYPE),$_FILES['upfile']['tmp_name']),
             ['image/gif','image/jpg', 'image/jpeg', 'image/png']))
{
  //ファイル内容が画像かどうか
  $err_msg = "ファイル内容が画像ではありません";
}else{
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

//エラーメッセージ
if(isset($err_msg)){
  die('<div style="color:Red">'.$err_msg.'</div>');
}

 header('Location:/the_Elephant_in_the_Room/file_upload/view/upload.php');

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

### ■ 今回の実装を小分けに見てみる<br>
#### 【ファイルのアップロード時のエラーチェック】 <br>
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

#### 【ファイルのアップロード時のエラーチェック】 <br>
- $_FILES['upfile']['error']が正常（UPLOAD_ERR_OK）でないときのエラーメッセージ（$msg）を
  任意に決めた上で、エラーだった場合はエラーメッセージを$err_msgに格納している。
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

#### 【ファイルの内容チェック】 <br>

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

#### 【アップロード】 <br>
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

# 4. おわりに
簡単に出来そうとはじめが色々面倒くさいと思ってしまった、よくよく考えてみればスーパーでグローバルな変数が私の知らないところで良しなにファイルの情報を取ってきてくれている訳で私はその施しを受けている。PHP側からすると私を超絶の怠け者だと思い、感謝しろと言ってくるかもしれないが、それにぐうの音も出ないというか、やっぱり「自分はめんどくさがりなんだな」と自覚する。いや、これを書いている時点ではGW中ではないか。まじになってどうするの？ (中略)『独習PHP 第4版』をベースどころか、ほぼ...というところはあるが、公式マニュアルを照らし合わせたり、ディレクトリ構成を少し修正したりという地味作業を経て、ここまでこぎつけた。<br>
- https://www.php.net/manual/ja/reserved.variables.files
- https://www.php.net/manual/ja/function.move-uploaded-file

</nuxt-content-wrapper>
