---
title: Bootstrap
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 203
path: "/documents/ghostphp/203_bootstrap"
---
<nuxt-content-wrapper>

`bootstrap.php` は、GhostPHP アプリケーションの起動時に最初に読み込まれる初期化ファイルである。  
クラスのオートロード、環境変数の読み込み、必要ディレクトリの登録を行い、アプリケーションが動作する準備を整える。

## 1. コード

```php
<?php

use app\aura\AutoloadManager;

$autoloader = new AutoloadManager();

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$autoloader->registerDir(dirname(__FILE__).'/aura/utils/functions');
$autoloader->registerDir(dirname(__FILE__).'/interfaces/form_classes');
$autoloader->registerDir(dirname(__FILE__).'/interfaces/repositories');
$autoloader->registerDir(dirname(__FILE__).'/interfaces/services');
$autoloader->registerDir(dirname(__FILE__).'/config');

$autoloader->autoload();
```

## 2. コード説明
- AutoloadManager の初期化
  ```php
  $autoloader = new AutoloadManager();
  ```

- AutoloadManager の初期化
  ```php
  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->load();
  ```
  - .env ファイルの値を環境変数として読み込む

- オートロード対象ディレクトリの登録
  ```php
  $autoloader->registerDir(dirname(__FILE__).'/aura/utils/functions');
  $autoloader->registerDir(dirname(__FILE__).'/interfaces/form_classes');
  $autoloader->registerDir(dirname(__FILE__).'/interfaces/repositories');
  $autoloader->registerDir(dirname(__FILE__).'/interfaces/services');
  $autoloader->registerDir(dirname(__FILE__).'/config');
  ```

- オートロードの実行
  ```php
  $autoloader->autoload();
  ```
  - 登録されたディレクトリ内の PHP ファイルをすべて読み込み、クラスや関数を使用可能にする

## 3. 使い方 / 利用例
1.  index.php の先頭で bootstrap.php を読み込む：
    - この時点で以下が準備される：
      - 環境変数が使用可能
      - 登録ディレクトリ内のクラス・関数が自動で読み込まれる
      - アプリケーションの初期化が完了

</nuxt-content-wrapper>