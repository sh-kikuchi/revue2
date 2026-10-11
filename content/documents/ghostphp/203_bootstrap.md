---
title: Bootstrap
category: php
createdAt: 2025-10-12
updatedAt: 2026-10-03
sortNumber: 203
path: "/documents/ghostphp/203_bootstrap"
---
<nuxt-content-wrapper>

`bootstrap.php` は、GhostPHP アプリケーションの起動時に最初に読み込まれる初期化ファイルである。
環境変数の読み込み、`AutoloadManager` への対象ディレクトリ登録、テンプレートの探索先ディレクトリの設定を行い、アプリケーションが動作する準備を整える。

## 1. コード

```php
<?php

use app\aura\AutoloadManager;
use app\aura\Template;
use app\aura\https\Redirect;

// Initialize autoloader
$autoloader = new AutoloadManager();

// Load environment variables (.env)
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Register directories for autoloading
$autoloader->registerDir(__DIR__ . '/aura/utils/functions');
$autoloader->registerDir(__DIR__ . '/interfaces/repositories');
$autoloader->registerDir(__DIR__ . '/config');

// Activate autoloader
$autoloader->autoload();

// Configure template directories
Template::setBasePath(__DIR__ . '/templates');
Redirect::setErrorTemplatesBasePath(__DIR__ . '/templates/errors');
```

> v2.x系では `interfaces/form_classes` と `interfaces/services` も登録されていたが、
> v4.0ではこれらのディレクトリ自体が廃止されており、登録対象は3つに整理されている。

## 2. コード説明
- AutoloadManager の初期化
  ```php
  $autoloader = new AutoloadManager();
  ```

- 環境変数の読み込み
  ```php
  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->load();
  ```
  - `.env` ファイルの値を `$_ENV` として読み込む
  - `.env` はプロジェクトルートに配置し、Gitには含めない（`.gitignore` で除外済み）
  - リポジトリには開発時の設定例として `.env.dev` が同梱されている（キー一覧の参考用。値は各自の環境に合わせて `.env` として作成する）

- オートロード対象ディレクトリの登録
  ```php
  $autoloader->registerDir(__DIR__ . '/aura/utils/functions');
  $autoloader->registerDir(__DIR__ . '/interfaces/repositories');
  $autoloader->registerDir(__DIR__ . '/config');
  ```
  - `aura/utils/functions` : `h()` / `route()` / `paginate()` などの名前空間なしヘルパー関数
  - `interfaces/repositories` : `IUserRepository` / `IPostRepository` などのインターフェース
  - `config` : `Message` / `LABEL` などの設定クラス

- オートロードの実行
  ```php
  $autoloader->autoload();
  ```
  - 登録されたディレクトリ内の PHP ファイルをすべて読み込み、クラスや関数を使用可能にする

- テンプレートの探索先ディレクトリの設定（v4.0で追加）
  ```php
  Template::setBasePath(__DIR__ . '/templates');
  Redirect::setErrorTemplatesBasePath(__DIR__ . '/templates/errors');
  ```
  - テンプレートはフレームワーク（`aura/`）ではなくアプリケーション側のファイルのため、場所はアプリ側のこのファイルで指定する
  - 絶対パスで指定しているため、実行時のカレントディレクトリに依存せずテンプレートを読み込める
  - 詳細は [503_template_class.md](503_template_class.md) / [303_redirect_class.md](303_redirect_class.md) を参照

## 3. 使い方 / 利用例
1. `index.php` の先頭で `vendor/autoload.php`（Composer）→ `bootstrap.php` の順に読み込む：
    - この時点で以下が準備される：
      - `.env` の環境変数が `$_ENV` で使用可能
      - `aura/utils/functions` / `interfaces/repositories` / `config` 配下のクラス・関数が自動で読み込まれる
      - `controllers` / `services` / `repositories` / `entities` / `requests` 配下の名前空間付きクラスは
        Composerの PSR-4 オートローダー（`vendor/autoload.php`）側で解決される
      - `Template` / `Redirect::error()` が `templates/` 配下を絶対パスで参照するようになる
      - アプリケーションの初期化が完了

</nuxt-content-wrapper>
