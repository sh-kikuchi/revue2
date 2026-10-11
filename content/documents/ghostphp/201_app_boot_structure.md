---
title: アプリ起動構成
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 201
path: "/documents/ghostphp/201_app_boot_structure"
---

<nuxt-content-wrapper>

`App` クラスは GhostPHP フレームワークのエントリーポイントとして、
リクエスト処理とルーティングを統合的に管理する中心的なクラス。

このドキュメントでは、**アプリケーションの起動構造**を構成する
`App` クラス、`index.php`、`.htaccess`、および初期化処理 `bootstrap.php` の関係をまとめる。

## 1. 全体的な流れ
```txt
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
 │ bootstrap.php        → 初期設定（env, autoload登録）
 └──────┬────────┘
        ▼
     new App()
        │
     $app->router->get/post(...) でルート定義
        │
     App->run()
        │
     Router->resolve()
        │
     Controller（依存解決 → FormRequest検証 → メソッド実行） / View 実行
```

## 2. .htaccess（Apache ルーティング設定）
```apache
<IfModule mod_rewrite.c>
DirectoryIndex index.php
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php/$1 [L]
</IfModule>
```
- .htaccess は、実在するファイル／ディレクトリでないすべてのアクセスを `index.php` に集約する役割を持つ。

## 3. Appクラス

```php
<?php

namespace app\aura;

use app\aura\https\HttpRequest;
use app\aura\routes\Router;

class App {
    public Router  $router;
    public HttpRequest $request;

    public function __construct()
    {
        $this->request = new HttpRequest();
        $this->router  = new Router($this->request);
    }

    public function run()
    {
        $this->router->resolve();
    }
}
```
- __construct()
  - `HttpRequest` クラスを生成して HTTP 情報（URI / メソッド / 入力値 / ファイル）を保持。
  - `Router` クラスを初期化し、ルート定義の受け皿を用意。

- run()
  - `$this->router->resolve()` を呼び出し、
  - 現在のリクエストに一致するコントローラーメソッド（またはコールバック）を実行。

> v2.x系では `HttpRequest` ではなく `Request` を保持していたが、v4.0では役割が分離され、
> `App`/`Router` が扱う低レベルなHTTP情報は `HttpRequest`、FormRequestの基底は別クラス `Request` になった。詳細は [301_httprequest_class.md](301_httprequest_class.md) と [306_request_validation.md](306_request_validation.md)。

## 4. アプリ起動構成（index.php）
- index.php はフレームワークの実行開始点。App クラスがインスタンス化される。
```php
<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/bootstrap.php';

use app\aura\App;
use app\controllers\UserController;
use app\controllers\PostController;

// Initialize application
$app = new App();

// Basic Routes
$app->router->get('', function () { include "templates/welcome.php"; });
$app->router->get('error', function () { include "templates/errors/error.php"; });

// User Routes
$app->router->get('signin',  [UserController::class, 'showSignInForm']);
$app->router->get('signup',  [UserController::class, 'showSignUpForm']);
$app->router->get('index',   [UserController::class, 'myPage']);

$app->router->post('signin',  [UserController::class, 'signin']);
$app->router->post('signup',  [UserController::class, 'signup']);
$app->router->post('signout', [UserController::class, 'signout']);
$app->router->post('mail',    [UserController::class, 'mail']);
$app->router->post('upload',  [UserController::class, 'upload']);

// Post Routes
$app->router->get('post',        [PostController::class, 'index']);
$app->router->get('post/create', [PostController::class, 'showCreateForm']);
$app->router->get('post/update', [PostController::class, 'showUpdateForm']);
$app->router->post('post/create',[PostController::class, 'create']);
$app->router->post('post/update',[PostController::class, 'update']);
$app->router->post('post/delete',[PostController::class, 'delete']);

$app->run();
```
- vendor/autoload.php
  - Composer の自動読み込み。すべてのクラスを名前空間ベースで解決可能にする。

- bootstrap.php
  - アプリの初期設定ファイル。`.env` の読み込みとオートロード対象ディレクトリの登録を行う場所。

- $app = new App()
  - ここでフレームワーク中核の App クラスが起動。

- ルート定義
  - v2.x系のように `fn() => (new PostService)->index()` とサービスへ直接クロージャで委譲する書き方も可能だが、
    v4.0の標準スタイルは `[Controller::class, 'method']` の配列形式で、Routerに依存解決とFormRequest検証を任せる。

- $app->run()
  - HTTP リクエストの処理が実際に始まるタイミング。

</nuxt-content-wrapper>
