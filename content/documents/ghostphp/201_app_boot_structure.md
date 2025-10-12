---
title: アプリ起動構成
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 201
path: "/documents/ghostphp/201_app_boot_structure"
---

<nuxt-content-wrapper>

`App` クラスは GhostPHP フレームワークのエントリーポイントとして、  
リクエスト処理とルーティングを統合的に管理する中心的なクラス。  

このドキュメントでは、**アプリケーションの起動構造**を構成する  
`App` クラス、`index.php`、`.htaccess`、および初期化処理 `bootstrap.php` の関係をまとめる。


## 1. 全体的な流れ
```php
[ブラウザアクセス]
        │
        ▼
   Apache (.htaccess)
        │
        ▼
   index.php
        │
 ┌──────┴────────┐
 │ vendor/autoload.php  → Composerクラスローダー
 │ bootstrap.php        → 初期設定（env, timezone, error handling）
 └──────┬────────┘
        ▼
     new App()
        │
     App->run()
        │
     Router->resolve()
        │
     Controller / View 実行
```

## 2. .htaccess（Apache ルーティング設定）
```php
# RewriteEngineを有効化
RewriteEngine On

# index.php 以外の実在ファイル/ディレクトリを除外
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# すべてのリクエストを index.php に転送
RewriteRule ^ index.php [QSA,L]

```
- .htaccess はすべてのアクセスを index.php に集約する役割を持つ。

## 3. Appクラス

```php
<?php

namespace app\aura;

use app\aura\https\Request;
use app\aura\routes\Router;

class App
{
    public Router  $router;
    public Request $request;

    public function __construct()
    {
        $this->request = new Request();
        $this->router  = new Router($this->request);
    }

    public function run()
    {
        $this->router->resolve();
    }
}
```
- __construct()
  - Request クラスを生成して HTTP 情報（URI / メソッド / パラメータ）を保持。
  - Router クラスを初期化し、ルート定義の受け皿を用意。

- run()
  - $this->router->resolve() を呼び出し、
  - 現在のリクエストに一致するコントローラまたは処理を実行。


## 4. アプリ起動構成（index.php）
- index.php はフレームワークの実行開始点。App クラスがインスタンス化される。
```php
<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/bootstrap.php';

use app\aura\App;
use app\services\UserService;
use app\services\PostService;

$app = new App();

// routes
$app->router->get('', function () { include "templates/welcome.php"; });
$app->router->get('error', function () { include "templates/errors/error.php"; });

// user routes
$app->router->get('signin',  fn() => (new UserService)->showSignInForm());
$app->router->get('signup',  fn() => (new UserService)->showSignUpForm());
$app->router->post('signin', fn() => (new UserService)->signin());
$app->router->post('signup', fn() => (new UserService)->signup());

// post routes
$app->router->get('post',        fn() => (new PostService)->index());
$app->router->get('post/create', fn() => (new PostService)->showCreateForm());
$app->router->post('post/create',fn() => (new PostService)->create());

$app->run();

```
- vendor/autoload.php
  - Composer の自動読み込み。すべてのクラスを名前空間ベースで解決可能にする。

- bootstrap.php
  - アプリの初期設定ファイル。セッション、タイムゾーン、エラーレベルなどを定義する場所。

- $app = new App()
  - ここでフレームワーク中核の App クラスが起動。

- $app->run()
  - HTTP リクエストの処理が実際に始まるタイミング。

</nuxt-content-wrapper>