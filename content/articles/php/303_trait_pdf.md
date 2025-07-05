---
title: PDF
description: 共通関数/トレイト篇
category: php
createdAt: 2023-07-15
updatedAt: 2023-07-15
sortNumber: 303
path: "/documents/ghostphp/303_trait_pdf"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
    - [概要](#概要)
    - [前提](#前提)
- [2. trait](#2-trait)
    - [■ コード全体](#-コード全体)
- [3. インターフェース](#3-インターフェース)
- [4. クラス内でトレイトとインターフェースを読み出す](#4-クラス内でトレイトとインターフェースを読み出す)
- [5. トレイト内の関数を読み出す](#5-トレイト内の関数を読み出す)
- [6. おわりに](#6-おわりに)
    - [■ セルフレビュー](#-セルフレビュー)
    - [■ 参考](#-参考)

<br>

# 1. はじめに
### 概要
- PDF出力
- 使用パッケージ: tcpdf
- 以下、`composer.json`
```json
{
    "require": {
        "tecnickcom/tcpdf": "^6.6"
    },
}
```

### 前提
- PDO連携が完了していること
- 以下のディレクトリ構成になっていること

```html
プロジェクトディレクトリ
│
│   
│── util
|    │── trait
|         │── pdf.php
│  
│── interfaces
|    │── pdf.php
│   
│
```

<br>

# 2. trait
### ■ コード全体
- 対象ファイル：util/trait/pdf.php
- トレイト内に関数を記述する。
```php
<?php
require_once('vendor/tecnickcom/tcpdf/tcpdf.php');

trait PDF{
    function output($html){
      	// 用紙の向き:縦(L)、単位:mm、用紙サイズ:A4 で作成
        $tcpdf = new TCPDF('L', "mm", 'A4');

        // カスタムヘッダーを削除（上下余白を消す）、ページを作成
        $tcpdf->setPrintHeader(false);
        $tcpdf->setPrintFooter(false);
        $tcpdf->AddPage();

        $tcpdf->WriteHTML($html, true, 0, false, true, 'L');

        // 変換してPDFをファイルに保存
        $fileName = rtrim(getcwd(), '\\/').DIRECTORY_SEPARATOR.'sample.pdf';
        $tcpdf->Output($fileName, 'F');
    }
}

```


<br>

# 3. インターフェース
- 対象ファイル：interfaces/mail.php
- traitは関数の型定義ができないため、インターフェースを使ってそれを実現する
```php
<?php

interface IPDF{
    function output($html);
}

?>
```

<br>

# 4. クラス内でトレイトとインターフェースを読み出す
- インターフェースを`implements`で読み出す
- トレイトを`use`で読み出す

```php
<?php
require_once 'util/trait/pdf.php';
require_once 'interfaces/pdf.php';

class UserAuth implements IPDF
{
  use PDF;
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
  require_once 'assets/pdf/test.php';

  //Create an instance
  $user_auth = new UserAuth();

  /*
    Execute methods
    Return processing results as required.
  */
  $user_auth->output($html);
?>
```

<br>

# 6. おわりに
### ■ セルフレビュー
- 特になし

### ■ 参考
- [TCPDF](https://tcpdf.org/)

</nuxt-content-wrapper>
