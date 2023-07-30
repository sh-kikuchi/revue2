---
title: The Elephant in the Room
description: 自作フレームワークの概要
category: php
createdAt: 2021-11-14
updatedAt: 2023-07-08
sortNumber: 1
path: "/articles/php/001_readme"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ディレクトリ構成](#2-ディレクトリ構成)
- [3. 基本的なアーキテクチャー](#3-基本的なアーキテクチャー)
    - [■ 概要](#-概要)
- [4. assets](#4-assets)
- [5. database](#5-database)
- [6. interfaces](#6-interfaces)
- [7. models](#7-models)
- [8. pages](#8-pages)
- [9. rules](#9-rules)
- [10. storage](#10-storage)
- [11. tests](#11-tests)
- [12. util](#12-util)
    - [■ trait](#-trait)
    - [■ 関数](#-関数)
- [13. vendor](#13-vendor)
- [14.おわりに](#14おわりに)

<br>

# 1. はじめに
Elephant-in-the-roomという自作のなんちゃってフレームワーク

<br>

# 2. ディレクトリ構成

```html
|
├─assets
│  ├─css
│  ├─img
│  ├─js
│  └─pdf
├─config
├─database
│  ├─csv
│  │  ├─downloads
│  │  └─uploads
│  └─migrations
├─interfaces
├─logics
│  ├─artist
│  ├─concert
│  └─user_auth
├─logs
├─models
├─pages
│  ├─artist
│  ├─concert
│  ├─errors
│  ├─layouts
│  └─user_auth
├─rules
├─storage
│  └─doc
├─tests
├─util
│  └─trait
└─vendor
    ├─bin
    ├─composer
    ├─guzzlehttp
    ├─myclabs
    ├─nikic
    ├─phar-io
    ├─phpunit
    ├─psr
    ├─ralouphie
    ├─sebastian
    ├─symfony
    ├─tecnickcom
    └─theseer
```


<br>

# 3. 基本的なアーキテクチャー

### ■ 概要
オブジェクト指向をベースに機能によってプログラムを分けて記述するコード管理を採用する。これによってコード再利用しやすくなり、開発効率を上げることが期待できる。保守性も確保し、快適なコードライフを目指す。
- models: DBの操作(クラス)
- logics: ビジネスロジック（モデルとビューの橋渡し）
- pages : ビュー

<br>

# 4. assets
JavaScriptやCSS、画像、PDFなどを格納できる場所。アプリケーションをつくる際に使う資材を管理できる。

<br>

# 5. database
データベース関連をまとめたディレクトリでDB連携だけでなく、PHPコマンドを使って既存のテーブルのバックアップをCSVファイルで取ったり、逆にCSVファイルからテーブルにデータを取り込むことが可能。

<br>

# 6. interfaces
現時点ではトレイトの諸々の処理に型定義が設定できるように用意しているディレクトリ。

<br>

# 7. models
DB操作（CRUD）の処理を記述するクラスを用意するための場所。クラス名をUpperCamel型（例: UserAuth）にしているため、ファイル名もそれに合わせている。

<br>

# 8. pages
ビュー用のファイルをまとめた場所

<br>

# 9. rules
バリデーション処理用のクラスをまとめて置く用。エラーメッセージを格納したり、エラー発生した時にもともと入力してあった値を保持する機能を記述しておくと良いだろう。

<br>

# 10. storage
アプリ内でアップロードしたファイルの格納場所として利用できる。

<br>

# 11. tests
PHP-Unitなど単体テストを実施することを想定したディレクトリで、テストコードはここで管理する。

<br>

# 12. util
### ■ trait
traitフォルダを用意し、その中で、クラスの中で横断的に利用できるファイルを用意する。
- Email
- PDF
- file
- session

<br>

### ■ 関数
ビューの役割を担うpagesのファイルの中で利用したい処理を直下に書く。
- フォーマット系
- XSS対策：エスケープ処理
- CSRF対策のトークン生成
- ページネーション表示


<br>

# 13. vendor
`composer install`をする時に生成されるフォルダで普段は`.gitignore`の対象となっている。外部パッケージなどが管理されるところで公式には以下のものをデフォルトで用意する。（`composer.json`を参照）だが、利用者自身によってパッケージの選定は自由に行えるのであくまで参考程度のもの。

```php
{
    "require": {
        "guzzlehttp/guzzle": "^7.7",
        "tecnickcom/tcpdf": "^6.6"
    },
    "require-dev": {
        "phpunit/phpunit": "10"
    }
}

```

<br>

# 14.おわりに
ここでは、ディレクトリ構成を提示し、それぞれがアプリ作成においてどのような役割を担うかをまとめてきた。だが、オブジェクト指向やアーキテクチャーの学習目的という性質上、ディレクトリ構成が変わる可能性もある。その際にはこのファイルを更新していく。

</nuxt-content-wrapper>
